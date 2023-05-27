import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.entity';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private root = 'http://localhost:3000/user/';
  constructor(private http: HttpClient) { }

  getUserByUsername(username: string | null){
    return this.http.get<User>(this.root + username).pipe();
  }
}
