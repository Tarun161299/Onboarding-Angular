
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
@Injectable({
  providedIn: "root"
})
export class ZmstFeeTypeService {
  constructor(private http: HttpClient) {
  }
  insert(data: any): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstFeeType_Insert, data, { headers: headers });
  }
  update(data: any): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstFeeType_Update, data, { headers: headers });
  }
  delete(activityid: any) {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstFeeType_Delete + activityid, { headers: headers });
  }
  getAll(): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.ZmstFeeType_GetAll, { headers: headers });
  }
  getById(activityid: any): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.ZmstFeeType_GetById + activityid, { headers: headers });
  }
}