import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private authService:AuthService) {}
  validate = (control: FormControl): Observable<ValidationErrors | null> => {
    const { value } = control;
    return this,this.authService.usernameAvailable(value)
      .pipe(
        map((value) => {
          if (value.available) {
            return null;
          } else {
            return { nonUniqueUsername: true };
          }
        }),
        catchError((err) => {
          if (err.message.username) {
            return of({ nonUniqueUsername: true });
          } else {
            return of({ noConnection: true });
          }
        })
      );
  };
}
