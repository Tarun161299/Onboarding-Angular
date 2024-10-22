import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.services';

import { OnBoardingMail } from '../shared/model/OnBoardingMailModel';
import { AppOnBoardingRequestService } from '../shared/services/appOnBoardingRequest';
import { ToastrService } from 'ngx-toastr';
import { EncyptionDecryption } from '../shared/common/EncyptionDecryption';
import { DatePipe } from '@angular/common';
import { AfterLoginComponent } from '../shared/after-login/after-login.component';
import { ConfirmationDialogService } from '../shared/services/confirmation-dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TokenLocalStorageService } from '../shared/tokenLocalStorage/tokenLocalStorageService';
import { ConfigurationApiSecureKey } from '../shared/services/ConfigurationApiSecureKey.Services';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-request-details-view',
  templateUrl: './request-details-view.component.html',
  styleUrls: ['./request-details-view.component.css']
})

export class RequestDetailsViewComponent implements OnInit {
  placements = ["top", "left", "right", "bottom"];
  popoverTitle = "Are you sure?";
  popoverMessage = "Are you really <b>sure</b> you want to do this?";
  confirmText = 'Yes <i class="fas fa-check"></i>';
  cancelText = 'No <i class="fas fa-times"></i>';
  confirmClicked = false;
  cancelClicked = false;
  OnboardingeMail: OnBoardingMail[] = [];
  requestData: any;
  temp: any;
  requestId: string = "";
  submitted = false;
  agency: string = "";
  services: string = "";
  ministry: string = "";
  NameofOrganization: string = "";
  mailingAddress: string = "";
  pinCode: string = "";
  headOfOrganization: string = "";
  designation: string = "";
  email: string = "";
  mobileNumber: string = "";
  coordinatorName: string = "";
  coordinatorDesignation: string = "";
  coordinatorEmail: string = "";
  coordinatorMobileNumber: string = "";
  fileUrl: any;
  binarydata: any
  btnReSend = true;
  status: string = "";
  statusArray: any[];
  showStatus: string = "";
  disabletxtarea = false;
  remark: string = "";
  responseViewBtn: boolean = false;
  requestEncyptId: string = "";
  stateshow: boolean = true;
  state: string = "";
  confirmationDialog: boolean = false;
  Ministryshow: boolean = true;
  showservices: String[] = [];
  Services: string = "";
  token: any;
  requestDetailViewForm: FormGroup;
  encSecretKey: string
  encsalt: string
  decSecretKey: string
  decsalt: string
  submitTime:Date;
  constructor(private storage: TokenLocalStorageService,
    public formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private confirmationDialogService: ConfirmationDialogService,
    private route: ActivatedRoute,
    private loader: AfterLoginComponent,
    private toastrService: ToastrService,
    private datePipe: DatePipe,
    private user: ApiService,
    private users: AppOnBoardingRequestService,
    private sanitizer: DomSanitizer,
    private configurationApiSecureKey: ConfigurationApiSecureKey,
    private router: Router) {
    this.requestDetailViewForm = this.formBuilder.group({
      remarks: ['', Validators.compose([Validators.required, this.scriptValidator])],
    })
  }
  @ViewChild('content') popupview !: ElementRef;
  ngOnInit(): void {
   // this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      debugger
      this.decSecretKey =environment.secretKey// data[0].secretKey
      this.encSecretKey=environment.secretKey//data[0].secretKey
      this.encsalt=environment.salt//data[0].salt
      this.decsalt = environment.salt
      this.cd.detectChanges();
      this.loader.isLoading = true;
      this.requestEncyptId = this.route.snapshot.params['Id'].toString();
      this.requestId = EncyptionDecryption.Decrypt(this.requestEncyptId, this.decSecretKey, this.decsalt)

      this.requestId = this.requestId.substring(0, this.requestId.length - 15)
      this.token = this.storage.get('token');
      this.pdfData();
      this.reQuestDetailsView();
  //  })  
  }

  get requestDetailViewFormControl() { return this.requestDetailViewForm.controls; }
  
  pdfData() {
    
    this.users.getdatafromRequestList(this.requestId).subscribe(
      data => {
        this.binarydata = data.docContent;
        this.submitTime = data.submitTime;
      }
    );
    this.loaderTimeOut();
  }

