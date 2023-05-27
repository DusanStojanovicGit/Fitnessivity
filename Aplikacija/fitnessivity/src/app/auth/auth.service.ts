import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';

interface SignedinResponse {
  isLoggedIn: boolean;
  username: string;
  isAdmin: boolean;
}

interface SignupResponse{
  username: string;
  isAdmin: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private root = 'http://localhost:3000/user/';
  signedin$ = new BehaviorSubject(false);
  isAdmin$ = new BehaviorSubject(false);
  constructor(private http: HttpClient) { }
  
  
  createAccount(account: {name: string, username: string, email: string, password: string}){
    console.log(account);
    return this.http.post<SignupResponse>(this.root + 'register', account, {withCredentials: true})
    .pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    )
  }

  logIn(account: { email: string, password: string }) {
    return this.http.post(this.root + 'login', account, { withCredentials: true })
      .pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    );
  }

  checkAuth() {
    return this.http
      .get<SignedinResponse>(this.root + 'whoami', { withCredentials: true })
      .pipe(
        catchError(error => {
          this.signedin$.next(false);
          this.isAdmin$.next(false);
          return throwError(error);
        }),
        map(({ isLoggedIn, isAdmin }) => {
          this.signedin$.next(true);
          this.isAdmin$.next(isAdmin);
          return { isLoggedIn, isAdmin };
        })
      );
  }

  logOut(){
    return this.http.post("http://localhost:3000/user/logout", {}, {withCredentials: true})
      .pipe(
        tap(() => {
          this.signedin$.next(false);
          this.isAdmin$.next(false);
        })
      );
  }
}
