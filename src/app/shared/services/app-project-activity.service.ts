
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { AppProjectActivityModel } from "../model/app-project-activity.model";
@Injectable({
    providedIn: "root"
})

export class AppProjectActivityService {
    constructor(private http: HttpClient) {

    }

    insert(data: any): Observable<any> {
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.AppProjectActivity_Insert, data);
    }
    update(data: any): Observable<any> {
        localStorage.setItem('isauth', '1');
        const headers = { "Accept": "text/plain", "Content-Type": "application/json", "responseType": "text" }
        return this.http.post<any>(ApiEndPoints.AppProjectActivity_Update, data,{ headers: headers });
    }
    delete(id: any) {
        localStorage.setItem('isauth', '1');
        const headers = { "Accept": "text/plain" }
        return this.http.delete<any>(ApiEndPoints.AppProjectActivity_Delete + id, { headers: headers });
    }
    getAll(): Observable<any> {
        localStorage.setItem('isauth', '1');
        const headers = { "Accept": "text/plain" }
        return this.http.get<any>(ApiEndPoints.AppProjectActivity_GetAll, { headers: headers });
    }
    getById(data: any): Observable<any> {
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.AppProjectActivity_GetById ,data);
    }
    GetByParentRefId(id: any): Observable<any> {
        localStorage.setItem('isauth', '1');
        const headers = { "Accept": "text/plain" }
        return this.http.get<any>(ApiEndPoints.AppProjectActivity_GetByParentRefId + id, { headers: headers });
    }
}