import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { TokenExpireService } from "../common/tokenExpireService";
import { TokenLocalStorageService } from "../tokenLocalStorage/tokenLocalStorageService";

@Injectable({
    providedIn: "root"
})

export class MdDistrictService {
    constructor(private storage: TokenLocalStorageService, private http: HttpClient, private tokenExpire: TokenExpireService) {
    }

    insert(data: any): Observable<any> {        
        const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.MdDistrict_Insert, data, { headers: headers });
    }
    update(data: any): Observable<any> {        
        const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.MdDistrict_Update, data, { headers: headers });
    }
    delete(id: string) {        
        const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.MdDistrict_Delete + id, { headers: headers });
    }
    getAll(): Observable<any> {        
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.MdDistrict_GetAll);
    }

    /*
    getById(id: string): Observable<any> {
        localStorage.setItem('isauth', '0');
        return this.http.get<any>(ApiEndPoints.MdDistrict_GetById + id);
    }
    */

    /*
    getListByStateId(stateid: string): Observable<any> {        
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.MdDistrict_GetListByStateId + stateid);
    }
    */
   
    getStates(): Observable<any> {
        return this.http.get<any>(ApiEndPoints.State);
    }
}


