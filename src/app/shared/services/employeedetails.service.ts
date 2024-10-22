
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { EmployeeDetailsModel } from "../model/employeedetails.model";
@Injectable({
  providedIn: "root"
})
export class EmployeeDetailsService {
  constructor(private http: HttpClient) {
  }

  insert(data: any): Observable<any> {
    localStorage.setItem('isauth', '1');
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.EmployeeDetails_Insert, data, { headers: headers });
  }

  update(data: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.EmployeeDetails_Update, data, { headers: headers });
  }

  delete(empid: any) {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.EmployeeDetails_Delete + empid, { headers: headers });
  }

  getAll(): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.EmployeeDetails_GetAll, { headers: headers });
  }

  getAllEmployee(): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.EmployeeDetails_GetAllEmployee, { headers: headers });
  }  
  
  getById(empid: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.EmployeeDetails_GetById + empid, { headers: headers });
  }
  examCode(examCode: any): Observable<any> {
    const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.qualificationDetails_GetById + examCode, { headers: headers });
  }
  getEmployeeDataByEmployeeCode(empid: any): Observable<any> {  
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.EmployeeDetails_GetByEmpCode + empid, { headers: headers });
  }

  getadvanceSearchingList(data:any): Observable<any> {
    const headers = { "Accept": "text/plain" };
    localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.EmployeeDetails_AdvanceSearchGetAll,data, { headers: headers });
  }
}