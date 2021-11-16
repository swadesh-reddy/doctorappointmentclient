import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(): boolean {
    console.log(localStorage.getItem('user'));
    if (localStorage.getItem('userÎ') == null) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

}
