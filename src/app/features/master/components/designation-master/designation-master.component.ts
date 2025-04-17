import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-designation-master',
  standalone: true,
  imports: [FormsModule, CommonModule],  // <-- Add CommonModule here
  templateUrl: './designation-master.component.html',
  styleUrls: [
    './designation-master.component.css',
    '../style.css' 
  ]
})
export class DesignationMasterComponent {
  designationName = '';
  error = '';
  designationList: string[] = [];

  addTable() {
    if (!this.designationName.trim()) {
      this.error = 'Designation name is required';
      return;
    }

    this.designationList.push(this.designationName.trim());
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
  }

  deleteTable(index: number) {
    this.designationList.splice(index, 1);
  }
}

