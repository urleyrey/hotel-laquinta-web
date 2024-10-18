import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/models/IUser';
// import { CognitoService } from 'src/app/core/services/cognito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: IUser;

  constructor(private router: Router, 
    // private cognitoService: CognitoService
    ) {
    this.user = {email:'urleyrey1987@mailinator.com', password:'Urley1987.'} as IUser;
  }

  public login():void {
    // this.cognitoService.signIn(this.user).then((res) => {
    //   this.router.navigate(['/dashboard']);
    // }).catch( (error) => {
    //   console.log(error+ " ->SOmenthing went wrong with login!");
    // });
    this.router.navigate(['/dashboard']);
  }

}
