import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-billing', 
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './billing-settings.component.html',
 styleUrls: [
    './billing-settings.component.css',
    '../../../styles/settings-style.css'
  ]
})
export class BillingSettingsComponent {}
