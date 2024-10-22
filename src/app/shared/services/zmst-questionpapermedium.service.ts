
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { ZmstQuestionPaperMediumModel } from "../model/zmst-questionpapermedium.model";
@Injectable({
  providedIn: "root"
})

export class ZmstQuestionPaperMediumService {
  constructor(private http: HttpClient) {

  }

  insert(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstQuestionPaperMedium_Insert, data, { headers: headers });
  }
  update(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstQuestionPaperMedium_Update, data, { headers: headers });
  }
  delete(mediumid: any) {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstQuestionPaperMedium_Delete + mediumid, { headers: headers });
  }
  getAll(): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstQuestionPaperMedium_GetAll, { headers: headers });
  }
  getById(mediumid: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstQuestionPaperMedium_GetById + mediumid, { headers: headers });
  }
}