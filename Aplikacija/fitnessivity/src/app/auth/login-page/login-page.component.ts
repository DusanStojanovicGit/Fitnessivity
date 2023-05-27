import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(private http: HttpClient,
    private authService:  AuthService){

  }

  OnLogin(account: { email: string, password: string }) {
    this.authService.logIn(account).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log('Error fetching user information:', error);
      }
    );
  }
}
