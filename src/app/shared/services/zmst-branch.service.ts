
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
@Injectable({
  providedIn: "root"
})
export class ZmstBranchService {
  constructor(private http: HttpClient) {
  }

  insert(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstBranch_Insert, data, { headers: headers });
  }

  update(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstBranch_Update, data, { headers: headers });
  }

  delete(brcd: any) {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstBranch_Delete + brcd, { headers: headers });
  }

  getAll(): Observable<any> {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstBranch_GetAll, { headers: headers });
  }
  
  getById(brcd: any): Observable<any> {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstBranch_GetById + brcd, { headers: headers });
  }
  
}