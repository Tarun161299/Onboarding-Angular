import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AfterLoginComponent } from '../shared/after-login/after-login.component';
import { ToastrService } from 'ngx-toastr';
import { CommonFunctionServices } from '../shared/common/commonFunction.services';
import { ApplicationSummaryService } from '../shared/services/applicationSummary.Service';
import { TokenLocalStorageService } from '../shared/tokenLocalStorage/tokenLocalStorageService';
import { ConfirmationDialogService } from '../shared/services/confirmation-dialog.service';
import { ApplicationSummary } from '../shared/model/zmst_applicationSummary.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZmstProjectServices } from '../shared/services/ZmstProjectServices';
import { CaptchaService } from '../shared/services/captcha.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MdYearServices } from '../shared/services/md-YearService';
import { MdYearEnum } from '../shared/common/enums/yearGroup.enums';
import { ConfigurationApiSecureKey } from '../shared/services/ConfigurationApiSecureKey.Services';
import { EncyptionDecryption } from '../shared/common/EncyptionDecryption';

declare const $: any;

@Component({
  selector: 'app-application-entry',
  templateUrl: './application-entry.component.html',
  styleUrls: ['./application-entry.component.css']
})

export class ApplicationEntryComponent implements OnInit {
  applicationSummary: ApplicationSummary[];
  rowdata: any;
  token: any;
  flag: boolean = false;
  Years: any[] = [{ year: "2019", value: "19" }, { year: "2020", value: "20" }, { year: "2021", value: "21" }, { year: "2022", value: "22" }, { year: "2023", value: "23" }, { year: "2024", value: "24" }]
  ApplicationTypes: any[] = [{ applicationType: "Registration", value: "REGST" }, { applicationType: "Counselling", value: "COUNS" }]
  Status: any[] = [{ status: "Active", value: "A" }, { status: "Not Active", value: "N" }]

  RadioList = [
    { id: 0, name: 'No', value: false },
    { id: 1, name: 'Yes', value: true },
  ];

