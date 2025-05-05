import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unit-master',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unit-master.component.html',
  styleUrls: [
    './unit-master.component.css',
    '../../../styles/masters-style.css'   ]
})
export class UnitMasterComponent {
  @Output() close = new EventEmitter<void>();

  unitName = '';
  error = '';
  unitList: string[] = [];

  addTable() {
    const trimmedName = this.unitName.trim();

    if (!trimmedName) {
      this.error = 'Unit name is required';
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      this.error = 'Only letters and spaces allowed';
      return;
    }

    const isDuplicate = this.unitList.some(
      name => name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      this.error = 'Unit name already exists';
      return;
    }

    this.unitList.push(trimmedName);
    this.unitName = '';
    this.error = '';
  }

  cancel() {
    this.unitName = '';
    this.error = '';
  }

  editTable(index: number) {
    this.unitName = this.unitList[index];
    this.unitList.splice(index, 1);
    this.error = '';
  }

  deleteTable(index: number) {
    this.unitList.splice(index, 1);
  }

  closeComponent() {
    this.close.emit();
  }
}
