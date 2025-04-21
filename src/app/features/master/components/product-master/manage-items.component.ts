import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-manage-items',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-items.component.html',
  styleUrls: [
    './manage-items.component.css',
    '../../../styles/mastermanage-style.css'    ]
})
export class ManageItemsComponent {

}
