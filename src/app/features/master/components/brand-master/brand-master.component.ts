import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-brand-master',
  standalone: true,
  imports: [FormsModule, CommonModule],  
  templateUrl: './brand-master.component.html',
  styleUrls: [
    './brand-master.component.css',
    '../../../styles/masters-style.css'   ]
})
export class BrandMasterComponent {
  brandName = '';
  error = '';
  brandList: string[] = [];

  addTable() {
    if (!this.brandName.trim()) {
      this.error = 'Brand name is required';
      return;
    }

    this.brandList.push(this.brandName.trim());
    this.brandName = '';
    this.error = '';
  }

  cancel() {
    this.brandName = '';
    this.error = '';
  }

  editTable(index: number) {
    this.brandName = this.brandList[index];
    this.brandList.splice(index, 1);
  }

  deleteTable(index: number) {
    this.brandList.splice(index, 1);
  }
}
