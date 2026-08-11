import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CatalogCourse } from '../models/catalog-course.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/courses`;

  getAllCourses(): Observable<CatalogCourse[]> {
    return this.http.get<CatalogCourse[]>(this.baseUrl);
  }

  getCourseById(id: number): Observable<CatalogCourse> {
    return this.http.get<CatalogCourse>(`${this.baseUrl}/${id}`);
  }
}