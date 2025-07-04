export class DiscountType {
    distTypeId!: number;
    discountType: string;
    value!: boolean;
  
    constructor(distTypeId: number, discountType: string, value: boolean) {
      this.distTypeId = distTypeId;
      this.discountType = discountType;
      this.value = value;
    }
  }