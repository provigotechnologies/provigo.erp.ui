import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BankNameComponent } from '../../features/master/components/bankname/bankname.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  activeTab: string = 'sales';

  constructor(public dialog: MatDialog) {}

  openBankNameDialog(): void {
    const dialogRef = this.dialog.open(BankNameComponent, {
      width: '500px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
