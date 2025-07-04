import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '../../../../../core/services/auth.service';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';
import { SettingsService } from '../../../../../core/services/settings.service';
import { SettingAccess } from '../../../../../shared/interface/setting-access';
import { BaseAccess } from '../../../../../shared/interface/base-access';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

import { json } from 'node:stream/consumers';

@Component({
  selector: 'app-management-tool',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, MatSnackBarModule],
  templateUrl: './management-tool.component.html',
  styleUrls: ['./management-tool.component.css']
})
export class ManagementToolComponent {
  selectedTab: string = 'access';
  selectedModule: string = 'Sale';

  message: string = '';
  showMessage: boolean = false;
  messageClass: string = '';

  showConfirmDelete = false;
  confirmUserId: string | null = null;
  confirmUserName: string = '';

  isAdmin: boolean = false;
  isReadOnly: boolean = false;
  isActive: boolean = false;

  users: any[] = [];
  userAccessData: any = {};
  logs: any[] = [];
  allLogs: any[] = [];

  fromDate: string = '';
  toDate: string = '';


// Call this when needed
showAlert(msg: string, type: 'success' | 'error') {
  this.message = msg;
  this.showMessage = true;
  this.messageClass = type === 'success' ? 'snack-success' : 'snack-error';

  // Auto hide after 3 seconds
  setTimeout(() => {
    this.showMessage = false;
  }, 3000);
}

  moduleData: { [key: string]: { id: number; name: string; view?: boolean; add?: boolean; modify?: boolean; delete?: boolean; enable?: boolean }[] } = {};

  private _selectedUser: any = null;
  get selectedUser() {
    return this._selectedUser;
  }
  set selectedUser(user: any) {
    this._selectedUser = user;
    this.updateCheckboxStates(user);
  }


  // Module list
  modules: string[] = [
    'Sale',
    'Purchase',
    'Inventory',
    'Staff',
    'Account',
    'Report',
    'Master',
    'Misc'
  ];

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ManagementToolComponent>,
    private SettingsService: SettingsService,
    private snackBar: MatSnackBar
  ) {}


ngOnInit() {
  this.authService.getAllUsers().subscribe({
    next: (data) => {
      this.users = data;
    }
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
  this.moduleData = {}; // Important

  this.SettingsService.getUserAccess(user.id).subscribe((access) => {
    this.userAccessData = access;
    this.onModuleClick('Sale'); // Load default module
  });
}


onModuleClick(module: string) {
  this.selectedModule = module;

  // 👇 Skip reload if data already exists (and avoid overwriting user input)
  if (this.moduleData[module]) return;

  this.SettingsService.getModuleSettings(module).subscribe(settings => {
    const accessKey = `${module.toLowerCase()}Access`;
    const accessList = this.userAccessData?.[accessKey] || [];

    this.moduleData[module] = settings.map((item: any) => {
      const access = accessList.find((a: any) => a.settingId === item.id);
      return {
        id: item.id,
        name: item.name,
        view: access?.view ?? false,
        add: access?.add ?? false,
        modify: access?.modify ?? false,
        delete: access?.delete ?? false
      };
    });
  });
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
  if (!this.selectedUser) {
    this.showAlert('⚠️ Please select a user to update.', 'error');
    return;
  }

  const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
    width: '500px',
    disableClose: true,
    data: { user: this.selectedUser }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.ngOnInit(); // Reload users

      setTimeout(() => {
        const updatedUser = this.users.find(u => u.id === this.selectedUser?.id);
        this.selectedUser = updatedUser ?? null;
      }, 100);
    }
  });
}


 updateCheckboxStates(user: any): void {
  if (user) {
    // ✅ Status is a boolean already
    this.isActive = user.status === true;

    // ✅ Role comparison - safe case-insensitive
    this.isAdmin = user.role?.toLowerCase() === 'admin';

    // ✅ Only tick ReadOnly if available
    this.isReadOnly = !!user.isReadOnly;
  } else {
    this.isActive = false;
    this.isAdmin = false;
    this.isReadOnly = false;
  }
}

