import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogService } from '../../services/catalog.service';
import { CatalogCourse } from '../../models/catalog-course.model';
import { CatalogCourseCardComponent } from '../../components/catalog-course-card/catalog-course-card.component';

@Component({
  selector: 'app-course-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, CatalogCourseCardComponent],
  templateUrl: './course-catalog.component.html',
  styleUrls: ['./course-catalog.component.scss']
})
export class CourseCatalogComponent implements OnInit {
  private catalogService = inject(CatalogService);

  courses: CatalogCourse[] = [];
  filteredCourses: CatalogCourse[] = [];
  loading = true;
  searchTerm = '';

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading = true;
    this.catalogService.getAllCourses().subscribe({
      next: (res) => {
        this.courses = res;
        this.filteredCourses = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  filterCourses(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCourses = this.courses.filter(course =>
      course.title.toLowerCase().includes(term) ||
      course.category.toLowerCase().includes(term) ||
      course.instructorName.toLowerCase().includes(term)
    );
  }
}