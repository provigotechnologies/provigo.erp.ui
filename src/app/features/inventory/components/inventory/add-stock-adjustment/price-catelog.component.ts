import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-price-catelog',
  templateUrl: './price-catelog.component.html',
  styleUrls: ['./price-catelog.component.css']
})
export class PriceCatelogComponent {

  constructor(public dialogRef: MatDialogRef<PriceCatelogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
