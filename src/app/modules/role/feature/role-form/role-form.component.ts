import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCheckboxModule, NzCheckboxOption } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Observable, map, of, take } from 'rxjs';
import { Permission } from '../../../permission/data-access/models';
import { Role } from '../../data-access/models';

@Component({
  selector: 'app-role-form',
  imports: [
    CommonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzButtonComponent,
    NzInputModule,
    NzSelectModule,
  ],
  templateUrl: './role-form.component.html',
})
export class RoleFormComponent implements OnInit {
  roleForm!: FormGroup;
  roleData: any;
  allRoles$!: Observable<Role[]>;
  allPermissions$!: Observable<Permission[]>;
  allPermissions: Permission[] = [];

  private _fb = inject(FormBuilder);
  private _modalRef = inject(NzModalRef);

  ngOnInit() {
    this.initializeRoleForm();
    this.allPermissions$.subscribe((permissions) => {
      this.allPermissions = permissions;
    });
    if (this.roleData) {
      this.roleForm.patchValue(this.roleData);
    }
  }

  initializeRoleForm(): void {
    this.roleForm = this._fb.group({
      name: this._fb.control('', {
        validators: [Validators.required],
        asyncValidators: [
          this.uniqueNameAsyncValidator(
            this.allRoles$,
            this.roleData?.id ?? null,
          ),
        ],
        updateOn: 'blur',
      }),
      description: [''],
      permissionIds: [[]],
    });
  }

  uniqueNameAsyncValidator(
    allRoles$: Observable<any[]>,
    currentRoleId?: any,
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const name = control.value?.trim().toLowerCase();
      if (!name) {
        return of(null);
      }

      return allRoles$.pipe(
        take(1), // take the latest roles list once
        map((roles) => {
          const duplicate = roles.some(
            (r) =>
              r.name.trim().toLowerCase() === name && r.id !== currentRoleId,
          );
          return duplicate ? { nonUnique: true } : null;
        }),
      );
    };
  }

  get permissionOptions(): NzCheckboxOption[] {
    return this.allPermissions.map((p) => ({
      label: p.name,
      value: p.id,
    }));
  }

  submit(): void {
    if (this.roleForm.invalid) return;
    this._modalRef.close(this.roleForm.value); // Pass data back to caller
  }

  cancel(): void {
    this._modalRef.destroy(); // Close modal without data
  }
}
