import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { MdYearModel } from "../model/md-YearModel";


@Injectable({
    providedIn: "root"
})

export class MdYearServices {
    constructor(private http: HttpClient) {
    }

    getById(yearGroup: any): Observable<MdYearModel[]> {
        const headers = { "Accept": "text/plain" };        
        return this.http.get<MdYearModel[]>(ApiEndPoints.MdYear_GetById + yearGroup, { headers: headers });
    }
}