import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { UserService } from '../../services/user.service';
import { ToastService } from '../../../../core/services/toast.service';
import { CreateLecturerFormComponent } from '../../components/create-lecturer-form/create-lecturer-form.component';

@Component({
  selector: 'app-create-instructor',
  standalone: true,
  imports: [CommonModule, MatIconModule, CreateLecturerFormComponent],
  templateUrl: './create-instructor.component.html',
  styleUrls: ['./create-instructor.component.scss'],
})
export class CreateInstructorComponent {
  private userService = inject(UserService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  isSaving = false;

  handleFormSubmit(formData: any): void {
    this.isSaving = true;

    this.userService.createLecturer(formData).subscribe({
      next: () => {
        this.isSaving = false;
        this.toastService.success('Lecturer account created successfully!');
        this.router.navigate(['/admin/users']);
      },
      error: (err) => {
        this.isSaving = false;
        // The interceptor usually handles error toasts, but we stop the spinner here
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/users']);
  }
}
