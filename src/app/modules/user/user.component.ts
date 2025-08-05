import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { Permission } from '../permission/data-access/models';
import { PermissionStateSelector } from '../permission/data-access/store';
import { Role } from '../role/data-access/models';
import { RoleStateSelector } from '../role/data-access/store';
import { User } from './data-access/models/user.model';
import {
  CreateUserAction,
  DeleteUserAction,
  GetAllUsersAction,
  UpdateUserAction,
  UserStateSelector,
} from './data-access/store';
import { UserFormComponent } from './feature/user-form/user-form.component';

/**
 * Displays and manages the list of users.
 */
@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  userList$: Observable<User[]> = inject(Store).select(
    UserStateSelector.SliceOf('userList')
  );

  roleList$: Observable<Role[]> = inject(Store).select(
    RoleStateSelector.SliceOf('roleList')
  );

  private _store = inject(Store);
  private _modal = inject(NzModalService);

  ngOnInit(): void {
    this._store.dispatch(new GetAllUsersAction());
  }

  openCreateOrEditUserModal(user: User | null) {
    const modalRef = this._modal.create({
      nzTitle: user ? 'Edit User' : 'Create User',
      nzContent: UserFormComponent,
      nzFooter: null,
    });

    modalRef.getContentComponent().userData = user;
    modalRef.getContentComponent().allRoles$ = this.roleList$;
    modalRef.getContentComponent().allUsers$ = this.userList$;

    modalRef.afterClose.subscribe((result: any) => {
      if (result) {
        if (user) {
          this._store.dispatch(new UpdateUserAction(user.id, result));
        } else {
          this._store.dispatch(new CreateUserAction(result));
        }
      }
    });
  }

  onDeleteUser(user: User): void {
    this._modal.confirm({
      nzTitle: `Are you sure you want to delete ${user.firstName}?`,
      nzOnOk: () => this._store.dispatch(new DeleteUserAction(user.id)),
    });
  }

  hasPermission(key: string): boolean {
    // Read user from localStorage
    const userJson = localStorage.getItem('auth_user');
    if (!userJson) return false;

    let userDetails: any;
    try {
      userDetails = JSON.parse(userJson);
    } catch {
      return false;
    }
    const user = userDetails.user;

    // Read roles and permissions from store snapshots
    const roles = this._store.selectSnapshot<Role[]>(
      RoleStateSelector.SliceOf('roleList')
    );
    const permissions = this._store.selectSnapshot<Permission[]>(
      PermissionStateSelector.SliceOf('permissionList')
    );

    if (!user || !roles || !permissions) return false;

    const role = roles.find((r) => r.id === user.roleId);
    if (!role) return false;
    const userPermissionKeys = role.permissionIds
      .map((pid) => permissions.find((p) => p.id === pid)?.key)
      .filter(Boolean);

    return userPermissionKeys.includes(key);
  }

  hasRole(roleName: string): boolean {
    // Read user from localStorage
    const userJson = localStorage.getItem('auth_user');
    if (!userJson) return false;

    let userDetails: any;
    let user: User;
    try {
      userDetails = JSON.parse(userJson);
      user = userDetails.user;
    } catch {
      return false;
    }

    const roles = this._store.selectSnapshot<Role[]>(
      RoleStateSelector.SliceOf('roleList')
    );
    if (!user || !roles) return false;

    const role = roles.find((r) => r.id === user.roleId);
    return role?.name === roleName;
  }
}
