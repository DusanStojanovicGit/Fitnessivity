import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(private http: HttpClient){

  }

  OnLogin(account: { email: string, password: string }) {
    this.http.get('http://localhost:3000/user/whoami', {withCredentials: true}).subscribe(
            (response) => {
              console.log(response);
            },
            (error) => {
              console.log('Error fetching user information:', error);
            });
    // console.log(account);
    // this.http.post('http://localhost:3000/user/login', account, { withCredentials: true })
    //   .subscribe(
    //     (res) => {
    //       console.log(res);
    //       // Make the 'whoami' request after a successful login
    //       this.http.get('http://localhost:3000/user/whoami').subscribe(
    //         (response) => {
    //           console.log(response);
    //         },
    //         (error) => {
    //           console.log('Error fetching user information:', error);
    //         }
    //       );
    //     },
    //     (error) => {
    //       console.log('Error logging in:', error);
    //     }
    //   );
  }
}
