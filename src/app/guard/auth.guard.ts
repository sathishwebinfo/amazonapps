import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _servive: AuthService,
    private _router: Router,
    private _toastr: ToastrService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._servive.isLoggedIn()) {
      if (route.url.length > 0) {
        let menu = route.url[0].path;
        if (menu == 'user') {
          if(this._servive.getUserRole() == 'admin'){
            return true
          }else{
            this._toastr.warning("you don't have access");
            this._router.navigate([''])
            return false
          }
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      this._router.navigate(['login']);
      return false;
    }
    return true;
  }

}
