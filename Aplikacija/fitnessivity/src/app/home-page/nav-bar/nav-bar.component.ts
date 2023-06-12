import { NotificationsService } from 'src/app/notifications.service';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  signedin$: BehaviorSubject<boolean | null>;
  username$: BehaviorSubject<string>;
  isAdmin$ : BehaviorSubject<boolean | null>;
  constructor(private authService: AuthService,private NotificationsService:NotificationsService){
    this.signedin$ = this.authService.signedin$;
    this.username$ = this.authService.username$;
    this.isAdmin$ = this.authService.isAdmin$;
  }

  logOut(){
    this.authService.logOut();
  }
}


