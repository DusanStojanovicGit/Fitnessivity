import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { User } from './user/user.entity';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  constructor(private router: Router){}
  private attemptedRoute: ActivatedRouteSnapshot | null = null;

  setAttemptedRoute(route: ActivatedRouteSnapshot): void {
    this.attemptedRoute = route;
  }

  getAttemptedRoute(): ActivatedRouteSnapshot | null {
    return this.attemptedRoute;
  }

  clearAttemptedRoute(): void {
    this.attemptedRoute = null;
  }
  loginRegisterRedirect(response: User){
    const attemptedRoute = this.getAttemptedRoute();
    if (attemptedRoute) {
      this.router.navigateByUrl(attemptedRoute.url.join('/'));
      this.clearAttemptedRoute();
    } else {
      this.router.navigate(['/users', response.username]);
    }
  }
}
