import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { CourseContent, CourseContentRequest } from '../models/course-content.model';

export interface ApiResponse<T> {
  message: string;
  data: T;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class CourseContentService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/content`;

  // For Admin and Lecturer
  getContentForManagement(courseId: number): Observable<CourseContent[]> {
    return this.http.get<ApiResponse<CourseContent[]>>(`${this.baseUrl}/manage/${courseId}`)
      .pipe(map(res => res.data));
  }

  // For Student
  getContentForStudent(courseId: number): Observable<CourseContent[]> {
    return this.http.get<ApiResponse<CourseContent[]>>(`${this.baseUrl}/student/${courseId}`)
      .pipe(map(res => res.data));
  }

  createContent(request: CourseContentRequest): Observable<CourseContent> {
    return this.http.post<ApiResponse<CourseContent>>(this.baseUrl, request)
      .pipe(map(res => res.data));
  }

  deleteContent(id: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`)
      .pipe(map(() => void 0));
  }
}