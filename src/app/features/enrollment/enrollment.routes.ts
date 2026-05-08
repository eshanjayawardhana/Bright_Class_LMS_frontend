import { Routes } from '@angular/router';

export const ENROLLMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/enrollment-list/enrollment-list.component').then(
        (m) => m.EnrollmentListComponent,
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/enrollment-details/enrollment-details.component').then(
        (m) => m.EnrollmentDetailsComponent,
      ),
  },
];
