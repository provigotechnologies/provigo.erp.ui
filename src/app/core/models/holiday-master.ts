export class HolidayMaster {
    holId!: number;
    holidayName!: string;
    eventDate!: Date;
    createdAt!: Date;
    updatedAt!: Date;
  
    constructor(
      holId: number,
      holidayName: string,
      eventDate: Date,
      createdAt: Date,
      updatedAt: Date
    ) {
      this.holId = holId;
      this.holidayName = holidayName;
      this.eventDate = eventDate;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  