
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
@Injectable({
  providedIn: "root"
})
export class ZmstDocumentTypeService {
  constructor(private http: HttpClient) {
  }
  insert(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstDocumentType_Insert, data, { headers: headers });
  }
  update(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstDocumentType_Update, data, { headers: headers });
  }
  delete(documenttypeid: any) {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstDocumentType_Delete + documenttypeid, { headers: headers });
  }
  getAll(): Observable<any> {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstDocumentType_GetAll, { headers: headers });
  }
  getById(documenttypeid: any): Observable<any> {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstDocumentType_GetById + documenttypeid, { headers: headers });
  }
}