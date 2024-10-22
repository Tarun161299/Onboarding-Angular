import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constants/apiEndpoints";
import { TokenExpireService } from "../common/tokenExpireService";
import { TokenLocalStorageService } from "../tokenLocalStorage/tokenLocalStorageService";

@Injectable({
  providedIn: "root"
})

export class MdExamService {
  constructor(private storage: TokenLocalStorageService, private http: HttpClient, private tokenExpire: TokenExpireService) {

  }

  getAll(): Observable<any> {   
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.MD_Exam);
  }
}