export class KitchenMaster {
    kitchenId!: number;
    kotPrinterId!: number;
    kotPrinterSizeId!: number;
    printParamId!: number;
    kitchenName!: string;
    createdAt!: Date;
    updatedAt!: Date;
  
    // Related Objects (Optional)
    kotPrinter?: any;      // Replace `any` with a KotPrinter model if available
    kotPrinterSize?: any;  // Replace `any` with a KotPrinterSize model if available
    printParam?: any;      // Replace `any` with a PrintParam model if available
  
    constructor(
      kitchenId: number,
      kotPrinterId: number,
      kotPrinterSizeId: number,
      printParamId: number,
      kitchenName: string,
      createdAt: Date,
      updatedAt: Date,
      kotPrinter?: any,
      kotPrinterSize?: any,
      printParam?: any
    ) {
      this.kitchenId = kitchenId;
      this.kotPrinterId = kotPrinterId;
      this.kotPrinterSizeId = kotPrinterSizeId;
      this.printParamId = printParamId;
      this.kitchenName = kitchenName;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.kotPrinter = kotPrinter;
      this.kotPrinterSize = kotPrinterSize;
      this.printParam = printParam;
    }
  }
  