import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CourseOfferingCreateDto } from '../models/course-offering.model';

@Injectable({
  providedIn: 'root'
})
export class CourseOfferingService {

  private baseUrl = environment.CourseOfferingApiUrl; 

  constructor(private http: HttpClient) {}

  // getTrainerCourses(branchId: string) {
  //   return this.http.get<any>(`${this.baseUrl}/trainercourse/by-product?branchId=${branchId}`);
  // }

  // getShifts() {
  //   return this.http.get<any>(`${this.baseUrl}/shift`);
  // }

  createCourseOffering(dto: CourseOfferingCreateDto, branchId: string) {
    return this.http.post<any>(
      `${this.baseUrl}/course-offerings?branchId=${branchId}`,
      dto
    );
  }

}