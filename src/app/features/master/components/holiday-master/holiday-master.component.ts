import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-holiday-master',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './holiday-master.component.html',
  styleUrls: ['./holiday-master.component.css', '../../../styles/masters-style.css']
})
export class HolidayMasterComponent {
  @Output() close = new EventEmitter<void>();

  holidayName = '';
  error = '';
  holidayList: string[] = [];

  addTable() {
    const trimmedName = this.holidayName.trim();

    if (!trimmedName) {
      this.error = 'Holiday name is required';
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      this.error = 'Only letters and spaces allowed';
      return;
    }

    const isDuplicate = this.holidayList.some(
      name => name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      this.error = 'Holiday name already exists';
      return;
    }

    this.holidayList.push(trimmedName);
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
    this.error = '';
  }

  deleteTable(index: number) {
    this.holidayList.splice(index, 1);
  }

  closeComponent() {
    this.close.emit();
  }
}
