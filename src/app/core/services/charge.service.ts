import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Charge, ApiResponse } from '../models/charge';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ChargeService {
  private baseUrl = `${environment.pricingApiUrl}/charges`;

  constructor(private http: HttpClient) {}

  getCharges(pageNumber = 1, pageSize = 100, includeInactive = true): Observable<Charge[]> {
    const url = `${this.baseUrl}?PageNumber=${pageNumber}&PageSize=${pageSize}&includeInactive=${includeInactive}`;
    return this.http.get<ApiResponse<Charge[]>>(url).pipe(map(res => res.data));
  }

  addCharge(charge: Partial<Charge>): Observable<ApiResponse<Charge>> {
    return this.http.post<ApiResponse<Charge>>(this.baseUrl, charge);
  }

  updateCharge(chargeId: number, charge: Partial<Charge>): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(`${this.baseUrl}/${chargeId}`, charge);
  }

  deleteCharge(chargeId: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.baseUrl}/${chargeId}`);
  }
}

