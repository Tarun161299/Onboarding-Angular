import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenLocalStorageService } from "../tokenLocalStorage/tokenLocalStorageService";
import { TokenExpireService } from "../common/tokenExpireService";
import { ApiEndPoints } from "../constants/apiEndpoints";

@Injectable({
    providedIn: "root"
  })

  export class DayWiseRegistrationService {
    constructor(private storage:TokenLocalStorageService,private http: HttpClient,private tokenExpire: TokenExpireService) {
        
    }
      getDaywiseRegistrationBetweenDates(daywiseRegistration: any){
        
          const headers = { "Accept": "text/plain",'Authorization':`Bearer ${this.storage.get('token')}` }
          localStorage.setItem('isauth', '1');
          return this.http.post<any>(ApiEndPoints.GetDaywiseRegistrationBetweenDates, daywiseRegistration, { headers: headers });
        }
}

