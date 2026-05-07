import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { Course } from '../models/course.model';
import {
  CreateCourseRequest,
  UpdateCourseRequest,
  CourseFilter,
} from '../models/course-requests.model';

export interface ApiResponse<T> {
  message: string;
  data: T;
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/courses`;

  getAllCourses(filter?: CourseFilter): Observable<Course[]> {
    let params = new HttpParams();

    if (filter) {
      if (filter.search) params = params.set('search', filter.search);
      if (filter.category) params = params.set('category', filter.category);
      if (filter.year) params = params.set('year', filter.year);
      if (filter.semester) params = params.set('semester', filter.semester);
      if (filter.page !== undefined) params = params.set('page', filter.page);
      if (filter.size !== undefined) params = params.set('size', filter.size);
    }

    return this.http
      .get<ApiResponse<Course[]>>(`${this.baseUrl}/all`, { params })
      .pipe(map((response) => response.data));
  }

  getCourseById(id: number): Observable<Course> {
    return this.http
      .get<ApiResponse<Course>>(`${this.baseUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  createCourse(data: CreateCourseRequest): Observable<Course> {
    return this.http
      .post<ApiResponse<Course>>(`${this.baseUrl}/add`, data)
      .pipe(map((response) => response.data));
  }

  updateCourse(id: number, data: UpdateCourseRequest): Observable<Course> {
    return this.http
      .put<ApiResponse<Course>>(`${this.baseUrl}/${id}`, data)
      .pipe(map((response) => response.data));
  }

  deleteCourse(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
