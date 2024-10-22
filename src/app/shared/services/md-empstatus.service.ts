
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";

@Injectable({
  providedIn: "root"
})

export class MdEmpStatusService {
  constructor(private http: HttpClient) {

  }

 insert(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.MdEmpStatus_Insert, data, { headers: headers });
  } 

  update(data: any ): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.MdEmpStatus_Update, data, { headers: headers });
  }

  delete(id: any) {
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.MdEmpStatus_Delete + id, { headers: headers });
  }

  getAll(): Observable<any> {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.MdEmpStatus_GetAll, { headers: headers });
  }

  getById(id: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.MdEmpStatus_GetById + id, { headers: headers });
  }
  
    }