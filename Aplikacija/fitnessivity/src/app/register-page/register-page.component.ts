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

  onAccountCreate(account:{name:string,lastname:string,email:string,password:string,confirmpassword:string}){
    this.http.post('http://localhost:3000/user/signup/accounts.json',account)
    .subscribe((res)=>{
      console.log(res);
    });
  }
}
