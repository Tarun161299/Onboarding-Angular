import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MinistryDetail } from 'src/app/model/Ministry.model';
import { AppOnBoardingRequestModel } from '../model/appOnBoardingRequestModel';
import { ApiEndPoints } from '../constants/apiEndpoints';
import { OnBoardingMail } from '../model/OnBoardingMailModel';
import { OnboardingRequestdata } from 'src/app/model/OnBoardingRequest.model';
import { TokenExpireService } from '../common/tokenExpireService';
import { TokenLocalStorageService } from '../tokenLocalStorage/tokenLocalStorageService';
import { BeforeLoginModule } from '../before-login/before-login.module';
import { LocalStorageService } from '../otp-localStorage/localStorageServices';

@Injectable()

export class AppOnBoardingRequestService {
  @Output() removeTimer: EventEmitter<any>  = new EventEmitter();
  constructor( private http: HttpClient) {
  }
  getOnboardingRequestList(): Observable<any[]> {
    
    localStorage.setItem('isauth', '1');
    return this.http.get<AppOnBoardingRequestModel[]>(ApiEndPoints.onBoardingRequestGetAll);
  }
  getOnboardingRequestListByStatus(status: any): Observable<any> {
    
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.onBoardingRequestGetAllByStatus + status);
  }

  UserLoginApi(UserCredential: any): Observable<any> {
    const headers = { "Accept": "text/plain", "Content-Type": "application/json", }
    localStorage.setItem('isauth', '0');
    return this.http.post<any>(ApiEndPoints.UserInfoVerify, UserCredential, { headers: headers });

  }
  UserLoginEisApi(EisId: any): Observable<any> {
    const headers = { "Accept": "text/plain", "Content-Type": "application/json", }
    localStorage.setItem('isauth', '0');
    return this.http.post<any>(ApiEndPoints.userInfoVerifyEis, EisId, { headers: headers });

  }
  
  OnBoardingMailApi(email: OnBoardingMail): Observable<any> {    
    const headers = { "Accept": "text/plain", "Content-Type": "application/json", 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.onBoardingMail, email,{ headers: headers });
  }

  SaveOnboardDetails(data: any): Observable<any> {
    const headers = { "Accept": "text/plain", "Content-Type": "application/json", "responseType": "text" };
    localStorage.setItem('isauth', '0');
    return this.http.post<any>(ApiEndPoints.SaveOnboardDetails, data, { headers: headers });
  }

  UpdateOnboardDetails(data: any): Observable<any> {
    localStorage.setItem('isauth', '0');
    return this.http.post<any>(ApiEndPoints.UpdateOnboardDetails, data);
  }

  getdatafromRequestList(id: string): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.dataOFDetailPage + id,{ headers: headers });
  }
  getContactdatafromRequestList(id: string): Observable<any> {
    localStorage.setItem('isauth', '0');
    return this.http.get<any>(ApiEndPoints.dataOfContactDetailPage + id);
  }

getRefreshToken(){
  localStorage.setItem('isauth', '1');
  return this.http.get<any>(ApiEndPoints.RefreshToken);
}
  getMinistryDropDownData(): Observable<any> {
    localStorage.setItem('isauth', '0');
    return this.http.get<MinistryDetail[]>(ApiEndPoints.mdMinistryList);
  }
  getOrganizationDropDownData(stateId: any): Observable<any[]> {
    localStorage.setItem('isauth', '0');
    return this.http.get<MinistryDetail[]>(ApiEndPoints.organizationListByStateId + stateId);
  }

  OnBoardrequestDetails(applicant: OnboardingRequestdata): Observable<any> {
    localStorage.setItem('isauth', '0');
    return this.http.post<any>(ApiEndPoints.SaveOnboardingRequest, applicant);

  }
  sendOTP(data: any) {
    localStorage.setItem('isauth', '0');
    return this.http.post<any>(ApiEndPoints.OTPverification, data);
  }
  getStates(): Observable<any> {
    localStorage.setItem('isauth', '0');
    return this.http.get<any>(ApiEndPoints.State);

  }
  getDistrict(stateId: any): Observable<any> {
    localStorage.setItem('isauth', '0');
    return this.http.get<any>(ApiEndPoints.District + stateId);

  }
  getStatus(requestno: string) {
    localStorage.setItem('isauth', '0');
    const headers = { "Accept": "text/plain", "Content-Type": "application/json", "responseType": "text" }
    return this.http.get<any>(ApiEndPoints.GetStatus + requestno, { headers: headers });
  }
  getRequestLinkDetails(requestId: string): Observable<any> {
    
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.requestLinkDetails + requestId);
  }
  sendStatusEmail(Email: string, requestno: string, statusReq: string, statusdetail: string, Cordmail: string, cordName: string) {
    const headers = { "Accept": "text/plain", "Content-Type": "application/json", "responseType": "text" }
    localStorage.setItem('isauth', '0');
    return this.http.post<any>(ApiEndPoints.sendRequestStatusEmail + Email + '&requestNo=' + requestno + '&statusReq=' + statusReq + '&statusDetail=' + statusdetail + '&Cordmail=' + Cordmail + '&cordName=' + cordName, { headers: headers });

  }
  getUserProfile(userid: any): Observable<any> {
    const headers = { "Accept": "text/plain", "Content-Type": "application/json", "responseType": "text" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.userDetail + userid);

  }
  AppOnBoardingStstusCount(): Observable<any[]> {
    
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.AppOnBoardingStstusCount);
  }

  GetSalt(): Observable<any[]> {
    const headers = { "Accept": "text/plain", "Content-Type": "application/json", "responseType": "text" }
    localStorage.setItem('isauth', '0');
    return this.http.get<any>(ApiEndPoints.GetSalt, { headers: headers });
  }
  GetCaptcha(): Observable<any[]> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '0');
    return this.http.get<any>(ApiEndPoints.GetCaptcha, { headers: headers });
  }
  logout(userid: any): Observable<any[]> {
    localStorage.setItem('isauth', '0');
    return this.http.post<any>(ApiEndPoints.logout, userid);
  }
  GetIP(): Observable<any[]> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '0');
    return this.http.post<any>(ApiEndPoints.GetIP, { headers: headers });
  }

  setRemoveTimer(){        
    this.removeTimer.emit();
  }

  getRemoveTimer(){
    return this.removeTimer;
   }
}
