import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Permission } from './data-access/models/permission.model';
import { PermissionStateSelector } from './data-access/store';

/**
 * Component to manage and display user permissions.
 *
 * Handles listing, assigning, and updating permissions.
 */
@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  standalone: false,
  styleUrl: './permission.component.scss',
})
export class PermissionComponent {
  /**
   * Observable stream of all permissions from the store.
   *
   * Uses the `PermissionStateSelector` to select the `permissionList` slice.
   */
  permissionList$: Observable<Permission[]> = inject(Store).select(
    PermissionStateSelector.SliceOf('permissionList'),
  );
}
