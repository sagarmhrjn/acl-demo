import { Role } from '../models';

/**
 * Interface representing the user state model.
 *
 * Used by NGXS to manage user-related data.
 */
export interface RoleStateModel {
  errorMessage: Error | null;
  isLoading: boolean;
  roleList: Role[];
}

/**
 * Default initial state for users.
 *
 * Defines default values for the RoleStateModel.
 */
export const initialRoleStateModel: RoleStateModel = {
  errorMessage: null,
  isLoading: false,
  roleList: [],
};
