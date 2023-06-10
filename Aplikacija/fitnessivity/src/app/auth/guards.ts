import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { first, skipWhile, take } from 'rxjs';
import { RedirectService } from '../redirect.service';

export function loginRegisterGuard(): CanActivateFn {
  return async () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    const signedIn = await authService.signedin$.pipe(
        skipWhile(value => value === null),
        take(1)
    ).toPromise();

    if (signedIn) {
        router.navigate(['/']);
        return false;
    }
    else {
        return true;
    }
  };
}

export function adminGuard(): CanActivateFn {
    return async () => {
        const authService: AuthService = inject(AuthService);
        const router: Router = inject(Router);
        
        const isAdmin = await authService.isAdmin$.pipe(
            skipWhile(value => value === null),
            take(1)
        ).toPromise();
        console.log(isAdmin);
        if (isAdmin) {
            return true;
        }
        else {
            router.navigate(['/']);
            return false;
        }   
    };
}


export function loggedInGuard(url: string): CanActivateFn {
    return async () => {
        const authService: AuthService = inject(AuthService);
        const router: Router = inject(Router);
        const redirectService: RedirectService = inject(RedirectService);

        const signedIn = await authService.signedin$.pipe(
            skipWhile(value => value === null),
            take(1)
        ).toPromise();

        if (signedIn) {
            return true;
        }
        else {
            const customSnapshot: ActivatedRouteSnapshot = {
                url: router.parseUrl(url).root.children['primary'].segments,
                // Add other properties if required
              } as ActivatedRouteSnapshot;
            redirectService.setAttemptedRoute(customSnapshot);
            router.navigate(['/login']);
            return false;
        }
    }
}
