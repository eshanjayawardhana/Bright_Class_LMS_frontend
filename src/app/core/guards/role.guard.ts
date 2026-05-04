import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const userService = inject(UserService);
    const role = userService.getRole();
    // const role = localStorage.getItem('userRole');

    if (role && allowedRoles.includes(role)) {
      return true;
    }

    router.navigate(['/login']);
    return false;
  };
};