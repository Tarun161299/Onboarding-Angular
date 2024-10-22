
import { EventEmitter, Injectable, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { AppProjectPaymentDetailsModel } from "../model/app-project-payment-details.model";
import { TokenLocalStorageService } from "../tokenLocalStorage/tokenLocalStorageService";
@Injectable({
  providedIn: "root"
})

export class AppProjectPaymentDetailsService {
  @Output() PiToPaymentDataEvt: EventEmitter<any>  = new EventEmitter();
  constructor(private http: HttpClient, private storage: TokenLocalStorageService) {

  }

 insert(data: any): Observable<any> {
  
    const headers = { "Accept": "text/plain",'Authorization':`Bearer ${this.storage.get('token')}` }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.AppProjectPaymentDetails_Insert, data, { headers: headers });
  }
  update(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.AppProjectPaymentDetails_Update, data);
  }
  delete(paymentid: any) {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.AppProjectPaymentDetails_Delete + paymentid, { headers: headers });
  }
  getAll(): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.AppProjectPaymentDetails_GetAll, { headers: headers });
  }
  getById(paymentid: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.AppProjectPaymentDetails_GetById + paymentid, { headers: headers });
  }
  getByPaymentParentRefId(paymentParentRefId: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.AppProjectPaymentDetails_PaymentParentRefId + paymentParentRefId, { headers: headers });
  }
  updateStatus(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.AppProjectPaymentDetails_UpdateStatus, data, { headers: headers });
  }
   
     refreshpaymentBar(data:string){
      this.PiToPaymentDataEvt.emit();
    }
    getRefreshPaymentBar(){
    return this.PiToPaymentDataEvt;
   }
}

