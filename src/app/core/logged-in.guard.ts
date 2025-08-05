import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

/**
 * Guard that prevents logged-in users from accessing routes like the login or registration pages.
 *
 * If a user is already authenticated (present in localStorage), they will be redirected to `/users`.
 */
@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanActivate {
  /** Angular Router instance for navigation */
  private _router = inject(Router);

  /**
   * Determines whether the route can be activated.
   *
   * @returns `true` if user is not logged in (no `auth_user` in localStorage),
   * otherwise redirects to `/users` and returns `false`.
   */
  canActivate(): boolean {
    const userJson = localStorage.getItem('auth_user');
    const user = userJson ? JSON.parse(userJson) : null;

    if (user) {
      this._router.navigate(['/users']);
      return false;
    }

    return true;
  }
}
