import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shift, ApiResponse } from '../models/shift';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  private baseUrl = environment.shiftApiUrl;
  constructor(private http: HttpClient) { }

  getAllShifts(pageNumber = 1,
      pageSize = 100,
      includeInactive = true): Observable<ApiResponse<Shift[]>> {
    return this.http.get<ApiResponse<Shift[]>>(`${this.baseUrl}/shifts?PageNumber=${pageNumber}&PageSize=${pageSize}&includeInactive=${includeInactive}`);
  }
  
  createShift(data: Shift): Observable<ApiResponse<Shift>> {
    return this.http.post<ApiResponse<Shift>>(`${this.baseUrl}/shifts`, data);
  }

  updateShift(ShiftId: number, data: Shift): Observable<ApiResponse<Shift>> {
    return this.http.put<ApiResponse<Shift>>(`${this.baseUrl}/shifts/${ShiftId}`, data);
  }

  deleteShift(ShiftID: number): Observable<ApiResponse<Shift>> {
    return this.http.delete<ApiResponse<Shift>>(`${this.baseUrl}/shifts/${ShiftID}`);
  }
}
