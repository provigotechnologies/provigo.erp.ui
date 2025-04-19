import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [FormsModule, CommonModule],  // <-- Add CommonModule here
  templateUrl: './warehouse.component.html',
  styleUrls: [
    './warehouse.component.css',
    '../style.css' 
  ]
})
export class WarehouseComponent {
  warehouseName = '';
  error = '';
  warehouseList: string[] = [];

  addTable() {
    if (!this.warehouseName.trim()) {
      this.error = 'Warehouse name is required';
      return;
    }

    this.warehouseList.push(this.warehouseName.trim());
    this.warehouseName = '';
    this.error = '';
  }

  cancel() {
    this.warehouseName = '';
    this.error = '';
  }

  editTable(index: number) {
    this.warehouseName = this.warehouseList[index];
    this.warehouseList.splice(index, 1);
  }

  deleteTable(index: number) {
    this.warehouseList.splice(index, 1);
  }
}
