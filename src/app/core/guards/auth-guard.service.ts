import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CognitoService } from '../services/cognito.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private router: Router, private cognitoService: CognitoService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean> | Promise<boolean>{
    //return this.cognitoService.getRole().then((role) => {
      return this.cognitoService.isAuthenticated().then((role) => {
      if(role){
        console.log("AUTENTICADO");
        return true;
      }else{
        this.router.navigateByUrl('/auth/login');
        console.log("NO AUTENTICADO");
        return false;
      }
    })
  } 
}
