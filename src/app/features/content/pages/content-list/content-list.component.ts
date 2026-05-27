import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { CourseContentService } from '../../services/course-content.service';
import { ToastService } from '../../../../core/services/toast.service';
import { CourseContent } from '../../models/course-content.model';
import { ContentTypeChipComponent } from '../../components/content-type-chip/content-type-chip.component';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatIconModule, 
    FormsModule, 
    ContentTypeChipComponent
  ],
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private contentService = inject(CourseContentService);
  private toastService = inject(ToastService);

  courseId!: number;
  contents: CourseContent[] = [];
  filteredContents: CourseContent[] = [];
  isLoading = true;

  searchTerm = '';

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('courseId');
    if (idParam) {
      this.courseId = Number(idParam);
      this.loadContents();
    } else {
      this.toastService.error('Course ID is missing.');
      this.router.navigate(['/admin/courses']); // Fallback route
    }
  }

  loadContents(): void {
    this.isLoading = true;
    this.contentService.getContentForManagement(this.courseId).subscribe({
      next: (res) => {
        this.contents = res;
        this.filteredContents = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.toastService.error('Failed to load course contents.');
      }
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredContents = this.contents;
      return;
    }
    this.filteredContents = this.contents.filter(c => 
      c.title.toLowerCase().includes(term) || 
      c.description.toLowerCase().includes(term)
    );
  }

  openLink(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  deleteContent(id: number): void {
    if (!confirm('Are you sure you want to delete this learning material?')) return;

    this.contentService.deleteContent(id).subscribe({
      next: () => {
        this.toastService.success('Content deleted successfully.');
        this.loadContents();
      },
      error: () => {
        this.toastService.error('Failed to delete content.');
      }
    });
  }

  navigateToAddContent(): void {
    this.router.navigate([`/admin/course-content/${this.courseId}/add`]);
  }
}