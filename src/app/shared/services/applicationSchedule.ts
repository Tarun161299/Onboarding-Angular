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

export class AppSchedule {
  constructor(private storage:TokenLocalStorageService,private http: HttpClient,private tokenExpire: TokenExpireService) {

  }

getAll(data:any): Observable<any> {
  
  const headers = { "Accept": "text/plain",'Authorization':`Bearer ${this.storage.get('token')}` }
  localStorage.setItem('isauth', '1');
  return this.http.post<any>(ApiEndPoints.AppScheduleGetAll,data);
}
getActivities(){
  
    const headers = { "Accept": "text/plain",'Authorization':`Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.AppActivities);
}

getSchedules(data:any){

  
    const headers = { "Accept": "text/plain",'Authorization':`Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.getSchedule,data);
}


getbyActivityId(activitymodel: any){
  
    const headers = { "Accept": "text/plain",'Authorization':`Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.GetByActivityId, activitymodel, { headers: headers });
  }
    
}