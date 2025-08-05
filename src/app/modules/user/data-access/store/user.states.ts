import { Injectable, inject } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { catchError, map, of, tap } from 'rxjs';
import { Role } from '../../../role/data-access/models';
import { RoleStateSelector } from '../../../role/data-access/store';
import { UserService } from '../services';
import { UserStateModel, initialUserStateModel } from './user-state.model';
import {
  CreateUserAction,
  DeleteUserAction,
  GetAllUsersAction,
  UpdateUserAction,
} from './user.actions';

/**
 * UserStates manages the NGXS state for user data,
 *
 * including list of users and loading state.
 * It uses the `initialUserStateModel` as default.
 */
@State<UserStateModel>({
  name: 'userState',
  defaults: initialUserStateModel,
})
@Injectable()
export class UserStates {
  /** Injected service to handle user API operations */
  private _userService = inject(UserService);

  /** NGXS store instance for accessing global state */
  private _store = inject(Store);

  /**
   * Action to retrieve all users and map their role names.
   *
   * @param ctx - NGXS StateContext for UserStateModel
   */
  @Action(GetAllUsersAction)
  getUsers(ctx: StateContext<UserStateModel>) {
    ctx.patchState({ isLoading: true });

    const roles: Role[] = this._store.selectSnapshot(
      RoleStateSelector.SliceOf('roleList'),
    );

    const roleMap = new Map<string, string>(
      roles.map((role) => [role.id, role.name] as [string, string]),
    );

    return this._userService.getAllUsers().pipe(
      tap((users) => {
        const enrichedUsers = users.map((user) => ({
          ...user,
          roleName: roleMap.get(user.roleId) || 'Unknown',
        }));
        ctx.patchState({ userList: enrichedUsers, isLoading: false });
      }),
      catchError((err) => {
        ctx.patchState({ isLoading: false });
        return of(err);
      }),
    );
  }

  /**
   * Action to create a new user and add them to the user list.
   * Resolves the user's role name based on `roleId`.
   *
   * @param ctx - NGXS StateContext
   * @param action - CreateUserAction with user payload
   */
  @Action(CreateUserAction)
  createUser(ctx: StateContext<UserStateModel>, action: CreateUserAction) {
    ctx.patchState({ isLoading: true });

    const roles: Role[] = this._store.selectSnapshot(
      RoleStateSelector.SliceOf('roleList'),
    );

    return this._userService.createUser(action.payload).pipe(
      map((newUser) => {
        const roleName =
          roles.find((r) => r.id === newUser.roleId)?.name ?? 'Unknown';
        return { ...newUser, roleName };
      }),
      tap((userWithRoleName) => {
        const state = ctx.getState();
        ctx.patchState({
          userList: [...state.userList, userWithRoleName],
          isLoading: false,
        });
      }),
      catchError((err) => {
        ctx.patchState({ isLoading: false });
        return of(err);
      }),
    );
  }

  /**
   * Action to update an existing user and reflect changes in the state.
   * Resolves the updated user's role name.
   *
   * @param ctx - NGXS StateContext
   * @param action - UpdateUserAction with user ID and updated payload
   */
  @Action(UpdateUserAction)
  updateUser(ctx: StateContext<UserStateModel>, action: UpdateUserAction) {
    ctx.patchState({ isLoading: true });

    const roles: Role[] = this._store.selectSnapshot(
      RoleStateSelector.SliceOf('roleList'),
    );

    return this._userService.updateUser(action.id, action.payload).pipe(
      map((updatedUser) => {
        const roleName =
          roles.find((r) => r.id === updatedUser.roleId)?.name ?? 'Unknown';
        return { ...updatedUser, roleName };
      }),
      tap((userWithRoleName) => {
        const state = ctx.getState();
        const updatedList = state.userList.map((user) =>
          user.id === userWithRoleName.id ? userWithRoleName : user,
        );
        ctx.patchState({
          userList: updatedList,
          isLoading: false,
        });
      }),
      catchError((err) => {
        ctx.patchState({ isLoading: false });
        return of(err);
      }),
    );
  }

  /**
   * Action to delete a user from the state by ID.
   *
   * @param ctx - NGXS StateContext
   * @param action - DeleteUserAction with user ID
   */
  @Action(DeleteUserAction)
  deleteUser(ctx: StateContext<UserStateModel>, action: DeleteUserAction) {
    ctx.patchState({ isLoading: true });

    return this._userService.deleteUser(action.id).pipe(
      tap(() => {
        const state = ctx.getState();
        const filtered = state.userList.filter(
          (user: any) => user.id !== action.id,
        );
        ctx.patchState({
          userList: filtered,
          isLoading: false,
        });
      }),
      catchError((err) => {
        ctx.patchState({ isLoading: false });
        return of(err);
      }),
    );
  }
}
