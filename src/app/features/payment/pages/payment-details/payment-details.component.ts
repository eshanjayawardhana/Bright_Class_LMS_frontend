import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { PaymentService } from '../../services/payment.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Payment } from '../../models/payment.model';
import { PaymentStatusChipComponent } from '../../components/payment-status-chip/payment-status-chip.component';
import { ImageViewerModalComponent } from '../../components/image-viewer-modal/image-viewer-modal.component';

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    PaymentStatusChipComponent, 
    ImageViewerModalComponent
  ],
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private paymentService = inject(PaymentService);
  private toastService = inject(ToastService);

  payment: Payment | null = null;
  isLoading = true;

  showImageViewer = false;
  selectedImage = '';

  private readonly BACKEND_URL = 'http://localhost:8080';

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.loadPayment(Number(idParam));
    } else {
      this.toastService.error('Invalid Payment ID');
      this.goBack();
    }
  }

  loadPayment(id: number): void {
    this.isLoading = true;
    this.paymentService.getPaymentById(id).subscribe({
      next: (res) => {
        this.payment = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.goBack();
      }
    });
  }

  resolveImageUrl(url: string | undefined): string {
    if (!url) return 'assets/placeholder-slip.png';
    if (url.startsWith('http')) return url;
    return `${this.BACKEND_URL}${url}`;
  }

  openImage(): void {
    if (this.payment?.slipUrl) {
      this.selectedImage = this.resolveImageUrl(this.payment.slipUrl);
      this.showImageViewer = true;
    }
  }

  closeImage(): void {
    this.showImageViewer = false;
    this.selectedImage = '';
  }

  viewEnrollment(): void {
    if (this.payment?.enrollmentId) {
      this.router.navigate([`/admin/enrollment/${this.payment.enrollmentId}`]);
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/payments']);
  }
}