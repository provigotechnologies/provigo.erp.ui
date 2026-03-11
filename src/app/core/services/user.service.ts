import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { User } from '../../core/models/user';
import { ApiResponse } from '../models/customer';

export interface RegisterUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  roleId: number;
  userCategory: string;
  isActive: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = environment.userApiUrl;

  constructor(private http: HttpClient) {}

  getUsers(pageNumber = 1, pageSize = 100, includeInactive = true, branchId?: string): Observable<User[]> {
    const url = `${this.baseUrl}/users?PageNumber=${pageNumber}&PageSize=${pageSize}&includeInactive=${includeInactive}&branchId=${branchId}`;
    return this.http.get<ApiResponse<User[]>>(url).pipe(map(res => res.data));
  }

  /** POST /api/register?branchId={branchId}  — X-Tenant-Id added by authInterceptor */
  registerUser(branchId: string, dto: RegisterUserDto): Observable<ApiResponse<User>> {
    const url = `${this.baseUrl}/register?branchId=${branchId}`;
    return this.http.post<ApiResponse<User>>(url, dto);
  }
}

