
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { ZmstSeatGroupModel } from "../model/zmst-seat-group.model";
@Injectable({
  providedIn: "root"
})

export class ZmstSeatGroupService {
  constructor(private http: HttpClient) {

  }

  insert(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstSeatGroup_Insert, data, { headers: headers });
  }
  update(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstSeatGroup_Update, data, { headers: headers });
  }
  delete(id: any) {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstSeatGroup_Delete + id, { headers: headers });
  }
  getAll(): Observable<any> {
    
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstSeatGroup_GetAll, { headers: headers });
  }
  getById(id: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstSeatGroup_GetById + id, { headers: headers });
  }
}