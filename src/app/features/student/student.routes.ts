import { Routes } from '@angular/router';

export const STUDENT_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/student-dashboard/student-dashboard.component').then(
        (m) => m.StudentDashboardComponent
      ),
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./pages/my-courses/my-courses.component').then(
        (m) => m.MyCoursesComponent
      ),
  },
  {
    path: 'courses/:id',
    loadComponent: () =>
      import('./pages/course-learning/course-learning.component').then(
        (m) => m.CourseLearningComponent
      ),
  }
];