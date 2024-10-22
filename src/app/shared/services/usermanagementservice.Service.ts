import { Injectable } from "@angular/core";
import { TokenLocalStorageService } from "../tokenLocalStorage/tokenLocalStorageService";
import { HttpClient } from "@angular/common/http";
import { TokenExpireService } from "../common/tokenExpireService";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { SignUp } from 'src/app/model/SignUp.model'

@Injectable({
    providedIn: "root"
})

export class usermanagementservice {
    constructor(private storage:TokenLocalStorageService,private http: HttpClient,private tokenExpire: TokenExpireService) {

    }

insert(addSignUp: SignUp):Observable<any> {
  var request = {
    UserID: addSignUp.userID,
    Password: addSignUp.password,
    RequestNo: addSignUp.requestNo,
    UserName:addSignUp.userName,
    Designation:addSignUp.designation,
    EmailId:addSignUp.emailId,
    MobileNo:addSignUp.mobileNo,
    SecurityQuestionId:addSignUp.securityQuestionId,
    SecurityAnswer:addSignUp.securityAnswer,
    AuthenticationType:addSignUp.authenticationType,
    photopath:addSignUp.photopath,
    docContentType:addSignUp.docContentType,
    docFileName:addSignUp.docFileName,
}

   
    const headers={"Accept":"text/plain","Content-Type":"application/json","responseType":"text"}
    localStorage.setItem('isauth', '0');
    return this.http.post<any>(ApiEndPoints.UserManagementInsert,request,{ headers: headers });
 
  }

  update(addSignUp: SignUp): Observable<any> {
    var request = {
      UserID: addSignUp.userID,
      Password: addSignUp.password,
      RequestNo: addSignUp.requestNo,
      UserName:addSignUp.userName,
      Designation:addSignUp.designation,
      EmailId:addSignUp.emailId,
      MobileNo:addSignUp.mobileNo,
      SecurityQuestionId:addSignUp.securityQuestionId,
      SecurityAnswer:addSignUp.securityAnswer,
      AuthenticationType:addSignUp.authenticationType,
      photopath:addSignUp.photopath
  }
        
    const headers={"Accept":"text/plain","Content-Type":"application/json","responseType":"text"}
    localStorage.setItem('isauth', '0');
    return this.http.post<any>(ApiEndPoints.UserManagementUpdate, request,{ headers: headers });
  }

  delete(id:any)
  {
    const headers={"Accept":"text/plain","Content-Type":"application/json","responseType":"text"}
    localStorage.setItem('isauth', '0');
    return this.http.post<any>(ApiEndPoints.UserManagementDelete + id, { headers: headers });
  }

  CheckUserId(id:any)
  {
    const headers = { "Accept": "text/plain",'Authorization':`Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.CheckUserId + id, { headers: headers });
  }

  getall(): Observable<any>
  {
    const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}`}
    localStorage.setItem('isauth', '0');
    return this.http.get<any>(ApiEndPoints.UserManagementGetAll, { headers: headers });
  }

  BoardUsergetalldetails(): Observable<any>
  {
    const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}`}
    localStorage.setItem('isauth', '0');
    return this.http.get<any>(ApiEndPoints.BoardUserManagementGetAll, { headers: headers });
  }

  getdoc(hiddenid:string): Observable<any>
  {
    const headers = { "Accept": "text/plain",'Authorization':`Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.UserManagementDocumentByDocType+hiddenid,{headers:headers});
  }

  getuserdetails(id:string): Observable<any>
  {
    const headers = { "Accept": "text/plain",'Authorization':`Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.GetBoarduserdetail+id,{headers:headers});
  }


  BindZmstAuthenticationMode(): Observable<any>
  {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstAuthenticationMode, { headers: headers });
  }

  BindZmstSecurityQuestion(): Observable<any>
  {
    const headers = { "Accept": "text/plain" }
    //const headers = { "Accept": "text/plain", 'Authorization': `Bearer ${this.storage.get('token')}`}
    localStorage.setItem('isauth', '0');
    return this.http.get<any>(ApiEndPoints.ZmstSecurityQuestion, { headers: headers });
  }

}