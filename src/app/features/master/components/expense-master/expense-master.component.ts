import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-expense-master',
  standalone: true,
  imports: [FormsModule, CommonModule],  // <-- Add CommonModule here
  templateUrl: './expense-master.component.html',
  styleUrls: [
    './expense-master.component.css',
    '../../../styles/masters-style.css'   ]
})
export class ExpenseMasterComponent {
  expenseName = '';
  error = '';
  expenseList: string[] = [];

  addTable() {
    if (!this.expenseName.trim()) {
      this.error = 'Expense name is required';
      return;
    }

    this.expenseList.push(this.expenseName.trim());
    this.expenseName = '';
    this.error = '';
  }

  cancel() {
    this.expenseName = '';
    this.error = '';
  }

  editTable(index: number) {
    this.expenseName = this.expenseList[index];
    this.expenseList.splice(index, 1);
  }

  deleteTable(index: number) {
    this.expenseList.splice(index, 1);
  }
}
