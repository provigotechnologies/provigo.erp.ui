export class BrandMaster {
  brandId!: number;
  brandName!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(
    brandId: number,
    brandName: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.brandId = brandId;
    this.brandName = brandName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
