import { Routes } from '@angular/router';

export const PAYMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/payment-list/payment-list.component').then(m => m.PaymentListComponent)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/payment-details/payment-details.component').then(m => m.PaymentDetailsComponent)
  }
];