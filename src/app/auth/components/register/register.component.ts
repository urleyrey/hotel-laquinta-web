import { Component } from '@angular/core';
import { IUser } from 'src/app/core/models/IUser';
import { CognitoService } from 'src/app/core/services/cognito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isConfirm: boolean;
  user: IUser;

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.isConfirm = false;
    this.user = {} as IUser;
  }

  public signUp():void {
    this.cognitoService.signUp(this.user).then(() => {
      this.isConfirm = true;
    }).catch( () => {
      console.log("SOmenthing went wrong with signup!");
    });
  }

  public confirmSignUp():void {
    this.cognitoService.confirmSignUp(this.user).then(() => {
      this.router.navigate(['/auth', 'login']);
    }).catch( () => {
      console.log("SOmenthing went wrong with confirm signup!");
    });
  }

}
