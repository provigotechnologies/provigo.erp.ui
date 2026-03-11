import { inject, PLATFORM_ID, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  get(key: string): string | null {
    return this.isBrowser ? localStorage.getItem(key) : null;
  }
}