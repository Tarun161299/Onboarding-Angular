
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
@Injectable({
  providedIn: "root"
})
export class ZmstIdentityTypeService {
  constructor(private http: HttpClient) {
  }
  insert(data: any): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstIdentityType_Insert, data, { headers: headers });
  }
  update(data: any): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstIdentityType_Update, data, { headers: headers });
  }
  delete(identitytypeid: any) {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstIdentityType_Delete + identitytypeid, { headers: headers });
  }
  getAll(): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.ZmstIdentityType_GetAll, { headers: headers });
  }
  getById(identitytypeid: any): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.ZmstIdentityType_GetById + identitytypeid, { headers: headers });
  }
}