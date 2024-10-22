
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { ZmstSeatSubCategoryModel } from "../model/zmst-seat-sub-category.model";
@Injectable({
    providedIn: "root"
})

export class ZmstSeatSubCategoryService {
    constructor(private http: HttpClient) {

    }

    insert(data: any): Observable<any> {
        const headers = { "Accept": "text/plain" }
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.ZmstSeatSubCategory_Insert, data, { headers: headers });
    }
    update(data: any): Observable<any> {
        const headers = { "Accept": "text/plain" }
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.ZmstSeatSubCategory_Update, data, { headers: headers });
    }
    delete(seatsubcategoryid: any) {
        const headers = { "Accept": "text/plain" }
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.ZmstSeatSubCategory_Delete + seatsubcategoryid, { headers: headers });
    }
    getAll(): Observable<any> {
        const headers = { "Accept": "text/plain" }
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.ZmstSeatSubCategory_GetAll, { headers: headers });
    }
    getById(seatsubcategoryid: any): Observable<any> {
        const headers = { "Accept": "text/plain" }
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.ZmstSeatSubCategory_GetById + seatsubcategoryid, { headers: headers });
    }
}