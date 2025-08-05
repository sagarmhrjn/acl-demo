import { createSelector } from '@ngxs/store';
import { RoleStateModel } from './role-state.model';
import { RoleStates } from './role.states';

/**
 * Utility class for creating selectors to access slices of the RoleStateModel.
 */
export class RoleStateSelector {
  /**
   * Creates a selector for a specific key of the RoleStateModel.
   *
   * @param stateKey The key of the RoleStateModel slice to select.
   *
   * @returns A selector function for the specified slice.
   */
  static SliceOf<K extends keyof RoleStateModel>(stateKey: K): any {
    return createSelector([RoleStates], (state: RoleStateModel) => {
      return state[stateKey];
    });
  }
}
