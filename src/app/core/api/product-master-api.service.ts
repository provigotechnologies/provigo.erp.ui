import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductMaster } from '../models/product-master';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductMasterApiService {
  private apiUrl = `${environment.productApiUrl}/product-master`; // Using environment for base URL

  constructor(private http: HttpClient) { }

  /**
   * Gets all products from the server.
   * The auth interceptor will automatically add the Tenant ID header to this request.
   * @returns An observable of the product list.
   */
  getProducts(): Observable<ProductMaster[]> {
    return this.http.get<ProductMaster[]>(this.apiUrl);
  }

  /**
   * Creates a new product.
   * The auth interceptor will automatically add the Tenant ID header to this request.
   * @param product The product data to create.
   * @returns An observable of the created product.
   */
  createProduct(product: ProductMaster): Observable<ProductMaster> {
    return this.http.post<ProductMaster>(this.apiUrl, product);
  }
}
