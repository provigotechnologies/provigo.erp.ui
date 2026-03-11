// import { HttpInterceptorFn } from '@angular/common/http';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const token = localStorage.getItem('token');

//   if (token) {
//     const cloned = req.clone({ 
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return next(cloned);
//   }

//   return next(req);
// };


// import { HttpInterceptorFn } from '@angular/common/http';
// import { environment } from '../../../environments/environment.development';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {

//   const token = localStorage.getItem('token');

//   // 👇 Get tenant id (choose one method)
//   const tenantId = localStorage.getItem('tenantId') 
//                    ?? environment.tenantId;

//   const cloned = req.clone({
//     setHeaders: {
//       'X-Tenant-Id': tenantId ?? '',
//       ...(token && { Authorization: `Bearer ${token}` })
//     }
//   });

//   return next(cloned);
// };

import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment.development';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);

  let token: string | null = null;
  let tenantId: string | null = environment.tenantId;

  if (isBrowser) {
    token = localStorage.getItem('token');
    console.log("Auth Interceptor - Token:", token);
    tenantId = localStorage.getItem('tenantId') ?? environment.tenantId;
  }

  const cloned = req.clone({
    setHeaders: {
      'X-Tenant-Id': tenantId ?? '',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });

  return next(cloned);
};