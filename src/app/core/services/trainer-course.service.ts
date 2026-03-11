import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse, TrainerCourse } from '../models/trainer-course';

@Injectable({
  providedIn: 'root'
})
export class TrainerCourseService {

  private baseUrl = environment.trainerCourseApiUrl;
  constructor(private http: HttpClient) { }

  // getTrainerCourses(productId: number, branchId: string): Observable<ApiResponse<TrainerCourse[]>> {
  //   return this.http.get<ApiResponse<TrainerCourse[]>>(`${this.baseUrl}/trainercourse/by-product?productId=${productId}&branchId=${branchId}`);
  // }
 

// ...

getTrainerCourses(productId: number, branchId: string): Observable<ApiResponse<TrainerCourse[]>> {
  const params = new HttpParams().set('branchId', branchId);
  
  return this.http.get<ApiResponse<TrainerCourse[]>>(
    `${this.baseUrl}/trainercourse/by-product/${productId}`, 
    { params }
  );
}

  createTrainerCourse(data: TrainerCourse, branchId: string): Observable<ApiResponse<TrainerCourse>> {
    return this.http.post<ApiResponse<TrainerCourse>>(`${this.baseUrl}/trainercourse/map?branchId=${branchId}`, data);
  }

}
