import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-department-master',
  standalone: true,
  imports: [FormsModule, CommonModule],  
  templateUrl: './department-master.component.html',
  styleUrls: [
    './department-master.component.css',
    '../../../styles/masters-style.css'   ]
})
export class DepartmentMasterComponent {
  departmentName = '';
  error = '';
  departmentList: string[] = [];

  addTable() {
    if (!this.departmentName.trim()) {
      this.error = 'Brand name is required';
      return;
    }

    this.departmentList.push(this.departmentName.trim());
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
  }

  deleteTable(index: number) {
    this.departmentList.splice(index, 1);
  }
}
