import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { PaymentService } from '../../services/payment.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Payment } from '../../models/payment.model';
import { PaymentStatus } from '../../models/payment-status.type';
import { PaymentStatusChipComponent } from '../../components/payment-status-chip/payment-status-chip.component';
import { ImageViewerModalComponent } from '../../components/image-viewer-modal/image-viewer-modal.component';
import { VerifyPaymentDialogComponent } from '../../components/verify-payment-dialog/verify-payment-dialog.component';
import { RejectPaymentDialogComponent } from '../../components/reject-payment-dialog/reject-payment-dialog.component';
import { CountService } from '../../../../core/services/count.service';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    PaymentStatusChipComponent,
    ImageViewerModalComponent,
    VerifyPaymentDialogComponent,
    RejectPaymentDialogComponent
  ],
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit, OnDestroy {
  private paymentService = inject(PaymentService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private countService = inject(CountService);

  payments: Payment[] = [];
  loading = true;

  searchTerm = '';
  selectedStatus: PaymentStatus | '' = '';
  pendingCount = 0;

  selectedImage = '';
  showImageViewer = false;

  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  private readonly BACKEND_URL = 'http://localhost:8080'; 

  selectedPaymentForAction: Payment | null = null;
  showVerifyDialog = false;
  showRejectDialog = false;
  isProcessingAction = false;

  ngOnInit(): void {
    this.loadPayments();

    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.loadPayments();
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  loadPayments(): void {
    this.loading = true;
    this.paymentService.getAllPayments({
      search: this.searchTerm,
      status: this.selectedStatus
    }).subscribe({
      next: (res) => {
        this.payments = res;
        this.pendingCount = res.filter(p => p.status === 'PENDING').length;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchTerm);
  }

  onStatusChange(): void {
    this.loadPayments();
  }

  viewPayment(id: number): void {
    this.router.navigate([`/admin/payments/${id}`]);
  }

  resolveImageUrl(url: string): string {
    if (!url) return 'assets/placeholder-slip.png';
    if (url.startsWith('http')) return url;
    return `${this.BACKEND_URL}${url}`;
  }

  openImage(url: string): void {
    this.selectedImage = this.resolveImageUrl(url);
    this.showImageViewer = true;
  }

  closeImageViewer(): void {
    this.showImageViewer = false;
    this.selectedImage = '';
  }

  openVerifyDialog(payment: Payment): void {
    this.selectedPaymentForAction = payment;
    this.showVerifyDialog = true;
  }

  openRejectDialog(payment: Payment): void {
    this.selectedPaymentForAction = payment;
    this.showRejectDialog = true;
  }

  closeDialogs(): void {
    this.showVerifyDialog = false;
    this.showRejectDialog = false;
    this.selectedPaymentForAction = null;
  }

  confirmVerify(): void {
    if (!this.selectedPaymentForAction) return;

    this.isProcessingAction = true;
    this.paymentService.verifyPayment(this.selectedPaymentForAction.id).subscribe({
      next: () => {
        this.isProcessingAction = false;
        this.toastService.success('Payment successfully verified!');
        this.closeDialogs();
        this.loadPayments();
        this.countService.refreshCounts();
      },
      error: () => {
        this.isProcessingAction = false;
        this.closeDialogs();
      }
    });
  }

  confirmReject(reason: string): void {
    if (!this.selectedPaymentForAction) return;

    this.isProcessingAction = true;
    this.paymentService.rejectPayment(this.selectedPaymentForAction.id, reason).subscribe({
      next: () => {
        this.isProcessingAction = false;
        this.toastService.warning('Payment rejected and student notified.');
        this.closeDialogs();
        this.loadPayments();
      },
      error: () => {
        this.isProcessingAction = false;
        this.closeDialogs();
      }
    });
  }
}