  zmstAppSummary: FormGroup;
  submitted: boolean = false;
  addhdn: boolean = false;
  updatehdn: boolean = true;
  zmstprojects: any;
  Zmstprojectsdropdown: any = [];
  flagfilterproject: number;
  securitypin: string;
  applicationTitle: any[] = [];
  captchaData: any;
  imageSource: any;
  ddlApplicationTitle: any;
  projectId: string;
  agencyId: string;
  decSecretKey: any;
  decsalt: any;

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
    private ZmstUser: ZmstProjectServices,
    private captchaService: CaptchaService,
    private sanitizer: DomSanitizer,
    private mdYearService: MdYearServices,
    private configurationApiSecureKey: ConfigurationApiSecureKey
  ) {

  }

  ngOnInit(): void {
    this.loader.isLoading = true;
    /*
    this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = data[0].secretKey;
      this.decsalt = data[0].salt;
    });
    */
    this.getOnboardingRequestYear();
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
      SecurityPIN: ['',[Validators.required]],
      IsMobileAppLaunched : ["false"]

    });

    //this.AppSummaryFormControl.IsMobileAppLaunched.setValue("false");
    this.GetCaptcha()
    this.token = this.storage.get('token');
    this.GetAllApplicationList();
    this.GetAllZmstProject();
  }

  getOnboardingRequestYear() {
    this.loader.isLoading = true;
    this.mdYearService
      .getById(MdYearEnum.Onboarding_Project).subscribe({
        next: (res) => {
          this.Years = res;
          this.loader.isLoading = false;
        }, error: (err: any) => {
          this.toastrService.error(err);
          this.loader.isLoading = false;
        }
      });
  }

  GetAllZmstProject() {
    this.ZmstUser.getAll().subscribe((data: any) => {
      this.zmstprojects = data;
    })
  }

  GetAllApplicationList() {
    this.applicationSummaryService.GetAll()
      .subscribe(data => {
        this.rowdata = data;
        this.commonFunctionServices.bindDataTable("applicationSummary", 0);
        this.loaderTimeOut();
      }
      )

  }
  selectYearAndAppType() {
    this.Zmstprojectsdropdown = this.zmstprojects.filter(x => x.academicYear == (this.zmstAppSummary.get('ApplicationYear').value == "" ? x.academicYear : Number(this.zmstAppSummary.get('ApplicationYear').value)) &&
      x.serviceType == (this.zmstAppSummary.get('ApplicationType').value == "" ? x.serviceType : (this.zmstAppSummary.get('ApplicationType').value == 'COUNS') ? 2 : 1))
  }

  onselectApplicationTitle() {
    this.projectId = this.zmstAppSummary.get('ApplicationTitle').value.toString();
    if(this.projectId)  this.zmstAppSummary.patchValue({ApplicationID : this.projectId});
    this.ddlApplicationTitle = this.Zmstprojectsdropdown.filter(x => x.projectId == this.projectId)[0].projectName.toString()//title;
    this.agencyId = this.Zmstprojectsdropdown.filter(x => x.projectId == this.projectId)[0].agencyId.toString()
  }

  edit(user: any) {
    this.flag = true;
    this.updatehdn = false;
    this.addhdn = true;
    this.agencyId = user.agencyId
    this.projectId = user.appId
    this.Zmstprojectsdropdown = this.zmstprojects.filter(x => x.serviceType == ((user.appType == "REGST") ? 1 : 2) && x.academicYear == user.appYear.toString());
    this.zmstAppSummary.patchValue({
      ApplicationYear: user.appYear.toString(),
      ApplicationTitle: user.appTitle,
      ApplicationType: user.appType,
      ApplicationID: user.appId,
      ApplicationURL: user.appUrl,
      Status: user.status,
      Priority: user.priority,
      TotalRound: user.totalRound,
      AdminURL: user.adminUrl,
      IsMobileAppLaunched:user.isMobileAppLaunched.toString()
    })
  }

  btnAdd() {
    this.flag = true;
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
        appTitle: this.Zmstprojectsdropdown.filter(x => x.projectId == Number(this.projectId))[0].projectName.toString(),//this.zmstAppSummary.get('ApplicationTitle').value,
        appUrl: this.zmstAppSummary.get('ApplicationURL').value,
        summary: "",
        status: this.zmstAppSummary.get('Status').value,
        apiLink: this.zmstAppSummary.get('ApplicationURL').value,
        updatedTime: "2019-09-16",
        updatedBy: this.storage.ParseToken().userId,//atob(localStorage.getItem('userID')),
        ipAddress: "",
        priority: Number(this.zmstAppSummary.get('Priority').value),
        scheduleDoc: "",
        id: 0,
        totalRound: Number(this.zmstAppSummary.get('TotalRound').value),
        adminUrl: this.zmstAppSummary.get('AdminURL').value,
        contactDetail: "",
        isMobileAppLaunched:Boolean(this.zmstAppSummary.get('IsMobileAppLaunched').value),
      }

      this.applicationSummaryService.Update(appSummary).subscribe({
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

  deleterow(applicationSummary: ApplicationSummary[]) {
    this.confirmationDialogService.confirmPopUp("Do you really want to Delete ?")
      .then(confirmed => {
        if (confirmed == true) {
          this.applicationSummaryService.Delete(applicationSummary).subscribe((data: any) => {
            const message = data;
            this.GetAllApplicationList();
            this.toastrService.error(message);
          })
        }
      })
  }

  get AppSummaryFormControl() {
    return this.zmstAppSummary.controls;
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  save() {
    this.submitted = true;
    if (this.zmstAppSummary.invalid) {
      return;
    }

    else {

      ;
      if (this.securitypin == this.zmstAppSummary.get('SecurityPIN').value) {
        const appSummary = {
          agencyId: this.agencyId,
          appYear: this.zmstAppSummary.get('ApplicationYear').value,
          appType: this.zmstAppSummary.get('ApplicationType').value,
          appId: this.zmstAppSummary.get('ApplicationID').value,
          appTitle: this.ddlApplicationTitle,//this.zmstAppSummary.get('ApplicationTitle').value,
          appUrl: this.zmstAppSummary.get('ApplicationURL').value,
          summary: "",
          status: this.zmstAppSummary.get('Status').value,
          apiLink: this.zmstAppSummary.get('ApplicationYear').value,
          updatedTime: "2023-04-13",
          updatedBy:this.storage.ParseToken().userId,// atob(localStorage.getItem('userID')),
          ipAddress: "",
          priority: Number(this.zmstAppSummary.get('Priority').value),
          scheduleDoc: "",
          id: 0,
          totalRound: Number(this.zmstAppSummary.get('TotalRound').value),
          adminUrl: this.zmstAppSummary.get('AdminURL').value,
          contactDetail: "",
          isMobileAppLaunched:Boolean(this.zmstAppSummary.get('IsMobileAppLaunched').value),

        }
        this.applicationSummaryService.Insert(appSummary).subscribe({
          next: (data: any) => {

            const message = data;
            if (data == "Data Stored Successfully") {
              this.toastrService.success(message);
            }
            else {
              this.toastrService.error(message);
            }

          },
          error: (err: any) => {
            if (err.status == '409') {
              this.toastrService.error('Already Exists');
            }
            else {
              this.toastrService.error(err);
            }

          }
        })
      }
      else {
        this.toastrService.error("Invalid Security Code");
      }
    }
  }

  refreshCaptcha() {
    this.GetCaptcha();
    this.zmstAppSummary.patchValue({
      SecurityPIN: ""
    })
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

  cancel() {
    this.clearApplicationSummaryFormGroup()
  }

  clearApplicationSummaryFormGroup() {
    this.zmstAppSummary.reset();
    for (let control in this.zmstAppSummary.controls) {
      this.zmstAppSummary.controls[control].setErrors(null);
    }
  }

  btnUpdateAll() {
    this.applicationSummaryService.UpdateAll(this.rowdata)
      .subscribe(data => {
        if (data.length > 0) {
          this.commonFunctionServices.bindDataTable("applicationSummary", 0);
          this.toastrService.success(data);
          this.loader.isLoading = false;
        }
      })
  }

  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 300);
  }
}
