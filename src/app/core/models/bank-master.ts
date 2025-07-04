export class BankMaster {
    bankId!: number;
    bankNameId!: number;
    accountName!: string;
    accountNo!: string;
    type!: boolean;           // Assuming this is a boolean type (true/false)
    openingBalance?: number;  // Optional property
    createdAt!: Date;
    updatedAt!: Date;
  
    // Related Object (Optional)
    bankName?: any;  // Replace `any` with the `BankName` model if available
  
    constructor(
      bankId: number,
      bankNameId: number,
      accountName: string,
      accountNo: string,
      type: boolean,
      createdAt: Date,
      updatedAt: Date,
      openingBalance?: number,
      bankName?: any
    ) {
      this.bankId = bankId;
      this.bankNameId = bankNameId;
      this.accountName = accountName;
      this.accountNo = accountNo;
      this.type = type;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.openingBalance = openingBalance;
      this.bankName = bankName;
    }
  }
  