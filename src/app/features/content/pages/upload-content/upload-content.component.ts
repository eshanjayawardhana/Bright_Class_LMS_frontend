import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

import { CourseContentService } from '../../services/course-content.service';
import { ContentFormComponent } from '../../components/content-form/content-form.component';

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

  courseId!: number;
  isSaving = false;

  Toast = Swal.mixin({
    toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('courseId');
    if (idParam) {
      this.courseId = Number(idParam);
    } else {
      this.Toast.fire({ icon: 'error', title: 'Invalid Course Access' });
      this.router.navigate(['/admin/courses']);
    }
  }

  handleFormSubmit(formData: FormData): void {
    this.isSaving = true;
    this.contentService.createContent(formData).subscribe({
      next: () => {
        this.isSaving = false;
        this.Toast.fire({ icon: 'success', title: 'Material added successfully!' });
        this.goBack();
      },
      error: () => {
        this.isSaving = false;
        Swal.fire('Error!', 'Failed to upload material. Please try again.', 'error');
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