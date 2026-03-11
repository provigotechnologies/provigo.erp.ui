import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tax, ApiResponse } from '../models/tax';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class TaxService {
  private baseUrl = `${environment.pricingApiUrl}/taxes`;

  constructor(private http: HttpClient) {}

  getTaxes(pageNumber = 1, pageSize = 100, includeInactive = true): Observable<Tax[]> {
    const url = `${this.baseUrl}?PageNumber=${pageNumber}&PageSize=${pageSize}&includeInactive=${includeInactive}`;
    return this.http.get<ApiResponse<Tax[]>>(url).pipe(map(res => res.data));
  }

  addTax(tax: Partial<Tax>): Observable<ApiResponse<Tax>> {
    return this.http.post<ApiResponse<Tax>>(this.baseUrl, tax);
  }

  updateTax(taxId: number, tax: Partial<Tax>): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(`${this.baseUrl}/${taxId}`, tax);
  }

  deleteTax(taxId: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.baseUrl}/${taxId}`);
  }
}

