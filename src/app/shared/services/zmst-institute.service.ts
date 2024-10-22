
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";

@Injectable({
  providedIn: "root"
})

export class ZmstInstituteService {
  constructor(private http: HttpClient) {
  }

 insert(data: any): Observable<any> {
  localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstInstitute_Insert, data, { headers: headers });
  } 
  update(data: any ): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstInstitute_Update, data, { headers: headers });
  }
  delete(instcd: any) {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstInstitute_Delete + instcd, { headers: headers });
  }
  getAll(): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.ZmstInstitute_GetAll, { headers: headers });
  }
  getById(instcd: any): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.ZmstInstitute_GetById + instcd, { headers: headers });
  }
  getMaxInstCode(): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.ZmstInstitute_GetMaxInstituteCode, { headers: headers });
  }
  getAllByIds(data:any){
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstInstituet_GetListByIds ,data, { headers: headers });
  }
  getByType(type: any): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.ZmstInstitute_GetType + type, { headers: headers });
  }
  GetAllCountData(fiterInstituteCoun: any): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstInstitute_GetAllCountData ,fiterInstituteCoun, { headers: headers });
  }
  
    }