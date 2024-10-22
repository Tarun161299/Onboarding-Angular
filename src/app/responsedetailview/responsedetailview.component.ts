import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OnBoardingMail } from '../shared/model/OnBoardingMailModel';
import { Responsedetailview } from '../shared/model/Responsedetailview';
import { AppOnBoardingRequestService } from '../shared/services/appOnBoardingRequest';
import { AppOnBoardingDetails } from 'src/app/shared/model/appOnBoardingDetailsModel'
import { EncyptionDecryption } from '../shared/common/EncyptionDecryption';
import { DatePipe } from '@angular/common';
import { AfterLoginComponent } from '../shared/after-login/after-login.component';
import { ConfirmationDialogService } from '../shared/services/confirmation-dialog.service';
import { DocumentTypeService } from '../shared/services/documentTypeService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDocumentUploadDetailService } from '../shared/services/appDocumentUploadedDetailService';
import { ActivityEnum } from '../shared/common/enums/activity.enums';
import { ConfigurationApiSecureKey } from '../shared/services/ConfigurationApiSecureKey.Services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-responsedetailview',
  templateUrl: './responsedetailview.component.html',
  styleUrls: ['./responsedetailview.component.css']
})
export class ResponsedetailviewComponent implements OnInit {

  OnboardingeMail: OnBoardingMail[] = [];

  //[x: string]: any;
  submitted = false;
  signupform: FormGroup | undefined;
  requestId: string = "";
  services: string = "";
  agency: string = "";
  RADIO_LIST = [
    { id: 1, name: 'Yes', value: true, checked: false },
    { id: 2, name: 'No', value: false }]
  ministry: string = "";
  NameofOrganization: string = "";
  securitypin: string = "";
  Dissimilarity: boolean | undefined;
  requestNo: string = "";
  ministryName: string = "";
  agencyType: string = "";
  docContent: string = "";
  oranizationName: string = "";
  designation: string = "";
  website: string = "";
  detailStatusUpdate: AppOnBoardingDetails[] = [];
  requestEncyptId: string = "";
  currStatus: string;
  yearOfFirstTimeAffiliation: string = "";
  ministryId: string = "";
  previousAgency: string = "";
  description: string = "";
  examExpectedApplicant: string = "";
  examinationList: string = "";
  examTentativeScheduleStart: string = "";
  examTentativeScheduleEnd: string = "";
  counsExpectedApplicant: string = "";
  counsExpectedSeat: string = "";
  counsStreamList: string = "";
  counsExpectedRound: string = "";
  counsExpectedSpotRound: string = "";
  counsExpectedParticipatingInstitute: string = "";
  counsTentativeScheduleStart: string = "";
  counsTentativeScheduleEnd: string = "";
  counsDissimilarityOfSchedule: any;
  ExamDissimilarityOfSchedule: any;
  submitTime: string = "";
  ipaddress: string = "";
  status: string = "";
  isActive: string = "";
  onBoardingDetailsStatus: string = "";
  agencyTypeId: string = "";
  sessionYear: string = "";
  ministryOther: string = "";
  organizationId: string = "";
  organizationOther: string = "";
  address: string = "";
  pinCode: string = "";
  contactPerson: string = "";
  email: string = "";
  mobileNo: string = "";
  userDepartmentCoordinator: any[''];
  userDepartmentDeputyCoordinator: any[''];
  userDepartmentManagerUnit: any[''];
  userDepartmentNodalOfficer: any[''];
  userDepartmentAuthorizedSignatory: any[''];
  userDepartmentSystemAdmin: any[''];
  userDepartmentDatabaseAdmin: any[''];
  userDepartmentWebInfoManager: any[''];
  headOfOrganisation: string = "";
  ddlStatus: string = "";
  ministryshow: boolean = true;
  stateshow: boolean = true;
  state: string = "";
  currentStatus: string = "";
  Counselling: boolean = true;
  Examhide: boolean = true;
  Counsdescription: string;
  previousAgencyCouns: string;
  showservices: String[] = [];
  Services: string = "";
  rowdata: any[];
  Base64FileString: any = "";
  encSecretKey: string
  encsalt: string;
  decSecretKey: string;
  decsalt: string
  paramViewDocument:any;
  Statuslist = [{ value: 'DT', Text: 'Return' }, { value: 'DA', Text: 'Approved' }, { value: 'DR', Text: 'Reject' }];

  constructor(private appDocumentUploadDetailService: AppDocumentUploadDetailService,
    private modalService: NgbModal,
    private documentTypeService: DocumentTypeService,
    private confirmationDialogService: ConfirmationDialogService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loader: AfterLoginComponent,
    private datePipe: DatePipe,
    private toastrService: ToastrService,
    private user: AppOnBoardingRequestService,
    private configurationApiSecureKey: ConfigurationApiSecureKey,
    private router: Router) { }
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  @ViewChild('content') popupview !: ElementRef;
  ngOnInit(): void {
    
    
    
    
    
    
    this.getDecryptionKey();

  }
  getDocumentData(requestID: string) {
    
    this.documentTypeService.getByRequestId(requestID).subscribe((data: any) => {
      
      this.rowdata = data.filter(x => x.docType == "DL")[0].docContent;
    })
  }

