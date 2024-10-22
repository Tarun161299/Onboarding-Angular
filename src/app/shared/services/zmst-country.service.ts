import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndPoints } from '../constants/apiEndpoints';
import { ZmstCountryModel } from '../model/zmst-country.model';
import { TokenExpireService } from '../common/tokenExpireService';
import { TokenLocalStorageService } from '../tokenLocalStorage/tokenLocalStorageService';
@Injectable({
  providedIn: 'root',
})
export class ZmstCountryService {
  constructor(private storage:TokenLocalStorageService,private http: HttpClient,
    private tokenExpire: TokenExpireService) {}

  insert(data: ZmstCountryModel): Observable<any> {      
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstCountry_Insert, data);
  }
  update(data: ZmstCountryModel): Observable<any> {    
    const headers = { Accept: 'text/plain','Authorization':`Bearer ${this.storage.get('token')}` };
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstCountry_Update, data);
  }
  delete(code: string) {    
    const headers = { Accept: 'text/plain','Authorization':`Bearer ${this.storage.get('token')}` };
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstCountry_Delete + code, {
      headers: headers,
    });
  }
  getAll(): Observable<any> {    
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstCountry_GetAll);
  }
  getById(code: string): Observable<any> {    
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstCountry_GetById + code);
  }
}
