import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";

@Injectable({
  providedIn: "root"
})

export class ZmstAgencyExamCounsService {
  constructor(private http: HttpClient) {

  }
  
  insert(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstAgencyExamCouns_Insert, data, { headers: headers });
  } 

  update(data: any ): Observable<any> {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstAgencyExamCouns_Update, data, { headers: headers });
  }

  delete(agencyid: any) {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstAgencyExamCouns_Delete + agencyid, { headers: headers });
  }

  getAll(): Observable<any> {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstAgencyExamCouns_GetAll, { headers: headers });
  }

  getById(agencyid: any): Observable<any> {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstAgencyExamCouns_GetById + agencyid, { headers: headers });
  }
    }