import { Injectable, inject } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, State, StateContext } from '@ngxs/store';
import { catchError, map, of } from 'rxjs';
import { AuthStateModel, LoginAction, initialAuthStateModel } from '.';
import { AuthService } from '../services/auth.service';

/**
 * AuthStates manages the NGXS state for authentication data,
 * including login and the register state.
 * It uses the `initialAuthStateModel` as default.
 */
@State<AuthStateModel>({
  name: 'auth',
  defaults: initialAuthStateModel,
})
@Injectable()
export class AuthStates {
  private _authService = inject(AuthService);

  /**
   * Submits the user login form to the authentication service.
   *
   * @param ctx - The state context for the login state model.
   * @param action - The action containing the user login data.
   *
   * @returns An observable emitting the result of the login payload.
   */
  @Action(LoginAction)
  login(ctx: StateContext<AuthStateModel>, action: LoginAction): unknown {
    ctx.patchState({ isLoading: true });
    return this._authService.login(action.payload).pipe(
      map((user: any) => {
        localStorage.setItem('auth_user', JSON.stringify(user));
        ctx.dispatch(new Navigate(['/users']));
        return ctx.patchState({ userDetails: user });
      }),
      catchError((error) => {
        ctx.patchState({ isLoading: false });
        return of(error);
      }),
    );
  }
}
