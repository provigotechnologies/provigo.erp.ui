export class LocationMaster {
    locationId!: number;
    locationName!: string;
    createdAt!: Date;
    updatedAt!: Date;
  
    constructor(
      locationId: number,
      locationName: string,
      createdAt: Date,
      updatedAt: Date
    ) {
      this.locationId = locationId;
      this.locationName = locationName;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  