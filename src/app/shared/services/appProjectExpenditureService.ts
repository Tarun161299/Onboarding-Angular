import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndPoints } from '../constants/apiEndpoints';
//import { AppProject } from "../model/appProjectCostModel";
import { AppProjectExpenditure } from '../model/appProjectExpenditureModel';
import { TokenExpireService } from '../common/tokenExpireService';
import { TokenLocalStorageService } from '../tokenLocalStorage/tokenLocalStorageService';

@Injectable({
  providedIn: "root"
})

export class appProjectExpenditureService {
  constructor(private storage: TokenLocalStorageService, private http: HttpClient, private tokenExpire: TokenExpireService) {

  }
  save(data: AppProjectExpenditure): Observable<any> {

    const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.AppProjectExpenditureSave, data, { headers: headers });
  }

  getbyId(id: Number): Observable<any> {
    const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.AppProjectExpenditureGetById + id, { headers: headers });
  }


  delete(finanicalData: any) {
    const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.AppProjectExpenditureDelete, finanicalData, { headers: headers });
  }
  update(data: AppProjectExpenditure): Observable<any> {
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.AppProjectExpenditureUpdate, data);
  }
}