import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { CourseContentService } from '../../services/course-content.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ContentFormComponent } from '../../components/content-form/content-form.component';
import { CourseContentRequest } from '../../models/course-content.model';

@Component({
  selector: 'app-upload-content',
  standalone: true,
  imports: [CommonModule, MatIconModule, ContentFormComponent],
  templateUrl: './upload-content.component.html',
  styleUrls: ['./upload-content.component.scss']
})
export class UploadContentComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private contentService = inject(CourseContentService);
  private toastService = inject(ToastService);

  courseId!: number;
  isSaving = false;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('courseId');
    if (idParam) {
      this.courseId = Number(idParam);
    } else {
      this.toastService.error('Invalid Course Access');
      this.router.navigate(['/admin/courses']);
    }
  }

  handleFormSubmit(formData: FormData): void {
    this.isSaving = true;
    this.contentService.createContent(formData).subscribe({
      next: () => {
        this.isSaving = false;
        this.toastService.success('Material added to the course successfully!');
        this.goBack();
      },
      error: () => {
        this.isSaving = false;
        // Error toast is handled by interceptor
      }
    });
  }
  goBack(): void {
    if (this.courseId) {
      this.router.navigate([`/admin/course-content/${this.courseId}`]);
    } else {
      this.router.navigate(['/admin/courses']);
    }
  }
}