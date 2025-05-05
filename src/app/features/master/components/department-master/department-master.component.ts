import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department-master',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './department-master.component.html',
  styleUrls: ['./department-master.component.css', '../../../styles/masters-style.css']
})
export class DepartmentMasterComponent {
  @Output() close = new EventEmitter<void>();

  departmentName = '';
  error = '';
  departmentList: string[] = [];

  addTable() {
    const trimmedName = this.departmentName.trim();

    if (!trimmedName) {
      this.error = 'Department name is required';
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      this.error = 'Only letters and spaces allowed';
      return;
    }

    const isDuplicate = this.departmentList.some(
      name => name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      this.error = 'Department name already exists';
      return;
    }

    this.departmentList.push(trimmedName);
    this.departmentName = '';
    this.error = '';
  }

  cancel() {
    this.departmentName = '';
    this.error = '';
  }

  editTable(index: number) {
    this.departmentName = this.departmentList[index];
    this.departmentList.splice(index, 1);
    this.error = '';
  }

  deleteTable(index: number) {
    this.departmentList.splice(index, 1);
  }

  closeComponent() {
    this.close.emit();
  }
}
