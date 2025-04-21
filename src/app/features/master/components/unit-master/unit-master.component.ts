import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-unit-master',
  standalone: true,
  imports: [FormsModule, CommonModule],  // <-- Add CommonModule here
  templateUrl: './unit-master.component.html',
  styleUrls: [
    './unit-master.component.css',
    '../../../styles/masters-style.css'   ]
})
export class UnitMasterComponent {
  unitName = '';
  error = '';
  unitList: string[] = [];

  addTable() {
    if (!this.unitName.trim()) {
      this.error = 'Unit name is required';
      return;
    }

    this.unitList.push(this.unitName.trim());
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
  }

  deleteTable(index: number) {
    this.unitList.splice(index, 1);
  }
}
