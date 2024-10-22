
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";

@Injectable({
  providedIn: "root"
})


export class EssoService {
    
    constructor(private http: HttpClient){

    }

    getbyId(id:any): Observable<any> {
       // const headers = { "Accept": "text/plain" }
        localStorage.setItem('isauth','0')
        return this.http.get<any>(ApiEndPoints.ESSOService_GetById + id);
    }

    logOut(logoutModel:any): Observable<any> {
      // const headers = { "Accept": "text/plain" }
       localStorage.setItem('isauth','0')
       return this.http.post<any>(ApiEndPoints.ESSOService_Logout,logoutModel);
   }
} 