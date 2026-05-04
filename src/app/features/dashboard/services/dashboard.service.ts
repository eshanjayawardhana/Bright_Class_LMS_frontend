import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface RecentActivity {
  id: string;
  studentName: string;
  courseName: string;
  date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface AdminDashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  pendingEnrollments: number;
  totalPayments: number;
  chartLabels: string[];
  chartData: number[];
  recentActivity: RecentActivity[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/dashboard`;

  getAdminStats(): Observable<AdminDashboardStats> {
    const mockData: AdminDashboardStats = {
      totalUsers: 1240,
      totalCourses: 48,
      totalEnrollments: 856,
      pendingEnrollments: 12,
      totalPayments: 1250000,
      chartLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      chartData: [45, 60, 85, 50, 110, 140],
      recentActivity: [
        { id: '1', studentName: 'Kasun Perera', courseName: 'Fullstack Angular', date: '2026-05-04', status: 'PENDING' },
        { id: '2', studentName: 'Amali Silva', courseName: 'Spring Boot Mastery', date: '2026-05-04', status: 'APPROVED' },
        { id: '3', studentName: 'Ruwan Fernando', courseName: 'UI/UX Principles', date: '2026-05-03', status: 'APPROVED' },
        { id: '4', studentName: 'Nimesh Jay', courseName: 'React for Beginners', date: '2026-05-02', status: 'REJECTED' }
      ]
    };

    // Simulate network delay
    return of(mockData).pipe(delay(1000)); 
  }
}