
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { TokenExpireService } from "../common/tokenExpireService";

@Injectable({
  providedIn: "root"
})

export class ZmstAgencyService {
  constructor(private http: HttpClient, private tokenExpire: TokenExpireService) {
  }

  insert(data: any): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstAgency_Insert, data, { headers: headers });
  }
  
  update(data: any): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstAgency_Update, data, { headers: headers });
  }

  delete(agencyid: any) {    
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstAgency_Delete + agencyid, { headers: headers });
  }

  getAll(): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.ZmstAgency_GetAll, { headers: headers });
  }

  getById(agencyid: any): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.ZmstAgency_GetById + agencyid, { headers: headers });
  }
}