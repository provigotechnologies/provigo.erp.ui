export class TableMaster {
    tableId!: number;
    tableName!: string;
    createdAt!: Date;
    updatedAt!: Date;
  
    constructor(
      tableId: number,
      tableName: string,
      createdAt: Date,
      updatedAt: Date
    ) {
      this.tableId = tableId;
      this.tableName = tableName;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  