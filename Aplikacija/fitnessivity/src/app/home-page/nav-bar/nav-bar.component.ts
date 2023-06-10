import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
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
  constructor(private authService: AuthService){
    this.signedin$ = this.authService.signedin$;
    this.username$ = this.authService.username$;
    this.isAdmin$ = this.authService.isAdmin$;
  }

  ngOnInit(){
    //this.authService.checkAuth().subscribe(() => {});
  }
  logOut(){
    this.authService.logOut();
  }
}


