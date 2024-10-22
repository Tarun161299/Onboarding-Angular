
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
@Injectable({
  providedIn: "root"
})
export class ZmstSpecialExamPaperService {
  constructor(private http: HttpClient) {
  }
  
  insert(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstSpecialExamPaper_Insert, data, { headers: headers });
  }
  
  update(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstSpecialExamPaper_Update, data, { headers: headers });
  }

  delete(id: any) {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstSpecialExamPaper_Delete + id, { headers: headers });
  }

  getAll(): Observable<any> {    
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstSpecialExamPaper_GetAll, { headers: headers });
  }
}