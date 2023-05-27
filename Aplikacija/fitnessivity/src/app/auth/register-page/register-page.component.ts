import { MatchPassword } from '../validators/match-password';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  regForm = new FormGroup(
    {
      username: new FormGroup('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/),
      ]),

      fullName: new FormGroup('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern(/^[A-Za-z]+$/),
      ]),

      email: new FormGroup('', [Validators.email, Validators.required]),
      password: new FormGroup('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),

      confirmPassword: new FormGroup('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    { validators: [this.matchPassword.validate] }
  );

  constructor(
    private http: HttpClient,
    private matchPassword: MatchPassword,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onAccountCreate(account: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) {
    this.authService
      .createAccount(account)

      .subscribe((res) => {
        console.log(res);
      });
  }
}
