import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';
import { MinistryDetail } from 'src/app/model/Ministry.model';
import { AppOnBoardingRequestModel } from '../model/appOnBoardingRequestModel';
import { ApiEndPoints } from '../constants/apiEndpoints';
import { UserLoginInfo } from '../model/UserLoginInfomodel';
import { TokenExpireService } from '../common/tokenExpireService';

@Injectable({

    providedIn: 'root'

})

export class AppOnBoardingDetailService {
    constructor(private http: HttpClient,private tokenExpire: TokenExpireService) {

    }
    getdatafromRequestList(id:string):Observable<any>{
        localStorage.setItem('isauth', '0');
        return this.http.get<any>(ApiEndPoints.dataOFDetailPage+id);
    }

}