  onchange(item: any) {
    this.Dissimilarity = item.value;
  }

  generateCaptcha() {
    var uniquechar = "";
    const randomchar =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 1; i < 7; i++) {
      uniquechar += randomchar.charAt(
        Math.random() * randomchar.length)
    }
    this.securitypin = uniquechar;
  }

  RefreshSecurityPin() {
    this.generateCaptcha();
  }

  getRandomNumber() {
    const today = new Date();
    let date = this.datePipe.transform(today, 'YYMMddHHMMSSSSS');
    return date;
  }
  onSubmit() {
    this.openConfirmationDialog();
  }

  onReSend() {
    this.loader.isLoading = true;
    let number = this.getRandomNumber();
   // this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.encSecretKey =environment.secretKey// data[0].secretKey;
      this.encsalt =environment.salt // data[0].salt;
      let requestEncryptId = EncyptionDecryption.Encrypt(this.requestId + number, this.encSecretKey, this.encsalt);
      if (this.onBoardingDetailsStatus == 'DA' || this.onBoardingDetailsStatus == 'DT' || this.onBoardingDetailsStatus == 'DR') {
        const params = {
          encryptedRequestNumber: requestEncryptId,
          requestNo: this.requestId,
          status: this.onBoardingDetailsStatus,
          remarks: "",
          email: EncyptionDecryption.Decrypt(this.userDepartmentCoordinator.emailId, this.decSecretKey, this.decsalt),
          cordName: this.userDepartmentCoordinator.name,
          cordNumber: btoa(EncyptionDecryption.Decrypt(this.userDepartmentCoordinator.mobileNo, this.decSecretKey, this.decsalt)).toString(),
          activity: "ResendRegistrationLink"
        }
        this.user.UpdateOnboardDetails(params).subscribe(
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
              const error = e.message;
              this.loader.isLoading = false;
              this.toastrService.error(error);
              return false;
            }
          }
        );
      }
    //})
  }

  public openConfirmationDialog() {
    this.confirmationDialogService
      .confirm("Please confirm..", "Do you really want to submit ?")
      .then(confirmed => {
        
        
        
        
        
        

        if (confirmed == true) {

         // this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
            this.encSecretKey =environment.secretKey// data[0].secretKey;
            this.encsalt =environment.salt /// data[0].salt;

            this.loader.isLoading = true;
            this.ddlStatus = (<HTMLInputElement>document.getElementById("ddlStatus")).value.toString();
            let number = this.getRandomNumber();
            let requestEncryptId = EncyptionDecryption.Encrypt(this.requestId + number, this.encSecretKey, this.encsalt)
            if (this.ddlStatus == 'DA' || this.ddlStatus == 'DT' || this.ddlStatus == 'DR') {

              const params = {
                encryptedRequestNumber: requestEncryptId,
                requestNo: this.requestId,
                status: this.ddlStatus,
                remarks: (<HTMLInputElement>document.getElementById("remarks")).value.toString(),
                email: EncyptionDecryption.Decrypt(this.userDepartmentCoordinator.emailId, this.decSecretKey, this.decsalt),
                cordName: this.userDepartmentCoordinator.name,
                cordNumber: btoa(EncyptionDecryption.Decrypt(this.userDepartmentCoordinator.mobileNo, this.decSecretKey, this.decsalt)).toString(),
                activity: "Update"
              }
              this.user.UpdateOnboardDetails(params).subscribe(
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
                    const error = e.message;
                    this.loader.isLoading = false;
                    this.toastrService.error(error);
                    return false;
                  }
                }
              );
            }
         // })
        }
      }
      )


  }
  btndownload() {
    

    this.loader.isLoading = true;
    this.paramViewDocument = {
      moduleRefId: this.requestId,
      DocType: "DL",
      ActivityId: ActivityEnum.Onboarding_Details
    };
    this.appDocumentUploadDetailService.getByDocType(this.paramViewDocument).subscribe((data: any) => {
      this.Base64FileString = data.docContent;
      this.loader.isLoading = false;
      const linkSource = 'data:application/pdf;base64,' + this.Base64FileString ;
    const downloadLink = document.createElement('a');
    const fileName = 'OnboardBoardRequest.pdf';
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();

    });
   // this.modalService.open(this.popupview, { size: 'xl' });
  }
    
  
  getDecryptionKey() {
    //this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey =environment.secretKey // data[0].secretKey
      this.decsalt = environment.salt
      this.requestEncyptId = this.route.snapshot.params['Id'].toString();
      this.requestId = EncyptionDecryption.Decrypt(this.requestEncyptId, this.decSecretKey, this.decsalt)
      this.requestId = this.requestId.substring(0, this.requestId.length - 15)
      this.getDocumentData(this.requestId);
      this.user.getdatafromRequestList(this.requestId).subscribe(
        data => {
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
          if (this.services.indexOf("Counselling") !== -1) {
            this.Counselling = false;
          }
          if (this.services.indexOf("Examination Services") !== -1) {
            this.Examhide = false;
          }
          this.requestNo = data.requestNo;

          this.agencyType = data.agencyType;
          if (this.agencyType.indexOf('State') !== -1) {
            this.stateshow = false;
            this.state = data.state;
          }
          if (this.agencyType.indexOf('Central') !== -1) {
            this.ministryshow = false;
            this.ministryName = data.ministryName;
          }
          this.docContent = data.docContent;
          this.oranizationName = data.oranizationName;
          this.designation = data.designation;
          this.website = data.website;
          this.headOfOrganisation = data.contactPerson;
          this.Counsdescription = data.counsLastSessionDescription;
          this.previousAgencyCouns = data.counsLastSessionTechSupportBy
          this.yearOfFirstTimeAffiliation = data.yearOfFirstTimeAffilitionSession;
          this.ministryId = data.ministryId;
          this.previousAgency = data.examLastSessionTechSupportBy;
          this.description = data.examLastSessionDescription;
          this.examExpectedApplicant = data.examExpectedApplicant;
          this.examinationList = data.examCourseList;
          this.examTentativeScheduleStart = data.examTentativeScheduleStart;
          this.examTentativeScheduleEnd = data.examTentativeScheduleEnd;
          this.counsExpectedApplicant = data.counsExpectedApplicant;
          this.counsExpectedSeat = data.counsExpectedSeat;
          this.counsStreamList = data.counsCourseList;
          this.counsExpectedRound = data.counsExpectedRound;
          this.counsExpectedSpotRound = data.counsExpectedSpotRound;
          this.counsExpectedParticipatingInstitute = data.counsExpectedParticipatingInstitute;
          this.counsTentativeScheduleStart = data.counsTentativeScheduleStart;
          this.counsTentativeScheduleEnd = data.counsTentativeScheduleEnd;
          this.counsDissimilarityOfSchedule = data.counsDissimilarityOfSchedule;
          this.submitTime = data.submitTime;
          this.ipaddress = data.ipaddress;
          this.status = data.status;
          this.isActive = data.isActive;
          this.onBoardingDetailsStatus = data.onBoardingDetailsStatus;
          this.agencyTypeId = data.agencyTypeId;
          this.sessionYear = data.sessionYear;
          this.ministryOther = data.ministryOther;
          this.organizationId = data.organizationId;
          this.organizationOther = data.organizationOther;
          this.address = data.address;
          this.pinCode = data.pinCode;
          this.contactPerson = data.contactPerson;
          this.ExamDissimilarityOfSchedule = data.examDissimilarityOfSchedule
          this.email = data.email;
          this.mobileNo = data.mobileNo;
          this.currStatus = data.onBoardingDetailsStatus.trim();
          if (this.currStatus == 'DD') { this.currentStatus = "Save As Draft" }
          else if (this.currStatus == 'DP') { this.currentStatus = "Pending" }
          else if (this.currStatus == 'DT') { this.currentStatus = "Returned" }
          else if (this.currStatus == 'DR') { this.currentStatus = "Rejected" }
          else if (this.currStatus == 'DA') { this.currentStatus = "Approved" }
          else { this.currentStatus = "NA"; this.currStatus = 'NA' }
        }
      );

      this.user.getContactdatafromRequestList(this.requestId).subscribe(
        data => {

          this.userDepartmentCoordinator = data[0];
          this.userDepartmentDeputyCoordinator = data[1];
          this.userDepartmentManagerUnit = data[2];
          this.userDepartmentNodalOfficer = data[3];
          this.userDepartmentAuthorizedSignatory = data[4];
          this.userDepartmentSystemAdmin = data[5];
          this.userDepartmentDatabaseAdmin = data[6];
          this.userDepartmentWebInfoManager = data[7];
          this.loader.isLoading = false;
        }
      );
   // })
  }
  viewDocument() {

    this.loader.isLoading = true;
    this.paramViewDocument = {
      moduleRefId: this.requestId,
      DocType: "DL",
      ActivityId: ActivityEnum.Onboarding_Details
    };
    this.appDocumentUploadDetailService.getByDocType(this.paramViewDocument).subscribe((data: any) => {
      this.Base64FileString = data.docContent;
      this.loader.isLoading = false;
    });
    this.modalService.open(this.popupview, { size: 'xl' });
  }
}




