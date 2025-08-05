import { User } from '../models/user.model';

/**
 * Interface representing the user state model.
 *
 * Used by NGXS to manage user-related data.
 */
export interface UserStateModel {
  errorMessage: Error | null;
  isLoading: boolean;
  userList: User[];
}

/**
 * Default initial state for users.
 *
 * Defines default values for the UserStateModel.
 */
export const initialUserStateModel: UserStateModel = {
  errorMessage: null,
  isLoading: false,
  userList: [],
};
