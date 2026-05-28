import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentFormComponent } from '../../components/content-form/content-form.component';
import { CourseContent } from '../../models/course-content.model';
import { MatIconModule } from '@angular/material/icon';
import { CourseContentService } from '../../services/course-content.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-content',
  standalone: true,
  imports: [CommonModule, ContentFormComponent, MatIconModule],
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss'],
})
export class EditContentComponent implements OnInit {
  contentId!: number;
  courseId!: number;
  contentData: CourseContent | null = null;
  isLoading = true;
  isSaving = false;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseContentService: CourseContentService,
  ) {}

  ngOnInit(): void {
    this.contentId = Number(this.route.snapshot.paramMap.get('contentId'));
    this.fetchContentData();
  }

  fetchContentData(): void {
    this.courseContentService.getContentById(this.contentId).subscribe({
      next: (res: any) => {
        this.contentData = res.data;
        this.courseId = this.contentData!.courseId;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Oops...', 'Failed to load content details!', 'error');
        this.goBack();
      },
    });
  }

  onSubmit(formData: FormData): void {
    Swal.fire({
      title: 'Save Changes?',
      text: 'Are you sure you want to update this material?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isSaving = true;
        this.courseContentService
          .updateContent(this.contentId, formData)
          .subscribe({
            next: () => {
              this.Toast.fire({
                icon: 'success',
                title: 'Content updated successfully!',
              });
              this.router.navigate(['/admin/course-content', this.courseId]);
            },
            error: (err) => {
              console.error(err);
              Swal.fire(
                'Error!',
                'Failed to update content. Please try again.',
                'error',
              );
              this.isSaving = false;
            },
          });
      }
    });
  }

  goBack(): void {
    if (this.courseId) {
      this.router.navigate(['/admin/course-content', this.courseId]);
    } else {
      window.history.back();
    }
  }
}
