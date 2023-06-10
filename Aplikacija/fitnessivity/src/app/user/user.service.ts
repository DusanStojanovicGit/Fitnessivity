import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateUserDto, User } from './user.entity';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private root = 'http://10.241.185.86:3000/user/';
  constructor(private http: HttpClient,
    private authService: AuthService) { }

  getUserByUsername(username: string | null){
    return this.http.get<User>(this.root + username).pipe();
  }

  updateUser(user: UpdateUserDto){
    const response = this.http.put<User>(this.root + 'update', user, {withCredentials: true}).pipe();
    response.subscribe(res => {
      this.authService.username$.next(res.username);
    })
    return response;
  }
}
