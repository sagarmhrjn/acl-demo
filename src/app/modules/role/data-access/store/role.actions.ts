import { Role } from '../models/role.model';

/**
 * Action to fetch all Roles.
 */
export class GetAllRoleAction {
  static readonly type = '[Role] Get All';
}

/**
 * Action to fetch a single Role by their ID.
 */
export class GetRoleByIdAction {
  static readonly type = '[Role] Get By ID';

  /**
   * @param id - ID of the Role to retrieve
   */
  constructor(public id: number) {}
}

/**
 * Action to create a new Role.
 */
export class CreateRoleAction {
  static readonly type = '[Role] Create';

  /**
   * @param payload - New Role data
   */
  constructor(public payload: Role) {}
}

/**
 * Action to update an existing Role.
 */
export class UpdateRoleAction {
  static readonly type = '[Role] Update';

  /**
   * @param id - ID of the Role to update
   * @param payload - Partial Role data to update
   */
  constructor(
    public id: number,
    public payload: Partial<Role>,
  ) {}
}

/**
 * Action to delete a Role by ID.
 */
export class DeleteRoleAction {
  static readonly type = '[Role] Delete';

  /**
   * @param id - ID of the Role to delete
   */
  constructor(public id: string) {}
}
