/**
 * Data Transfer Object used for user login authentication.
 */
export interface AuthDTO {
  email: string;
  password: string;
}

/**
 * Represents detailed user information returned from the backend.
 */
export interface User {
  id: number | string;
  username: string;
  email: string;
  firstName?: string;
  password: string;
  lastName?: string;
  roles: string[];
  isActive?: boolean;
  isSuperAdmin: boolean;
}
