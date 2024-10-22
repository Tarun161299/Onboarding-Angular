import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { changePasswordModel } from "../model/changePassword.model";
import { TokenExpireService } from "../common/tokenExpireService";
import { TokenLocalStorageService } from "../tokenLocalStorage/tokenLocalStorageService";

@Injectable({
    providedIn: "root"
})

export class changePasswordService {
    changePasswordModelObj: changePasswordModel;
    constructor(private storage: TokenLocalStorageService, private http: HttpClient, private tokenExpire: TokenExpireService) {
    }
    insert(data: any): Observable<any> {
        const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.changePassword_Insert, data, { headers: headers });
    }
}