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

  OnLogin(account: {email: string, password: string}){
    console.log(account);
    this.http.post('http://127.0.0.1:3000/user/login', account)
    .subscribe((res)=>{
      console.log(res);
    });
  }
}
