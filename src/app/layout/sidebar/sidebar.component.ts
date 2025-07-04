import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs/operators';

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

  private previousUrl: string | null = null;
  private justNavigated: boolean = false;
  private isBrowserEnv: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowserEnv = isPlatformBrowser(this.platformId);

    if (this.isBrowserEnv) {
      this.checkScreenSize();

      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          if (this.isMobile && this.menuOpen) {
            if (this.previousUrl !== event.urlAfterRedirects) {
              this.justNavigated = true;

              setTimeout(() => {
                this.menuOpen = false;
                this.activeSubMenu = null;
                this.activeNestedSubMenu = null;
                this.justNavigated = false;
              }, 200);
            }
          }
          this.previousUrl = event.urlAfterRedirects;
        });
    }
  }

  ngOnInit(): void {
    if (this.isBrowserEnv) {
      this.checkScreenSize();
      this.menuOpen = !this.isMobile;

      setInterval(() => { 
        this.time = new Date().toLocaleTimeString();
      }, 1000);
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  toggleSubMenu(menu: string): void {
    if (this.justNavigated) return;

    if (this.activeSubMenu === menu) {
      this.activeSubMenu = null;
      this.activeNestedSubMenu = null;
    } else {
      this.activeSubMenu = menu;
      this.activeNestedSubMenu = null;
    }
  }

  toggleNestedSubMenu(menu: string): void {
    if (this.justNavigated) return;
    this.activeNestedSubMenu =
      this.activeNestedSubMenu === menu ? null : menu;
  }

  toggleInnerSubMenu(menu: string): void {
    if (this.justNavigated) return;
    this.activeInnerSubMenu =
      this.activeInnerSubMenu === menu ? null : menu;
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (!this.isBrowserEnv) return;

    const wasMobile = this.isMobile;
    this.checkScreenSize();

    if (!wasMobile && this.isMobile) {
      this.menuOpen = false;
      this.activeSubMenu = null;
      this.activeNestedSubMenu = null;
    }

    if (wasMobile && !this.isMobile) {
      this.menuOpen = true;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isBrowserEnv) return;

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

  private checkScreenSize(): void {
    if (this.isBrowserEnv) {
      this.isMobile = window.innerWidth <= 768;
    }
  }
  
  navigateOrToggle(menu: string, route: string) {
    this.activeSubMenu = menu;
  
    if (this.isMobile) {
      this.menuOpen = false;
      this.activeSubMenu = null;
      this.activeNestedSubMenu = null;
    }
  
    this.router.navigate([route]);
  }
  
  
}
