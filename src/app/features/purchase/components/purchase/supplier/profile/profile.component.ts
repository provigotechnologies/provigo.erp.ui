import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  activeTab: string = 'profile'; // Default active tab is 'profile'

  setActiveTab(tab: string) {
    this.activeTab = tab; // Update the active tab when clicked
  }
}
