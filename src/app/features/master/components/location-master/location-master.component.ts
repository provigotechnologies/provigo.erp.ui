import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-location-master',
  standalone: true,
  imports: [FormsModule, CommonModule],  // <-- Add CommonModule here
  templateUrl: './location-master.component.html',
  styleUrls: [
    './location-master.component.css',
    '../style.css' 
  ]
})
export class LocationMasterComponent {
  locationName = '';
  error = '';
  locationList: string[] = [];

  addTable() {
    if (!this.locationName.trim()) {
      this.error = 'Location name is required';
      return;
    }

    this.locationList.push(this.locationName.trim());
    this.locationName = '';
    this.error = '';
  }

  cancel() {
    this.locationName = '';
    this.error = '';
  }

  editTable(index: number) {
    this.locationName = this.locationList[index];
    this.locationList.splice(index, 1);
  }

  deleteTable(index: number) {
    this.locationList.splice(index, 1);
  }
}




