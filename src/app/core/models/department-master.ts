export class DepartmentMaster {
    deptId!: number;
    departmentName!: string;
    createdAt!: Date;
    updatedAt!: Date;
  
    constructor(
      deptId: number,
      departmentName: string,
      createdAt: Date,
      updatedAt: Date
    ) {
      this.deptId = deptId;
      this.departmentName = departmentName;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  