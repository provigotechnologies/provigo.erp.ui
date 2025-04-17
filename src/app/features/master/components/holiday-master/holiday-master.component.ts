import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-holiday-master',
  standalone: true,
  imports: [FormsModule, CommonModule],  // <-- Add CommonModule here
  templateUrl: './holiday-master.component.html',
  styleUrls: [
    './holiday-master.component.css',
    '../style.css' 
  ]
})
export class HolidayMasterComponent {
  holidayName = '';
  error = '';
  holidayList: string[] = [];

  addTable() {
    if (!this.holidayName.trim()) {
      this.error = 'Holiday name is required';
      return;
    }

    this.holidayList.push(this.holidayName.trim());
    this.holidayName = '';
    this.error = '';
  }

  cancel() {
    this.holidayName = '';
    this.error = '';
  }

  editTable(index: number) {
    this.holidayName = this.holidayList[index];
    this.holidayList.splice(index, 1);
  }

  deleteTable(index: number) {
    this.holidayList.splice(index, 1);
  }
}



