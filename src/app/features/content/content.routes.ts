import { Routes } from '@angular/router';
import { EditContentComponent } from './pages/edit-content/edit-content.component';

export const CONTENT_ROUTES: Routes = [
  {
    path: 'edit/:contentId',
    component: EditContentComponent
  },
  {
    path: ':courseId',
    loadComponent: () =>
      import('./pages/content-list/content-list.component').then(
        (m) => m.ContentListComponent,
      ),
  },
  {
    path: ':courseId/add',
    loadComponent: () =>
      import('./pages/upload-content/upload-content.component').then(
        (m) => m.UploadContentComponent,
      ),
  }
];
