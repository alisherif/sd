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
          this.token = token.getValue();    
    }
    });

   }

  getHeros(): Observable<Hero[]> {
    return this.http.get<Hero[]>('/heroes/public/api/heroes',{
      headers:{ 'content-type': 'application/json' },
    });    
  }

 addHero (hero:Hero): Observable<any> {

   return this.http.post<any>('/heroes/public/api/heroes', hero, 
   {headers:{ 'content-type': 'application/json' },
    params: {'token':this.token},
   }
  );
  }

  getHero(id:number): Observable<any> {
return this.http.get<any>('/heroes/public/api/heroes/'+id);
  }

 
  getHeroImage(id:number): Observable<any> {
    
    return this.http.get<any>('/heroes/public/api/heroes/'+id+'/images');
    
  }

  addHeroImage(id:number,formData:FormData):Observable<any>{
    console.log("add images")
    return this.http.post<any>('/heroes/public/api/heroes/'+id+'/images',formData,
    {
    params: {'token':this.token},
   });

  }


}
