import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Branch, ApiResponse } from '../models/branch';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private baseUrl = `${environment.tenantApiUrl}/branches`;
  private key = 'activeBranchId';

  constructor(private http: HttpClient) { }

  setActiveBranchId(id: string) {
    sessionStorage.setItem(this.key, id.toString());
  }


  getBranches(pageNumber = 1, pageSize = 100, includeInactive = true): Observable<Branch[]> {
    const url = `${this.baseUrl}?PageNumber=${pageNumber}&PageSize=${pageSize}&includeInactive=${includeInactive}`;
    return this.http.get<ApiResponse<Branch[]>>(url).pipe(map(res => res.data));
  }

  addBranch(branch: Partial<Branch>): Observable<ApiResponse<Branch>> {
    return this.http.post<ApiResponse<Branch>>(this.baseUrl, branch);
  }

  updateBranch(branchId: string, branch: Partial<Branch>): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(`${this.baseUrl}/${branchId}`, branch);
  }

  deleteBranch(branchId: string): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.baseUrl}/${branchId}`);
  }
}

