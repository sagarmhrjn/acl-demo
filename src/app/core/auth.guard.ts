import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

/**
 * Guard that restricts access to routes for unauthenticated users.
 *
 * If no user is found in `localStorage`, it redirects to the login page (`/account/login`).
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  /** Angular Router instance used for redirection */
  private _router = inject(Router);

  /**
   * Determines whether a route can be activated.
   *
   * @returns `true` if a user is found in `localStorage`, otherwise redirects to `/account/login` and returns `false`.
   */
  canActivate(): boolean {
    const userJson = localStorage.getItem('auth_user');
    const user = userJson ? JSON.parse(userJson) : null;

    if (user) {
      return true;
    }

    this._router.navigate(['/account/login']);
    return false;
  }
}
