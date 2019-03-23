import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';

import { Observable, of ,throwError} from 'rxjs';
import { catchError, map, tap,retry } from 'rxjs/operators';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  token:string;
  constructor(private http: HttpClient, private authService: NbAuthService) {


    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {  
          this.token = token.getValue();    
    }
    });

   }

  

  getImages (): Observable<Array<object>> {
    return this.http.get<Array<object>>('/heroes/public/api/slider/images').pipe(
      retry(3),
      catchError(this.handleError)
    );
  };
  getVideos():Observable<any> {
    return this.http.get('./assets/videos.txt');
  }
  addImageSlider(formData:FormData):Observable<any>{
    console.log("add images")
    return this.http.post<any>('/heroes/public/api/slider/images',formData,
    {
    params: {'token':this.token},
   });

  }
  deleteImageSlider(id:number):Observable<any>{
    console.log("delete images")
    return this.http.delete('/heroes/public/api/slider/images/'+id,
    {
    params: {'token':this.token},
   });

  }

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
