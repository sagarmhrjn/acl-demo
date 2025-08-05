import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';

/**
 * A class for handling role service
 * */
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private baseUrl = 'http://localhost:3000/roles';

  private _http = inject(HttpClient);

  /**
   * Get all roles
   *
   * @returns Observable of type array of role
   * */
  getAllRoles(): Observable<Role[]> {
    return this._http.get<Role[]>(this.baseUrl);
  }

  /**
   * Get role by id
   *
   * @param id role id of type number
   *
   * @returns Observable of type role
   * */
  getRoleById(id: number): Observable<Role> {
    return this._http.get<Role>(`${this.baseUrl}/${id}`);
  }

  /**
   * Create a new role
   *
   * @param role data payload of type role
   *
   * @returns Observable of type role
   * */
  createRole(role: Role): Observable<Role> {
    return this._http.post<Role>(this.baseUrl, role);
  }

  /**
   * Update role by id
   *
   * @param id role id of type number
   * @param role partial data payload of type role
   *
   * @returns Observable of type Permission
   * */
  updateRole(id: number, user: Partial<Role>): Observable<Role> {
    return this._http.put<Role>(`${this.baseUrl}/${id}`, user);
  }

  /**
   * Delete role by id
   *
   * @param id role id of type number
   *
   * @returns Observable of type void
   * */
  deleteRole(id: string): Observable<void> {
    return this._http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
