import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable(
    {
        providedIn: 'root'
    })
export class ProcessHttpMessageService
{
    public handleError(error: HttpErrorResponse | any)
    {
        const message = error.error instanceof ErrorEvent
            ? error.error.message
            : (error instanceof HttpErrorResponse
                ? `${error.status} - ${error.statusText || '(Unknown status)'}: ${error.message}`
                : error.error);

        return throwError(message);
    }
}