export interface TrainerCourseui {
  trainerCourseId: number;
  trainerId: string;
  trainerName: string;
  courseName: string;
}

export interface CourseOfferingCreateDto {
  trainerCourseId: number;
  shiftId: number;
  startTime: string;
  endTime: string;
}

export interface CourseOfferingUpdateDto {
  offeringId: number;
  trainerCourseId: number;
  shiftId: number;
  startTime: string;
  endTime: string;
}