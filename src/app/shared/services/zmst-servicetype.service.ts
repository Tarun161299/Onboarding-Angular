
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
//import { ZmstServiceTypeModel } from "../model/zmst-servicetype.model";
@Injectable({
  providedIn: "root"
})

export class ZmstServiceTypeService {
  constructor(private http: HttpClient) {

  }
  getByRequestNo(requestNo: any): Observable<any> {
    
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.ZmstServiceType_ByRequestNo + requestNo, { headers: headers });
  }
}