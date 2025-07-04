export class PaymentType {
    payTypeId!: number;
    paymentType!: string;
  
    constructor(payTypeId: number, paymentType: string) {
      this.payTypeId = payTypeId;
      this.paymentType = paymentType;
    }
  }
  