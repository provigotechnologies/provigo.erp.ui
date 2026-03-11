import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Discount, ApiResponse } from '../models/discount';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class DiscountService {
  private baseUrl = `${environment.pricingApiUrl}/discounts`;

  constructor(private http: HttpClient) {}

  getDiscounts(pageNumber = 1, pageSize = 100, includeInactive = true): Observable<Discount[]> {
    const url = `${this.baseUrl}?PageNumber=${pageNumber}&PageSize=${pageSize}&includeInactive=${includeInactive}`;
    return this.http.get<ApiResponse<Discount[]>>(url).pipe(map(res => res.data));
  }

  addDiscount(discount: Partial<Discount>): Observable<ApiResponse<Discount>> {
    return this.http.post<ApiResponse<Discount>>(this.baseUrl, discount);
  }

  updateDiscount(discountId: number, discount: Partial<Discount>): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(`${this.baseUrl}/${discountId}`, discount);
  }

  deleteDiscount(discountId: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.baseUrl}/${discountId}`);
  }
}

