import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { last, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7082';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  register(data: {
    firstname: string;
    lastname: string;
    phonenumber: string;
    email: string;
    password: string;
    role: string;
    isactive: boolean;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
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
