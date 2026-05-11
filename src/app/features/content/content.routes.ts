import { Routes } from '@angular/router';

export const CONTENT_ROUTES: Routes = [
  {
    path: ':courseId',
    loadComponent: () => import('./pages/content-list/content-list.component').then(m => m.ContentListComponent)
  },
  {
    path: ':courseId/add',
    loadComponent: () => import('./pages/upload-content/upload-content.component').then(m => m.UploadContentComponent)
  }
];