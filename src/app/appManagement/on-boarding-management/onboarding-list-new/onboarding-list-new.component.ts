import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { onboardingList } from 'src/app/shared/model/onboardinglListModel';
import { AppOnBoardingRequestService } from 'src/app/shared/services/appOnBoardingRequest';
import { TokenLocalStorageService } from 'src/app/shared/tokenLocalStorage/tokenLocalStorageService';
import { map } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
import { CommonFunctionServices } from 'src/app/shared/common/commonFunction.services';
declare const $: any;
@Component({
  selector: 'app-onboarding-list-new',
  templateUrl: './onboarding-list-new.component.html',
  styleUrls: ['./onboarding-list-new.component.css']
})
export class OnboardingListNewComponent implements OnInit {
  token: any;
  omrowdata:any;
  datatable:any;
  value:any;
  constructor(private commonFunctionServices:CommonFunctionServices,private storage: TokenLocalStorageService, private user: AppOnBoardingRequestService,private changeRef:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.token = this.storage.get('token');
    const status = {
      status: "Request Approved & Details Form Send"
    }
    this.OnBoardingRequestList()
  }
  ngAfterViewInit(): void {
  }
  
  
  OnBoardingRequestList() {
      this.user.getOnboardingRequestList().subscribe(data=>{
        if(data.length>0)
        {
          this.omrowdata = data;
          this.commonFunctionServices.bindDataTable("zmstcountryGrid",0);
        }
      })
  }


trackBy(index: number, item: any):string {
  return item?item.requestNo:null;
}
  Approved() {
    const status = {
      status: "Request Approved & Details Form Send"
    }

    this.OnBoardingRequestList()
  }
  Pending() {
    
    const status = {
      status: "Request Pending"
    }


    this.filterStatus(status.status);
  }
  filterStatus(status: any) {

    this.user.getOnboardingRequestListByStatus(status)
      .subscribe(data => {
        if (data.length > 0) {
          this.omrowdata = data;
          this.commonFunctionServices.bindDataTable("zmstcountryGrid",0);
        }
      })
  }
  public extractData(res: Response) {
    const body = res.json();
    return body[0].data || {};
  }
}
