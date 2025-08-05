import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

/**
 * Guard that allows access only to users with `isSuperAdmin = true`.
 *
 * If the user is not a super admin, they are redirected to the `/users` route.
 */
@Injectable({ providedIn: 'root' })
export class SuperAdminGuard implements CanActivate {
  /** Angular Router instance for navigation */
  private _router = inject(Router);

  /**
   * Determines whether the current user can activate the route.
   *
   * @returns `true` if user is a super admin, otherwise redirects and returns `false`
   */
  canActivate(): boolean {
    const userDetails = localStorage.getItem('auth_user');
    const userJson = userDetails ? JSON.parse(userDetails) : null;

    const user = userJson?.user; // Adjust if user is stored flat
    if (user && user.isSuperAdmin) {
      return true;
    }

    this._router.navigate(['/users']);
    return false;
  }
}
