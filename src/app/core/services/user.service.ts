import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getRole() {
    return localStorage.getItem('userRole') || '';
  }

  getEmail(): string {
    return localStorage.getItem('userEmail') || '';
  }

  getUserName(): string {
    return this.getEmail().split('@')[0].replace(/[._]/g, ' ');
  }

  getDisplayName(): string {
    return this.getUserName().split(' ')[0];
  }

  getInitials(): string {
    const parts = this.getUserName().split(' ');
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }
}