import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppOnBoardingRequestModel } from '../model/appOnBoardingRequestModel';
import { ApiEndPoints } from '../constants/apiEndpoints';
import { TokenExpireService } from '../common/tokenExpireService';



@Injectable()

export class SideBarService {
  @Output() uplopadDataEvt: EventEmitter<any> = new EventEmitter();
  @Output() ReloadSidenavbar: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient,
  ) {

  }
  
  SideBarDataList(userId: string): Observable<any[]> {
    localStorage.setItem('isauth', '1');
    return this.http.get<any>(ApiEndPoints.getModuleListByUserId + userId);
  }


  refreshData(data: any) {
    this.uplopadDataEvt.emit(data);
  }

  refreshNavBar(data: any) {
    this.ReloadSidenavbar.emit(data);
  }
  
  getRefreshData() {
    return this.ReloadSidenavbar;
  }

}
