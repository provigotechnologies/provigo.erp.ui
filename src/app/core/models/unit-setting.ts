export class UnitSetting {
  unitSettingId!: number;
  baseUnit!: string;
  secondaryUnit!: string;
  conversionFactor!: number;

  priceType: string = "Fixed";
  fixedPrice!: number;

  marginAmount?: number;
  marginPercent?: number;
  mrp?: number;
  minSalePrice?: number;

  isDefault: number = 0;

  constructor(
    unitSettingId: number,
    baseUnit: string,
    secondaryUnit: string,
    conversionFactor: number,
    fixedPrice: number,
    priceType: string = "Fixed",
    marginAmount?: number,
    marginPercent?: number,
    mrp?: number,
    minSalePrice?: number,
    isDefault: number = 0
  ) {
    this.unitSettingId = unitSettingId;
    this.baseUnit = baseUnit;
    this.secondaryUnit = secondaryUnit;
    this.conversionFactor = conversionFactor;
    this.fixedPrice = fixedPrice;
    this.priceType = priceType;
    this.marginAmount = marginAmount;
    this.marginPercent = marginPercent;
    this.mrp = mrp;
    this.minSalePrice = minSalePrice;
    this.isDefault = isDefault;
  }
}
