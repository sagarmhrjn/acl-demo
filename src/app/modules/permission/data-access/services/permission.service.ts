import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from '../models/permission.model';

/**
 * A class for handling permission service
 * */
@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private baseUrl = 'http://localhost:3000/permissions';

  private _http = inject(HttpClient);

  /**
   * Get all permissions
   *
   * @returns Observable of type array of permission
   * */
  getAllPermissions(): Observable<Permission[]> {
    return this._http.get<Permission[]>(this.baseUrl);
  }

  /**
   * Get permission by id
   *
   * @param id permission id of type number
   *
   * @returns Observable of type permission
   * */
  getPermissionById(id: number): Observable<Permission> {
    return this._http.get<Permission>(`${this.baseUrl}/${id}`);
  }

  /**
   * Create a new permission
   *
   * @param permission data payload of type permission
   *
   * @returns Observable of type permission
   * */
  createPermission(permission: Permission): Observable<Permission> {
    return this._http.post<Permission>(this.baseUrl, permission);
  }

  /**
   * Update permission by id
   *
   * @param id permission id of type number
   * @param permission partial data payload of type permission
   *
   * @returns Observable of type Permission
   * */
  updatePermission(
    id: number,
    user: Partial<Permission>,
  ): Observable<Permission> {
    return this._http.put<Permission>(`${this.baseUrl}/${id}`, user);
  }

  /**
   * Delete permission by id
   *
   * @param id permission id of type number
   *
   * @returns Observable of type void
   * */
  deletePermission(id: number): Observable<void> {
    return this._http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
