
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { TokenExpireService } from "../common/tokenExpireService";
import { TokenLocalStorageService } from "../tokenLocalStorage/tokenLocalStorageService";

@Injectable({
  providedIn: "root"
})

export class ZmstSeatCategoryService {
  constructor(private storage: TokenLocalStorageService, private http: HttpClient, private tokenExpire: TokenExpireService) {
  }
  insert(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstSeatCategory_Insert, data, { headers: headers });
  }
  update(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstSeatCategory_Update, data, { headers: headers });
  }
  delete(seatcategoryid: any) {
    
    const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstSeatCategory_Delete + seatcategoryid, { headers: headers });
  }
  getAll(): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.ZmstSeatCategory_GetAll, { headers: headers });
  }
}