  reQuestDetailsView() {
    this.users.getdatafromRequestList(this.requestId).subscribe(
      data => {
        this.requestId = data.requestNo;
        let j = 0;
        for (let i = 0; i < data.services.length; i++) {
          if (data.services[i] != ',') {
            if (data.services[i] == "1") {
              this.showservices[j] = "Examination Services";
              j = j + 1;
            }
            if (data.services[i] == "2") {
              this.showservices[j] = "Counselling Services";
              j = j + 1;
            }
            if (data.services[i] == "3") {
              this.showservices[j] = "Result Servicest";
              j = j + 1;
            }
          }
        }
        for (let k = 0; k < this.showservices.length; k++) {
          if (k == this.showservices.length - 1) {
            this.Services = this.Services + this.showservices[k]
          }
          else {
            this.Services = this.Services + this.showservices[k] + ","
          }
        }
        this.services = this.Services;
        this.agency = data.agencyType;
        if (this.agency.indexOf('State') !== -1) {
          this.stateshow = false;
          this.state = data.state;
        }
        if (this.agency.indexOf('Central') !== -1) {
          this.Ministryshow = false;
          this.ministry = data.ministryName;
        }
        this.NameofOrganization = data.oranizationName;
        this.mailingAddress = data.address;
        this.pinCode = data.pinCode;
        this.headOfOrganization = data.contactPerson;
        this.designation = data.designation;
        this.email = EncyptionDecryption.Decrypt(data.email, this.decSecretKey, this.decsalt);
        this.mobileNumber = EncyptionDecryption.Decrypt(data.mobileNo, this.decSecretKey, this.decsalt);
        this.coordinatorName = data.coordinatorName;
        this.coordinatorDesignation = data.coordinatorDesignation;
        this.coordinatorEmail = EncyptionDecryption.Decrypt(data.coordinatorEmail, this.decSecretKey, this.decsalt);
        this.coordinatorMobileNumber = EncyptionDecryption.Decrypt(data.coordinatorPhone, this.decSecretKey, this.decsalt);
        this.statusArray = data.mdStatusList;
        this.status = data.status;
        this.remark = data.remarks;
        this.requestDetailViewForm.patchValue({
          remarks: this.remark
        })
        if (this.status == 'RP' || this.status == null) {
          this.showStatus = "Pending";
        }
        if (this.status == 'RH') {
          this.showStatus = "Hold";
        }
        if (this.status == 'RR') {
          this.btnReSend = false;
          this.disabletxtarea = true;
          this.showStatus = "Reject";
        }
        if (this.status == 'RA') {
          this.btnReSend = false;
          this.showStatus = "Approved";
          this.disabletxtarea = true;
        }
        if (data.onBoardingDetailsStatus === 'DP') {
          this.responseViewBtn = true;
        }
        else {
          this.responseViewBtn = false;
        }
        if (this.disabletxtarea == true) {
          this.requestDetailViewForm.controls['remarks'].disable();
        }
        //this.loaderTimeOut();
      }
    );

  }
  onIconClickDownload() {
    if (this.binarydata != null) {
      const linkSource = 'data:application/pdf;base64,' + this.binarydata;
      const downloadLink = document.createElement('a');
      const fileName = 'OnboardBoardRequest.pdf';
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.target = '_blank'
      downloadLink.click();
    }
  }
  viewPdf() {
    if (this.binarydata != null) {
      this.modalService.open(this.popupview, { size: 'xl' });
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.requestDetailViewForm.invalid) {
      //this.submitted=false;
      return;
    }
    this.openConfirmationDialog();
  }

  responseView() {
    this.loader.isLoading = true;
    let number = this.getRandomNumber();
    let requestEncryptId = EncyptionDecryption.Encrypt(this.requestId + number, this.encSecretKey, this.encsalt);
    this.loader.isLoading = false;
    this.router.navigate(["/auth/responseDetailView/" + requestEncryptId]);
  }
  getRandomNumber() {
    const today = new Date();
    let date = this.datePipe.transform(today, 'YYMMddHHMMSSSSS');
    return date;
  }

