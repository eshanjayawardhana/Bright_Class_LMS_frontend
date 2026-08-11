import { Routes } from '@angular/router';

export const CATALOG_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/course-catalog/course-catalog.component').then(
        (m) => m.CourseCatalogComponent
      )
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/course-details/course-details.component').then(
        (m) => m.CourseDetailsComponent
      )
  }
];