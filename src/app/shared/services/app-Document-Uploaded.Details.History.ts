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


@Injectable()

export class AppDocumentUploadDetailHistoryService {
    constructor(private storage:TokenLocalStorageService,private http: HttpClient,private tokenExpire: TokenExpireService) {

    }
    save(documents:Documents){
        
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.App_DocumnetUploadedDetailsHistorySave,documents);
    }
 
}