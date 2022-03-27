import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { ErrorResponse } from '../models/responses/error.response.model';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastService: ToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (!(error.error instanceof ErrorEvent)) {
            console.log('Handled error via intercept');
            const errorMessage: ErrorResponse = error.error;
            this.toastService.openToast({content: errorMessage.message, style: 'danger', timeout: 10000});
          }

          return throwError(() => error);
        })
      );
  }
}
