import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndPoints } from '../constants/apiEndpoints';
import { SignUp } from 'src/app/model/SignUp.model';

@Injectable({

    providedIn: 'root'

})

export class SignUPDetailService {
    constructor(private http: HttpClient) {

    }
      AddSignUpDetail(addSignUp: SignUp):Observable<any>{
        var request = {
            UserID: addSignUp.userID,
            Password: addSignUp.password,
            RequestNo: addSignUp.requestNo,
            UserName:addSignUp.userName,
            captcha:addSignUp.captcha,
            ipAddress:addSignUp.ipAdress
          }
          const headers={"Accept":"text/plain","Content-Type":"application/json","responseType":"text"}
          localStorage.setItem('isauth', '0');
          return this.http.post<any>(ApiEndPoints.SaveSignUpDetail,request,{headers:headers});
      }
      getUserDetails(userID:string):Observable<any>{
        const headers={"Accept":"text/plain","Content-Type":"application/json","responseType":"text"}
        localStorage.setItem('isauth', '0');
        return this.http.get<any>(ApiEndPoints.checkUserIdAvailibility+userID,{headers:headers});
      }
}