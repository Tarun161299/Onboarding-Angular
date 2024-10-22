
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { AppUserRoleMappingModel } from "../model/app-user-role-mapping.model";
@Injectable({
  providedIn: "root"
})

export class AppUserRoleMappingService {
  constructor(private http: HttpClient) {
  }

 insert(data: any,Userroleid:any): Observable<any> {
  localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.AppUserRoleMapping_Insert  + Userroleid, data, { headers: headers });
  } 

  update(data: any ): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.put<any>(ApiEndPoints.AppUserRoleMapping_Update, data, { headers: headers });
  }
  delete(userid: any) {
    const headers = { "Accept": "text/plain" }
    return this.http.delete<any>(ApiEndPoints.AppUserRoleMapping_Delete + userid, { headers: headers });
  }
  getById(userid: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.AppUserRoleMapping_GetById + userid, { headers: headers });
  }

  BindRoledropdown(): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.BindUserRole, { headers: headers });
  }
    }