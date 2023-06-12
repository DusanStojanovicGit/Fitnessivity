import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { skipWhile, take } from 'rxjs';
import { RedirectService } from '../redirect.service';
import { PlanService } from '../plan/plan.service';

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
              } as ActivatedRouteSnapshot;
            redirectService.setAttemptedRoute(customSnapshot);
            router.navigate(['/login']);
            return false;
        }
    }
}

export function ownerGuard(): CanActivateFn {
    return async(route: ActivatedRouteSnapshot) => {
        const authService: AuthService = inject(AuthService);
        const router: Router = inject(Router);
        const planService: PlanService = inject(PlanService);
        const id = route.paramMap.get('id');
        let user = await authService.checkAuth().toPromise();
        console.log(user);
        if (user?.personalPlans.find(p => p._id == id)){
            return true;
        } else {
            const plan = await planService.getPlan(id).toPromise();
            const bool: boolean = (plan?.creator === user?.username);
            if (bool){
                return true;
            } else {
                router.navigate(['/']);
                return false;
            }
        }
    }
}
