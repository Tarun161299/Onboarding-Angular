import { Component, OnInit } from '@angular/core';
import { ApplicationSummaryService } from '../shared/services/applicationSummary.Service';
import { ApplicationSummary } from '../shared/model/zmst_applicationSummary.model';
import { AfterLoginComponent } from '../shared/after-login/after-login.component';
import { CommonFunctionServices } from '../shared/common/commonFunction.services';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZmstProjectServices } from '../shared/services/ZmstProjectServices';
import { CaptchaService } from '../shared/services/captcha.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmationDialogService } from '../shared/services/confirmation-dialog.service';
import { DatePipe } from '@angular/common';
import { AppOnBoardingRequestService } from '../shared/services/appOnBoardingRequest';
import { TokenLocalStorageService } from '../shared/tokenLocalStorage/tokenLocalStorageService';

@Component({
  selector: 'app-exam-management-services',
  templateUrl: './exam-management-services.component.html',
  styleUrls: ['./exam-management-services.component.css']
})

export class ExamManagementServicesComponent implements OnInit {
  applicationSummary: ApplicationSummary[];
  rowdata: any;
  zmstAppSummary: FormGroup;
  flag: boolean = true;
  addhdn: boolean = false;
  submitted: boolean = false;
  updatehdn: boolean = true;
  zmstprojects: any;
  count: number;
  Zmstprojectsdropdown: any = [];
  agencyId: any;
  captchaData: any;
  imageSource: any;
  captchaKey: string;
  staticSecurityPin: string;
  securitypin: any;
  myDate = new Date();
  ipAddress = '_._._._';
  Years: any[] = [{ year: "2019", value: "19" }, { year: "2020", value: "20" }, { year: "2021", value: "21" }, { year: "2022", value: "22" }, { year: "2023", value: "23" }, { year: "2024", value: "24" }];
  ApplicationTypes: any[] = [{ applicationType: "Registration", value: "REGST" }];
  Status: any[] = [{ status: "Active", value: "A" }, { status: "Not Active", value: "N" }];
  isDisabled: boolean = true;

  constructor(
    private applicationSummaryService: ApplicationSummaryService,
    private commonFunctionServices: CommonFunctionServices,
    private toastrService: ToastrService,
    private loader: AfterLoginComponent,
    private formBuilder: FormBuilder,
    private zmstProjectServices: ZmstProjectServices,
    private captchaService: CaptchaService,
    private sanitizer: DomSanitizer,
    private confirmationDialogService: ConfirmationDialogService,
    private datePipe: DatePipe,
    private user: AppOnBoardingRequestService,
private storage:TokenLocalStorageService

  ) { }

  ngOnInit(): void {
    this.loader.isLoading = true;
    this.zmstAppSummary = this.formBuilder.group({
      ApplicationYear: ['', [Validators.required]],
      ApplicationType: ['', [Validators.required]],
      ApplicationTitle: ['', [Validators.required]],
      ApplicationID: ['', [Validators.required]],
      ApplicationURL: ['',
        [Validators.pattern(
          '/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g'
        ), Validators.required
        ]],
      Status: ['',
        [Validators.required]
      ],
      Priority: ['', [Validators.required]],
      TotalRound: ['', [Validators.required]],
      AdminURL: ['', [Validators.pattern(
        '/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g'
      ), Validators.required]],
      SecurityPIN: [
        '',
        [Validators.required]
      ]
    });

    this.GetAllExaminationList();
    this.GetCaptcha();
    this.GetAllProjectServices();
    this.patchedValue();
  }

  patchedValue() {
    this.zmstAppSummary.patchValue({
      ApplicationType: this.ApplicationTypes[0].value
    });
  }

  get AppSummaryFormControl() {
    return this.zmstAppSummary.controls;
  }

  GetAllExaminationList() {
    this.applicationSummaryService.GetAllRegistration()
      .subscribe({
        next: (data: any) => {
          if (data.length > 0) {
            this.rowdata = data;
            this.commonFunctionServices.bindDataTable("applicationSummary", 0);
            this.loaderTimeOut();
          }
        }, error: (err: any) => {
          this.loader.isLoading = false;
          this.toastrService.error(err);
        }
      })
  }

  edit(data: any) {
    this.flag = false;
    this.updatehdn = false;
    this.addhdn = true;
    this.Zmstprojectsdropdown = this.zmstprojects.filter(x => x.serviceType == ((data.appType == "REGST") ? 1 : 2) && x.academicYear == data.appYear.toString());
    this.zmstAppSummary.patchValue({
      ApplicationYear: data.appYear.toString(),
      ApplicationTitle: data.appTitle,
      ApplicationType: data.appType,
      ApplicationID: data.appId,
      ApplicationURL: data.appUrl,
      Status: data.status,
      Priority: data.priority,
      TotalRound: data.totalRound,
      AdminURL: data.adminUrl
    })
  }

  deleterow(applicationSummarys: ApplicationSummary[]) {
    this.confirmationDialogService.confirmPopUp("Do you really want to Delete ?")
      .then(confirmed => {
        if (confirmed == true) {
          this.loader.isLoading = true;
          this.applicationSummaryService.Delete(applicationSummarys).subscribe((data: any) => {
            const message = data;
            this.GetAllExaminationList();
            this.toastrService.error(message);
          })
        }
      }
      )
  }

