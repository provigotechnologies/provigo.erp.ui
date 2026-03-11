import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { OrderDto, OrderPaymentUpdateDto, OrderUpdateDto } from '../core/models/order.model';

export interface PagedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

@Injectable({ providedIn: 'root' })
export class OrderService {

  private baseUrl = `${environment.orderApiUrl}/orders`;

  constructor(private http: HttpClient) {}

  /** GET Orders — optionally filtered by branch */
  getOrders(
    pageNumber = 1,
    pageSize = 10,
    includeInactive = true,
    branchId?: string
  ): Observable<PagedResponse<OrderDto>> {

    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('includeInactive', includeInactive.toString());

    if (branchId) {
      params = params.set('BranchId', branchId);
    }

    return this.http.get<PagedResponse<OrderDto>>(this.baseUrl, { params });
  }

  /** GET single order by ID */
  getOrderById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  /** CREATE — sends only the fields the backend needs (orderId/status/createdAt are server-managed) */
  createOrder(dto: Partial<OrderDto>): Observable<any> {
    return this.http.post(this.baseUrl, dto);
  }

  /** UPDATE ORDER — PUT /api/orders/{id} */
  updateOrder(id: number, dto: OrderUpdateDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, dto);
  }

  /** UPDATE PAYMENT AMOUNT — PUT /api/orders/{orderId}/update-payment */
  updatePayment(orderId: number, paidAmount: number): Observable<any> {
    const dto: OrderPaymentUpdateDto = { paidAmount };
    return this.http.put(`${this.baseUrl}/${orderId}/update-payment`, dto);
  }

  /** DELETE */
  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}