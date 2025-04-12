export class KotPrinter {
  kotPrinterId!: number;
  kotPrinterName!: string;

  constructor(
    kotPrinterId: number, 
    kotPrinterName: string
  ) {
    this.kotPrinterId = kotPrinterId;
    this.kotPrinterName = kotPrinterName;
  }
}
