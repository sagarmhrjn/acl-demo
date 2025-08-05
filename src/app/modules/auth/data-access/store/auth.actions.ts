import { AuthDTO } from '../models/auth.model';

/**
 * Action type constant for login action.
 * Used to identify the login operation.
 */
export const LOGIN = '[Auth] Login';

/**
 * Dispatch this action to initiate the login process.
 *
 * @param payload - The user's login credentials (email and password).
 */
export class LoginAction {
  static readonly type = LOGIN;

  constructor(public payload: AuthDTO) {}
}
