import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';
import { ApiEndPoints } from '../constants/apiEndpoints';
import { Documents } from '../model/documentsModel';
import { TokenExpireService } from '../common/tokenExpireService';


@Injectable({

    providedIn: 'root'

})

export class ConfigurationApiSecureKey {
    
    constructor(private http: HttpClient,private tokenExpire: TokenExpireService) {

    }
    getAllKey(){
        const headers = {"Accept": "text/plain"}  
        localStorage.setItem('isauth', '0');
        return this.http.get<any>(ApiEndPoints.ConfigurationApiSecureKey_GetAll,{headers:headers});

    }
}