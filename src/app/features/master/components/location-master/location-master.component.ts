import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location-master',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './location-master.component.html',
  styleUrls: [
    './location-master.component.css',
    '../../../styles/masters-style.css'   ]
})
export class LocationMasterComponent {
  @Output() close = new EventEmitter<void>();

  locationName = '';
  error = '';
  locationList: string[] = [];

  addTable() {
    const trimmedName = this.locationName.trim();

    if (!trimmedName) {
      this.error = 'Location name is required';
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      this.error = 'Only letters and spaces allowed';
      return;
    }

    const isDuplicate = this.locationList.some(
      name => name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      this.error = 'Location name already exists';
      return;
    }

    this.locationList.push(trimmedName);
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
    this.error = '';
  }

  deleteTable(index: number) {
    this.locationList.splice(index, 1);
  }

  closeComponent() {
    this.close.emit();
  }
}
