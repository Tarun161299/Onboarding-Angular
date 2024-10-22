import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonFunctionServices } from '../shared/common/commonFunction.services';
import { TokenLocalStorageService } from '../shared/tokenLocalStorage/tokenLocalStorageService';
import { ToastrService } from 'ngx-toastr';
import { AfterLoginComponent } from '../shared/after-login/after-login.component';
import { ConfirmationDialogService } from '../shared/services/confirmation-dialog.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CaptchaService } from '../shared/services/captcha.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MdYearServices } from '../shared/services/md-YearService';
import { ApplicationSummaryService } from '../shared/services/applicationSummary.Service';
import { ApplicationSummary } from '../shared/model/zmst_applicationSummary.model';


@Component({
  selector: 'app-counselling-admission-system-summary',
  templateUrl: './counselling-admission-system-summary.component.html',
  styleUrls: ['./counselling-admission-system-summary.component.css']
})
export class CounsellingAdmissionSystemSummaryComponent implements OnInit {  
  appSummary: any[] = [];
  constructor(
    private commonFunctionServices: CommonFunctionServices,
    private storage: TokenLocalStorageService,
    private toastrService: ToastrService,
    private applicationSummaryService: ApplicationSummaryService,
    private loader: AfterLoginComponent,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private captchaService: CaptchaService,
    private sanitizer: DomSanitizer,
    private mdYearService: MdYearServices
  ) {

  }
  ngOnInit(): void {
    this.loader.isLoading = true;
    this.GetCounsellingServices();
  }

  GetCounsellingServices() {
    
    this.applicationSummaryService.GetByCounsAppType().subscribe({next:(data: any) => {
      
      this.appSummary = data;
      this.commonFunctionServices.bindDataTable("applicationSummary", 0);
      this.loaderTimeOut();

    },error:(err:any)=>{
     
      this.commonFunctionServices.bindDataTable("applicationSummary", 0);
      this.loader.isLoading = false;
      this.toastrService.error(err);
    }})
  }
  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 10000);
  }
  btnUpdateAll() {
    this.loader.isLoading = true;
    this.applicationSummaryService.UpdateAll(this.appSummary)
      .subscribe(data => {
        if (data.length > 0) {
          
          this.commonFunctionServices.bindDataTable("applicationSummary", 0);
          if(data=="Try Again"){
            this.toastrService.error(data);
          }
          if(data=="Updated Successfully"){
            this.toastrService.success(data);
          }
          this.GetCounsellingServices();   
        }
      }
      )
  }
}