import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-designation-master',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './designation-master.component.html',
  styleUrls: ['./designation-master.component.css', '../../../styles/masters-style.css']
})
export class DesignationMasterComponent {
  @Output() close = new EventEmitter<void>();

  designationName = '';
  error = '';
  designationList: string[] = [];

  addTable() {
    const trimmedName = this.designationName.trim();

    if (!trimmedName) {
      this.error = 'Designation name is required';
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      this.error = 'Only letters and spaces allowed';
      return;
    }

    const isDuplicate = this.designationList.some(
      name => name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      this.error = 'Designation name already exists';
      return;
    }

    this.designationList.push(trimmedName);
    this.designationName = '';
    this.error = '';
  }

  cancel() {
    this.designationName = '';
    this.error = '';
  }

  editTable(index: number) {
    this.designationName = this.designationList[index];
    this.designationList.splice(index, 1);
    this.error = '';
  }

  deleteTable(index: number) {
    this.designationList.splice(index, 1);
  }

  closeComponent() {
    this.close.emit();
  }
}
