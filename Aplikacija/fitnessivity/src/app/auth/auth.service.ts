import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { User } from '../user/user.entity';

interface SignedinResponse {
  isLoggedIn: boolean;
  username: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private root = 'http://10.241.185.86:3000/user/';
  signedin$ = new BehaviorSubject<boolean | null>(null);
  isAdmin$ = new BehaviorSubject<boolean | null>(null);
  username$ = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) { }


  usernameAvailable(username:string){
    return this.http
      .post<{available:boolean}>('http://10.241.185.86:3000/username/', {
        username: username
      })
  }

  createAccount(account: {name: string, username: string, email: string, password: string}){
    return this.http.post<User>(this.root + 'register', account, {withCredentials: true})
    .pipe(
      catchError(error => {
        this.signedin$.next(false);
        this.username$.next('');
        return throwError(error);
      }),
      tap((response) => {
        this.signedin$.next(true);
        this.isAdmin$.next(response.isAdmin);
        this.username$.next(response.username);
      })
    )
  }

  logIn(account: { email: string, password: string }) {
    return this.http.post<User>(this.root + 'login', account, { withCredentials: true })
      .pipe(
      tap((response) => {
        this.signedin$.next(true);
        this.isAdmin$.next(response.isAdmin);
        this.username$.next(response.username)
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
        tap(({ username, isAdmin }) => {
          this.signedin$.next(true);
          this.isAdmin$.next(isAdmin);
          this.username$.next(username);
          return { username, isAdmin };
        })
      );
  }

  logOut(){
    return this.http.post(this.root + "logout", {}, {withCredentials: true})
      .pipe(
        tap(() => {
          this.signedin$.next(false);
          this.username$.next('');
          this.isAdmin$.next(false);
        })
      );
  }

  userPermissions(username: string){
    return this.username$.getValue() === username;
  }
}
