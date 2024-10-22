import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { ZmstRankTypeModel } from "../model/md-rankType.model";
import { TokenExpireService } from "../common/tokenExpireService";
import { TokenLocalStorageService } from "../tokenLocalStorage/tokenLocalStorageService";

@Injectable({
    providedIn: "root"
})

export class MDZmstRankTypeService {
    rankTypeModel: ZmstRankTypeModel;
    constructor(private storage: TokenLocalStorageService, private http: HttpClient, private tokenExpire: TokenExpireService) {

    }
    insert(data: any): Observable<any> {        
        const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.ZmstRankType_Insert, data, { headers: headers });
    }

    update(data: any): Observable<any> {        
        const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.ZmstRankType_Update, data, { headers: headers });
    }

    delete(id: any) {        
        const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.ZmstRankType_Delete + id, { headers: headers });
    }

    getAll(): Observable<any> {        
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.ZmstRankType_GetAll);
    }
}


