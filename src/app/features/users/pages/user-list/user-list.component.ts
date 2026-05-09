import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { UserService } from '../../services/user.service';
import { ToastService } from '../../../../core/services/toast.service';
import { User } from '../../models/user.model';
import { Role } from '../../models/role.type';
import { UserStatus } from '../../models/user-status.type';
import { UserRoleChipComponent } from '../../components/user-role-chip/user-role-chip.component';
import { UserStatusChipComponent } from '../../components/user-status-chip/user-status-chip.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    UserRoleChipComponent,
    UserStatusChipComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  users: User[] = [];
  loading = true;

  searchTerm = '';
  selectedRole: Role | '' = '';
  selectedStatus: UserStatus | '' = '';
  totalUsers = 0;

  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  ngOnInit(): void {
    this.loadUsers();

    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.loadUsers();
      });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  loadUsers(): void {
    this.loading = true;
    this.userService
      .getAllUsers({
        search: this.searchTerm,
        role: this.selectedRole,
        status: this.selectedStatus,
      })
      .subscribe({
        next: (res) => {
          this.users = res;
          this.totalUsers = res.length;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.toastService.error('Failed to load users');
        },
      });
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchTerm);
  }

  onFilterChange(): void {
    this.loadUsers();
  }

  viewUser(id: number): void {
    this.router.navigate([`/admin/users/${id}`]);
  }

  createLecturer(): void {
    this.router.navigate(['/admin/users/create-lecturer']);
  }
}
