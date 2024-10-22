import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { TokenExpireService } from "../common/tokenExpireService";
import { TokenLocalStorageService } from "../tokenLocalStorage/tokenLocalStorageService";
@Injectable({
  providedIn: "root"
})

export class MdStateService {
  constructor(private storage: TokenLocalStorageService, private http: HttpClient, private tokenExpire: TokenExpireService) {
  }

  insert(data: any): Observable<any> {
    const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.MdState_Insert, data, { headers: headers });
  }

  update(data: any, hiddenid: string): Observable<any> {
    const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.MdState_Update + hiddenid, data, { headers: headers });
  }

  delete(id: any) {
    const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.MdState_Delete + id, { headers: headers });
  }

  getAll(): Observable<any> {
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.MdState_GetAll);
  }
  
  getById(id: any): Observable<any> {
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.MdState_GetById + id);
  }
}
