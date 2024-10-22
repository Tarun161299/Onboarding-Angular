
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { ZmstServiceType } from "../model/zmstServiceType";

@Injectable({
  providedIn: "root"
})

export class ZmstServiceTypeService {
  controls: any;
  constructor(private http: HttpClient) {

  }

  insert(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstServiceType_Insert, data, { headers: headers });
  }
  
  update(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstServiceType_Update, data, { headers: headers });
  }

  delete(servicetypeid: any) {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstServiceType_Delete + servicetypeid, { headers: headers });
  }

  getAll(): Observable<any> {
    const headers = { "Accept": "text/plain" }
    //localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstServiceType_GetAll, { headers: headers });
  }

  getById(servicetypeid: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstServiceType_GetById + servicetypeid, { headers: headers });
  }

  getByRequestNo(requestNo: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstServiceType_ByRequestNo + requestNo, { headers: headers });
  }

  bindZmstServiceTypeList(): Observable<any[]> {
    localStorage.setItem('isauth', '0');
    return this.http.get<ZmstServiceType[]>(ApiEndPoints.ZmstServiceType);
  }
}