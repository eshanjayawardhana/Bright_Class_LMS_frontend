import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { StudentCourse } from '../models/student-course.model';
import { Progress } from '../models/progress.model';
import { LearningContent } from '../models/learning-content.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/student`;

  getMyCourses(): Observable<StudentCourse[]> {
    return this.http.get<StudentCourse[]>(`${this.baseUrl}/courses`);
  }

  getMyProgress(): Observable<Progress> {
    return this.http.get<Progress>(`${this.baseUrl}/progress`);
  }

  getCourseContents(courseId: number): Observable<LearningContent[]> {
    return this.http.get<LearningContent[]>(`${this.baseUrl}/courses/${courseId}/contents`);
  }
}