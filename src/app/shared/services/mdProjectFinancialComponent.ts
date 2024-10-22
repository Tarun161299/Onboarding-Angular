import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndPoints } from '../constants/apiEndpoints';

@Injectable({
    providedIn: 'root'
})
export class MdProjectFinancialComponentServices {
    constructor(
        private http: HttpClient,         
    ) {
    }

    GetAll() {
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.MdProjectFinancialComponentGetAll);
    }
}