import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { ROLES } from './core/constants/roles';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },

  // Admin Routes
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard([ROLES.ADMIN, ROLES.LECTURER])],
    loadComponent: () =>
      import('./layouts/admin-layout/admin-layout.component').then(
        (m) => m.AdminLayoutComponent,
      ),
    children: [
      // 🔴 Only ADMIN
      {
        path: 'dashboard',
        canActivate: [roleGuard([ROLES.ADMIN])],
        loadComponent: () =>
          import('./features/dashboard/pages/admin-dashboard/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent,
          ),
      },
      {
        path: 'enrollment',
        canActivate: [roleGuard([ROLES.ADMIN])],
        loadChildren: () =>
          import('./features/enrollment/enrollment.routes').then(
            (m) => m.ENROLLMENT_ROUTES,
          ),
      },
      {
        path: 'payments',
        canActivate: [roleGuard([ROLES.ADMIN])],
        loadChildren: () =>
          import('./features/payment/payment.routes').then(
            (m) => m.PAYMENT_ROUTES,
          ),
      },
      {
        path: 'users',
        canActivate: [roleGuard([ROLES.ADMIN])],
        loadChildren: () =>
          import('./features/users/users.routes').then((m) => m.USERS_ROUTES),
      },

      // 🟢 ADMIN and LECTURER
      {
        path: 'courses',
        loadChildren: () =>
          import('./features/courses/courses.routes').then(
            (m) => m.COURSE_ROUTES,
          ),
      },
      {
        path: 'course-content',
        loadChildren: () =>
          import('./features/content/content.routes').then(
            (m) => m.CONTENT_ROUTES,
          ),
      },
    ],
  },

  // Student Routes
  {
    path: 'student',
    canActivate: [authGuard, roleGuard([ROLES.STUDENT])],
    loadComponent: () =>
      import('./layouts/admin-layout/admin-layout.component').then(
        (m) => m.AdminLayoutComponent,
      ),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/student/student.routes').then(
            (m) => m.STUDENT_ROUTES,
          ),
      },
    ],
  },

  // Lecturer Routes
  {
    path: 'lecturer',
    canActivate: [authGuard, roleGuard([ROLES.LECTURER])],
    loadComponent: () =>
      import('./layouts/admin-layout/admin-layout.component').then(
        (m) => m.AdminLayoutComponent,
      ),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/lecturer-dashboard/lecturer-dashboard.component').then(
            (m) => m.LecturerDashboardComponent,
          ),
      },
    ],
  },
  {
    path: 'catalog',
    loadChildren: () =>
      import('./features/catalog/catalog.routes').then((m) => m.CATALOG_ROUTES)
  },

  // Fallback Route
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
