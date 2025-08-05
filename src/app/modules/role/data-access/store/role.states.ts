import { Injectable, inject } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { RoleService } from '../services';
import { RoleStateModel, initialRoleStateModel } from './role-state.model';

import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, map, of, tap } from 'rxjs';
import { Permission } from '../../../permission/data-access/models';
import { PermissionStateSelector } from '../../../permission/data-access/store';
import {
  CreateRoleAction,
  DeleteRoleAction,
  GetAllRoleAction,
  UpdateRoleAction,
} from './role.actions';

/**
 * UserStates manages the NGXS state for user data,
 *
 * including list of users and loading state.
 * It uses the `initialRoleStateModel` as default.
 */
@State<RoleStateModel>({
  name: 'roleState',
  defaults: initialRoleStateModel,
})
@Injectable()
export class RoleStates {
  /** Injected role service for backend communication */
  private _roleService = inject(RoleService);

  /** NGXS store instance */
  private _store = inject(Store);

  /** Ant Design message service for user feedback */
  private _message = inject(NzMessageService);

  /**
   * Action to fetch all roles and attach readable permission names.
   *
   * @param ctx - NGXS StateContext for `RoleStateModel`
   */
  @Action(GetAllRoleAction)
  getAllRoles(ctx: StateContext<RoleStateModel>) {
    ctx.patchState({ isLoading: true });

    const permissions: Permission[] = this._store.selectSnapshot(
      PermissionStateSelector.SliceOf('permissionList'),
    );

    return this._roleService.getAllRoles().pipe(
      map((roles) => {
        const mappedRoles = roles.map((role) => ({
          ...role,
          permissionNames: role.permissionIds.map(
            (id) => permissions.find((p) => p.id === id)?.name ?? 'Unknown',
          ),
        }));
        return mappedRoles;
      }),
      tap((roleList) => {
        ctx.patchState({ roleList, isLoading: false });
      }),
      catchError((err) => {
        ctx.patchState({ isLoading: false });
        return of(err);
      }),
    );
  }

  /**
   * Action to create a new role and update the state with the new role.
   * Also adds readable permission names for display.
   *
   * @param ctx - NGXS StateContext
   * @param action - CreateRoleAction payload containing new role data
   */
  @Action(CreateRoleAction)
  createRole(ctx: StateContext<RoleStateModel>, action: CreateRoleAction) {
    ctx.patchState({ isLoading: true });

    const permissions: Permission[] = this._store.selectSnapshot(
      PermissionStateSelector.SliceOf('permissionList'),
    );

    return this._roleService.createRole(action.payload).pipe(
      map((newRole) => {
        const permissionNames = newRole.permissionIds.map(
          (id) => permissions.find((p) => p.id === id)?.name ?? 'Unknown',
        );
        return { ...newRole, permissionNames };
      }),
      tap((newRoleWithNames) => {
        const state = ctx.getState();
        ctx.patchState({
          roleList: [...state.roleList, newRoleWithNames],
          isLoading: false,
        });
        this._message.success('Role created successfully');
      }),
      catchError((err) => {
        ctx.patchState({ isLoading: false });
        return of(err);
      }),
    );
  }

  /**
   * Action to update an existing role and patch the updated version into state.
   * Also maps the updated permission names.
   *
   * @param ctx - NGXS StateContext
   * @param action - UpdateRoleAction with `id` and updated role `payload`
   */
  @Action(UpdateRoleAction)
  updateRole(ctx: StateContext<RoleStateModel>, action: UpdateRoleAction) {
    ctx.patchState({ isLoading: true });

    const permissions: Permission[] = this._store.selectSnapshot(
      PermissionStateSelector.SliceOf('permissionList'),
    );

    return this._roleService.updateRole(action.id, action.payload).pipe(
      map((updatedRole) => {
        const permissionNames = updatedRole.permissionIds.map(
          (id) => permissions.find((p) => p.id === id)?.name ?? 'Unknown',
        );
        return { ...updatedRole, permissionNames };
      }),
      tap((updatedRoleWithNames) => {
        const state = ctx.getState();
        const updatedList = state.roleList.map((role) =>
          role.id === updatedRoleWithNames.id ? updatedRoleWithNames : role,
        );
        ctx.patchState({
          roleList: updatedList,
          isLoading: false,
        });
        this._message.success('Role updated successfully');
      }),
      catchError((err) => {
        ctx.patchState({ isLoading: false });
        return of(err);
      }),
    );
  }

  /**
   * Action to delete a role by ID and update the state.
   *
   * @param ctx - NGXS StateContext
   * @param action - DeleteRoleAction with the `id` of the role to be deleted
   */
  @Action(DeleteRoleAction)
  deleteRole(ctx: StateContext<RoleStateModel>, action: DeleteRoleAction) {
    ctx.patchState({ isLoading: true });

    return this._roleService.deleteRole(action.id).pipe(
      tap(() => {
        const state = ctx.getState();
        const filtered = state.roleList.filter(
          (role: any) => role.id !== action.id,
        );
        ctx.patchState({
          roleList: filtered,
          isLoading: false,
        });
        this._message.success('Role deleted successfully');
      }),
      catchError((err) => {
        ctx.patchState({ isLoading: false });
        return of(err);
      }),
    );
  }
}
