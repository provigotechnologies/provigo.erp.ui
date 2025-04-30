import { Component, OnInit, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  time: string = new Date().toLocaleTimeString();
  today: string = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  menuOpen: boolean = false;
  activeSubMenu: string | null = null;
  activeNestedSubMenu: string | null = null;
  activeInnerSubMenu: string | null = null;
  isMobile: boolean = false;

  constructor(private router: Router) {
    this.checkScreenSize();

    // ✅ Auto-close sidebar on route change (mobile only)
    this.router.events
  .pipe(filter(event => event instanceof NavigationEnd))
  .subscribe(() => {
    if (this.isMobile && this.menuOpen) {
      // ✅ Close sidebar ONLY if route actually changed AND it's open
      setTimeout(() => {
        this.menuOpen = false;
        this.activeSubMenu = null;
        this.activeNestedSubMenu = null;
      }, 100); // slight delay ensures submenu toggles don't conflict
    }
  });

  }

  ngOnInit(): void {
    this.checkScreenSize();

    // ✅ Ensure sidebar state on load
    this.menuOpen = !this.isMobile;

    // ✅ Live time clock update
    setInterval(() => {
      this.time = new Date().toLocaleTimeString();
    }, 1000);
  }

  // ✅ Hamburger toggle
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  // ✅ First-level submenu toggle
  toggleSubMenu(menu: string): void {
    if (this.activeSubMenu === menu) {
      this.activeSubMenu = null;
      this.activeNestedSubMenu = null;
    } else {
      this.activeSubMenu = menu;
      this.activeNestedSubMenu = null;
    }
  }

  // ✅ Nested submenu toggle
  toggleNestedSubMenu(menu: string): void {
    this.activeNestedSubMenu = this.activeNestedSubMenu === menu ? null : menu;
  }

  toggleInnerSubMenu(menu: string): void {
    this.activeInnerSubMenu = this.activeInnerSubMenu === menu ? null : menu;
  }
  
  // ✅ Detect screen size change
  @HostListener('window:resize')
  onWindowResize(): void {
    const wasMobile = this.isMobile;
    this.checkScreenSize();

    if (!wasMobile && this.isMobile) {
      // 📱 Switched to mobile → hide sidebar
      this.menuOpen = false;
      this.activeSubMenu = null;
      this.activeNestedSubMenu = null;
    }

    if (wasMobile && !this.isMobile) {
      // 🖥️ Switched to desktop → show sidebar
      this.menuOpen = true;
    }
  }

  // ✅ Detect click outside to close sidebar (mobile only)
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isMobile && this.menuOpen) {
      const sidebar = document.querySelector('.sidebar');
      const toggleBtn = document.querySelector('.menu-toggle');

      const clickedInsideSidebar = sidebar?.contains(event.target as Node);
      const clickedToggleBtn = toggleBtn?.contains(event.target as Node);

      if (!clickedInsideSidebar && !clickedToggleBtn) {
        this.menuOpen = false;
        this.activeSubMenu = null;
        this.activeNestedSubMenu = null;
      }
    }
  }

  // ✅ Check screen size
  private checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
  }
}
