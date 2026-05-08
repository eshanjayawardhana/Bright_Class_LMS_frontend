import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EnrollmentService } from '../../features/enrollment/services/enrollment.service';
import { PaymentService } from '../../features/payment/services/payment.service';

@Injectable({
  providedIn: 'root'
})
export class CountService {
  private enrollmentService = inject(EnrollmentService);
  private paymentService = inject(PaymentService);

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
    // Fetch real-time enrollment counts
    this.enrollmentService.getAllEnrollments({ status: 'PENDING' }).subscribe({
      next: (res) => this.enrollmentCountSubject.next(res.length)
    });

    // Fetch real-time payment counts
    this.paymentService.getAllPayments({ status: 'PENDING' }).subscribe({
      next: (res) => this.paymentCountSubject.next(res.length)
    });
  }
}