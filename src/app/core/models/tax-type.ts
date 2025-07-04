export class TaxType {
    taxTypeId!: number;
    taxName!: string;
  
    constructor(taxTypeId: number, taxName: string) {
      this.taxTypeId = taxTypeId;
      this.taxName = taxName;
    }
  }
  