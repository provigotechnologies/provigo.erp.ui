export class UnitMaster {
    unitId!: number;
    unitName!: string;
    createdAt!: Date;
    updatedAt!: Date;
  
    constructor(unitId: number, unitName: string, createdAt: Date, updatedAt: Date) {
      this.unitId = unitId;
      this.unitName = unitName;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  