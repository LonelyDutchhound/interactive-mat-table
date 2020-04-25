import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpInterceptor,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError, retryWhen, concat, take, delay } from 'rxjs/operators';
import { GetGoodsService } from '../services/get-goods.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private getGoodsService: GetGoodsService) {
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retryWhen(errors => errors.pipe(delay(1000), take(5), concat(throwError(errors)))),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
                    }
                    this.getGoodsService.isError.next(true);
                    return EMPTY;
                })
            );
    }
}

export const HttpErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
