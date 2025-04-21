import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-designation-master',
  standalone: true,
  imports: [FormsModule, CommonModule],  
  templateUrl: './designation-master.component.html',
  styleUrls: [
    './designation-master.component.css',
    '../../../styles/masters-style.css'   ]
})
export class DesignationMasterComponent {
  designationName = '';
  error = '';
  designationList: string[] = [];

  addTable() {
    if (!this.designationName.trim()) {
      this.error = 'Brand name is required';
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

