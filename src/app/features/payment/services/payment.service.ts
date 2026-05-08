import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { Payment } from '../models/payment.model';
import { PaymentFilter } from '../models/payment-filter.model';

export interface ApiResponse<T> {
  message: string;
  data: T;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/payments`;

  getAllPayments(filter?: PaymentFilter): Observable<Payment[]> {
    let params = new HttpParams();

    if (filter) {
      if (filter.search) params = params.set('search', filter.search);
      if (filter.status) params = params.set('status', filter.status);
      if (filter.page !== undefined) params = params.set('page', filter.page);
      if (filter.size !== undefined) params = params.set('size', filter.size);
    }

    return this.http.get<ApiResponse<Payment[]>>(`${this.baseUrl}/all`, { params })
      .pipe(map(response => response.data));
  }

  getPaymentById(id: number): Observable<Payment> {
    return this.http.get<ApiResponse<Payment>>(`${this.baseUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  verifyPayment(id: number): Observable<Payment> {
    return this.http.put<ApiResponse<Payment>>(`${this.baseUrl}/${id}/verify`, {})
      .pipe(map(response => response.data));
  }

  rejectPayment(id: number, reason?: string): Observable<Payment> {
    return this.http.put<ApiResponse<Payment>>(`${this.baseUrl}/${id}/reject`, { reason })
      .pipe(map(response => response.data));
  }
}