import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((err) => {
      // Extract error message from backend or set default
      const errorMessage = err.error?.message || 'An unexpected error occurred. Please try again.';
      
      // Show global toast notification
      toast.error(errorMessage, 'System Error');
      
      // Rethrow the error so local components can still handle loading states
      return throwError(() => err);
    })
  );
};