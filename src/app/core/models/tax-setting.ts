export class TaxSetting {
  taxSettingId!: number;
  productId!: number;
  groupId!: number;

  cgst!: number;
  sgst!: number;
  igst!: number;
  cess!: number;

  createdAt!: Date;
  updatedAt!: Date;

  product?: any; // You can replace `any` with a specific type if needed
  group?: any;   // You can replace `any` with a specific type if needed

  constructor(
    taxSettingId: number,
    productId: number,
    groupId: number,
    cgst: number,
    sgst: number,
    igst: number,
    cess: number,
    createdAt: Date,
    updatedAt: Date,
    product?: any,
    group?: any
  ) {
    this.taxSettingId = taxSettingId;
    this.productId = productId;
    this.groupId = groupId;
    this.cgst = cgst;
    this.sgst = sgst;
    this.igst = igst;
    this.cess = cess;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.product = product;
    this.group = group;
  }
}
