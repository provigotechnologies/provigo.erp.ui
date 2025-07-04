export class DesignationMaster {
    desgId!: number;
    designationName!: string;
    createdAt!: Date;
    updatedAt!: Date;
  
    constructor(
      desgId: number,
      designationName: string,
      createdAt: Date,
      updatedAt: Date
    ) {
      this.desgId = desgId;
      this.designationName = designationName;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  