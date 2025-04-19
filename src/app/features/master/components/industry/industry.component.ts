import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-industry',
  standalone: true,
  imports: [FormsModule, CommonModule],  // <-- Add CommonModule here
  templateUrl: './industry.component.html',
  styleUrls: [
    './industry.component.css',
    '../style.css' 
  ]
})
export class IndustryComponent {
  industryName = '';
  error = '';
  industryList: string[] = [];

  addTable() {
    if (!this.industryName.trim()) {
      this.error = 'Industry name is required';
      return;
    }

    this.industryList.push(this.industryName.trim());
    this.industryName = '';
    this.error = '';
  }

  cancel() {
    this.industryName = '';
    this.error = '';
  }

  editTable(index: number) {
    this.industryName = this.industryList[index];
    this.industryList.splice(index, 1);
  }

  deleteTable(index: number) {
    this.industryList.splice(index, 1);
  }
}
