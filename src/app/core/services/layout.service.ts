import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  sidebarOpen = true;
  mobileMenuOpen = false;

  toggleSidebar(screenWidth: number) {
    if (screenWidth <= 768) {
      this.mobileMenuOpen = true;
    } else {
      this.sidebarOpen = !this.sidebarOpen;
    }
  }

  openMobileMenu(): void {
    this.mobileMenuOpen = true;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}
