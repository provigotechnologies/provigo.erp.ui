import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tenant, ApiResponse } from '../models/tenant';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private baseUrl = `${environment.tenantApiUrl}/tenants`;
  // Logo upload endpoint has no /api prefix
  private logoBaseUrl = `${environment.tenantServerUrl}/tenants`;

  constructor(private http: HttpClient) {}

  getTenants(pageNumber = 1, pageSize = 100, includeInactive = true): Observable<Tenant[]> {
    const url = `${this.baseUrl}?PageNumber=${pageNumber}&PageSize=${pageSize}&includeInactive=${includeInactive}`;
    return this.http.get<ApiResponse<Tenant[]>>(url).pipe(map(res => res.data));
  }

  addTenant(tenant: Partial<Tenant>): Observable<ApiResponse<Tenant>> {
    return this.http.post<ApiResponse<Tenant>>(this.baseUrl, tenant);
  }

  updateTenant(tenant: Tenant): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(`${this.baseUrl}/${tenant.tenantId}`, tenant);
  }

  deleteTenant(id: string): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.baseUrl}/${id}`);
  }

  uploadLogo(id: string, file: File): Observable<{ logoUrl: string }> {
    const formData = new FormData();
    formData.append('logo', file);
    return this.http.post<{ logoUrl: string }>(`${this.logoBaseUrl}/${id}/logo`, formData);
  }
}

