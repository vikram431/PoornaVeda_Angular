// auth.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = localStorage.getItem('token');

  let clonedReq = req;

  // ✅ Attach token if exists
  if (token) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

      console.log('Token Attached:', clonedReq.headers.get('Authorization'));

  }
  else {
  console.log('No Token Found');
}

  return next(clonedReq).pipe(

    // ✅ Handle errors
    catchError((error: HttpErrorResponse) => {

      // if (error.status === 401) {
      //   authService.logout("Session expired. Please login again.");
      // }

      if (error.status === 403) {
        authService.logout("Access denied or token expired.");
      }

      return throwError(() => error);
    })

  );
};
