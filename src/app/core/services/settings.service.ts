import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SettingAccess } from '../../shared/interface/setting-access';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private baseUrl = 'https://localhost:7270/api/settings';  

  constructor(private http: HttpClient) {}

  getModuleSettings(module: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${encodeURIComponent(module)}`);
  }

  saveUserAccess(userId: number, settingAccess: SettingAccess): Observable<any> {
    return this.http.post(`${this.baseUrl}/access/${userId}`, settingAccess);
  }

  getUserAccess(userId: string): Observable<SettingAccess> {
  return this.http.get<SettingAccess>(`${this.baseUrl}/access/${userId}`);
}

}
