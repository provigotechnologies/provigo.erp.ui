import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-table-master',
  standalone: true,
  imports: [FormsModule, CommonModule],  // <-- Add CommonModule here
  templateUrl: './table-master.component.html',
  styleUrls: [
    './table-master.component.css',
    '../style.css' 
  ]
})
export class TableMasterComponent {
  tableName = '';
  error = '';
  tableList: string[] = [];

  addTable() {
    if (!this.tableName.trim()) {
      this.error = 'Table name is required';
      return;
    }

    this.tableList.push(this.tableName.trim());
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
  }

  deleteTable(index: number) {
    this.tableList.splice(index, 1);
  }
}
