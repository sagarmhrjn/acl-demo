/**
 * Represents detailed permission information returned from the backend.
 */
export interface Role {
  id: string;
  name: string;
  description: string;
  permissionIds: string[];
  permissionNames: string[];
}
