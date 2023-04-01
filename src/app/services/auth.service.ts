import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private UtilSvc: UtilService, private router: Router) { }

  canActivate() {
    const isLogged = Boolean(this.UtilSvc.getToken());
    if (!isLogged) {
      this.router.navigate(['login']);
    }
    return Boolean(this.UtilSvc.getToken());
  }
}
