import { Injectable } from '@angular/core';

export interface BankName {
  bankNameId?: number;
  bank: string;
}

@Injectable({
  providedIn: 'root'
})
export class BanknameLocalService {
  

}
