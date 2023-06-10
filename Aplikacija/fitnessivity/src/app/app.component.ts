import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fitnessivity';
  signedin$: BehaviorSubject<boolean | null>;
  isAdmin$: BehaviorSubject<boolean | null>;
  constructor(private authService: AuthService){
    this.signedin$ = this.authService.signedin$;
    this.isAdmin$ = this.authService.isAdmin$;
  }

  ngOnInit(){
    this.authService.checkAuth().subscribe(() => {});
  }
}
