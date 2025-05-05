import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-master',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-master.component.html',
  styleUrls: ['./expense-master.component.css', '../../../styles/masters-style.css']
})
export class ExpenseMasterComponent {
  @Output() close = new EventEmitter<void>();

  expenseName = '';
  error = '';
  expenseList: string[] = [];

  addTable() {
    const trimmedName = this.expenseName.trim();

    if (!trimmedName) {
      this.error = 'Expense name is required';
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      this.error = 'Only letters and spaces allowed';
      return;
    }

    const isDuplicate = this.expenseList.some(
      name => name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      this.error = 'Expense name already exists';
      return;
    }

    this.expenseList.push(trimmedName);
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
    this.error = '';
  }

  deleteTable(index: number) {
    this.expenseList.splice(index, 1);
  }

  closeComponent() {
    this.close.emit();
  }
}
