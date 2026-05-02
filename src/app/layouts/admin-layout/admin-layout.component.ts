import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  inject,
} from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { filter, Subscription } from 'rxjs';

import { LayoutService } from '../../core/services/layout.service';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { PAGE_TITLES } from '../../core/constants/page-titles';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  imports: [CommonModule, RouterModule, MatIconModule],
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  private router = inject(Router);
  private layout = inject(LayoutService);
  private authService = inject(AuthService);
  private userService = inject(UserService);

  private routerSub!: Subscription;

  /* UI STATE (FROM SERVICE) */
  get sidebarOpen() {
    return this.layout.sidebarOpen;
  }

  get mobileMenuOpen() {
    return this.layout.mobileMenuOpen;
  }

  /* USER DATA (FROM SERVICE) */
  get userEmail() {
    return this.userService.getEmail();
  }

  get userName() {
    return this.userService.getUserName();
  }

  get userDisplayName() {
    return this.userService.getDisplayName();
  }

  get userInitials() {
    return this.userService.getInitials();
  }

  /* HEADER */
  currentPageTitle = 'Dashboard';
  notifCount = 3;
  pendingCount = 12;

  ngOnInit(): void {

    this.layout.sidebarOpen = window.innerWidth >= 1024;

    this.routerSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => {

        const url = e.urlAfterRedirects;

        const match = Object.keys(PAGE_TITLES).find(k =>
          url.startsWith(k)
        );

        this.currentPageTitle = match
          ? PAGE_TITLES[match]
          : 'BrightClass';

        this.layout.mobileMenuOpen = false;
      });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  /* SIDEBAR ACTIONS */
  toggleSidebar() {
    this.layout.toggleSidebar(window.innerWidth);
  }

  openMobileMenu() {
    this.layout.openMobileMenu();
  }

  closeMobileMenu() {
    this.layout.closeMobileMenu();
  }

  onNavClick() {
    if (window.innerWidth <= 768) {
      this.layout.mobileMenuOpen = false;
    }
  }

  /* USER MENU */
  userMenuOpen = false;

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-chip')) {
      this.userMenuOpen = false;
    }
  }

  /* RESPONSIVE */
  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768) {
      this.layout.mobileMenuOpen = false;
    }
  }

  /* AUTH */
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}