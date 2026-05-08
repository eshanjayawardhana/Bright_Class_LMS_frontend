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
import { MENU_ITEMS, MenuItem } from '../../core/constants/menu.config';

import { EnrollmentService } from '../../features/enrollment/services/enrollment.service';
import { PaymentService } from '../../features/payment/services/payment.service';
import { CountService } from '../../core/services/count.service';

interface MenuGroup {
  section: string;
  items: MenuItem[];
}

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

  private enrollmentService = inject(EnrollmentService);
  private paymentService = inject(PaymentService);

  private routerSub!: Subscription;
  private countService = inject(CountService);

  menuGroups: MenuGroup[] = [];

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

  get userRole() {
    const role = this.userService.getRole();
    if (!role) return 'Unknown Role';

    // Convert 'ADMIN' to 'Admin', 'STUDENT' to 'Student'
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }

  /* HEADER */
  currentPageTitle = 'Dashboard';
  notifCount = 3;

  pendingEnrollmentsCount = 0;
  pendingPaymentsCount = 0;
  private countSub!: Subscription;

  ngOnInit(): void {
    this.layout.sidebarOpen = window.innerWidth >= 1024;

    this.routerSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        const url = e.urlAfterRedirects;

        const match = Object.keys(PAGE_TITLES).find((k) => url.startsWith(k));

        this.currentPageTitle = match ? PAGE_TITLES[match] : 'BrightClass';

        this.layout.mobileMenuOpen = false;
      });

    this.buildMenu();

    this.countSub = this.countService.enrollmentCount$.subscribe(
      (count) => (this.pendingEnrollmentsCount = count),
    );

    this.countSub.add(
      this.countService.paymentCount$.subscribe(
        (count) => (this.pendingPaymentsCount = count),
      ),
    );
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    this.countSub?.unsubscribe();
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

  private buildMenu() {
    const role = this.userService.getRole(); // logged in user's role

    // role related filtering of menu items
    const filtered = MENU_ITEMS.filter((item) => item.roles.includes(role));

    // make a map of section -> items
    const groupsMap = new Map<string, MenuItem[]>();

    filtered.forEach((item) => {
      if (!groupsMap.has(item.section)) {
        groupsMap.set(item.section, []);
      }
      groupsMap.get(item.section)!.push(item);
    });

    // convert to array of { section, items }
    this.menuGroups = Array.from(groupsMap.entries()).map(
      ([section, items]) => ({
        section,
        items,
      }),
    );
  }

  getBadgeCount(label: string): number {
    if (label === 'Enrollments') return this.pendingEnrollmentsCount;
    if (label === 'Payments') return this.pendingPaymentsCount;
    return 0;
  }
}
