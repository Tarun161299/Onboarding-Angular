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

export class ConfigurationEnvironment {
    changePasswordModelObj: changePasswordModel;
    constructor(private storage: TokenLocalStorageService, private http: HttpClient, private tokenExpire: TokenExpireService) {
    }
    getById(data: any): Observable<any> {
        localStorage.setItem('isauth', '0');
        return this.http.get<any>(ApiEndPoints.configEnv_byId+ data.toString());
    }
}