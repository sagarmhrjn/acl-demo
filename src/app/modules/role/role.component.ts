import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { Permission } from '../permission/data-access/models';
import { PermissionStateSelector } from '../permission/data-access/store';
import { Role } from './data-access/models';
import {
  CreateRoleAction,
  DeleteRoleAction,
  GetAllRoleAction,
  RoleStateSelector,
  UpdateRoleAction,
} from './data-access/store';
import { RoleFormComponent } from './feature/role-form/role-form.component';
/**
 * Component to manage user roles.
 *
 * Responsible for displaying, creating, and updating roles and their permissions.
 */
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
  standalone: false,
})
export class RoleComponent {
  /**
   * Observable list of all roles.
   */
  roleList$: Observable<Role[]> = inject(Store).select(
    RoleStateSelector.SliceOf('roleList')
  );

  /**
   * Observable list of all permissions.
   */
  permissionList$: Observable<Permission[]> = inject(Store).select(
    PermissionStateSelector.SliceOf('permissionList')
  );

  /**
   * Injected NGXS store.
   */
  private _store = inject(Store);

  /**
   * Injected Ant Design modal service.
   */
  private _modal = inject(NzModalService);

  /**
   * Initializes the component by fetching all roles.
   */
  ngOnInit(): void {
    this._store.dispatch(new GetAllRoleAction());
  }

  /**
   * Opens a modal to create or edit a role.
   *
   * @param role Optional role object. If provided, edit mode is enabled.
   */
  openCreateOrEditRoleModal(role: any = null): void {
    const modalRef = this._modal.create({
      nzTitle: role ? 'Edit Role' : 'Create Role',
      nzContent: RoleFormComponent,
      nzFooter: null,
    });
    // After creation, set inputs manually
    modalRef.getContentComponent().roleData = role;
    modalRef.getContentComponent().allRoles$ = this.roleList$;
    modalRef.getContentComponent().allPermissions$ = this.permissionList$;

    modalRef.afterClose.subscribe((result: Role | undefined) => {
      if (result) {
        if (role) {
          // Update existing role
          this._store.dispatch(
            new UpdateRoleAction(role.id, {
              name: result.name,
              description: result.description,
              permissionIds: result.permissionIds,
            })
          );
        } else {
          // Create new role
          this._store.dispatch(new CreateRoleAction(result));
        }
      }
    });
  }

  /**
   * Deletes a role after confirmation.
   *
   * @param role The role to delete.
   */
  onDeleteRole(role: Role): void {
    this._modal.confirm({
      nzTitle: `Are you sure you want to delete the role "${role.name}"?`,
      nzOnOk: () => this._store.dispatch(new DeleteRoleAction(role.id)),
    });
  }
}
