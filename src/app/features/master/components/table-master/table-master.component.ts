import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-master',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table-master.component.html',
  styleUrls: [
    './table-master.component.css',
    '../../../styles/masters-style.css'   ]
})
export class TableMasterComponent {
  @Output() close = new EventEmitter<void>();

  tableName = '';
  error = '';
  tableList: string[] = [];

  addTable() {
    const trimmedName = this.tableName.trim();

    if (!trimmedName) {
      this.error = 'Table name is required';
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      this.error = 'Only letters and spaces allowed';
      return;
    }

    const isDuplicate = this.tableList.some(
      name => name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      this.error = 'Table name already exists';
      return;
    }

    this.tableList.push(trimmedName);
    this.tableName = '';
    this.error = '';
  }

  cancel() {
    this.tableName = '';
    this.error = '';
  }

  editTable(index: number) {
    this.tableName = this.tableList[index];
    this.tableList.splice(index, 1);
    this.error = '';
  }

  deleteTable(index: number) {
    this.tableList.splice(index, 1);
  }

  closeComponent() {
    this.close.emit();
  }
}
