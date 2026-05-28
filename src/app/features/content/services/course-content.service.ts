import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { CourseContent } from '../models/course-content.model';

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

  getContentForManagement(courseId: number): Observable<CourseContent[]> {
    return this.http.get<ApiResponse<CourseContent[]>>(`${this.baseUrl}/manage/${courseId}`)
      .pipe(map(res => res.data));
  }

  getContentForStudent(courseId: number): Observable<CourseContent[]> {
    return this.http.get<ApiResponse<CourseContent[]>>(`${this.baseUrl}/student/${courseId}`)
      .pipe(map(res => res.data));
  }

  createContent(formData: FormData): Observable<CourseContent> {
    return this.http.post<ApiResponse<CourseContent>>(this.baseUrl, formData)
      .pipe(map(res => res.data));
  }

  deleteContent(id: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`)
      .pipe(map(() => void 0));
  }

  getContentById(contentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/edit/${contentId}`);
  }

  updateContent(contentId: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/${contentId}`, formData);
  }
}