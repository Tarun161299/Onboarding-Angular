
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { ZmstNationalityModel } from "../model/zmst-nationality.model";
@Injectable({
  providedIn: "root"
})

export class ZmstNationalityService {
  constructor(private http: HttpClient) {
  }

 insert(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstNationality_Insert, data, { headers: headers });
  } 
  update(data: any ): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstNationality_Update, data, { headers: headers });
  }
  delete(nationalityid: any) {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstNationality_Delete + nationalityid, { headers: headers });
  }
  getAll(): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstNationality_GetAll, { headers: headers });
  }
  getById(nationalityid: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstNationality_GetById + nationalityid, { headers: headers });
  }
    }