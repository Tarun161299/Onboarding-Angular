import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndPoints } from '../constants/apiEndpoints';
import { ZmstServiceType } from '../model/zmstServiceType';


@Injectable({

    providedIn: 'root'

})

export class ZmstServiceTypeService {
    constructor(private http: HttpClient) {

    }
    bindZmstServiceTypeList(): Observable<any[]> {
        localStorage.setItem('isauth', '0');
        return this.http.get<ZmstServiceType[]>(ApiEndPoints.ZmstServiceType);
    }
}
