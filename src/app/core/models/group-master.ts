export class GroupMaster {
  groupId!: number;
  groupName!: string;
  hsnSacCode?: number;  // Optional property
  createdAt!: Date;
  updatedAt!: Date;

  constructor(
    groupId: number,
    groupName: string,
    createdAt: Date,
    updatedAt: Date,
    hsnSacCode?: number  // Optional parameter now comes last
  ) {
    this.groupId = groupId;
    this.groupName = groupName;
    this.hsnSacCode = hsnSacCode;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
