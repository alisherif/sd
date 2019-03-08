import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';

import { Observable, of ,throwError} from 'rxjs';
import { catchError, map, tap,retry } from 'rxjs/operators';
import { Hero } from './Hero';

import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  token:string;

  constructor(private http: HttpClient, private authService: NbAuthService) {


    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {  
          this.token = "Bearer "+ token.getValue();    
    }
    });

   }

 addHero (hero:Hero): Observable<any> {

   return this.http.post<Hero>('/api/hero/', hero, 
   {
  
    headers: {'Authorization':this.token},

   }
  //  ).pipe(
  //      retry(2),
  //      catchError(this.handleError)
  );
  }

  getHero(id:number): Observable<any> {
return this.http.get<any>('/api/hero/'+id);
  }
  

}
