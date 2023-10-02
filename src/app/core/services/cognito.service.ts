import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/IUser';
import { environment } from 'src/app/environments/environment';
import { Amplify, Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  private authenticationSubject: BehaviorSubject<any>;

  constructor() { 
    Amplify.configure({
      Auth: environment.cognito
    })
    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        'custom:role': user.role
      }
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password).then(() => {
      this.authenticationSubject.next(true);
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut().then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }


  public isAuthenticated(): Promise<boolean> {
    if(this.authenticationSubject.value){
      return Promise.resolve(true);
    }else{
      return this.getUser().then((user:any) => {
        if(user){
          return true;
        }else{
          return false;
        }
      }).catch(() => {
        return false;
      })
    }
  }

  getRole():Promise<any> {
    return this.getUser().then((user) => {
      return user && user.attributes?user.attributes['custom:rule']:'';
    })
  }

}