  btnUpdate() {
    this.submitted = true;
    if (this.zmstAppSummary.invalid) {
      return;
    }
    else {
      const appSummary = {
        agencyId: this.agencyId,
        appYear: this.zmstAppSummary.get('ApplicationYear').value,
        appType: this.zmstAppSummary.get('ApplicationType').value,
        appId: this.zmstAppSummary.get('ApplicationID').value,
        appTitle: this.zmstAppSummary.get('ApplicationTitle').value,
        appUrl: this.zmstAppSummary.get('ApplicationURL').value,
        summary: "",
        status: this.zmstAppSummary.get('Status').value,
        apiLink: this.zmstAppSummary.get('ApplicationURL').value,
        updatedTime: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
        updatedBy: this.storage.ParseToken().userId,
        ipAddress: this.ipAddress,
        priority: Number(this.zmstAppSummary.get('Priority').value),
        scheduleDoc: "",
        id: 0,
        totalRound: Number(this.zmstAppSummary.get('TotalRound').value),
        adminUrl: this.zmstAppSummary.get('AdminURL').value,
        contactDetail: "",
      }
      this.applicationSummaryService.UpdateExamManagementService(appSummary).subscribe({
        next: (data: any) => {
          const message = data;
          this.toastrService.success(message);
        },
        error: (err: any) => {
          const message = err;
          this.toastrService.error("Invalid Data");
        }
      })
    }

  }

  cancel() {
    this.clearApplicationSummaryFormGroup()
  }

  clearApplicationSummaryFormGroup() {
    this.zmstAppSummary.reset();
    this.submitted = false;
  }

  save() {

    this.submitted = true;
    if (this.zmstAppSummary.invalid) {
      return;
    }
    if (this.securitypin == this.zmstAppSummary.get('SecurityPIN').value) {
      const appSummary = {
        agencyId: this.agencyId,
        appYear: this.zmstAppSummary.get('ApplicationYear').value,
        appType: this.zmstAppSummary.get('ApplicationType').value,
        appId: this.zmstAppSummary.get('ApplicationID').value,
        appTitle: this.zmstAppSummary.get('ApplicationTitle').value,
        appUrl: this.zmstAppSummary.get('ApplicationURL').value,
        summary: "",
        status: this.zmstAppSummary.get('Status').value,
        apiLink: this.zmstAppSummary.get('ApplicationYear').value,
        updatedTime: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
        updatedBy: this.storage.ParseToken().userId,
        ipAddress: this.ipAddress,
        priority: Number(this.zmstAppSummary.get('Priority').value),
        scheduleDoc: "",
        id: 0,
        totalRound: Number(this.zmstAppSummary.get('TotalRound').value),
        adminUrl: this.zmstAppSummary.get('AdminURL').value,
        contactDetail: "",
      }

      this.applicationSummaryService.Insert(appSummary).subscribe({
        next: (data: any) => {
          const message = data;
          this.toastrService.success(message);
        },
        error: (err: any) => {
          const message = err.message;
          this.toastrService.error(message);
        }
      })
    }
    else {
      this.toastrService.error("Invalid Security Pin");
    }
  }

  refresh() {

  }

  GetAllProjectServices() {
    this.zmstProjectServices.getAll().subscribe((data: any) => {
      this.zmstprojects = data;
    })
  }

  onSelectAppYear(event: any) {
    this.Zmstprojectsdropdown = [];
    if (this.count == 0) {
      this.Zmstprojectsdropdown = this.Zmstprojectsdropdown.filter(x => x.academicYear == Number(event.target.value));
    }
    else { this.Zmstprojectsdropdown = this.zmstprojects.filter(x => x.academicYear == Number(event.target.value)); }
    this.count = 1;
  }

  onSelectApplicationTitle(event: any) {
    if (this.count == 1) {
      this.Zmstprojectsdropdown = this.Zmstprojectsdropdown.filter(x => x.serviceType == Number(event.target.value));
    }
    else {
      this.Zmstprojectsdropdown = this.zmstprojects.filter(x => x.serviceType == Number(event.target.value));
    }
    this.count = 0;
    this.Zmstprojectsdropdown = this.zmstprojects;
    this.agencyId = this.Zmstprojectsdropdown.filter(x => x.projectName == ((event.target.value) == "REGST") ? "1" : "2")[0].agencyId.toString();
  }

  refreshCaptcha() {
    this.GetCaptcha();
    this.zmstAppSummary.patchValue({
      SecurityPIN: ""
    })
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  GetCaptcha() {
    this.captchaService.getAll().subscribe({
      next: (data: any) => {
        this.captchaData = data;
        this.securitypin = data.captchaKey;
        this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.captchaData.captchBaseString}`);
      }, error: (err: any) => {
        const message = err.message;
        this.toastrService.error(message);
      }
    });
  }

  btnAdd() {
    this.flag = false;
    this.zmstAppSummary.controls['ApplicationType'].disable();
  }

  btnUpdateAll() {
    this.applicationSummaryService.UpdateAllRegistrationList(this.rowdata)
      .subscribe(data => {
        if (data.length > 0) {
          this.commonFunctionServices.bindDataTable("applicationSummary", 0);
          this.toastrService.success(data);
          this.loader.isLoading = false;
        }
      }
      )
  }

  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 2000);
  }
  getIPAddress() {
    this.loader.isLoading = true;
    this.user.GetIP().subscribe((res: any) => {
      this.ipAddress = res;
      this.loader.isLoading = false;
    })
  }
}
