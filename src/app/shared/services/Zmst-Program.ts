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

export class ZmstProgramService {
    
    constructor(private http: HttpClient,private tokenExpire: TokenExpireService) {
    }
    save(data:any){
        const headers = {"Accept": "text/plain"}  
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.ZmstProgram,data,{headers:headers});
    }
    Download(){
        const headers = {"Accept": "text/plain"}  
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.ZmstProgram_DownLoad,{headers:headers});
    }
    GetAll(){
        const headers = {"Accept": "text/plain"}  
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.ZmstProgram_GetAll,{headers:headers});
    }
 
}