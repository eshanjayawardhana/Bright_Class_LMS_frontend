import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { User } from '../models/user.model';
import { UserFilter } from '../models/user-filter.model';

export interface ApiResponse<T> {
  message: string;
  data: T;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  
  private baseUrl = `${environment.apiUrl}/admin`;

  getAllUsers(filter?: UserFilter): Observable<User[]> {
    let params = new HttpParams();

    if (filter) {
      if (filter.search) params = params.set('search', filter.search);
      if (filter.role) params = params.set('role', filter.role);
      if (filter.status) params = params.set('status', filter.status);
    }

    return this.http.get<ApiResponse<User[]>>(`${this.baseUrl}/users`, { params })
      .pipe(map(response => response.data));
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<ApiResponse<User>>(`${this.baseUrl}/users/${id}`)
      .pipe(map(response => response.data));
  }

  createLecturer(data: any): Observable<User> {
    return this.http.post<ApiResponse<User>>(`${this.baseUrl}/create-lecture`, data)
      .pipe(map(response => response.data));
  }
}