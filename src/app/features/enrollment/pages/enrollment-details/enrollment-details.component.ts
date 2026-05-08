import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { EnrollmentService } from '../../services/enrollment.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Enrollment } from '../../models/enrollment.model';
import { EnrollmentStatusChipComponent } from '../../components/enrollment-status-chip/enrollment-status-chip.component';

@Component({
  selector: 'app-enrollment-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, EnrollmentStatusChipComponent],
  templateUrl: './enrollment-details.component.html',
  styleUrls: ['./enrollment-details.component.scss'],
})
export class EnrollmentDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private enrollmentService = inject(EnrollmentService);
  private toastService = inject(ToastService);

  enrollment: Enrollment | null = null;
  isLoading = true;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.loadEnrollment(Number(idParam));
    } else {
      this.toastService.error('Invalid Enrollment ID');
      this.goBack();
    }
  }

  loadEnrollment(id: number): void {
    this.isLoading = true;
    this.enrollmentService.getEnrollmentById(id).subscribe({
      next: (res) => {
        this.enrollment = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.goBack();
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/enrollment']);
  }
}
