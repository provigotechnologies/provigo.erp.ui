
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-group-master',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './group-master.component.html',
  styleUrls: ['./group-master.component.css']
})
export class GroupMasterComponent {
  groupName = '';
  error = '';
  groupList: string[] = [];

  addTable() {
    if (!this.groupName.trim()) {
      this.error = 'Warehouse name is required';
      return;
    }

    this.groupList.push(this.groupName.trim());
    this.groupName = '';
    this.error = '';
  }

  cancel() {
    this.groupName = '';
    this.error = '';
  }

  editTable(index: number) {
    this.groupName = this.groupList[index];
    this.groupList.splice(index, 1);
  }

  deleteTable(index: number) {
    this.groupList.splice(index, 1);
  }
}
