import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CourseFormComponent } from '../../components/course-form/course-form.component';
import { CourseService } from '../../services/course.service';
import { ToastService } from '../../../../core/services/toast.service';
import { CreateCourseRequest } from '../../models/course-requests.model';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [CommonModule, CourseFormComponent],
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent {
  private courseService = inject(CourseService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  isSaving = false;

  handleCreate(formData: CreateCourseRequest): void {
    this.isSaving = true;

    this.courseService.createCourse(formData).subscribe({
      next: () => {
        this.isSaving = false;
        this.toastService.success('Course created successfully!', 'Success');
        this.router.navigate(['/admin/courses']);
      },
      error: () => {
        this.isSaving = false;
        // Error toast is handled globally by ErrorInterceptor
      },
    });
  }
}
