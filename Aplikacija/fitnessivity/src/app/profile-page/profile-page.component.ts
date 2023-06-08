import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../user/user.entity';
import { InfoPartComponent } from './info-part/info-part.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { UniqueUsername } from '../auth/validators/unique-username';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  constructor(private userService: UserService,
    private activatedRoute: ActivatedRoute){};
  user$!: Observable<User>;
  userExists$ = new BehaviorSubject(false);

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      const username = params.get('username');
      this.user$ = this.userService.getUserByUsername(username);
      });
  }
}
