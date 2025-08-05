import { createSelector } from '@ngxs/store';
import { AuthStateModel } from './auth-state.model';
import { AuthStates } from './auth.states';

/**
 * Utility class for creating selectors to access slices of the AuthStateModel.
 */
export class AuthStateSelector {
  /**
   * Creates a selector for a specific key of the AuthStateModel.
   *
   * @param stateKey The key of the AuthStateModel slice to select.
   *
   * @returns A selector function for the specified slice.
   */
  static SliceOf<K extends keyof AuthStateModel>(stateKey: K): any {
    return createSelector([AuthStates], (state: AuthStateModel) => {
      return state[stateKey];
    });
  }
}