  onReSend() {
    this.submitted = true;
    if (this.requestDetailViewForm.invalid) {
      return;
    }
    this.loader.isLoading = true;
    this.OnboardingeMail[0] = {
      encryptedRequestNumber: this.requestEncyptId,
      requestNo: this.requestId,
      agency: this.agency,
      services: this.services,
      ministry: this.ministry,
      nameofOrganization: this.NameofOrganization,
      completeMailingAddress: this.mailingAddress,
      pinCode: this.pinCode,
      cordinatorName: this.coordinatorName,
      cordMail: this.email,
      headofOrganization: this.headOfOrganization,
      designation: this.designation,
      email: EncyptionDecryption.Encrypt(this.email, this.encSecretKey, this.encsalt),
      mobileNo: EncyptionDecryption.Encrypt(this.mobileNumber, this.encSecretKey, this.encsalt),
      mailingEmail: this.coordinatorEmail,
      status: this.status,
      remarks: (<HTMLInputElement>document.getElementById("remarks")).value.toString(),
      userId: this.storage.ParseToken().userId,
      cordMobileNo: btoa(this.coordinatorMobileNumber).toString(),
    }
    this.users.OnBoardingMailApi(this.OnboardingeMail[0]).subscribe(
      {
        next: (response: any) => {
          const message = response;
          this.loader.isLoading = false;
          this.toastrService.success(message);
          return false;
        },
        error: (e) => {
          const error = e.message;
          this.loader.isLoading = false;
          this.toastrService.error(error);
          return false;
        }
      }
    );

  }
  public openConfirmationDialog() {
    this.confirmationDialogService
      .confirm("Please confirm..", "Do you really want to submit ?")
      .then(confirmed => {
        if (confirmed == true) {

          this.loader.isLoading = true;
          this.OnboardingeMail[0] = {
            encryptedRequestNumber: this.requestEncyptId,
            requestNo: this.requestId,
            agency: this.agency,
            services: this.services,
            ministry: this.ministry,
            nameofOrganization: this.NameofOrganization,
            completeMailingAddress: this.mailingAddress,
            pinCode: this.pinCode,
            headofOrganization: this.headOfOrganization,
            designation: this.designation,
            cordinatorName: this.coordinatorName,
            email: EncyptionDecryption.Encrypt(this.email, this.encSecretKey, this.encsalt),
            cordMail: this.email,
            mobileNo: EncyptionDecryption.Encrypt(this.mobileNumber, this.encSecretKey, this.encsalt),
            mailingEmail: this.coordinatorEmail,
            status: (<HTMLInputElement>document.getElementById("SessionYear")).value.toString().trim(),
            remarks: (<HTMLInputElement>document.getElementById("remarks")).value.toString(),
            userId:  this.storage.ParseToken().userId,
            cordMobileNo: btoa(this.coordinatorMobileNumber).toString(),
          }

          this.users.OnBoardingMailApi(this.OnboardingeMail[0]).subscribe(
            {
              next: (response: any) => {

                let message = response;
                this.loader.isLoading = false;
                if (message == 'Try Again') {
                  this.toastrService.error(message);
                }
                else {
                  this.toastrService.success(message);
                  this.router.navigate(['/auth/onboardinglist']);
                }
                return false;
              },
              error: (e) => {
                this.loader.isLoading = false;
                const error = e.message;
                this.toastrService.error(error);
                return false;
              }
            }
          );
        }
      }
      )
      .catch(() =>
        this.toastrService.error(
          "User dismissed the dialog (For eg. , by using ESC, clicking the cross icon, or clicking outside the dialog)"
        )
      );
  }

  scriptValidator = function (control: AbstractControl): ValidationErrors | null {
    let value: string = control.value || '';
    if (value) {
      const matches = (value.includes('<script>')) || (value.includes('</script>')) || (value.includes('<style>')) || (value.includes('</style>'));
      return !matches ? null : { invalid: true };
    } else {
      return null;
    }
  }

  getEncryptionKey() {
    //this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.encSecretKey =environment.secretKey// data[0].secretKey
      this.encsalt = environment.salt
    //})
  }

  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 1000);
  }
}

