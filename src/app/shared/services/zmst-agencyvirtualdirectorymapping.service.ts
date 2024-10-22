
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { ZmstAgencyVirtualDirectoryMappingModel } from "../model/zmst-agencyvirtualdirectorymapping.model";
@Injectable({
  providedIn: "root"
})

export class ZmstAgencyVirtualDirectoryMappingService {
  constructor(private http: HttpClient) {

  }

  insert(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstAgencyVirtualDirectoryMapping_Insert, data, { headers: headers });
  } 
  update(data: any ): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstAgencyVirtualDirectoryMapping_Update, data, { headers: headers });
  }
  delete(agencyid: any) {
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstAgencyVirtualDirectoryMapping_Delete + agencyid, { headers: headers });
  }
  getAll(): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.ZmstAgencyVirtualDirectoryMapping_GetAll, { headers: headers });
  }
  getById(agencyid: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.ZmstAgencyVirtualDirectoryMapping_GetById + agencyid, { headers: headers });
  }
    }