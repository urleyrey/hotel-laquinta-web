import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/models/IUser';
import { CognitoService } from 'src/app/core/services/cognito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  user: IUser;

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.user = {} as IUser;
  }

  public signout():void {
    this.cognitoService.signOut().then((res) => {
      console.log("sign out");
      this.router.navigate(['/auth','login']);
    }).catch( (error) => {
      console.log(error+ " ->SOmenthing went wrong with Sign Out!");
    });
  }
}
