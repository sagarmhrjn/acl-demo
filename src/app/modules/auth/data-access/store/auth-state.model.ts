/**
 * Interface representing the authentication state model.
 *
 * Used by NGXS to manage auth-related data.
 */
export interface AuthStateModel {
  errorMessage: Error | null;
  isLoading: boolean;
  token: string | null;
  userDetails: any;
}

/**
 * Default initial state for authentication.
 *
 * Defines default values for the AuthStateModel.
 */
export const initialAuthStateModel: AuthStateModel = {
  errorMessage: null,
  isLoading: false,
  token: null,
  userDetails: {
    id: '',
    email: '',
    fullName: '',
    phone: null,
  },
};
