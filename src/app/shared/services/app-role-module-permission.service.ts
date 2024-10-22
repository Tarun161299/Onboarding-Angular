
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { AppRoleModulePermissionModel } from "../model/app-role-module-permission.model";
import { AppRoleModulemodel } from 'src/app/model/AppRoleModulemodel.model';
import { ListItem } from "ng-multiselect-dropdown/multiselect.model";

@Injectable({
  providedIn: "root"
})

export class AppRoleModulePermissionService {
  constructor(private http: HttpClient) {

  }

 
  insert(data: any,roleid:any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.AppRoleModulePermission_Insert + roleid, data, { headers: headers });
  } 


  update(data: any ): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.put<any>(ApiEndPoints.AppRoleModulePermission_Update, data, { headers: headers });
  }
  delete(roleid: any) {
    const headers = { "Accept": "text/plain" }
    return this.http.delete<any>(ApiEndPoints.AppRoleModulePermission_Delete + roleid, { headers: headers });
  }
  getAll(): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.AppRoleModulePermission_GetAll, { headers: headers });
  }
  getById(roleid: any): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.AppRoleModulePermission_GetById + roleid, { headers: headers });
  }

  BindRoledropdown(): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.BindRole, { headers: headers });
  }

}