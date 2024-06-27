import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../authService/authServcie';
import { Role } from '../modals/role';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const useRole = this.authService.getLoginResponse()?.role; 
    const userPermissions: string[] = this.authService.getLoginResponse()?.permissions || []; 
    const requiredRoles = next.data['roles'] as Role[];
    if (useRole && requiredRoles) {
      const hasRequiredRole = requiredRoles.some(role => role.includes(useRole));
      const hasRequiredPermission = userPermissions.some(permission => requiredRoles.some(role => role.includes(permission)));
      if (hasRequiredRole || hasRequiredPermission) {
          return true;
      }
      else{
        this.router.navigate(['/error'])
        return false;
      }
  }
  return false;
  }
}
