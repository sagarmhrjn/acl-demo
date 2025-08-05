import { Permission } from '../models/permission.model';

/**
 * Interface representing the user state model.
 *
 * Used by NGXS to manage user-related data.
 */
export interface PermissionStateModel {
  errorMessage: Error | null;
  isLoading: boolean;
  permissionList: Permission[];
}

/**
 * Default initial state for users.
 *
 * Defines default values for the PermissionStateModel.
 */
export const initialPermissionStateModel: PermissionStateModel = {
  errorMessage: null,
  isLoading: false,
  permissionList: [],
};
