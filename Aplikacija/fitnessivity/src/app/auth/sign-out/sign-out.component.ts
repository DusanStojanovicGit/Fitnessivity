import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.logOut().subscribe(() => {
      //this.router.navigateByUrl('/');
    });
  }
}
