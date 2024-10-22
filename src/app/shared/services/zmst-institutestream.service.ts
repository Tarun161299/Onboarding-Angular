import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { ZmstInstituteStreamModel } from "../model/zmst-institutestream.model";
@Injectable({
  providedIn: "root"
})

export class ZmstInstituteStreamService {
  constructor(private http: HttpClient) {
  }

  insert(data: any,instCode:string): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstInstituteStream_Insert+instCode, data, { headers: headers });
  }
  update(data: any): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstInstituteStream_Update, data, { headers: headers });
  }
  delete(instcd: any) {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstInstituteStream_Delete + instcd, { headers: headers });
  }
  getAll(): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstInstituteStream_GetAll, { headers: headers });
  }
  getById(instcd: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstInstituteStream_GetById + instcd, { headers: headers });
  }
}