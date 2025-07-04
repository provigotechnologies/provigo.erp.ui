
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-manage-creditnote',

  standalone: true,
  imports: [FormsModule, CommonModule], 
   templateUrl: './manage-creditnote.component.html',
  styleUrls: [
    './manage-creditnote.component.css',
    '../../../../styles/salesmanage-style.css'
  ]})
export class ManageCreditnoteComponent {

}

