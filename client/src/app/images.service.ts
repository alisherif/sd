import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';

import { Observable, of ,throwError} from 'rxjs';
import { catchError, map, tap,retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
Url="";
  constructor(private http: HttpClient) { 

  }

  getImages (): Observable<Array<object>> {
    return this.http.get<Array<object>>('/api/hero/images').pipe(
      retry(3),
      catchError(this.handleError)
    );
  };

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
