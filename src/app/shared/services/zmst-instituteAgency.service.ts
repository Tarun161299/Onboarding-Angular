
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { ZmstInstituteAgencyModel } from "../model/zmst-instituteagency.model";
@Injectable({
  providedIn: "root"
})

export class ZmstInstituteAgencyService {
  constructor(private http: HttpClient) {
  }

 insert(data: any): Observable<any> {
  localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstInstituteAgency_Insert, data, { headers: headers });
  } 
  update(data: any ): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstInstituteAgency_Update, data, { headers: headers });
  }
  delete(instcd: any) {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstInstituteAgency_Delete + instcd, { headers: headers });
  }
  getAll(): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.ZmstInstituteAgency_GetAll, { headers: headers });
  }
  getById(instcd: any): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.ZmstInstituteAgency_GetById + instcd, { headers: headers });
  }
    }