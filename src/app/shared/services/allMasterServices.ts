import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';
import { ApiEndPoints } from '../constants/apiEndpoints';
import { Documents } from '../model/documentsModel';
import { TokenExpireService } from '../common/tokenExpireService';
import { TokenLocalStorageService } from '../tokenLocalStorage/tokenLocalStorageService';


@Injectable({
    providedIn: "root"
  })

export class AllMasterServices {
    constructor(private storage:TokenLocalStorageService,private http: HttpClient,private tokenExpire: TokenExpireService) {

    }
    GetAllTablesCount(){
        
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.AllMasterData);
    }
 
}