confirmAndDeleteUser(): void {
  if (!this.selectedUser) return;

  this.confirmUserId = this.selectedUser.id;
  this.confirmUserName = this.selectedUser.firstName;
  this.showConfirmDelete = true;
}

confirmDeleteUser(): void {
  if (!this.confirmUserId) return;

  this.authService.deleteUser(this.confirmUserId).subscribe({
    next: (response) => {
      this.showAlert('✅ User deleted successfully!', 'success');
      this.users = this.users.filter(user => user.id !== this.confirmUserId);
      this.selectedUser = null;
      this.confirmUserId = null;
      this.confirmUserName = '';
      this.showConfirmDelete = false;
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

cancelDeleteUser(): void {
  this.confirmUserId = null;
  this.confirmUserName = '';
  this.showConfirmDelete = false;
}

saveAllAccessRights(): void {
  if (!this.selectedUser) return;

  const now = new Date().toISOString();
  const userId = this.selectedUser.id;

  const sanitizeAccess = (data: any[] = [], accessList: BaseAccess[] = []): BaseAccess[] =>
  data.map(item => {
    const existing = accessList.find(x => x.settingId === item.id);

    return {
      id: existing?.id ?? 0,           // 👈 Use existing ID if present
      userId,
      settingId: item.id,
      view: item.view ?? false,
      add: item.add ?? false,
      modify: item.modify ?? false,
      delete: item.delete ?? false,
      createdAt: existing?.createdAt ?? now,   // Preserve original createdAt
      lastUpdatedAt: now
    };
  });

const access: SettingAccess = {
  saleAccess: sanitizeAccess(this.moduleData['Sale'], this.userAccessData?.saleAccess),
  purchaseAccess: sanitizeAccess(this.moduleData['Purchase'], this.userAccessData?.purchaseAccess),
  inventoryAccess: sanitizeAccess(this.moduleData['Inventory'], this.userAccessData?.inventoryAccess),
  staffAccess: sanitizeAccess(this.moduleData['Staff'], this.userAccessData?.staffAccess),
  accountAccess: sanitizeAccess(this.moduleData['Account'], this.userAccessData?.accountAccess),
  reportAccess: sanitizeAccess(this.moduleData['Report'], this.userAccessData?.reportAccess),
  masterAccess: sanitizeAccess(this.moduleData['Master'], this.userAccessData?.masterAccess),
  miscAccess: sanitizeAccess(this.moduleData['Misc'], this.userAccessData?.miscAccess)
};

  this.SettingsService.saveUserAccess(userId, access).subscribe({
    next: (response) => {
      if(response.statusCode == 200)
      {
        this.showAlert('✅ Access saved successfully!', 'success');
      }
      else{
        this.showAlert('❌ Failed to save access!', 'error');
       }
      }
    });
}

toDatetimeLocal(date: Date): string {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16); // Returns 'yyyy-MM-ddTHH:mm'
}


loadSecurityLogs(): void {
  this.authService.getLogs().subscribe({
    next: (data) => {
      this.allLogs = data.map(log => ({
        ...log,
        eventTime: new Date(log.eventTime)
      }));

      const today = new Date();
      const from = new Date(today.setHours(0, 0, 0, 0));
      const to = new Date(today.setHours(23, 59, 59, 999));

      // Auto fill input fields
      this.fromDate = this.toDatetimeLocal(from);
      this.toDate = this.toDatetimeLocal(to);

      this.logs = this.allLogs.filter(log =>
        log.eventTime >= new Date(this.fromDate) &&
        log.eventTime <= new Date(this.toDate)
      );
    }
  });
}

filterLogs(): void {
  if (!this.fromDate || !this.toDate) return;

  const from = new Date(this.fromDate);
  const to = new Date(this.toDate);
  to.setSeconds(59, 999); // Ensure full range

  this.logs = this.allLogs.filter(log =>
    log.eventTime >= from && log.eventTime <= to
  );
}


// ✅ When switching tab
changeTab(tab: string) {
  this.selectedTab = tab;

  if (tab === 'access') {
    this.selectedUser = null;
    this.selectedModule = 'Sale';
  }

  if(tab === 'log')
  {
     this.loadSecurityLogs();
  }
}
  

}
