import { NotificationsService } from 'src/app/notifications.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @ViewChild('navList', { static: false }) navList!: ElementRef;

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

  toggleButton() {
    console.log(this.navList);
    this.navList.nativeElement.classList.toggle('active');
  }
}


