import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';
import { CatalogCourse } from '../../models/catalog-course.model';
import { CourseHeroComponent } from '../../components/course-hero/course-hero.component';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, CourseHeroComponent],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private catalogService = inject(CatalogService);

  course: CatalogCourse | null = null;
  loading = true;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadCourse(id);
    }
  }

  loadCourse(id: number): void {
    this.loading = true;
    this.catalogService.getCourseById(id).subscribe({
      next: (res) => {
        this.course = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  enroll(): void {
    if (!this.course) return;
    this.router.navigate(['/enrollment', this.course.id]);
  }
}