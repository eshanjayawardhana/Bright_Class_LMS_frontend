import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentFormComponent } from '../../components/content-form/content-form.component'; 
import { CourseContent } from '../../models/course-content.model';
import { MatIconModule } from '@angular/material/icon';
import { CourseContentService } from '../../services/course-content.service';

@Component({
  selector: 'app-edit-content',
  standalone: true,
  imports: [CommonModule, ContentFormComponent, MatIconModule],
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss']
})
export class EditContentComponent implements OnInit {
  contentId!: number;
  courseId!: number;
  contentData: CourseContent | null = null;
  isLoading = true;
  isSaving = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseContentService: CourseContentService
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
        console.error('Failed to load content details');
        this.isLoading = false;
        alert('Failed to load content details');
      }
    });
  }

  onSubmit(formData: FormData): void {
    this.isSaving = true;
    this.courseContentService.updateContent(this.contentId, formData).subscribe({
      next: () => {
        alert('Content updated successfully!');
        this.router.navigate(['/admin/course-content', this.courseId]);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update content');
        this.isSaving = false;
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