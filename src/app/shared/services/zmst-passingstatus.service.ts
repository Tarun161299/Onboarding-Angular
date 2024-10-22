
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { ZmstPassingStatusModel } from "../model/zmst-passingstatus.model";
@Injectable({
  providedIn: "root"
})

export class ZmstPassingStatusService {
  constructor(private http: HttpClient) {
  }

 insert(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstPassingStatus_Insert, data, { headers: headers });
  } 
  update(data: any ): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstPassingStatus_Update, data, { headers: headers });
  }
  delete(passingstatusid: any) {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstPassingStatus_Delete + passingstatusid, { headers: headers });
  }
  getAll(): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstPassingStatus_GetAll, { headers: headers });
  }
  getById(passingstatusid: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstPassingStatus_GetById + passingstatusid, { headers: headers });
  }
    }