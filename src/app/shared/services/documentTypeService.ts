import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndPoints } from '../constants/apiEndpoints';
import { TokenExpireService } from '../common/tokenExpireService';
import { TokenLocalStorageService } from '../tokenLocalStorage/tokenLocalStorageService';
import { AppDocFilter } from '../model/appDocFilterModel';

@Injectable()

export class DocumentTypeService {
    constructor(private http: HttpClient, private tokenExpire: TokenExpireService, private storage: TokenLocalStorageService) {
    }

    getAll(): Observable<any> {
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.GetAllDocumentType);
    }

    getByRequestId(appDocFilter: any): Observable<any> {
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.GetDocumentByRequestId,appDocFilter);
    }

    usergetByRequestId(appDocFilter: any): Observable<any> {        
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.GetUserDocumentByRequestId,appDocFilter);
    }

    getByProjectDetailId(projectId: string) {
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.GetByProjectDetailId + projectId);
    }

    getbyRoleId(roleId: string): Observable<any> {
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.GetDocumentTypeByRoleId + roleId);
    }

    getByDocType(data: any): Observable<any> {
        const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}` }
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.DocumentByDocType, data, { headers: headers });
    }
}
