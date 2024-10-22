import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { MdSmsEmailTemplateModel } from "../model/md-sms-email-template.model";
import { TokenExpireService } from "../common/tokenExpireService";
import { TokenLocalStorageService } from "../tokenLocalStorage/tokenLocalStorageService";
@Injectable({
  providedIn: "root"
})

export class MdSmsEmailTemplateService {
  constructor(private storage:TokenLocalStorageService,private http: HttpClient,private tokenExpire: TokenExpireService) {
  }

  insert(data: MdSmsEmailTemplateModel): Observable<any> {
    const headers = { "Accept": "text/plain",'Authorization':`Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.MdSmsEmailTemplate_Insert, data, { headers: headers });
  }
  update(data: MdSmsEmailTemplateModel): Observable<any> {
    const headers = { "Accept": "text/plain",'Authorization':`Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.MdSmsEmailTemplate_Update, data, { headers: headers });
  }
  delete(templateid: any) {
    const headers = { "Accept": "text/plain",'Authorization':`Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.MdSmsEmailTemplate_Delete + templateid, { headers: headers });
  }
  getAll(): Observable<any> {
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.MdSmsEmailTemplate_GetAll);
  }
  getById(templateid: any): Observable<any> {
    const headers = { "Accept": "text/plain",'Authorization':`Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.MdSmsEmailTemplate_GetById + templateid);
  }
}