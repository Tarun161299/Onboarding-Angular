
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { CGConfigurationControleTestModel } from "../model/cgconfigurationcontroletest.model";
@Injectable({
  providedIn: "root"
})

export class CGConfigurationControleTestService {
  constructor(private http: HttpClient) {

  }

 insert(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.CGConfigurationControleTest_Insert, data, { headers: headers });
  } 
  update(data: any ): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.CGConfigurationControleTest_Update, data, { headers: headers });
  }
  delete(id: any) {
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.CGConfigurationControleTest_Delete + id, { headers: headers });
  }
  getAll(): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.CGConfigurationControleTest_GetAll, { headers: headers });
  }
  getById(id: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.CGConfigurationControleTest_GetById + id, { headers: headers });
  }
    }