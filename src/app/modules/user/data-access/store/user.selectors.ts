import { createSelector } from '@ngxs/store';
import { UserStates } from './user.states';
import { UserStateModel } from './user-state.model';

/**
 * Utility class for creating selectors to access slices of the UserStateModel.
 */
export class UserStateSelector {
  /**
   * Creates a selector for a specific key of the UserStateModel.
   *
   * @param stateKey The key of the UserStateModel slice to select.
   *
   * @returns A selector function for the specified slice.
   */
  static SliceOf<K extends keyof UserStateModel>(stateKey: K): any {
    return createSelector([UserStates], (state: UserStateModel) => {
      return state[stateKey];
    });
  }
}
