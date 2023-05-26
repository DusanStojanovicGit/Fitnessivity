import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  constructor(private authService : AuthService){

  }

  onAccountCreate(account: {name: string, username: string, email: string, password: string}){
    this.authService.createAccount(account)
    .subscribe((res)=>{
      console.log(res);
    });
  }
}
