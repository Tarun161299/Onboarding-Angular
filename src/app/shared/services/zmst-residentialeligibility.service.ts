
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { ZmstResidentialEligibility } from "../model/md-residentialEligibilty.model";
@Injectable({
  providedIn: "root"
})

export class ZmstResidentialEligibilityService {
  constructor(private http: HttpClient) {

  }

 insert(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstResidentialEligibility_Insert, data, { headers: headers });
  } 
  update(data: any ): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstResidentialEligibility_Update, data, { headers: headers });
  }
  delete(residentialeligibilityid: any) {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstResidentialEligibility_Delete + residentialeligibilityid, { headers: headers });
  }
  getAll(): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstResidentialEligibility_GetAll, { headers: headers });
  }
    }