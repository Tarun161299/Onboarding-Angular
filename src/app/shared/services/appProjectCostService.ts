import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndPoints } from '../constants/apiEndpoints';
import { AppProjectCost } from "../model/appProjectCostModel";
import { TokenExpireService } from '../common/tokenExpireService';
import { TokenLocalStorageService } from '../tokenLocalStorage/tokenLocalStorageService';

@Injectable({
  providedIn: "root"
})

export class AppProjectCostService {
  constructor(private storage:TokenLocalStorageService,private http: HttpClient,private tokenExpire: TokenExpireService) {

  }

  save(data: AppProjectCost): Observable<any> {    
    const headers = { "Accept": "text/plain",'Authorization':`Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.AppProjectCostSave, data, { headers: headers });
  }

  getbyId(id: Number): Observable<any> {
    const headers = { "Accept": "text/plain",'Authorization':`Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.AppProjectCostGetById + id, { headers: headers });
  }

  delete(finanicalData:any){    
    const headers = { "Accept": "text/plain",'Authorization':`Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.AppProjectCostDelete,finanicalData,{ headers: headers });
  }

  update(data:AppProjectCost):Observable<any>{
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.AppProjectCostUpdate,data);
  }
  
}