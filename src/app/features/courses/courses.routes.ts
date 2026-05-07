import { Routes } from '@angular/router';

export const COURSE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/course-list/course-list.component').then(m => m.CourseListComponent)
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/create-course/create-course.component').then(m => m.CreateCourseComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./pages/edit-course/edit-course.component').then(m => m.EditCourseComponent)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/course-details/course-details.component').then(m => m.CourseDetailsComponent)
  }
];