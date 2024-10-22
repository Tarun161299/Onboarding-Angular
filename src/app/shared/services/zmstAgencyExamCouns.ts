import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndPoints } from '../constants/apiEndpoints';
import { ZmstServiceType } from '../model/zmstServiceType';
import { TokenExpireService } from '../common/tokenExpireService';


@Injectable({

    providedIn: 'root'

})

export class ZmstAgencyExamCouns {
    constructor(private http: HttpClient,private tokenExpire: TokenExpireService) {

    }
    bindZmstAgencyExamCouns(id:string): Observable<any[]> {
        
        
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.ZmstAgencyExamCoun+id);
    }
    
}