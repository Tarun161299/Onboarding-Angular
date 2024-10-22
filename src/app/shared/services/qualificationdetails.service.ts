
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
@Injectable({
  providedIn: "root"
})
export class QualificationDetailsService {
  constructor(private http: HttpClient) {
  }

  insert(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.qualificationDetails_Insert, data, { headers: headers });
  }

  update(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.qualificationDetails_Update, data, { headers: headers });
  }

  delete(qualificationdetailsid: any) {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.qualificationDetails_Delete + qualificationdetailsid, { headers: headers });
  }

  getAll(): Observable<any> {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.qualificationDetails_GetAll, { headers: headers });
  }
  
  getById(qualificationdetailsid: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.qualificationDetails_GetById + qualificationdetailsid, { headers: headers });
  }
}