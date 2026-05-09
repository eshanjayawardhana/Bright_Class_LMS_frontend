import { Routes } from '@angular/router';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/user-list/user-list.component').then(m => m.UserListComponent)
  },
  {
    path: 'create-lecturer',
    loadComponent: () => import('./pages/create-instructor/create-instructor.component').then(m => m.CreateInstructorComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/user-details/user-details.component').then(m => m.UserDetailsComponent)
  }
];