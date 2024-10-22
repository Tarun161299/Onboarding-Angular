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

    providedIn: 'root'

})

export class AppDocumentWorkOrderService {
    constructor(private storage:TokenLocalStorageService,private http: HttpClient,private tokenExpire: TokenExpireService) {

    }
    save(documents:Documents[]){
        
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.saveDocuments,documents);
    }
    getUserMenu(id:string):Observable<any>{
        
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.UserMenu+id);
    }

    getById(id:number):Observable<any>{
        
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.DocumentById+(id).toString());
    }

    getDocumentByRequestId(data:any):Observable<any>{
        
        const headers = { "Accept": "text/plain",'Authorization':`Bearer ${this.storage.get('token')}` }
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.DocumentByRequestId,data,{headers:headers});
    }

    getByDocType(data:any):Observable<any>{
        
        const headers = { "Accept": "text/plain",'Authorization':`Bearer ${this.storage.get('token')}` }
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.DocumentByDocType,data,{headers:headers});
    }
}