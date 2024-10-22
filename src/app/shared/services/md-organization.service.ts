import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { MdOrganizationModel } from "../model/md-organization.model";
import { TokenExpireService } from "../common/tokenExpireService";
import { TokenLocalStorageService } from "../tokenLocalStorage/tokenLocalStorageService";

@Injectable({
  providedIn: "root"
})

export class MdOrganizationService {
  constructor(private storage: TokenLocalStorageService, private http: HttpClient, private tokenExpire: TokenExpireService) {
  }

  insert(data: any): Observable<any> {
    const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.MdOrganization_Insert, data, { headers: headers });
  }
  update(data: MdOrganizationModel): Observable<any> {
    
    const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.MdOrganization_Update, data, { headers: headers });
  }

  logindelete(organizationid: string) {    
    const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.MdOrganization_Delete + organizationid, { headers: headers });
  }

  getAll(): Observable<any> {    
    const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.MdOrganization_GetAll, { headers: headers });
  }
  
  getById(organizationid: string): Observable<any> {    
    const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.MdOrganization_GetById + organizationid);
  }
}
