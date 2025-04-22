
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-manage-debitnote',

  standalone: true,
  imports: [FormsModule, CommonModule], 
   templateUrl: './manage-debitnote.component.html',
  styleUrls: [
    './manage-debitnote.component.css',
    '../../../../styles/salesmanage-style.css'
  ]})
export class ManageDebitnoteComponent {

}

