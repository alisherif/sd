import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService ,NbAuthJWTToken} from '@nebular/auth';


@Injectable()
export class NbAuthGuard implements CanActivate {


  constructor(private authService: NbAuthService, private router: Router) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        console.log(token.getValue());

      }
    
    });
}
  

  canActivate() {
    
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['/home']);
          }
        }),
      );
  }
}
