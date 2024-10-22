import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndPoints } from '../constants/apiEndpoints';
import { ZmstProject } from '../model/zmstProjectModel';
import { TokenExpireService } from '../common/tokenExpireService';



@Injectable()

export class MdMainModuleService {
    constructor(
        private http: HttpClient, 
    ) {
    }

    GetByUserId(userId: string) {
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.Md_MainModule_GetById + userId);
    }
}