import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Import BillingComponent here
import { BillingSettingsComponent } from '../billing-settings/billing-settings.component';
import { GeneralSettingsComponent } from '../general-settings/general-settings.component';
import { CompanyProfileComponent } from '../company-profile/company-profile.component';
import { TaxationSettingsComponent } from '../taxation-settings/taxation-settings.component';
import { DocumentSequencesComponent } from '../document-sequences/document-sequences.component';
import { PrintingSettingsComponent } from '../printing-settings/printing-settings.component';
import {WalletComponent} from '../wallet/wallet.component';
import { EmailManagementComponent } from '../email-management/email-management.component';
import { BiometricManagementComponent } from '../biometric-management/biometric-management.component';
import { UserManagementComponent } from '../user-management/user-management.component';
import { BackupSettingsComponent } from '../backup-settings/backup-settings.component';
import { ResetDataComponent } from '../reset-data/reset-data.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, CommonModule,   RouterModule,
    CompanyProfileComponent, 
    GeneralSettingsComponent, 
    BillingSettingsComponent, 
    TaxationSettingsComponent,
    DocumentSequencesComponent,
    PrintingSettingsComponent,
    WalletComponent,
    EmailManagementComponent,
    BiometricManagementComponent,
    UserManagementComponent,
    BackupSettingsComponent,
    ResetDataComponent
  ],  
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  activeSetting: string = 'general';

  setActive(setting: string) {
    this.activeSetting = setting;
  }
}
