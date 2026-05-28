import { ROLES } from './roles';

export interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles: string[];
  badge?: 'pending';
  section: string;
}

export const MENU_ITEMS: MenuItem[] = [
  /* ─── MAIN ─── */
  
  // 🔴 1. Admin's Dashboard
  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: '/admin/dashboard',
    roles: [ROLES.ADMIN],
    section: 'Main'
  },
  // 🔵 2. Lecturer's Dashboard
  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: '/lecturer/dashboard',
    roles: [ROLES.LECTURER],
    section: 'Main'
  },
  // 🟢 3. Student's Dashboard
  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: '/student/dashboard',
    roles: [ROLES.STUDENT],
    section: 'Main'
  },

  {
    label: 'Courses',
    icon: 'auto_stories',
    route: '/admin/courses',
    roles: [ROLES.ADMIN, ROLES.LECTURER],
    section: 'Main'
  },
  {
    label: 'Enrollments',
    icon: 'people',
    route: '/admin/enrollment',
    roles: [ROLES.ADMIN],
    badge: 'pending',
    section: 'Main'
  },
  {
    label: 'Payments',
    icon: 'payments',
    route: '/admin/payments',
    roles: [ROLES.ADMIN],
    section: 'Main'
  },

  /* ─── MANAGE ─── */
  {
    label: 'Users',
    icon: 'manage_accounts',
    route: '/admin/users',
    roles: [ROLES.ADMIN],
    section: 'Manage'
  },
  {
    label: 'Reports',
    icon: 'bar_chart',
    route: '/admin/reports',
    roles: [ROLES.ADMIN],
    section: 'Manage'
  },
  {
    label: 'Settings',
    icon: 'settings',
    route: '/admin/settings',
    roles: [ROLES.ADMIN, ROLES.LECTURER, ROLES.STUDENT],
    section: 'Manage'
  }
];