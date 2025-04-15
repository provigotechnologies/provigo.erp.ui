import { Component } from '@angular/core';
import { BanknameLocalService } from '../../../../core/local/bankname-local.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bankname',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './bankname.component.html',
  styleUrls: ['./bankname.component.css']
})
export class BankNameComponent {
  bankName: string = '';

  constructor(private bankService: BanknameLocalService) {}

  async addBank() {
    if (this.bankName.trim()) {
      await this.bankService.addBankName({
        bank: this.bankName.trim()  // Trim the input value before adding
      });
      console.log('Bank added:', this.bankName);
      this.bankName = '';  // Clear input after adding
    } else {
      alert('Please enter a bank name.');
    }
  }

  cancel() {
    console.log('Cancel clicked');
    this.bankName = '';
  }

  showAllBanks() {
    const banks = this.bankService.getAllBankNames();
    console.log('📋 All Banks:', banks);
  }
}
