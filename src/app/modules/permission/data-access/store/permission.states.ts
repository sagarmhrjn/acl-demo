import { Injectable, inject } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { catchError, of, tap } from 'rxjs';
import { PermissionService } from '../services';
import {
  PermissionStateModel,
  initialPermissionStateModel,
} from './permission-state.model';
import {
  CreatePermissionAction,
  DeletePermissionAction,
  GetAllPermissionAction,
  UpdatePermissionAction,
} from './permission.actions';

/**
 * UserStates manages the NGXS state for user data,
 *
 * including list of users and loading state.
 * It uses the `initialPermissionStateModel` as default.
 */
@State<PermissionStateModel>({
  name: 'permissionState',
  defaults: initialPermissionStateModel,
})
@Injectable()
export class PermissionStates {
  private _permissionService = inject(PermissionService);

  @Action(GetAllPermissionAction)
  getAllPermission(ctx: StateContext<PermissionStateModel>) {
    ctx.patchState({ isLoading: true });
    return this._permissionService.getAllPermissions().pipe(
      tap((permissions) => {
        ctx.patchState({ permissionList: permissions, isLoading: false });
      }),
      catchError((err) => {
        ctx.patchState({ isLoading: false });
        return of(err);
      }),
    );
  }

  @Action(CreatePermissionAction)
  createPermission(
    ctx: StateContext<PermissionStateModel>,
    action: CreatePermissionAction,
  ) {
    ctx.patchState({ isLoading: true });
    return this._permissionService.createPermission(action.payload).pipe(
      tap((newPermission) => {
        const state = ctx.getState();
        ctx.patchState({
          permissionList: [...state.permissionList, newPermission],
          isLoading: false,
        });
      }),
      catchError((err) => {
        ctx.patchState({ isLoading: false });
        return of(err);
      }),
    );
  }

  @Action(UpdatePermissionAction)
  updatePermission(
    ctx: StateContext<PermissionStateModel>,
    action: UpdatePermissionAction,
  ) {
    ctx.patchState({ isLoading: true });
    return this._permissionService
      .updatePermission(action.id, action.payload)
      .pipe(
        tap((updatedPermission) => {
          const state = ctx.getState();
          const updatedList = state.permissionList.map((user: any) =>
            user.id === updatedPermission.id ? updatedPermission : user,
          );
          ctx.patchState({
            permissionList: updatedList,
            isLoading: false,
          });
        }),
        catchError((err) => {
          ctx.patchState({ isLoading: false });
          return of(err);
        }),
      );
  }

  @Action(DeletePermissionAction)
  deletePermission(
    ctx: StateContext<PermissionStateModel>,
    action: DeletePermissionAction,
  ) {
    ctx.patchState({ isLoading: true });
    return this._permissionService.deletePermission(action.id).pipe(
      tap(() => {
        const state = ctx.getState();
        const filtered = state.permissionList.filter(
          (permission: any) => permission.id !== action.id,
        );
        ctx.patchState({
          permissionList: filtered,
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
