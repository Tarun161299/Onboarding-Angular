
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";

@Injectable({
  providedIn: "root"
})

export class WorkOrderDetailsService {
  constructor(private http: HttpClient) {
  }

  insert(data: any): Observable<any> {    
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.WorkOrderDetails_Insert, data, { headers: headers });
  }

  update(data: any): Observable<any> {  
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.WorkOrderDetails_Update, data, { headers: headers });
  }

  delete(workorderid: any) {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.WorkOrderDetails_Delete + workorderid, { headers: headers });
  }
  
  getAll(): Observable<any> {    
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.WorkOrderDetails_GetAll, { headers: headers });
  }

  getactiveworkOrderAll(): Observable<any> {    
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.WorkOrderDetails_GetactiveworkOrderAll, { headers: headers });
  }
/*
  getById(workorderid: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.WorkOrderDetails_GetById + workorderid, { headers: headers });
  }
*/

  getByRequestId(workorderData: any): Observable<any> {    
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.WorkOrderDetails_GetByRequestId,workorderData, { headers: headers });
  }

  getByProjectCode(ProjectCode: any): Observable<any> {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1'); 
    return this.http.get<any>(ApiEndPoints.WorkOrderDetails_GetByProjectCode + ProjectCode, { headers: headers });
  }

}