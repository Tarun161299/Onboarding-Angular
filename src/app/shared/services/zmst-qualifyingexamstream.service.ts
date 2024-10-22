
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { ZmstQualifyingExamStreamModel } from "../model/zmst-qualifyingexamstream.model";
@Injectable({
  providedIn: "root"
})

export class ZmstQualifyingExamStreamService {
  constructor(private http: HttpClient) {

  }

  insert(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstQualifyingExamStream_Insert, data, { headers: headers });
  }
  update(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstQualifyingExamStream_Update, data, { headers: headers });
  }
  delete(qualstreamid: any) {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstQualifyingExamStream_Delete + qualstreamid, { headers: headers });
  }
  getAll(): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstQualifyingExamStream_GetAll, { headers: headers });
  }
  getById(qualstreamid: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstQualifyingExamStream_GetById + qualstreamid, { headers: headers });
  }
}