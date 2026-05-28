import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { CourseContentService } from '../../services/course-content.service';
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

  courseId!: number;
  contents: CourseContent[] = [];
  filteredContents: CourseContent[] = [];
  isLoading = true;

  searchTerm = '';

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('courseId');
    if (idParam) {
      this.courseId = Number(idParam);
      this.loadContents();
    } else {
      this.Toast.fire({ icon: 'error', title: 'Course ID is missing.' });
      this.router.navigate(['/admin/courses']);
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
        this.Toast.fire({ icon: 'error', title: 'Failed to load course contents.' });
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this! All attached files will be deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contentService.deleteContent(id).subscribe({
          next: () => {
            this.Toast.fire({ icon: 'success', title: 'Material deleted successfully' });
            this.loadContents();
          },
          error: () => {
            Swal.fire('Error!', 'Failed to delete the material.', 'error');
          }
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/courses']);
  }

  editContent(contentId: number): void {
    this.router.navigate([`/admin/course-content/edit/${contentId}`]);
  }

  navigateToAddContent(): void {
    this.router.navigate([`/admin/course-content/${this.courseId}/add`]);
  }
}