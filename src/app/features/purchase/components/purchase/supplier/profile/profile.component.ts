import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true, // if standalone
  imports: [CommonModule], // add CommonModule here
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  selectedTab: string = 'profile';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}