import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ Import this


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  time = new Date().toLocaleTimeString();
  today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  activeSubMenu: string | null = null;
  nestedActiveSubMenu: string | null = null;

  toggleSubMenu(menu: string) {
    this.activeSubMenu = this.activeSubMenu === menu ? null : menu;

    // Optional: Reset nested submenu if main menu changes
    this.nestedActiveSubMenu = null;
  }

  toggleNestedSubMenu(submenu: string) {
    this.nestedActiveSubMenu = this.nestedActiveSubMenu === submenu ? null : submenu;
  }

  constructor() {
    //console.log('testing');
    // setInterval(() => {
    //   this.time = new Date().toLocaleTimeString();
    // }, 1000);
  }
}
