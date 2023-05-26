import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  constructor(private http: HttpClient){

  }

  onAccountCreate(account: {name: string, username: string, email: string, password: string}){
    console.log(account);
    this.http.post('http://127.0.0.1:3000/user/register', account)
    .subscribe((res)=>{
      console.log(res);
    });
  }
}
