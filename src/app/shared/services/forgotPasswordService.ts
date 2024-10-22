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

export class ForgotPasswordService {
    
    constructor(private http: HttpClient,private tokenExpire: TokenExpireService) {

    }
    sendEmail(requestId:string){
        const headers = {"Accept": "text/plain"}  
        localStorage.setItem('isauth', '0');
        return this.http.post<any>(ApiEndPoints.Emailverification+requestId,{headers:headers});

    }
    sendResendEmail(data:any){
        const headers = {"Accept": "text/plain"}  
        localStorage.setItem('isauth', '0');
        return this.http.post<any>(ApiEndPoints.EmailResendverification,data,{headers:headers});
        
    }
}