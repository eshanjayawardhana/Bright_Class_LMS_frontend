import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EnrollmentService } from '../../features/enrollment/services/enrollment.service';
import { PaymentService } from '../../features/payment/services/payment.service';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class CountService {
  private enrollmentService = inject(EnrollmentService);
  private paymentService = inject(PaymentService);
  private authService = inject(AuthService);

  // BehaviorSubjects to hold the state
  private enrollmentCountSubject = new BehaviorSubject<number>(0);
  private paymentCountSubject = new BehaviorSubject<number>(0);

  // Observables for components to subscribe
  enrollmentCount$ = this.enrollmentCountSubject.asObservable();
  paymentCount$ = this.paymentCountSubject.asObservable();

  constructor() {
    this.refreshCounts(); // Initial load
  }

  refreshCounts(): void {
    // 🛠️ If only admin then call API
    if (this.authService.isAdmin()) {
      // Fetch real-time enrollment counts
      this.enrollmentService
        .getAllEnrollments({ status: 'PENDING' })
        .subscribe({
          next: (res) => this.enrollmentCountSubject.next(res.length),
          error: (err) => console.error('Enrollment count fetch failed', err),
        });

      // Fetch real-time payment counts
      this.paymentService.getAllPayments({ status: 'PENDING' }).subscribe({
        next: (res) => this.paymentCountSubject.next(res.length),
        error: (err) => console.error('Payment count fetch failed', err),
      });
    }
  }
}
