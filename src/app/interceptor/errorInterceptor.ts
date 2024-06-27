import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../authService/authServcie';
import { ModalService } from '../modals/messageModal/modalService';

export const ErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const authenticationService = inject(AuthService)
    const modalService = inject(ModalService);
    return next(req).pipe(
        catchError(err => {
            if ([401, 403].includes(err.status)) {
                modalService.openLoginModal();
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        })
    );
};

