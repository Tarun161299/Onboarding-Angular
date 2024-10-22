import { Injectable } from "@angular/core";
import { TokenLocalStorageService } from "../tokenLocalStorage/tokenLocalStorageService";
import { HttpClient } from "@angular/common/http";
import { TokenExpireService } from "../common/tokenExpireService";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { ApplicationSummary } from "../model/zmst_applicationSummary.model";


@Injectable({
    providedIn: "root"
})

export class ApplicationSummaryService {
    constructor(private storage: TokenLocalStorageService, private http: HttpClient, private tokenExpire: TokenExpireService) {

    }

    GetAll(): Observable<any> {

        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.ApplicationSummary_GetAll);
    }

    Delete(applicationSummary: ApplicationSummary[]) {


        const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.ApplicationSummary_Delete, applicationSummary, { headers: headers });

    }

    Insert(applicationSummary: any) {


        const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.ApplicationSummaryInsert, applicationSummary, { headers: headers });

    }

    Update(applicationSummary: any): Observable<any> {

        const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.ApplicationSummary_Update, applicationSummary, { headers: headers });
    }

    UpdateAll(applicationSummaryList: any[]): Observable<any> {

        const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.ApplicationSummary_UpdateAll, applicationSummaryList, { headers: headers });
    }

    GetAllRegistration(): Observable<any> {
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.ApplicationSummary_GetAllRegistrationList);
    }

    UpdateExamManagementService(applicationSummary: any): Observable<any> {
        const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.ApplicationSummary_UpdateExamManagement, applicationSummary, { headers: headers });
    }


    UpdateAllRegistrationList(applicationSummaryList: any[]): Observable<any> {
        const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.ApplicationSummary_UpdateAllExamManagement, applicationSummaryList, { headers: headers });
    }

    GetByCounsAppType(): Observable<any> {        
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.ApplicationSumary_GetByCounsAppType);
    }

    GetByRegistAppType(): Observable<any> {        
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.ApplicationSumary_GetByRegistAppType);
    }

}