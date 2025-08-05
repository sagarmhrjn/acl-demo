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
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { Observable, map, of, take } from 'rxjs';
import { Role } from '../../role/data-access/models';
import { User } from '../data-access/models/user.model';

@Component({
  selector: 'app-user-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzSwitchModule,
    NzInputModule,
    NzFormModule,
    NzButtonComponent,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  /** Reactive user form instance */
  userForm!: FormGroup;

  /** Holds user data if editing an existing user */
  userData: any;

  /** Observable stream of all available roles */
  allRoles$!: Observable<Role[]>;

  /** Observable stream of all existing users */
  allUsers$!: Observable<User[]>;

  /** Injected FormBuilder for constructing forms */
  private _fb = inject(FormBuilder);

  /** Reference to the modal instance */
  private _modalRef = inject(NzModalRef);

  /**
   * Angular lifecycle method - initializes the user form on component init
   */
  ngOnInit(): void {
    this.initializeUserForm();
  }

  /**
   * Initializes the user form group with validation and conditional logic
   * for both creation and edit mode.
   */
  initializeUserForm(): void {
    this.userForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: [
        '',
        Validators.required,
        this.uniqueUsernameValidator(this.allUsers$, this.userData?.id),
      ],
      password: [null],
      roleId: [null, Validators.required],
      isActive: [true],
    });

    // If editing a user, pre-fill the form and adjust password validation
    if (this.userData) {
      this.userForm.patchValue({
        ...this.userData,
        roleId: this.userData.roleId, // ensure correct type
      });
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    } else {
      this.userForm.get('password')?.setValidators(Validators.required);
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  /**
   * Async validator to ensure the username is unique among users.
   *
   * @param users$ - Observable of all users
   * @param currentUserId - Current user ID in edit mode, optional
   * @returns AsyncValidatorFn that checks for unique username
   */
  uniqueUsernameValidator(
    users$: Observable<User[]>,
    currentUserId?: string,
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const username = control.value?.trim().toLowerCase();
      if (!username) return of(null);

      return users$.pipe(
        take(1),
        map((users) => {
          const duplicate = users.some(
            (u) =>
              u.username.toLowerCase() === username && u.id !== currentUserId,
          );
          return duplicate ? { nonUnique: true } : null;
        }),
      );
    };
  }

  /**
   * Submit handler for the form.
   * Closes the modal with form data if valid.
   */
  submit(): void {
    if (this.userForm.valid) {
      this._modalRef.close(this.userForm.value);
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  /**
   * Cancel handler for the form.
   * Closes the modal without submitting data.
   */
  cancel(): void {
    this._modalRef.destroy();
  }
}
