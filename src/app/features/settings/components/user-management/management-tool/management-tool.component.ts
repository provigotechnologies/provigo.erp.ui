import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '../../../../../core/services/auth.service';
import { UserService } from '../../../../../core/services/user.service';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';
import { json } from 'node:stream/consumers';

@Component({
  selector: 'app-management-tool',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './management-tool.component.html',
  styleUrls: ['./management-tool.component.css']
})
export class ManagementToolComponent {
  selectedTab: string = 'access';
  showSetPassword: boolean = false;
  selectedModule: string = 'Sale';

  users: any[] = [];

  private _selectedUser: any = null;
  get selectedUser() {
    return this._selectedUser;
  }
  set selectedUser(user: any) {
    this._selectedUser = user;
    this.updateCheckboxStates(user);
  }

changeTab(tab: string) {
  this.selectedTab = tab;

  if (tab === 'access') {
    // Reset Access tab state
    this.selectedUser = null;
    this.selectedModule = 'Sale';
  }
}

  // Module list
  modules: string[] = [
    'Sale',
    'Purchase',
    'Inventory',
    'Staff',
    'Account',
    'Report',
    'Master Config.',
    'Misc'
  ];

  // Module Data
  moduleData: { [key: string]: string[] } = {
    Sale: [
      'Customer',
      'Customer payment',
      'Customer account adjustment / write-off',
      'Customer loan',
      'Manage online store orders',
      'Online store discount coupons',
      'Manage online store item, categories and collections',
      'Manage online store settings',
      'Invoice',
      'Quotation',
      'Proforma invoice',
      'Delivery note',
      'Sale credit note',
      'Sale debit note',
      'Sale order',
      'Sale return'
    ],
    Purchase: [
      'Purchase bill', 
      'Purchase order', 
      'Purchase return', 
      'Purchase debit note',
      'Purchase credit note', 
      'Supplier', 'Supplier payment',
      'Supplier account adjustment'
    ],
    Inventory: ['Stock adjustment', 'Physical stock reconcile', 'Bill of material', 'Assembled good'],
    Staff: [
     'Expense', 
     'Indirect expense',
     'Staff',
     'Staff attendance',
     'Staff payment',
     'Staff account adjustment / write-off',
     'Setup staff salary',
     'Generate staff salary ',
     'Reminder Management'
    ],
    Account: ['Bank book', 'Cash book', 'Loan account', 'Asset account', 'Capital account', 'Other income account', 'Tax payment'],
    Report: [
      'Cash book report',
      'Business book report',
      'Payment paid report',
      'Payment received report',
      'Daily summary report',
      'Input output tax report',
      'Profit loss summary report',
      'Business book report',
      'Chart of accounts report',
      'Balance sheet report',
      'Item register report',
      'Stock summary report',
      'Low level stock report',
      'Stock availability report',
      'Stock adjustment report',
      'Consumable stock report',
      'Fast moving item report',
      'Item not moving report',
      'Available serial report',
      'Item list report',
      'Daily summary report',
      'Sale ageing report',
      'Itemwise sale report',
      'Invoicewise sale report',
      'Invoicewise profit margin report',
      'Itemwise profit margin report',
      'Customerwise profit margin report',
      'Invoicewise sale summary report',
      'Customerwise sale summary report',
      'Itemwise sale summary report',
      'Active recurring report',
      'Customer amount due report',
      'Customer payment history report',
      'Customer account balances report',
      'Purchase ageing report',
      'Billwise purchase report',
      'Itemwise purchase report',
      'Billwise purchase summary report',
      'Itemwise purchase summary report',
      'Supplierwise purchase summary report',
      'Supplier payment history report',
      'Suppplier account balances report',
      'Expense report',
      'Indirect expense report',
      'Staff salary report',
      'Staff commission report',
      'Staff attendance report',
      'Staff payment history report',
      'TCS payable report',
      'TCS receivable report',
      'GSTR 1 report',
      'GSTR 3B report',
      'GST sale compatible report',
      'GST purchase compatible report',
      'GST indirect expense compatible report',
      'Customer ledger report',
      'Supplier ledger report',
      'Staff ledger report',
      'Business analysis report'
    ],
    'Master Config.': [
      'Item master', 
      'Discount schemes master',
      'Brand master',
      'Bank master',
      'Group master',
      'Unit master', 
      'Expense master',
      'Holiday master',
      'Department master',
      'Designation master',
      'Location master',
      'Industry master', 
      'Service master',
      'Table master',
      'Warehouse master'
    ],
    'Misc': [
      'Lock date in all transactions',
      'Allow cloud backup restore',
      'Allow to send SMS manually',
      'Allow to generate and manage e-invoice',
      'Allow to generate and manage e-way bill',
      'Generate barcode',
      'Allow item bulk import',
      'Allow customer bulk import',
      'Disable credit sale'
    ]
  };

  isAdmin: boolean = false;
  isReadOnly: boolean = false;
  isActive: boolean = false;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ManagementToolComponent>
  ) {}

  ngOnInit() {
    this.authService.getActiveUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => console.error('Error:', err)
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  trackByUserId(index: number, user: any): string {
    return user.id;
  }

  onUserChange(user: any) {
    this.selectedUser = user;
    this.selectedModule = 'Sale';
  }

  onModuleClick(module: string) {
    this.selectedModule = module;
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.ngOnInit();
    });
  }

  openUpdateUserDialog(): void {
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
      width: '500px',
      disableClose: true,
      data: { user: this.selectedUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.ngOnInit();
    });
  }

  updateCheckboxStates(user: any): void {
    if (user) {
      this.isActive = user.status?.toLowerCase() === 'active';
      this.isAdmin = user.role?.toLowerCase() === 'admin';
      this.isReadOnly = user.hasOwnProperty('isReadOnly') ? !!user.isReadOnly : false;
    } else {
      this.isActive = false;
      this.isAdmin = false;
      this.isReadOnly = false;
    }
  }

  confirmAndDeleteUser(): void {
    if (!this.selectedUser) return;

    const confirmDelete = confirm(`Are you sure you want to delete user "${this.selectedUser.firstName}"?`);
    if (confirmDelete) {
      this.authService.deleteUser(this.selectedUser.id).subscribe({
        next: () => {
          alert('User deleted successfully.');
          this.users = this.users.filter(user => user.id !== this.selectedUser.id);
          this.selectedUser = null;
          this.isAdmin = false;
          this.isReadOnly = false;
          this.isActive = false;
        },
        error: (err) => {
          console.error('Delete failed:', err);
          alert('Failed to delete user.');
        }
      });
    }
  }
}
