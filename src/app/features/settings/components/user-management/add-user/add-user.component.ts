import { Component, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user',
  standalone: true, // ✅ Mark as standalone
  imports: [FormsModule, CommonModule, RouterModule], // ✅ Add RouterModule
  templateUrl: './add-user.component.html',
  styleUrls: [
    './add-user.component.css'
  ]
})
export class AddUserComponent {

@Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit(); // This triggers the parent component to run closeTool()
  }
}
