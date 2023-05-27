import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MatchPassword implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const { password, confirmPassword } = control.value;

    if (password === confirmPassword) {
      return null;
    } else {
      return { passwordsDontMatch: true };
    }
  }
}
