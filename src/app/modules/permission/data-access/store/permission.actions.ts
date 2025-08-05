import { Permission } from '../models/permission.model';

/**
 * Action to fetch all permissions.
 */
export class GetAllPermissionAction {
  static readonly type = '[Permission] Get All';
}

/**
 * Action to fetch a single permission by their ID.
 */
export class GetPermissionByIdAction {
  static readonly type = '[Permission] Get By ID';

  /**
   * @param id - ID of the permission to retrieve
   */
  constructor(public id: number) {}
}

/**
 * Action to create a new permission.
 */
export class CreatePermissionAction {
  static readonly type = '[Permission] Create';

  /**
   * @param payload - New permission data
   */
  constructor(public payload: Permission) {}
}

/**
 * Action to update an existing permission.
 */
export class UpdatePermissionAction {
  static readonly type = '[Permission] Update';

  /**
   * @param id - ID of the permission to update
   * @param payload - Partial permission data to update
   */
  constructor(
    public id: number,
    public payload: Partial<Permission>,
  ) {}
}

/**
 * Action to delete a permission by ID.
 */
export class DeletePermissionAction {
  static readonly type = '[Permission] Delete';

  /**
   * @param id - ID of the permission to delete
   */
  constructor(public id: number) {}
}
