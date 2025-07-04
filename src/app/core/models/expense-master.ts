export class ExpenseMaster {
    expenseMasterId!: number;
    expenseName!: string;
    createdAt!: Date;
    updatedAt!: Date;
  
    constructor(
      expenseMasterId: number,
      expenseName: string,
      createdAt: Date,
      updatedAt: Date
    ) {
      this.expenseMasterId = expenseMasterId;
      this.expenseName = expenseName;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  