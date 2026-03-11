import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Customer, ApiResponse } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = `${environment.customerApiUrl}/customers`;

  constructor(private http: HttpClient) { }

  getCustomers(
    branchId: string,
    pageNumber = 1,
    pageSize = 100,
    includeInactive = true
  ): Observable<Customer[]> {

    const url =
      `${this.baseUrl}?branchId=${branchId}&` +
      `pageNumber=${pageNumber}&` +
      `pageSize=${pageSize}&` +
      `includeInactive=${includeInactive}`;
    console.log('Fetching customers with URL:', url);
    return this.http
      .get<ApiResponse<Customer[]>>(url)
      .pipe(map(res => res.data));
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<ApiResponse<Customer>>(`${this.baseUrl}/${id}`)
      .pipe(map(res => res.data));
  }

  addCustomer(customer: Partial<Customer>): Observable<ApiResponse<Customer>> {
    return this.http.post<ApiResponse<Customer>>(this.baseUrl, customer);
  }

  updateCustomer(customer: Customer): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(`${this.baseUrl}/${customer.customerId}`, customer);
  }

  deleteCustomer(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.baseUrl}/${id}`);
  }
}