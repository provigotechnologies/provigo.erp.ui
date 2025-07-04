import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-general', 
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './general-settings.component.html',
 styleUrls: [
    './general-settings.component.css',
    '../../../../styles/settings-style.css'
  ]
})
export class GeneralSettingsComponent {}
