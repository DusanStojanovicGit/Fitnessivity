import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { RedirectService } from 'src/app/redirect.service';
import { NotificationsService } from 'src/app/notifications.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  errorMessage: string = '';

  constructor(
    private authService:  AuthService,
    private redirectService: RedirectService,
    private NotificationsService:NotificationsService
    ){}

  clearErrorMessage(){
    this.errorMessage = '';
  }

  onLogin(account: { email: string, password: string }) {

      this.authService.logIn(account).subscribe(
      (response) => {
        this.redirectService.loginRegisterRedirect(response);
        this.NotificationsService.ShowNotification("Login successfully");
      },
      (error) => {
        console.log(error);
          this.errorMessage = error.error.message;
      }
    );

  }
}
