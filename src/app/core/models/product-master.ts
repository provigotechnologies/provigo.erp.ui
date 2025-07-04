export class ProductMaster {
  productId!: number;
  groupId!: number;
  brandId?: number;
  unitId!: number;
  unitSettingId!: number;
  productTypeId!: number;
  locationId?: number;
  supplierId?: number;
  kitchenId?: number;

  designNo?: string;
  colour?: string;
  size?: string;
  itemCode?: string;
  imagePath?: string;

  productName!: string;
  printName?: string;

  purchasePrice?: number;
  salePrice!: number;
  minServiceCharge?: number;
  mrp?: number;

  openingStock?: number;
  openingStockValue?: number;

  hsnSacCode?: number;
  saleDiscount?: number;
  lowLevelLimit?: number;
  warrantyPeriod?: number;
  warrantyUnit: string = "Years";
  identifierType: string = "SerialNo";
  identifierValue?: string;
  productDescription?: string;

  printDescription: boolean = false;
  oneClickSale: boolean = false;
  enableTracking: boolean = false;
  printSerialNo: boolean = false;
  notForSale: boolean = false;

  productStatus?: string;
  createdAt!: Date;
  updatedAt!: Date;

  // Related Objects (Optional)
  group?: any;           // Replace `any` with a `GroupMaster` model if available
  brand?: any;           // BrandMaster
  unit?: any;            // UnitMaster
  unitSetting?: any;     // UnitSetting
  productType?: any;     // ProductType
  supplier?: any;        // Supplier
  kitchen?: any;         // KitchenMaster
  location?: any;        // LocationMaster

  constructor(
    productId: number,
    groupId: number,
    brandId: number | undefined,
    unitId: number,
    unitSettingId: number,
    productTypeId: number,
    locationId: number | undefined,
    supplierId: number | undefined,
    kitchenId: number | undefined,
    designNo: string | undefined,
    colour: string | undefined,
    size: string | undefined,
    itemCode: string | undefined,
    imagePath: string | undefined,
    productName: string,
    printName: string | undefined,
    purchasePrice: number | undefined,
    salePrice: number,
    minServiceCharge: number | undefined,
    mrp: number | undefined,
    openingStock: number | undefined,
    openingStockValue: number | undefined,
    hsnSacCode: number | undefined,
    saleDiscount: number | undefined,
    lowLevelLimit: number | undefined,
    warrantyPeriod: number | undefined,
    warrantyUnit: string = "Years",
    identifierType: string = "SerialNo",
    identifierValue: string | undefined,
    productDescription: string | undefined,
    printDescription: boolean = false,
    oneClickSale: boolean = false,
    enableTracking: boolean = false,
    printSerialNo: boolean = false,
    notForSale: boolean = false,
    productStatus: string | undefined,
    createdAt: Date,
    updatedAt: Date,
    group: any | undefined,
    brand: any | undefined,
    unit: any | undefined,
    unitSetting: any | undefined,
    productType: any | undefined,
    supplier: any | undefined,
    kitchen: any | undefined,
    location: any | undefined
  ) {
    this.productId = productId;
    this.groupId = groupId;
    this.brandId = brandId;
    this.unitId = unitId;
    this.unitSettingId = unitSettingId;
    this.productTypeId = productTypeId;
    this.locationId = locationId;
    this.supplierId = supplierId;
    this.kitchenId = kitchenId;

    this.designNo = designNo;
    this.colour = colour;
    this.size = size;
    this.itemCode = itemCode;
    this.imagePath = imagePath;

    this.productName = productName;
    this.printName = printName;

    this.purchasePrice = purchasePrice;
    this.salePrice = salePrice;
    this.minServiceCharge = minServiceCharge;
    this.mrp = mrp;

    this.openingStock = openingStock;
    this.openingStockValue = openingStockValue;

    this.hsnSacCode = hsnSacCode;
    this.saleDiscount = saleDiscount;
    this.lowLevelLimit = lowLevelLimit;
    this.warrantyPeriod = warrantyPeriod;
    this.warrantyUnit = warrantyUnit;
    this.identifierType = identifierType;
    this.identifierValue = identifierValue;
    this.productDescription = productDescription;

    this.printDescription = printDescription;
    this.oneClickSale = oneClickSale;
    this.enableTracking = enableTracking;
    this.printSerialNo = printSerialNo;
    this.notForSale = notForSale;

    this.productStatus = productStatus;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    this.group = group;
    this.brand = brand;
    this.unit = unit;
    this.unitSetting = unitSetting;
    this.productType = productType;
    this.supplier = supplier;
    this.kitchen = kitchen;
    this.location = location;
  }
}
