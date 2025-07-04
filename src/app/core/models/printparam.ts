export class PrintParam {
  printParamId!: number;
  printParamName!: string;

  constructor(
    printParamId: number, 
    printParamName: string
  ) {
    this.printParamId = printParamId;
    this.printParamName = printParamName;
  }
}
