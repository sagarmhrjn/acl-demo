/**
 * Represents detailed user information returned from the backend.
 */
export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roleName: string;
  roleId: string;
  isActive?: boolean;
  isSuperAdmin: boolean;
}
