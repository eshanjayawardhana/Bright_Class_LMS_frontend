import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { CourseService } from '../../services/course.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Course } from '../../models/course.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);

  course: Course | null = null;
  isLoading = true;
  isAdmin = false;

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.loadCourse(Number(idParam));
    } else {
      this.toastService.error('Invalid Course ID');
      this.router.navigate(['/admin/courses']);
    }
  }

  private loadCourse(id: number): void {
    this.isLoading = true;
    this.courseService.getCourseById(id).subscribe({
      next: (res) => {
        this.course = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/admin/courses']);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/courses']);
  }

  editCourse(): void {
    if (this.course) {
      this.router.navigate([`/admin/courses/${this.course.id}/edit`]);
    }
  }
}
