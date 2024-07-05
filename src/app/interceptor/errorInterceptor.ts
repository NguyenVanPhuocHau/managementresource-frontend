import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../service/authService/authServcie';
import { ModalService } from '../modal/messageModal/modalService';

export const ErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const authenticationService = inject(AuthService)

    return next(req).pipe(
        catchError(err => {
            if ([401, 403].includes(err.status)) {

            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        })
    );
};

