import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { UserService } from '../../services/user.service';
import { ToastService } from '../../../../core/services/toast.service';
import { User } from '../../models/user.model';
import { UserRoleChipComponent } from '../../components/user-role-chip/user-role-chip.component';
import { UserStatusChipComponent } from '../../components/user-status-chip/user-status-chip.component';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    UserRoleChipComponent,
    UserStatusChipComponent,
  ],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  private toastService = inject(ToastService);

  user: User | null = null;
  isLoading = true;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.loadUser(Number(idParam));
    } else {
      this.toastService.error('Invalid User ID');
      this.goBack();
    }
  }

  loadUser(id: number): void {
    this.isLoading = true;
    this.userService.getUserById(id).subscribe({
      next: (res) => {
        this.user = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.toastService.error('Failed to load user details.');
        this.goBack();
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/users']);
  }
}
