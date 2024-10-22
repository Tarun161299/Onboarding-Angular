
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { ZmstExperienceTypeModel } from "../model/zmst-experience-type.model";
@Injectable({
  providedIn: "root"
})

export class ZmstExperienceTypeService {
  constructor(private http: HttpClient) {
  }

 insert(data: any): Observable<any> {
  localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstExperienceType_Insert, data, { headers: headers });
  } 
  update(data: any ): Observable<any> {
    localStorage.setItem('isauth', '1');
   const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstExperienceType_Update, data, { headers: headers });
  }
  delete(id: any) {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstExperienceType_Delete + id, { headers: headers });
  }
  getAll(): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.ZmstExperienceType_GetAll, { headers: headers });
  }
  getById(id: any): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.ZmstExperienceType_GetById + id, { headers: headers });
  }
    }