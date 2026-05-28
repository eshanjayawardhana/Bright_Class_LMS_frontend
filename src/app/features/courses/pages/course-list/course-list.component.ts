import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { ToastService } from '../../../../core/services/toast.service';
import { DeleteCourseDialogComponent } from '../../components/delete-course-dialog/delete-course-dialog.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatIconModule, DeleteCourseDialogComponent],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit, OnDestroy {
  private courseService = inject(CourseService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  private authService = inject(AuthService);
  isAdmin = false;

  courses: Course[] = [];
  loading = true;
  searchTerm = '';

  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  selectedCourseForDelete: Course | null = null;
  showDeleteDialog = false;
  isDeleting = false;

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();

    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((searchTerm) => {
      this.loadCourses(searchTerm);
    });

    this.loadCourses();
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  loadCourses(search?: string): void {
    this.loading = true;

    this.courseService
      .getAllCourses(search ? { search } : undefined)
      .subscribe({
        next: (res) => {
          this.courses = res;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  onSearchChange(value: string): void {
    this.searchSubject.next(value);
  }

  createCourse(): void {
    this.router.navigate(['/admin/courses/create']);
  }

  editCourse(id: number): void {
    this.router.navigate([`/admin/courses/${id}/edit`]);
  }

  viewCourse(id: number): void {
    this.router.navigate([`/admin/courses/${id}`]);
  }

  manageContent(id: number): void {
    this.router.navigate([`/admin/course-content/${id}`]);
  }
  

  openDeleteDialog(course: Course): void {
    this.selectedCourseForDelete = course;
    this.showDeleteDialog = true;
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog = false;
    this.selectedCourseForDelete = null;
  }

  confirmDelete(): void {
    if (!this.selectedCourseForDelete) return;

    this.isDeleting = true;
    this.courseService.deleteCourse(this.selectedCourseForDelete.id).subscribe({
      next: () => {
        this.isDeleting = false;
        this.toastService.success('Course deleted successfully!');
        this.closeDeleteDialog();
        this.loadCourses(this.searchTerm);
      },
      error: () => {
        this.isDeleting = false;
        this.closeDeleteDialog();
      }
    });
  }
}
