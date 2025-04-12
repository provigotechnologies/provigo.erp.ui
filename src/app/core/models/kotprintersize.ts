export class KotPrinterSize {
  kotPrinterSizeId!: number;
  kotPrinterSizeName!: string;

  constructor( 
    kotPrinterSizeId: number, 
    kotPrinterSizeName: string
  ) {
    this.kotPrinterSizeId = kotPrinterSizeId;
    this.kotPrinterSizeName = kotPrinterSizeName;
  }
}
