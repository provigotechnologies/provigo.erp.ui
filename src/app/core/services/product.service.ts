import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, ApiResponse } from '../models/product';
import { environment } from '../../../environments/environment.development';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = `${environment.productApiUrl}/products`;

  constructor(private http: HttpClient) {}

  // getProducts(pageNumber = 1, pageSize = 100, includeInactive = true): Observable<Product[]> {
  //   const url = `${this.baseUrl}?PageNumber=${pageNumber}&PageSize=${pageSize}&includeInactive=${includeInactive}`;
  //   return this.http.get<ApiResponse<Product[]>>(url).pipe(map(res => res.data));
  // }

  getProducts(
      branchId: string,
      pageNumber = 1,
      pageSize = 100,
      includeInactive = true
    ): Observable<Product[]> {
  
      const url =
        `${this.baseUrl}?branchId=${branchId}&` +
        `pageNumber=${pageNumber}&` +
        `pageSize=${pageSize}&` +
        `includeInactive=${includeInactive}`;
      console.log('Fetching products with URL:', url);
      return this.http
        .get<ApiResponse<Product[]>>(url)
        .pipe(map(res => res.data));
    }

  addProduct(product: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(`${this.baseUrl}?branchId=${product.branchId}`, product);
  }

  updateProduct(productId: number, product: Partial<Product>): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(`${this.baseUrl}/${productId}`, product);
  }

  deleteProduct(productId: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.baseUrl}/${productId}`);
  }
}

