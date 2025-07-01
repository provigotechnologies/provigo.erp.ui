import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '../../../../../core/services/auth.service';
import { UserService } from '../../../../../core/services/user.service';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';
import { SettingsService } from '../../../../../core/services/settings.service';
import { SettingAccess } from '../../../../../shared/interface/setting-access';
import { BaseAccess } from '../../../../../shared/interface/base-access';
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
  userAccessData: any = {};

  moduleData: { [key: string]: { id: number; name: string; view?: boolean; add?: boolean; modify?: boolean; delete?: boolean; enable?: boolean }[] } = {};

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
   

  isAdmin: boolean = false;
  isReadOnly: boolean = false;
  isActive: boolean = false;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ManagementToolComponent>,
    private SettingsService: SettingsService
  ) {}

  ngOnInit() {
    this.authService.getAllUsers().subscribe({
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
      alert(JSON.stringify(response))
      if(response.statusCode == 200)
      {
        alert('All access rights saved successfully!');
      }
      else{
        alert("failed to save access user rights")
      }
    },
    error: (err) => {
      console.error('Save failed:', err);
      alert('Failed to save access rights.');
    }
    
  });

}



}
