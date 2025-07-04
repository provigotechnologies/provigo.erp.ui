import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-taxation', 
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './taxation-settings.component.html',
 styleUrls: [
    './taxation-settings.component.css',
    '../../../styles/settings-style.css'
  ]
})
export class TaxationSettingsComponent {}
