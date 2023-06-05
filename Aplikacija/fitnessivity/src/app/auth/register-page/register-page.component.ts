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
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/),
      ]),

      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z ]*$/)
      ]),

      email: new FormControl('', [Validators.email, Validators.required, Validators.pattern( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),

      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    { validators: [this.matchPassword.validate] }
  );

  constructor(
    private authService: AuthService,
    private matchPassword: MatchPassword  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  showErrors(fieldName: string): boolean {
    const field = this.regForm.get(fieldName);
    return !!(field && field.dirty && field.touched && field.errors && Object.keys(field.errors).length > 0);
  }

  onAccountCreate() {
    if (this.regForm.valid) {
      const formValue = {
        name : String(this.regForm.value.fullName),
        username : String(this.regForm.value.username),
        email : String(this.regForm.value.email),
        password : String(this.regForm.value.password),
      }
      this.authService.createAccount(formValue).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
