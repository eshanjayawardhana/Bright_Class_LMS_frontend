import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { CourseFormComponent } from '../../components/course-form/course-form.component';
import { CourseService } from '../../services/course.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Course } from '../../models/course.model';
import { UpdateCourseRequest } from '../../models/course-requests.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [CommonModule, CourseFormComponent, MatIconModule],
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);
  private toastService = inject(ToastService);

  courseId!: number;
  courseData: Course | null = null;

  isFetching = true;
  isSaving = false;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.courseId = Number(idParam);
      this.loadCourseData();
    } else {
      this.toastService.error('Invalid Course ID');
      this.router.navigate(['/admin/courses']);
    }
  }

  private loadCourseData(): void {
    this.isFetching = true;
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (res) => {
        this.courseData = res;
        this.isFetching = false;
      },
      error: () => {
        this.isFetching = false;
        this.router.navigate(['/admin/courses']);
      },
    });
  }

  handleUpdate(formData: UpdateCourseRequest): void {
    Swal.fire({
      title: 'Save Changes?',
      text: 'Are you sure you want to update this course details?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.isSaving = true;
        this.courseService.updateCourse(this.courseId, formData).subscribe({
          next: () => {
            this.isSaving = false;
            this.toastService.success('Course updated successfully!', 'Success');
            this.router.navigate(['/admin/courses']);
          },
          error: () => {
            this.isSaving = false;
          },
        });
      }
      
    });
  }
}