import { User } from '../models/user.model';

/**
 * Action to fetch all users.
 */
export class GetAllUsersAction {
  static readonly type = '[User] Get All';
}

/**
 * Action to fetch a single user by their ID.
 */
export class GetUserByIdAction {
  static readonly type = '[User] Get By ID';

  /**
   * @param id - ID of the user to retrieve
   */
  constructor(public id: string) {}
}

/**
 * Action to create a new user.
 */
export class CreateUserAction {
  static readonly type = '[User] Create';

  /**
   * @param payload - New user data
   */
  constructor(public payload: User) {}
}

/**
 * Action to update an existing user.
 */
export class UpdateUserAction {
  static readonly type = '[User] Update';

  /**
   * @param id - ID of the user to update
   * @param payload - Partial user data to update
   */
  constructor(
    public id: string,
    public payload: Partial<User>,
  ) {}
}

/**
 * Action to delete a user by ID.
 */
export class DeleteUserAction {
  static readonly type = '[User] Delete';

  /**
   * @param id - ID of the user to delete
   */
  constructor(public id: string) {}
}
