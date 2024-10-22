import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AfterLoginComponent } from '../shared/after-login/after-login.component';
import { CommonFunctionServices } from '../shared/common/commonFunction.services';
import { ApplicationSummaryService } from '../shared/services/applicationSummary.Service';
import { TokenLocalStorageService } from '../shared/tokenLocalStorage/tokenLocalStorageService';

@Component({
  selector: 'app-exam-registration-summary',
  templateUrl: './exam-registration-summary.component.html',
  styleUrls: ['./exam-registration-summary.component.css']
})
export class ExamRegistrationSummaryComponent implements OnInit {

  constructor(
    private commonFunctionServices: CommonFunctionServices,
    private storage: TokenLocalStorageService,
    private toastrService: ToastrService,
    private applicationSummaryService: ApplicationSummaryService,
    private loader: AfterLoginComponent,
  ) { }

  appSummary: any;
  ngOnInit(): void {
    this.loader.isLoading = true;
    this.GetRegistrationServices()
  }

  GetRegistrationServices() {
    this.applicationSummaryService.GetByRegistAppType().subscribe((data: any) => {

      this.appSummary = data;
      this.commonFunctionServices.bindDataTable("applicationSummary", 0);
      this.loaderTimeOut();
    })
  }

  btnUpdateAll() {
    this.loader.isLoading = true;
    this.applicationSummaryService.UpdateAll(this.appSummary)
      .subscribe(data => {
        if (data.length > 0) {
          this.commonFunctionServices.bindDataTable("applicationSummary", 0);
          this.toastrService.success(data);
          this.GetRegistrationServices()
        }
      }
      )

  }

  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 10000);
  }
}
