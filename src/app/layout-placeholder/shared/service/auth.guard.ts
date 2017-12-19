import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {LoginService} from '../../pages/login/service/login.service';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor( public loginService: LoginService,
               public router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.loginService.isAuthenticated().map((user) => {
      if (user) {
        return true;
      } else {
        this.router.navigate(['/login'], {
          queryParams: {
            returnTo: state.url
          }
        });
        return false;
      }
    }, (err) => {
      this.router.navigate(['/login'], {
        queryParams: {
          returnTo: state.url
        }
      });
      return Observable.of(false);
    });
  }
}
