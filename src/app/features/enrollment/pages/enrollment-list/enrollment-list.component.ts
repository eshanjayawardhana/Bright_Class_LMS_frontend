import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { EnrollmentService } from '../../services/enrollment.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Enrollment } from '../../models/enrollment.model';
import { EnrollmentStatus } from '../../models/enrollment-status.type';
import { EnrollmentStatusChipComponent } from '../../components/enrollment-status-chip/enrollment-status-chip.component';

import { ApproveDialogComponent } from '../../components/approve-dialog/approve-dialog.component';
import { RejectDialogComponent } from '../../components/reject-dialog/reject-dialog.component';

@Component({
  selector: 'app-enrollment-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    EnrollmentStatusChipComponent,
    ApproveDialogComponent,
    RejectDialogComponent,
  ],
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.scss'],
})
export class EnrollmentListComponent implements OnInit, OnDestroy {
  private enrollmentService = inject(EnrollmentService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  enrollments: Enrollment[] = [];
  loading = true;

  searchTerm = '';
  selectedStatus: EnrollmentStatus | '' = '';
  pendingCount = 0;

  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  selectedEnrollment: Enrollment | null = null;
  showApproveDialog = false;
  showRejectDialog = false;
  isProcessingAction = false;

  ngOnInit(): void {
    this.loadEnrollments();

    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.loadEnrollments();
      });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  loadEnrollments(): void {
    this.loading = true;

    this.enrollmentService
      .getAllEnrollments({
        search: this.searchTerm,
        status: this.selectedStatus,
      })
      .subscribe({
        next: (res) => {
          this.enrollments = res;
          this.calculatePendingCount(res);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchTerm);
  }

  onStatusChange(): void {
    this.loadEnrollments();
  }

  private calculatePendingCount(data: Enrollment[]): void {
    if (this.selectedStatus === 'PENDING' || this.selectedStatus === '') {
      this.pendingCount = data.filter((e) => e.status === 'PENDING').length;
    }
  }

  viewEnrollment(id: number): void {
    this.router.navigate([`/admin/enrollment/${id}`]);
  }

  openApproveDialog(enrollment: Enrollment): void {
    this.selectedEnrollment = enrollment;
    this.showApproveDialog = true;
  }

  openRejectDialog(enrollment: Enrollment): void {
    this.selectedEnrollment = enrollment;
    this.showRejectDialog = true;
  }

  closeDialogs(): void {
    this.showApproveDialog = false;
    this.showRejectDialog = false;
    this.selectedEnrollment = null;
  }

  confirmApprove(): void {
    if (!this.selectedEnrollment) return;

    this.isProcessingAction = true;
    this.enrollmentService
      .approveEnrollment(this.selectedEnrollment.id)
      .subscribe({
        next: () => {
          this.isProcessingAction = false;
          this.toastService.success('Enrollment successfully approved!');
          this.closeDialogs();
          this.loadEnrollments();
        },
        error: () => {
          this.isProcessingAction = false;
          this.closeDialogs();
        },
      });
  }

  confirmReject(reason: string): void {
    if (!this.selectedEnrollment) return;

    this.isProcessingAction = true;
    this.enrollmentService
      .rejectEnrollment(this.selectedEnrollment.id, reason)
      .subscribe({
        next: () => {
          this.isProcessingAction = false;
          this.toastService.warning('Enrollment has been rejected.');
          this.closeDialogs();
          this.loadEnrollments();
        },
        error: () => {
          this.isProcessingAction = false;
          this.closeDialogs();
        },
      });
  }
}
