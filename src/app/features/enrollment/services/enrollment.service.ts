import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { Enrollment } from '../models/enrollment.model';
import { EnrollmentFilter } from '../models/enrollment-filter.model';

export interface ApiResponse<T> {
  message: string;
  data: T;
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/enrollments`;

  getAllEnrollments(filter?: EnrollmentFilter): Observable<Enrollment[]> {
    let params = new HttpParams();

    if (filter) {
      if (filter.search) params = params.set('search', filter.search);
      if (filter.status) params = params.set('status', filter.status);
      if (filter.page !== undefined) params = params.set('page', filter.page);
      if (filter.size !== undefined) params = params.set('size', filter.size);
    }

    return this.http
      .get<ApiResponse<Enrollment[]>>(`${this.baseUrl}/all`, { params })
      .pipe(map((response) => response.data));
  }

  getEnrollmentById(id: number): Observable<Enrollment> {
    return this.http
      .get<ApiResponse<Enrollment>>(`${this.baseUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  approveEnrollment(id: number): Observable<Enrollment> {
    return this.http
      .put<ApiResponse<Enrollment>>(`${this.baseUrl}/${id}/approve`, {})
      .pipe(map((response) => response.data));
  }

  rejectEnrollment(id: number, reason?: string): Observable<Enrollment> {
    return this.http
      .put<ApiResponse<Enrollment>>(`${this.baseUrl}/${id}/reject`, { reason })
      .pipe(map((response) => response.data));
  }
}
