export class BankName {
    bankNameId!: number;
    bank!: string;
  
    constructor(bankNameId: number, bank: string) {
      this.bankNameId = bankNameId;
      this.bank = bank;
    }
  }
  