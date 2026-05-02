import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        canActivate: [roleGuard(['ADMIN'])],
        loadComponent: () =>
          import('./features/dashboard/pages/admin-dashboard/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent,
          ),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
  },
];
