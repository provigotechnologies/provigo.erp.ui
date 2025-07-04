export class ProductType {
    prdTypeId!: number;
    productType: string = "General";
    value!: boolean;
  
    constructor(prdTypeId: number, productType: string = "General", value: boolean) {
      this.prdTypeId = prdTypeId;
      this.productType = productType;
      this.value = value;
    }
  }
  