import { createSelector } from '@ngxs/store';
import { PermissionStateModel } from './permission-state.model';
import { PermissionStates } from '.';

/**
 * Utility class for creating selectors to access slices of the PermissionStateModel.
 */
export class PermissionStateSelector {
  /**
   * Creates a selector for a specific key of the PermissionStateModel.
   *
   * @param stateKey The key of the PermissionStateModel slice to select.
   *
   * @returns A selector function for the specified slice.
   */
  static SliceOf<K extends keyof PermissionStateModel>(stateKey: K): any {
    return createSelector([PermissionStates], (state: PermissionStateModel) => {
      return state[stateKey];
    });
  }
}
