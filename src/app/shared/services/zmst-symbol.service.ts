
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
@Injectable({
  providedIn: "root"
})
export class ZmstSymbolService {
  constructor(private http: HttpClient) {
  }
  insert(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstSymbol_Insert, data, { headers: headers });
  }
  update(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstSymbol_Update, data, { headers: headers });
  }
  delete(symbolid: any) {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstSymbol_Delete + symbolid, { headers: headers });
  }
  getAll(): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstSymbol_GetAll, { headers: headers });
  }
}