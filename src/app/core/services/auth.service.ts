import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { last, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { ApiResponse } from '../models/role';
import { Role } from '../models/role';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.userApiUrl;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any) { } // 👈 Inject PLATFORM_ID here

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {

        console.log("Login response:", response);

        if (isPlatformBrowser(this.platformId)) {

          const token = response.data.token;

          localStorage.setItem('token', token);

          const decoded: any = jwtDecode(token);

          localStorage.setItem('role', decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
          localStorage.setItem('userId', decoded.userId);
        }

      })
    );
  }

  register(data: {
    firstname: string;

    lastname: string;
    phonenumber: string;
    email: string;
    password: string;
    roleId: number;       // ✅ changed from role to roleId (int)
    isactive: boolean;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  getRoles(): Observable<ApiResponse<Role[]>> {
    return this.http.get<ApiResponse<Role[]>>(`${this.baseUrl}/roles`);
  }

  getLogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/logs`);
  }

  logLogout(userId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/log-logout`, { userId });
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('loggedUser');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users/email`);
  }

  updateUser(userId: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/users/${userId}`, data);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/users/${userId}`);
  }

  changePassword(userId: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${userId}/password`, { password: newPassword });
  }

}
