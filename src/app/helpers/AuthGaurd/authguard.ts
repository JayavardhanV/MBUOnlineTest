import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthenticationService } from '../../services/Authenticate/authenticate.service'

@Injectable({ providedIn: 'root' })
export class Authguard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            return true;
        }

        this.router.navigateByUrl('/login', { queryParams: { returnUrl: state.url } });
        return false;
    }
}
