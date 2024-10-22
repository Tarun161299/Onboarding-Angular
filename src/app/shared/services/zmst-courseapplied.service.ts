
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
@Injectable({
  providedIn: "root"
})
export class ZmstCourseAppliedService {
  constructor(private http: HttpClient) {
  }
  insert(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstCourseApplied_Insert, data, { headers: headers });
  }
  update(data: any): Observable<any> {    
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstCourseApplied_Update, data, { headers: headers });
  }
  delete(courseid: any) {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.ZmstCourseApplied_Delete + courseid, { headers: headers });
  }
  getAll(): Observable<any> {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstCourseApplied_GetAll, { headers: headers });
  }
  getById(courseid: any): Observable<any> {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.ZmstCourseApplied_GetById + courseid, { headers: headers });
  }
}