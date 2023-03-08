import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt";
import has = Reflect.has;

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  const token = localStorage.getItem('token');
  const jwtHelper = new JwtHelperService();
  let hasAuthority = false;
  if (token && !jwtHelper.isTokenExpired(token)) {
  const decodedToken = jwtHelper.decodeToken(token);
  const roles = decodedToken.roles;
  if (roles.includes('ROLE_ADMIN')) {
  hasAuthority = true;
}
}
return hasAuthority;
}
}
