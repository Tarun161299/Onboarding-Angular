import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppOnBoardingDetails } from 'src/app/shared/model/appOnBoardingDetailsModel';
import { UserDepatmentDetails } from 'src/app/shared/model/UserDepartmentDetailsmodel';
import { AppOnBoardingRequestService } from 'src/app/shared/services/appOnBoardingRequest';
import { SaveDraftHome } from 'src/app/shared/model/SaveDraftHomeModel';
import { SaveDraftProfile } from 'src/app/shared/model/SaveDraftProfileModel';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import { BeforeLoginComponent } from 'src/app/shared/before-login/before-login.component';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
import { StackItemObject } from 'highcharts';
import * as html2pdf from 'html2pdf.js';
import * as jspdf from 'jspdf';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'src/app/shared/otp-localStorage/localStorageServices';
import { ConfigurationEnvironment } from 'src/app/shared/services/configEnvironment.services';
import { MdYearEnum } from 'src/app/shared/common/enums/yearGroup.enums';
import { MdYearServices } from 'src/app/shared/services/md-YearService';
import { MdYearModel } from 'src/app/shared/model/md-YearModel';
import { ConfigurationApiSecureKey } from 'src/app/shared/services/ConfigurationApiSecureKey.Services';
import { environment } from 'src/environments/environment';
declare const $: any;
@Component({
  selector: 'app-on-boarding-details',
  templateUrl: './on-boarding-details.component.html',
  styleUrls: ['./on-boarding-details.component.css'],
})
export class OnBoardingDetailsComponent implements OnInit {
  OnBoardDetailsData: any = [];
  appOnBoarddetails: AppOnBoardingDetails[] = [];
  userDepatmentDetails: UserDepatmentDetails[] = [];
  selectedUserDepartmentDetails: UserDepatmentDetails[] = [];
  selectdissimilaritycouns: number = 0;
  selectdissimilarityExams: number = 0;
  saveDraftHome: SaveDraftHome[] = [];
  boolcounsdisOfsched = false;
  boolexamdisOfsched = false;
  saveDraftProfile: SaveDraftProfile[] = [];
  requestId: string = '';
  submitted = false;
  agency: string = '';
  services: string = '';
  ministry: string = '';
  NameofOrganization: string = '';
  mailingAddress: string = '';
  pinCode: string = '';
  headOfOrganization: string = '';
  designation: string = '';
  email: string = '';
  mobileNumber: string = '';
  ministryid: number = 0;
  counsellinghide = true;
  examinationhide = true;
  hidebutton = false;
  inputScheduleStartExam: any;
  examEnd: any;
  months: string = 'JanFebMarAprMayJunJulAugSepOctNovDec';
  monthno: string = '';
  convertdate: string = '';
  FinalData: string = '';
  month: string = '';
  date: any;
  year: string = '';
  pipe = new DatePipe('en-US');
  todayWithPipe = null;
  error = false;
  counsselect: number = 0;
  counsselectexam: number = 0;
  checkbox: any;
  todayDate: any;
  checkboxexam: any;
  requestEncyptId: string = '';
  registerForm: FormGroup;
  conductExam: string;
  firstSessionyear: string;
  statuscheck: string;
  conductedCounse: string;
  conductedExam: string;
  ministryshow: boolean = false;
  Stateshow: boolean = false;
  showservices: String[] = [];
  Services: string = '';
  firsttimeaffiliation: string;
  forPdf: any;
  opt: any[] = [];
  createPdfdata: string;
  attachfile: string = '';
  hodemail: string;
  examinationScheduleStart: string;
  CounsellingScheduleStart: string;
  OTPverification: string = '';
  OTPverificationSms: string;
  configEnvDetails: any;
  otpmedium: string;
  authMode: string;
  showauthMode: boolean = false;
  mobileOtp: boolean = false;
  emailOtp: boolean = false;
  otpHeading: string;
  decSecretKey: string;
  decsalt: string;
  firstsession: MdYearModel[] = [];
  arrrole: string[] = [
    'co',
    'DepCo',
    'prog',
    'nodal',
    'Author',
    'system',
    'database',
    'web',
  ];
  myDate = new Date();
  showData: any;
  orgnizationName: string;
  token: any;
  requestID: any;
  closeResult: string;
  show: boolean = false;
  encSecretKey: string;
  encsalt: string;
  ipAddress = '_._._._';;
  contactPersonDetails: any;
  OTPEmail: string;
  OTPSms: string;
  isEnableSmsOtpLink :boolean = false;
  isEnableEmailOtpLink :boolean = false;

  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private userdetails: AppOnBoardingRequestService,
    private formBuilder: FormBuilder,
    private router: Router,
    private localstore: LocalStorageService,
    private toastrService: ToastrService,
    private loader: BeforeLoginComponent,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private configurationEnvironment: ConfigurationEnvironment,
    private mdYearService: MdYearServices,
    private configurationApiSecureKey: ConfigurationApiSecureKey
  ) { }
  control = new FormControl();

  getOnboardingRequestYear() {
    this.loader.isLoading = true;
    this.mdYearService
      .getById(MdYearEnum.Onboarding_Request).subscribe({
        next: (res) => {
          this.firstsession = res;
          this.loader.isLoading = false;
        }, error: (err: any) => {
          this.toastrService.error(err);
          this.loader.isLoading = false;
        }
      });
  }
  selectedIndex: number = 0;
  convertNUlltoString(data: any) {
    if (data == null || data == 0) return '';
    else return data.toString();
  }
  Changedatefmt(datein: string) {
    this.date = this.datePipe.transform(datein, 'yyyy-MM-dd');
    return this.date;
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  @ViewChild('content') popupview!: ElementRef;
  ngOnInit(): void {
    this.getEncryptionKey();
    this.registerForm = this.formBuilder.group({
      Agency: [''],
      Service: [''],
      Ministry: [''],
      AgencyState: [''],
      OrganizationName: [''],
      websiteV: ['',
        [Validators.pattern(
          '/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g'
        ),
        ],
      ],
      firstSessionV: [''],
      ConductExamV: [''],
      techsupportEV: [
        '',
        [Validators.pattern('^[A-Za-z. ]+$')],
      ],
      DescriptionEV: ['', Validators.compose([Validators.required, this.scriptValidator])],
      conductedCounsV: [''],
      techSupportCV: ['', [Validators.pattern('^[A-Za-z. ]+$')],],
      DescriptionCV: ['', Validators.compose([Validators.required, this.scriptValidator])],
      expectedAEV: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      examinatinLtV: [
        '',
        [
          Validators.required,
          Validators.pattern('^([A-Za-z. ]+.,[a-zA-z. ])+1|[A-Za-z. ]+$'),
        ],
      ],
      totalCourseEV: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      TentativeScheduleSEV: ['', Validators.required],
      TentativeScheduleEEV: ['', Validators.required],
      disSimEV: ['', Validators.required],
      expectedAppCounsCV: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      ExpectedSeatCV: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      CounsellingltCV: [
        '',
        [
          Validators.required,
          Validators.pattern('^([A-Za-z. ]+.,[a-zA-z. ])+1|[A-Za-z. ]+$'),
        ],
      ],
      ExpectedRoundCV: [
        '',
        [Validators.pattern('^[0-9]*$')],
      ],
      ExpecSpotRCV: ['', Validators.pattern('^[0-9]*$')],
      totalCourseCV: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      ExpecpartInstCV: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      tentativeSSCV: ['', Validators.required],
      TentativeScheduleECV: ['', Validators.required],
      DOSCounsV: ['', Validators.required],
      Coname: [''],
      Codesignation: [''],
      CoMobile: [''],
      CoEmail: [''],
      Depconame: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z. ]+$')],
      ],
      Depcodesignation: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z. ]+$')],
      ],
      Depcomobile: [
        '',
        [
          Validators.required,
          Validators.pattern('^[6-9][0-9]{9}$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      Depcoemail: ['', [Validators.required, Validators.email]],
      programMname: [
        '',
        [Validators.pattern('^[A-Za-z. ]+$')],
      ],
      programMdesignation: [
        '',
        [Validators.pattern('^[A-Za-z. ]+$')],
      ],
      programMmobile: [
        '',
        [
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      programMemail: ['', [Validators.email]],
      modalDname: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z. ]+$')],
      ],
      modalDdesignation: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z. ]+$')],
      ],
      modaldmobile: [
        '',
        [
          Validators.required,
          Validators.pattern('^[6-9][0-9]{9}$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      modalemail: ['', [Validators.required, Validators.email]],
      authname: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z. ]+$')],
      ],
      authdesignation: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z. ]+$')],
      ],
      authmobile: [
        '',
        [
          Validators.required,
          Validators.pattern('^[6-9][0-9]{9}$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      authemail: ['', [Validators.required, Validators.email]],
      systemName: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z. ]+$')],
      ],
      systemdesignation: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z. ]+$')],
      ],
      systemmobile: [
        '',
        [
          Validators.required,
          Validators.pattern('^[6-9][0-9]{9}$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      systememail: ['', [Validators.required, Validators.email]],
      databasename: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z. ]+$')],
      ],
      databasedesignation: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z. ]+$')],
      ],
      databasemobile: [
        '',
        [
          Validators.required,
          Validators.pattern('^[6-9][0-9]{9}$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      databaseemail: ['', [Validators.required, Validators.email]],
      webname: ['', [Validators.required, Validators.pattern('^[A-Za-z. ]+$')]],
      webdesignation: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z. ]+$')],
      ],
      webmobile: [
        '',
        [
          Validators.required,
          Validators.pattern('^[6-9][0-9]{9}$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      webemail: ['', [Validators.required, Validators.email]],
      termAndCondition: [false, Validators.requiredTrue],
    });
    this.getconfigEnvDetails();
    this.getOnboardingRequestYear();

    ///this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey;
      this.decsalt = environment.salt;
      this.loader.isLoading = true;
      this.requestId = this.route.snapshot.params['Id'].toString();
      this.requestId = EncyptionDecryption.Decrypt(this.requestId, this.decSecretKey, this.decsalt);
      this.requestId = this.requestId.substring(0, this.requestId.length - 15);
      this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.userdetails
        .getdatafromRequestList(this.requestId)
        .subscribe((data: any) => {
          this.hodemail = EncyptionDecryption.Decrypt(data.email, this.decSecretKey, this.decsalt);
          if (data.counsLastSessionConductedIn != null) {
            this.conductedCounse = data.counsLastSessionConductedIn;
          } else {
            this.conductedCounse = '';
          }
          if (data.counsLastSessionConductedIn == "NA") {
            this.conductedCounse = "";
          }
          if (data.examLastSessionConductedIn != null) {
            this.conductedExam = data.examLastSessionConductedIn;
          } else {
            this.conductedExam = '';
          }
          if (data.examLastSessionConductedIn == "NA") {
            this.conductedExam = "";
          }
          if (data.yearOfFirstTimeAffilitionSession != null) {
            this.firsttimeaffiliation = data.yearOfFirstTimeAffilitionSession;
          } else {
            this.firsttimeaffiliation = '';
          }
          if (data.yearOfFirstTimeAffilitionSession == "NA") {
            this.firsttimeaffiliation = '';
          }

          if (data.agencyType == 'State') {
            this.Stateshow = true;
          }
          if (data.agencyType == 'Central') {
            this.ministryshow = true;
          }
          if (data.counsExpectedSpotRound == '') {
            data.counsExpectedSpotRound = 'NA';
          }
          let j = 0;
          for (let i = 0; i < data.services.length; i++) {
            if (data.services[i] != ',') {
              if (data.services[i] == '1') {
                this.showservices[j] = 'Examination Services';
                j = j + 1;
              }
              if (data.services[i] == '2') {
                this.showservices[j] = 'Counselling Services';
                j = j + 1;
              }
              if (data.services[i] == '3') {
                this.showservices[j] = 'Result Servicest';
                j = j + 1;
              }
            }
          }
          for (let k = 0; k < this.showservices.length; k++) {
            if (k == this.showservices.length - 1) {
              this.Services = this.Services + this.showservices[k];
            } else {
              this.Services = this.Services + this.showservices[k] + ',';
            }
          }
          this.registerForm.patchValue({
            websiteV: data.website,
            Agency: data.agencyType,
            Service: this.Services,
            Ministry: data.ministryName,
            AgencyState: data.state,
            OrganizationName: data.oranizationName,
            firstSessionV: this.firsttimeaffiliation,
            ConductExamV: this.conductedExam,
            techsupportEV: data.examLastSessionTechSupportBy,
            DescriptionEV: data.examLastSessionDescription,
            conductedCounsV: this.conductedCounse,
            techSupportCV: data.counsLastSessionTechSupportBy,
            DescriptionCV: data.counsLastSessionDescription,
            expectedAEV: data.examExpectedApplicant,
            examinatinLtV: data.examCourseList,
            totalCourseEV: data.examTotalCourse,
            TentativeScheduleSEV: this.Changedatefmt(
              data.examTentativeScheduleStart
            ),
            TentativeScheduleEEV: this.Changedatefmt(
              data.examTentativeScheduleEnd
            ),
            expectedAppCounsCV: data.counsExpectedApplicant,
            ExpectedSeatCV: data.counsExpectedSeat,
            CounsellingltCV: data.counsCourseList,
            ExpectedRoundCV: data.counsExpectedRound,
            ExpecSpotRCV: data.counsExpectedSpotRound,
            totalCourseCV: data.counsTotalCourse,
            ExpecpartInstCV: data.counsExpectedParticipatingInstitute,
            tentativeSSCV: this.Changedatefmt(data.counsTentativeScheduleStart),
            TentativeScheduleECV: this.Changedatefmt(
              data.counsTentativeScheduleEnd
            ),
          });
          this.statuscheck = data.onBoardingDetailsStatus;
          if (
            this.statuscheck == 'DP' ||
            this.statuscheck == 'DA' ||
            this.statuscheck == 'DR'
          ) {
            this.registerForm.disable();
            this.hidebutton = true;
          }

          if (data.counsDissimilarityOfSchedule == 0) {
            this.counsselect = 2;
            this.checkbox = document.getElementById(
              this.counsselect.toString()
            ) as HTMLInputElement | null;
            this.checkbox.checked = true;
            this.registerForm.controls['DOSCounsV'].clearValidators();
            this.registerForm.controls['DOSCounsV'].updateValueAndValidity();
          } else if (data.counsDissimilarityOfSchedule == 1) {
            this.counsselect = 1;
            this.checkbox = document.getElementById(
              this.counsselect.toString()
            ) as HTMLInputElement | null;
            this.checkbox.checked = true;
            this.registerForm.controls['DOSCounsV'].clearValidators();
            this.registerForm.controls['DOSCounsV'].updateValueAndValidity();
          }
          if (data.examDissimilarityOfSchedule == 0) {
            this.counsselectexam = 4;
            this.checkboxexam = document.getElementById(
              this.counsselectexam.toString()
            ) as HTMLInputElement | null;
            this.checkboxexam.checked = true;
            this.registerForm.get('disSimEV').clearValidators();
            this.registerForm.controls['disSimEV'].updateValueAndValidity();
          } else if (data.examDissimilarityOfSchedule == 1) {
            this.counsselectexam = 3;
            this.checkboxexam = document.getElementById(
              this.counsselectexam.toString()
            ) as HTMLInputElement | null;
            this.checkboxexam.checked = true;
            this.registerForm.get('disSimEV').clearValidators();
            this.registerForm.controls['disSimEV'].updateValueAndValidity();
          }
          if (
            this.registerForm
              .get('Service')
              .value.indexOf('Counselling Services') !== -1
          ) {
            this.counsellinghide = false;
          }
          if (
            this.registerForm
              .get('Service')
              .value.indexOf('Examination Services') !== -1
          ) {
            this.examinationhide = false;
          }
          this.loader.isLoading = false;
          return false;
        }
        );




      this.userdetails.getContactdatafromRequestList(this.requestId).subscribe(
        (data: any) => {

          if (data.length == 1) {
            this.registerForm.patchValue({
              Coname: data[0].name,
              Codesignation: data[0].designation,
              CoMobile: EncyptionDecryption.Decrypt(data[0].mobileNo, this.decSecretKey, this.decsalt),
              CoEmail: EncyptionDecryption.Decrypt(data[0].emailId, this.decSecretKey, this.decsalt),
            });
            this.loader.isLoading = false;
          } else {
            this.contactPersonDetails = data.filter(x => x.departmentId == '1' && x.roleId == '11');
            this.registerForm.patchValue({
              Coname: this.contactPersonDetails[0].name,
              Codesignation: this.contactPersonDetails[0].designation,
              CoMobile: EncyptionDecryption.Decrypt(this.contactPersonDetails[0].mobileNo, this.decSecretKey, this.decsalt),
              CoEmail: EncyptionDecryption.Decrypt(this.contactPersonDetails[0].emailId, this.decSecretKey, this.decsalt),
            });

            this.contactPersonDetails = data.filter(x => x.departmentId == '1' && x.roleId == '12');
            this.registerForm.patchValue({
              Depconame: this.contactPersonDetails[0].name,
              Depcodesignation: this.contactPersonDetails[0].designation,
              Depcomobile: EncyptionDecryption.Decrypt(this.contactPersonDetails[0].mobileNo, this.decSecretKey, this.decsalt),
              Depcoemail: EncyptionDecryption.Decrypt(this.contactPersonDetails[0].emailId, this.decSecretKey, this.decsalt),
            })

            this.contactPersonDetails = data.filter(x => x.departmentId == '1' && x.roleId == '13');
            this.registerForm.patchValue({
              programMname: this.contactPersonDetails[0].name,
              programMdesignation: this.contactPersonDetails[0].designation,
              programMmobile: EncyptionDecryption.Decrypt(this.contactPersonDetails[0].mobileNo, this.decSecretKey, this.decsalt),
              programMemail: EncyptionDecryption.Decrypt(this.contactPersonDetails[0].emailId, this.decSecretKey, this.decsalt),
            })

            this.contactPersonDetails = data.filter(x => x.departmentId == '2' && x.roleId == '21');
            this.registerForm.patchValue({
              modalDname: this.contactPersonDetails[0].name,
              modalDdesignation: this.contactPersonDetails[0].designation,
              modaldmobile: EncyptionDecryption.Decrypt(this.contactPersonDetails[0].mobileNo, this.decSecretKey, this.decsalt),
              modalemail: EncyptionDecryption.Decrypt(this.contactPersonDetails[0].emailId, this.decSecretKey, this.decsalt),
            })

            this.contactPersonDetails = data.filter(x => x.departmentId == '2' && x.roleId == '22');
            this.registerForm.patchValue({
              authname: this.contactPersonDetails[0].name,
              authdesignation: this.contactPersonDetails[0].designation,
              authmobile: EncyptionDecryption.Decrypt(this.contactPersonDetails[0].mobileNo, this.decSecretKey, this.decsalt),
              authemail: EncyptionDecryption.Decrypt(this.contactPersonDetails[0].emailId, this.decSecretKey, this.decsalt),
            })

            this.contactPersonDetails = data.filter(x => x.departmentId == '3' && x.roleId == '31');
            this.registerForm.patchValue({
              systemName: this.contactPersonDetails[0].name,
              systemdesignation: this.contactPersonDetails[0].designation,
              systemmobile: EncyptionDecryption.Decrypt(this.contactPersonDetails[0].mobileNo, this.decSecretKey, this.decsalt),
              systememail: EncyptionDecryption.Decrypt(this.contactPersonDetails[0].emailId, this.decSecretKey, this.decsalt),
            })

            this.contactPersonDetails = data.filter(x => x.departmentId == '3' && x.roleId == '32');
            this.registerForm.patchValue({
              databasename: this.contactPersonDetails[0].name,
              databasedesignation: this.contactPersonDetails[0].designation,
              databasemobile: EncyptionDecryption.Decrypt(this.contactPersonDetails[0].mobileNo, this.decSecretKey, this.decsalt),
              databaseemail: EncyptionDecryption.Decrypt(this.contactPersonDetails[0].emailId, this.decSecretKey, this.decsalt),
            })

            this.contactPersonDetails = data.filter(x => x.departmentId == '3' && x.roleId == '33');
            this.registerForm.patchValue({
              webname: this.contactPersonDetails[0].name,
              webdesignation: this.contactPersonDetails[0].designation,
              webmobile: EncyptionDecryption.Decrypt(this.contactPersonDetails[0].mobileNo, this.decSecretKey, this.decsalt),
              webemail: EncyptionDecryption.Decrypt(this.contactPersonDetails[0].emailId, this.decSecretKey, this.decsalt),
            })

          }
          this.loader.isLoading = false;
        }
      );
  ///  })
  }

  getconfigEnvDetails() {
    this.configurationEnvironment.getById(1).subscribe((data: any) => {
      this.configEnvDetails = data;
      this.otpmedium = this.configEnvDetails.otpMedium;
      switch (this.configEnvDetails.otpMedium) {
        case "B": this.mobileOtp = true; this.emailOtp = true; this.authMode = "And"; this.otpHeading = "Mobile And Email verification"; this.showauthMode = true;
          break;
        case "E": this.emailOtp = true; this.otpHeading = "Email verification"; this.showauthMode = false;
          break;
        case "M": this.mobileOtp = true; this.otpHeading = "Mobile verification"; this.showauthMode = false;
          break;
        case "A": this.mobileOtp = true; this.emailOtp = true, this.authMode = "OR"; this.otpHeading = "Mobile OR Email verification"; this.showauthMode = true;
          break;
      }
    })
  }

  checkLinkExpiredOrNot() {
    this.userdetails.getRequestLinkDetails(this.requestId).subscribe(
      (data: any) => {
        if (data == false) {
          this.router.navigate(['/requestlinkexpired/']);
        }
      });
  }

  CounsDissimilarityOfSchedule: any = [
    { id: 1, name: 'Yes', value: 1, checked: false },
    { id: 2, name: 'No', value: 0 },
  ];

  ExamDissimilarityOfSchedule: any = [
    { id: 3, name: 'Yes', value: 1, checked: false },
    { id: 4, name: 'No', value: 0 },
  ];

  onchange(item: any) {
    this.selectdissimilaritycouns = item.value;
  }

  get f() {
    return this.registerForm.controls;
  }
  onchangeexams(item: any) {
    this.selectdissimilarityExams = item.value;
  }

  validateInput(c: FormControl) {
    let NIC_REGEX_OLD = /^([6-9][0-9]{9})$/;
    let NIC_REGEX_NEW = /^((?:N|NA))$/;

    return (NIC_REGEX_OLD.test(c.value) || NIC_REGEX_NEW.test(c.value)) ? null : {
      validateInput: {
        valid: false
      }
    };
  }

  savedetails(content) {
    this.submitted = true;
    if (this.registerForm.get('Service').value.indexOf('Counselling') == -1) {
      this.registerForm.controls['conductedCounsV'].clearValidators();
      this.registerForm.controls['techSupportCV'].clearValidators();
      this.registerForm.controls['DescriptionCV'].clearValidators();
      this.registerForm.controls['expectedAppCounsCV'].clearValidators();
      this.registerForm.controls['ExpectedSeatCV'].clearValidators();
      this.registerForm.controls['CounsellingltCV'].clearValidators();
      this.registerForm.controls['ExpectedRoundCV'].clearValidators();
      this.registerForm.controls['totalCourseCV'].clearValidators();
      this.registerForm.controls['ExpecpartInstCV'].clearValidators();
      this.registerForm.controls['tentativeSSCV'].clearValidators();
      this.registerForm.controls['TentativeScheduleECV'].clearValidators();
      this.registerForm.controls['DOSCounsV'].clearValidators();
      //Update
      this.registerForm.controls['conductedCounsV'].updateValueAndValidity();
      this.registerForm.controls['techSupportCV'].updateValueAndValidity();
      this.registerForm.controls['DescriptionCV'].updateValueAndValidity();
      this.registerForm.controls['expectedAppCounsCV'].updateValueAndValidity();
      this.registerForm.controls['ExpectedSeatCV'].updateValueAndValidity();
      this.registerForm.controls['CounsellingltCV'].updateValueAndValidity();
      this.registerForm.controls['ExpectedRoundCV'].updateValueAndValidity();
      this.registerForm.controls['totalCourseCV'].updateValueAndValidity();
      this.registerForm.controls['ExpecpartInstCV'].updateValueAndValidity();
      this.registerForm.controls['tentativeSSCV'].updateValueAndValidity();
      this.registerForm.controls[
        'TentativeScheduleECV'
      ].updateValueAndValidity();
      this.registerForm.controls['DOSCounsV'].updateValueAndValidity();
    }
    if (this.registerForm.get('Service').value.indexOf('Examination') == -1) {
      this.registerForm.controls['ConductExamV'].clearValidators();
      this.registerForm.controls['techsupportEV'].clearValidators();
      this.registerForm.controls['DescriptionEV'].clearValidators();
      this.registerForm.controls['expectedAEV'].clearValidators();
      this.registerForm.controls['examinatinLtV'].clearValidators();
      this.registerForm.controls['totalCourseEV'].clearValidators();
      this.registerForm.controls['TentativeScheduleSEV'].clearValidators();
      this.registerForm.controls['TentativeScheduleEEV'].clearValidators();
      this.registerForm.controls['disSimEV'].clearValidators();
      this.registerForm.controls['ConductExamV'].updateValueAndValidity();
      this.registerForm.controls['techsupportEV'].updateValueAndValidity();
      this.registerForm.controls['DescriptionEV'].updateValueAndValidity();
      this.registerForm.controls['expectedAEV'].updateValueAndValidity();
      this.registerForm.controls['examinatinLtV'].updateValueAndValidity();
      this.registerForm.controls['totalCourseEV'].updateValueAndValidity();
      this.registerForm.controls[
        'TentativeScheduleSEV'
      ].updateValueAndValidity();
      this.registerForm.controls[
        'TentativeScheduleEEV'
      ].updateValueAndValidity();
      this.registerForm.controls['disSimEV'].updateValueAndValidity();
    }
    if (new Date(this.registerForm.get('TentativeScheduleSEV').value).getTime() > new Date(this.registerForm.get('TentativeScheduleEEV').value).getTime() ||
      new Date(this.registerForm.get('tentativeSSCV').value).getTime() > new Date(this.registerForm.get('TentativeScheduleECV').value).getTime()) {
      this.toastrService.error("Start Date is greater than end date")
      return;
    }

    if (this.registerForm.valid) {
      this.generateOtp();
      this.generateOtpSms();
      this.loader.isLoading = true;
      const OTP = this.OTPEmail;
      const OTPSMS = this.OTPSms;
      const params = {
        otp: btoa(OTP).toString(),
        otpSms: btoa(OTPSMS).toString(),
        email: btoa(this.registerForm.get('CoEmail').value),
        mobile: btoa(this.registerForm.get('CoMobile').value),
        coodinatorName: btoa(this.registerForm.get('Coname').value),
      }

      this.userdetails
        .sendOTP(params)
        .subscribe({
          next: (response: any) => {
            const message = response;
            this.loader.isLoading = false;
            this.toastrService.success(message);
            this.show = !this.show;
            this.modalService
              .open(content, {
                ariaLabelledBy: 'modal-basic-title',
                backdrop: 'static',
              })
              .result.then(
                (result) => {
                  this.closeResult = `Closed with: ${result}`;
                },
                (reason) => {
                  this.closeResult = `Dismissed ${this.getDismissReason(
                    reason
                  )}`;
                }
              );

            return false;
          },
          error: (e) => {
            const error = e.message;
            this.loader.isLoading = false;
            this.toastrService.error(error);
            return false;
          },
        });
    }

  }

  activaTab(prevTab: any, nextTab: any) {
    (<HTMLInputElement>document.getElementById(prevTab)).className =
      'tab-pane fade';
    (<HTMLInputElement>document.getElementById(nextTab)).className =
      'tab-pane fade show active';
    (<HTMLInputElement>document.getElementById('a_' + prevTab)).className =
      'nav-tabs nav-link';
    (<HTMLInputElement>document.getElementById('a_' + nextTab)).className =
      'nav-primary nav-tabs nav-link active';
  }

  SaveDraft() {
    this.submitted = false;
    if (this.registerForm.get('TentativeScheduleSEV').value != "" && this.registerForm.get('TentativeScheduleEEV').value != "") {
      if (new Date(this.registerForm.get('TentativeScheduleSEV').value).getTime() > new Date(this.registerForm.get('TentativeScheduleEEV').value).getTime()) {
        this.toastrService.error("Examination Start Date is greater than end date")
        return;
      }
    }
    if (this.registerForm.get('tentativeSSCV').value != "" && this.registerForm.get('TentativeScheduleECV').value != "") {
      if (new Date(this.registerForm.get('tentativeSSCV').value).getTime() > new Date(this.registerForm.get('TentativeScheduleECV').value).getTime()) {
        this.toastrService.error("Counselling Start Date is greater than end date")
        return;
      }
    }
    this.loader.isLoading = true;
    if (this.selectdissimilaritycouns == 0) {
      this.boolcounsdisOfsched = false;
    } else {
      this.boolcounsdisOfsched = true;
    }
    if (this.selectdissimilarityExams == 0) {
      this.boolexamdisOfsched = false;
    } else {
      this.boolexamdisOfsched = true;
    }
    this.appOnBoarddetails[0] = {
      requestNo: this.requestId,
      website: this.registerForm.get('websiteV').value,
      yearOfFirstTimeAffilitionSession:
        this.registerForm.get('firstSessionV').value,
      examLastSessionConductedIn: this.registerForm.get('ConductExamV').value,
      examLastSessionTechSupportBy:
        this.registerForm.get('techsupportEV').value,
      examLastSessionDescription: this.registerForm.get('DescriptionEV').value,
      counsLastSessionConductedIn: this.registerForm.get('ConductExamV').value,
      counsLastSessionTechSupportBy:
        this.registerForm.get('techSupportCV').value,
      counsLastSessionDescription: this.registerForm.get('DescriptionCV').value,
      examExpectedApplicant: this.registerForm.get('expectedAEV').value,
      examCourseList: this.registerForm.get('examinatinLtV').value,
      examTotalCourse: this.registerForm.get('totalCourseEV').value,
      examTentativeScheduleStart: this.registerForm.get('TentativeScheduleSEV')
        .value,
      examTentativeScheduleEnd: this.registerForm.get('TentativeScheduleEEV')
        .value,
      examDissimilarityOfSchedule: this.boolexamdisOfsched,
      counsExpectedApplicant: this.registerForm.get('expectedAppCounsCV').value,
      counsExpectedSeat: this.registerForm.get('ExpectedSeatCV').value,
      counsCourseList: this.registerForm.get('CounsellingltCV').value,
      counsTotalCourse: this.registerForm.get('totalCourseCV').value,
      counsExpectedRound: this.registerForm.get('ExpectedRoundCV').value,
      counsExpectedSpotRound: (this.registerForm.get('ExpecSpotRCV').value == null || this.registerForm.get('ExpecSpotRCV').value == '') ? null : this.registerForm.get('ExpecSpotRCV').value,
      counsExpectedParticipatingInstitute:
        this.registerForm.get('ExpecpartInstCV').value,
      counsTentativeScheduleStart: this.registerForm.get('tentativeSSCV').value,
      counsTentativeScheduleEnd: this.registerForm.get('TentativeScheduleECV')
        .value,
      counsDissimilarityOfSchedule: this.boolcounsdisOfsched,
      submitTime: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
      ipaddress: '',
      status: '',
      remarks: '',
      isActive: '',
      mode: 'Savedraft',
      attachFilecontent: this.attachfile,
      coordinatorMail: '',
      hodMail: '',
    };
    this.userDepatmentDetails = [
      {
        id: 0,
        requestNo: this.requestId,
        departmentId: '1',
        roleId: '12',
        name: this.registerForm.get('Depconame').value,
        designation: this.registerForm.get('Depcodesignation').value,
        mobileNo: EncyptionDecryption.Encrypt(
          this.registerForm.get('Depcomobile').value, this.encSecretKey, this.encsalt
        ),
        emailId: EncyptionDecryption.Encrypt(
          this.registerForm.get('Depcoemail').value, this.encSecretKey, this.encsalt
        ),
      },
      {
        id: 0,
        requestNo: this.requestId,
        departmentId: '1',
        roleId: '13',
        name: this.registerForm.get('programMname').value,
        designation: this.registerForm.get('programMdesignation').value,
        mobileNo: EncyptionDecryption.Encrypt(
          this.registerForm.get('programMmobile').value, this.encSecretKey, this.encsalt
        ),
        emailId: EncyptionDecryption.Encrypt(
          this.registerForm.get('programMemail').value, this.encSecretKey, this.encsalt
        ),
      },
      {
        id: 0,
        requestNo: this.requestId,
        departmentId: '2',
        roleId: '21',
        name: this.registerForm.get('modalDname').value,
        designation: this.registerForm.get('modalDdesignation').value,
        mobileNo: EncyptionDecryption.Encrypt(
          this.registerForm.get('modaldmobile').value, this.encSecretKey, this.encsalt
        ),
        emailId: EncyptionDecryption.Encrypt(
          this.registerForm.get('modalemail').value, this.encSecretKey, this.encsalt
        ),
      },
      {
        id: 0,
        requestNo: this.requestId,
        departmentId: '2',
        roleId: '22',
        name: this.registerForm.get('authname').value,
        designation: this.registerForm.get('authdesignation').value,
        mobileNo: EncyptionDecryption.Encrypt(
          this.registerForm.get('authmobile').value, this.encSecretKey, this.encsalt
        ),
        emailId: EncyptionDecryption.Encrypt(
          this.registerForm.get('authemail').value, this.encSecretKey, this.encsalt
        ),
      },
      {
        id: 0,
        requestNo: this.requestId,
        departmentId: '3',
        roleId: '31',
        name: this.registerForm.get('systemName').value,
        designation: this.registerForm.get('systemdesignation').value,
        mobileNo: EncyptionDecryption.Encrypt(
          this.registerForm.get('systemmobile').value, this.encSecretKey, this.encsalt
        ),
        emailId: EncyptionDecryption.Encrypt(
          this.registerForm.get('systememail').value, this.encSecretKey, this.encsalt
        ),
      },
      {
        id: 0,
        requestNo: this.requestId,
        departmentId: '3',
        roleId: '32',
        name: this.registerForm.get('databasename').value,
        designation: this.registerForm.get('databasedesignation').value,
        mobileNo: EncyptionDecryption.Encrypt(
          this.registerForm.get('databasemobile').value, this.encSecretKey, this.encsalt
        ),
        emailId: EncyptionDecryption.Encrypt(
          this.registerForm.get('databaseemail').value, this.encSecretKey, this.encsalt
        ),
      },
      {
        id: 0,
        requestNo: this.requestId,
        departmentId: '3',
        roleId: '33',
        name: this.registerForm.get('webname').value,
        designation: this.registerForm.get('webdesignation').value,
        mobileNo: EncyptionDecryption.Encrypt(
          this.registerForm.get('webmobile').value, this.encSecretKey, this.encsalt
        ),
        emailId: EncyptionDecryption.Encrypt(
          this.registerForm.get('webemail').value, this.encSecretKey, this.encsalt
        ),
      },
    ];

    this.FinalData = JSON.stringify(this.appOnBoarddetails[0]).substring(
      0,
      JSON.stringify(this.appOnBoarddetails[0]).length - 1
    );
    this.FinalData =
      this.FinalData +
      ',' +
      '"' +
      'contactdetails' +
      '"' +
      ':' +
      JSON.stringify(this.userDepatmentDetails) +
      '}';

    this.userdetails.SaveOnboardDetails(this.FinalData).subscribe({
      next: (response: any) => {
        const message = response;
        this.loader.isLoading = false;
        this.toastrService.success(message);
        return false;
      },
      error: (err: any) => {
        const error = err.message;
        this.loader.isLoading = false;
        this.toastrService.error(error);
        return false;
      },
    });

  }

  public openConfirmationDialog() {
    this.confirmationDialogService
      .confirm('Please confirm..', 'Do you really want to submit ?')
      .then((confirmed) => {
        if (confirmed == true) {
          if (this.registerForm.get('websiteV').value == "") {
            this.registerForm.patchValue({
              websiteV: "NA",
            });
          }
          if (this.registerForm.get('firstSessionV').value == "") {
            this.registerForm.patchValue({
              firstSessionV: "NA",
            });
          }
          if (this.registerForm.get('ConductExamV').value == "") {
            this.registerForm.patchValue({
              ConductExamV: "NA",
            });
          }
          if (this.registerForm.get('techsupportEV').value == "") {
            this.registerForm.patchValue({
              techsupportEV: "NA",
            });
          }
          if (this.registerForm.get('conductedCounsV').value == "") {
            this.registerForm.patchValue({
              conductedCounsV: "NA",
            });
          }
          if (this.registerForm.get('techSupportCV').value == "") {
            this.registerForm.patchValue({
              techSupportCV: "NA",
            });
          }
          if (this.selectdissimilaritycouns == 0) {
            this.boolcounsdisOfsched = false;
          } else {
            this.boolcounsdisOfsched = true;
          }
          if (this.selectdissimilarityExams == 0) {
            this.boolexamdisOfsched = false;
          } else {
            this.boolexamdisOfsched = true;
          }
          if (this.registerForm.get('ExpecSpotRCV').value == null) {
            this.registerForm.patchValue({
              ExpecSpotRCV: 0,
            });
          }
          this.appOnBoarddetails[0] = {
            requestNo: this.requestId,
            website: this.registerForm.get('websiteV').value,
            yearOfFirstTimeAffilitionSession:
              this.registerForm.get('firstSessionV').value,
            examLastSessionConductedIn:
              this.registerForm.get('ConductExamV').value,
            examLastSessionTechSupportBy:
              this.registerForm.get('techsupportEV').value,
            examLastSessionDescription:
              this.registerForm.get('DescriptionEV').value,
            counsLastSessionConductedIn:
              this.registerForm.get('conductedCounsV').value,
            counsLastSessionTechSupportBy:
              this.registerForm.get('techSupportCV').value,
            counsLastSessionDescription:
              this.registerForm.get('DescriptionCV').value,
            examExpectedApplicant: this.registerForm.get('expectedAEV').value,
            examCourseList: this.registerForm.get('examinatinLtV').value,
            examTotalCourse: this.registerForm.get('totalCourseEV').value,
            examTentativeScheduleStart: this.registerForm.get(
              'TentativeScheduleSEV'
            ).value,
            examTentativeScheduleEnd: this.registerForm.get(
              'TentativeScheduleEEV'
            ).value,
            examDissimilarityOfSchedule: this.boolexamdisOfsched,
            counsExpectedApplicant:
              this.registerForm.get('expectedAppCounsCV').value,
            counsExpectedSeat: this.registerForm.get('ExpectedSeatCV').value,
            counsCourseList: this.registerForm.get('CounsellingltCV').value,
            counsTotalCourse: this.registerForm.get('totalCourseCV').value,
            counsExpectedRound: this.registerForm.get('ExpectedRoundCV').value,
            counsExpectedSpotRound: this.registerForm.get('ExpecSpotRCV').value,
            counsExpectedParticipatingInstitute:
              this.registerForm.get('ExpecpartInstCV').value,
            counsTentativeScheduleStart:
              this.registerForm.get('tentativeSSCV').value,
            counsTentativeScheduleEnd: this.registerForm.get(
              'TentativeScheduleECV'
            ).value,
            counsDissimilarityOfSchedule: this.boolcounsdisOfsched,
            submitTime: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
            ipaddress: '',
            status: '',
            remarks: '',
            isActive: '',
            mode: 'FinalSubmit',
            attachFilecontent: this.attachfile,
            coordinatorMail: this.registerForm.get('CoEmail').value,
            hodMail: this.hodemail,
          };
          this.userDepatmentDetails = [
            {
              id: 0,
              requestNo: this.requestId,
              departmentId: '1',
              roleId: '12',
              name: this.registerForm.get('Depconame').value,
              designation: this.registerForm.get('Depcodesignation').value,
              mobileNo: EncyptionDecryption.Encrypt(
                this.registerForm.get('Depcomobile').value, this.encSecretKey, this.encsalt
              ),
              emailId: EncyptionDecryption.Encrypt(
                this.registerForm.get('Depcoemail').value, this.encSecretKey, this.encsalt
              ),
            },
            {
              id: 0,
              requestNo: this.requestId,
              departmentId: '1',
              roleId: '13',
              name: (this.registerForm.get('programMname').value == "") ? "NA" : this.registerForm.get('programMname').value,
              designation: (this.registerForm.get('programMdesignation').value == "") ? "NA" : this.registerForm.get('programMdesignation').value,
              mobileNo: (this.registerForm.get('programMmobile').value == "") ? "NA" : EncyptionDecryption.Encrypt(
                this.registerForm.get('programMmobile').value, this.encSecretKey, this.encsalt
              ),
              emailId: (this.registerForm.get('programMemail').value == "") ? "NA" : EncyptionDecryption.Encrypt(
                this.registerForm.get('programMemail').value, this.encSecretKey, this.encsalt
              ),
            },
            {
              id: 0,
              requestNo: this.requestId,
              departmentId: '2',
              roleId: '21',
              name: this.registerForm.get('modalDname').value,
              designation: this.registerForm.get('modalDdesignation').value,
              mobileNo: EncyptionDecryption.Encrypt(
                this.registerForm.get('modaldmobile').value, this.encSecretKey, this.encsalt
              ),
              emailId: EncyptionDecryption.Encrypt(
                this.registerForm.get('modalemail').value, this.encSecretKey, this.encsalt
              ),
            },
            {
              id: 0,
              requestNo: this.requestId,
              departmentId: '2',
              roleId: '22',
              name: this.registerForm.get('authname').value,
              designation: this.registerForm.get('authdesignation').value,
              mobileNo: EncyptionDecryption.Encrypt(
                this.registerForm.get('authmobile').value, this.encSecretKey, this.encsalt
              ),
              emailId: EncyptionDecryption.Encrypt(
                this.registerForm.get('authemail').value, this.encSecretKey, this.encsalt
              ),
            },
            {
              id: 0,
              requestNo: this.requestId,
              departmentId: '3',
              roleId: '31',
              name: this.registerForm.get('systemName').value,
              designation: this.registerForm.get('systemdesignation').value,
              mobileNo: EncyptionDecryption.Encrypt(
                this.registerForm.get('systemmobile').value, this.encSecretKey, this.encsalt
              ),
              emailId: EncyptionDecryption.Encrypt(
                this.registerForm.get('systememail').value, this.encSecretKey, this.encsalt
              ),
            },
            {
              id: 0,
              requestNo: this.requestId,
              departmentId: '3',
              roleId: '32',
              name: this.registerForm.get('databasename').value,
              designation: this.registerForm.get('databasedesignation').value,
              mobileNo: EncyptionDecryption.Encrypt(
                this.registerForm.get('databasemobile').value, this.encSecretKey, this.encsalt
              ),
              emailId: EncyptionDecryption.Encrypt(
                this.registerForm.get('databaseemail').value, this.encSecretKey, this.encsalt
              ),
            },
            {
              id: 0,
              requestNo: this.requestId,
              departmentId: '3',
              roleId: '33',
              name: this.registerForm.get('webname').value,
              designation: this.registerForm.get('webdesignation').value,
              mobileNo: EncyptionDecryption.Encrypt(
                this.registerForm.get('webmobile').value, this.encSecretKey, this.encsalt
              ),
              emailId: EncyptionDecryption.Encrypt(
                this.registerForm.get('webemail').value, this.encSecretKey, this.encsalt
              ),
            },
          ];
          this.loader.isLoading = true;
          this.generatePDF();
        }
      })
      .catch(() =>
        this.toastrService.error(
          'User dismissed the dialog (For eg. , by using ESC, clicking the cross icon, or clicking outside the dialog)'
        )
      );
  }

  Redirect() {
    let number = this.getRandomNumber();
    this.requestID = EncyptionDecryption.Encrypt(this.requestId + number, this.encSecretKey, this.encsalt);
    this.router.navigate(['/responseDetailMessage'], { queryParams: { Id: this.requestID } });
  }

  generatePDF() {
    let content = `
    <style>


    .bordertable tr,.bordertable td, .bordertable th {
        border-bottom:
            1px solid #ccc;
border-left: 1px solid #ccc;
border-right:1px solid #ccc;
border-collapse: collpase;


    }
</style>
<table class="table table-sm table-borderless w-100">
    <tr>
      <td class="w-25">
        <img src="assets/images/logo-img.png" style="height:40px;" />
      </td>
      <td class="w-50 text-center">
        <h5>
          e-Counselling Division
        </h5>
      </td>
      <td class="w-25">
        <img src="assets/images/niclogo.png" style="height:40px;" />
      </td>
    </tr>
  </table>
    <table class="bordertable w-100 breaklongword">
    <thead>
      <th colspan="2" class="bg-secondary text-center bg-opacity-25">
          OnBoarding Details</th>
              </thead>
                  <tbody>
                    <tr>
                        <th class="w-25">Agency</th>
                        <td class="w-25">#Agency#</td>
                    </tr>
                    <tr>
                        <th class="w-25">Services</th>
                        <td class="w-25">#Services#</td>
                        </tr>
                        <tr>
                        <th [hidden]="stateshow" class="w-25">State</th>
                        <td [hidden]="stateshow" class="w-25">#State#</td>
                        </tr>
                        <tr>
                        <th [hidden]="ministryshow">Ministry</th>
                        <td [hidden]="ministryshow">#MinistryName#</td>
                        </tr>
                        <tr>
                        <th>Name of Organization</th>
                        <td>#Organization#</td>
                        </tr>
                        <tr>
                        <th>Website</th>
                        <td>#website#</td>
                        </tr>
                        <tr>
                        <th>First time Affiliation with e-Counselling</th>
                        <td>#FirstTimeAffiliation#
                        </td>
                        <tr>

                        <th>Previous Agency deployed For Examination(if any)</th>
                        <td>#previousAgencyExamination#</td>
                        </tr>
                        <tr>
                        <th>Brief Description on existing Examination</th>
                        <td>#descriptionExam#</td>
                        </tr>
                        <tr>

                        <th>Previous Agency deployed For Counselling(if any)</th>
                        <td>#previousAgencyCounselling#</td>
                        </tr>
                        <tr>
                        <th>Brief Description on existing Counselling</th>
                        <td>#descriptionCounselling#</td>
                        </tr>
                        <tr>

                        <th>Expected no of Applicants in Examination</th>
                        <td>#expectedApplicantsexam#</td>
                        </tr>
                        <tr>
                        <th>Examination List</th>
                        <td>#ExaminationList#</td>
                        </tr>
                        <tr>


                        <th>Tentative Schedule Start of Examination</th>
                        <td>#tentstartExamin#</td>
                        </tr>
                        <tr>
                        <th>Tentative Schedule End of Examination</th>
                        <td>#tentendexam#</td>
                        </tr>
                        <tr>


                        <th>Expected no of Applicants in Counselling</th>
                        <td>#ExpectAppCouns#</td>
                        </tr>
                        <tr>
                        <th>Expected no of Seat in Counselling</th>
                        <td>#ExpectSeatCouns#</td>
                        </tr>
                        <tr>


                        <th>Stream List in Counselling</th>
                        <td>#streamlistcouns#</td>
                        </tr>
                        <tr>
                        <th>Expected Round in Counselling</th>
                        <td>#expectRoundcouns#</td>
                        </tr>
                        <tr>

                        <th>Expected Spot Round in Counselling</th>
                        <td>#expecSpotRoundCouns#</td>
                        </tr>
                        <tr>
                        <th>Expected Participating Institute in Counselling</th>
                        <td>#expectPartInstitute#</td>
                            </tr>
                            <tr>


                        <th>Tentative Schedule Start of Counselling</th>
                        <td>#tentScheduleStartcouns#</td>
                        </tr>
                        <tr>
                        <th>Tentative Schedule End of Counselling</th>
                        <td>#tentendCouns#</td>
                        </tr>

                        <tr>
                        <!-- <th>Dissimilarity Of Schedule</th>
                        <td colspan="3">{{ counsDissimilarityOfSchedule }}</td>
                        <th>Current Status</th>
                        <td colspan="3">{{ currentStatus }}</td> -->
                        <th [hidden]="Counselling">Dissimilarity Of Schedule Counselling</th>
                        <td [hidden]="Counselling" >#DissScheduleCouns#</td>
                        </tr>
                        <tr>
                        <!-- <th>Dissimilarity Of Schedule</th>
                        <td colspan="3">{{ counsDissimilarityOfSchedule }}</td>
                        <th>Current Status</th>

                        <td colspan="3">{{ currentStatus }}</td> -->
                        <th >Dissimilarity Of Schedule Examination</th>
                        <td >#ExamDissimilarityOfSchedule#</td>
                        </tr>
                        <tr>
                </tbody>
            </table>

        <table  class="bordertable w-100 breaklongword">
                <thead>
                  <tr>
                    <th colspan="5">User Department Contact Detail</th>
                  </tr>
                  <tr class="bg-secondary text-white bg-gradient">
                      <th>Role</th>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Mobile No.</th>
                      <th>Email Id</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Coordinator</td>
                        <td>#coname#</td>
                        <td>#codesignation#</td>
                        <td>#comobile#</td>
                        <td>#coemail#</td>
                    </tr>
                    <tr>
                        <td>Deputy Coordinator</td>
                        <td>#DepConame#</td>
                        <td>#DepCodesignation#</td>
                        <td>#DepComobile#</td>
                        <td>#DepCoemail#</td>
                    </tr>
                    <tr>
                        <td>Program Manager Unit</td>
                        <td>#progname#</td>
                        <td >#progdesignation#</td>
                        <td >#progmobile#</td>
                        <td >#progemail#</td>
                    </tr>
                </tbody>
            </table>

            <table  class="bordertable w-100 breaklongword">
                <thead>
                <tr>
                    <th colspan="5">User Department MoU Signatory Details</th>
                  </tr>
                    <tr class="bg-secondary text-white bg-gradient">
                        <th>Role</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Mobile No.</th>
                        <th>Email Id</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Nodal Officer</td>
                        <td>#nodalname#</td>
                        <td>#nodaldesignation#</td>
                        <td>#nodalmobile#</td>
                        <td>#nodalemail#</td>
                    </tr>
                    <tr>
                        <td >Authorized Signatory</td>
                        <td>#Authorname#</td>
                        <td> #Authordesignation#</td>
                        <td>#Authormobile#</td>
                        <td>#Authoremail#</td>
                    </tr>
                </tbody>
            </table>

            <table  class="bordertable w-100 breaklongword">
                <thead>
                <tr>
                    <th colspan="5">User Department Technical Team Details</th>
                  </tr>
                    <tr class="bg-secondary text-white bg-gradient">
                        <th>Role</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Mobile No.</th>
                        <th>Email Id</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>System Admin</td>
                        <td>#systemname#</td>
                        <td>#systemdesignation#</td>
                        <td>#systemmobile#</td>
                        <td> #systememail#</td>
                    </tr>
                    <tr>
                        <td>Database Admin</td>
                        <td> #databasename#</td>
                        <td> #databasedesignation#</td>
                        <td>#databasemobile#</td>
                        <td> #databaseemail#</td>
                    </tr>
                    <tr>
                        <td>Web Info. Manager</td>
                        <td> #webname#</td>
                        <td> #webdesignation#</td>
                        <td>#webmobile#</td>
                        <td>#webemail#</td>
                    </tr>
                </tbody>
            </table>`;
    content = content.replace(
      '#Agency#',
      this.registerForm.get('Agency').value
    );
    content = content.replace('#Services#', this.Services);
    content = content.replace(
      '#State#',
      this.registerForm.get('AgencyState').value == null
        ? 'NA'
        : this.registerForm.get('AgencyState').value.toString()
    );
    content = content.replace(
      '#MinistryName#',
      this.registerForm.get('Ministry').value == null
        ? 'NA'
        : this.registerForm.get('Ministry').value.toString()
    );
    content = content.replace(
      '#Organization#',
      this.registerForm.get('OrganizationName').value == null
        ? 'NA'
        : this.registerForm.get('OrganizationName').value.toString()
    );
    content = content.replace('#website#', this.appOnBoarddetails[0].website);
    content = content.replace(
      '#FirstTimeAffiliation#',
      this.appOnBoarddetails[0].yearOfFirstTimeAffilitionSession
    );
    content = content.replace(
      '#previousAgencyExamination#',
      this.appOnBoarddetails[0].examLastSessionTechSupportBy == null
        ? 'NA'
        : this.appOnBoarddetails[0].examLastSessionTechSupportBy.toString()
    );
    content = content.replace(
      '#descriptionExam#',
      this.appOnBoarddetails[0].examLastSessionDescription == null
        ? 'NA'
        : this.appOnBoarddetails[0].examLastSessionDescription.toString()
    );
    content = content.replace(
      '#previousAgencyCounselling#',
      this.appOnBoarddetails[0].counsLastSessionTechSupportBy == null
        ? 'NA'
        : this.appOnBoarddetails[0].counsLastSessionTechSupportBy.toString()
    );
    content = content.replace(
      '#descriptionCounselling#',
      this.appOnBoarddetails[0].counsLastSessionDescription == null
        ? 'NA'
        : this.appOnBoarddetails[0].counsLastSessionDescription.toString()
    );
    content = content.replace(
      '#expectedApplicantsexam#',
      this.appOnBoarddetails[0].examExpectedApplicant == null
        ? 'NA'
        : this.appOnBoarddetails[0].examExpectedApplicant.toString()
    );
    content = content.replace(
      '#ExaminationList#',
      this.appOnBoarddetails[0].examCourseList == null
        ? 'NA'
        : this.appOnBoarddetails[0].examCourseList.toString()
    );
    content = content.replace(
      '#tentstartExamin#',
      this.appOnBoarddetails[0].examTentativeScheduleStart == null
        ? 'NA'
        : this.appOnBoarddetails[0].examTentativeScheduleStart.toString()
    );
    content = content.replace(
      '#tentendexam#',
      this.appOnBoarddetails[0].examTentativeScheduleEnd == null
        ? 'NA'
        : this.appOnBoarddetails[0].examTentativeScheduleEnd.toString()
    );
    content = content.replace(
      '#ExpectAppCouns#',
      this.appOnBoarddetails[0].counsExpectedApplicant == null
        ? 'NA'
        : this.appOnBoarddetails[0].counsExpectedApplicant.toString()
    );
    content = content.replace(
      '#ExpectSeatCouns#',
      this.appOnBoarddetails[0].counsExpectedSeat == null
        ? 'NA'
        : this.appOnBoarddetails[0].counsExpectedSeat.toString()
    );
    content = content.replace(
      '#streamlistcouns#',
      this.appOnBoarddetails[0].counsCourseList == null
        ? 'NA'
        : this.appOnBoarddetails[0].counsCourseList.toString()
    );
    content = content.replace(
      '#expectRoundcouns#',
      this.appOnBoarddetails[0].counsExpectedRound == null
        ? 'NA'
        : this.appOnBoarddetails[0].counsExpectedRound.toString()
    );
    content = content.replace(
      '#expecSpotRoundCouns#',
      this.appOnBoarddetails[0].counsExpectedSpotRound == null
        ? 'NA'
        : this.appOnBoarddetails[0].counsExpectedSpotRound.toString()
    );
    content = content.replace(
      '#expectPartInstitute#',
      this.appOnBoarddetails[0].counsExpectedParticipatingInstitute == null
        ? 'NA'
        : this.appOnBoarddetails[0].counsExpectedParticipatingInstitute.toString()
    );
    content = content.replace(
      '#tentScheduleStartcouns#',
      this.appOnBoarddetails[0].counsTentativeScheduleStart == null
        ? 'NA'
        : this.appOnBoarddetails[0].counsTentativeScheduleStart.toString()
    );
    content = content.replace(
      '#tentendCouns#',
      this.appOnBoarddetails[0].counsTentativeScheduleEnd == null
        ? 'NA'
        : this.appOnBoarddetails[0].counsTentativeScheduleEnd.toString()
    );
    content = content.replace(
      '#DissScheduleCouns#',
      this.appOnBoarddetails[0].counsDissimilarityOfSchedule == null
        ? 'NA'
        : this.appOnBoarddetails[0].counsDissimilarityOfSchedule.toString()
    );
    content = content.replace(
      '#ExamDissimilarityOfSchedule#',
      this.appOnBoarddetails[0].examDissimilarityOfSchedule == null
        ? 'NA'
        : this.appOnBoarddetails[0].examDissimilarityOfSchedule.toString()
    );

    let j = 1,
      k = 0;
    for (let i = 0; i < 8; i++) {
      if (i == 0) {
        content = content.replace(
          '#' + this.arrrole[0] + 'name' + '#',
          this.registerForm.get('Coname').value.toString()
        );
        content = content.replace(
          '#' + this.arrrole[0] + 'designation' + '#',
          this.registerForm.get('Codesignation').value
        );
        content = content.replace(
          '#' + this.arrrole[0] + 'mobile' + '#',
          "+91" + this.registerForm.get('CoMobile').value
        );
        content = content.replace(
          '#' + this.arrrole[0] + 'email' + '#',
          this.registerForm.get('CoEmail').value
        );
      } else {
        if (k < 7) {
          content = content.replace(
            '#' + this.arrrole[j] + 'name' + '#',
            this.userDepatmentDetails[k].name
          );
          content = content.replace(
            '#' + this.arrrole[j] + 'designation' + '#',
            this.userDepatmentDetails[k].designation
          );
          content = content.replace(
            '#' + this.arrrole[j] + 'mobile' + '#',
            (EncyptionDecryption.Decrypt(this.userDepatmentDetails[k].mobileNo, this.decSecretKey, this.decsalt) == "NA") ? "NA" : "+91" + EncyptionDecryption.Decrypt(this.userDepatmentDetails[k].mobileNo, this.decSecretKey, this.decsalt)
          );
          content = content.replace(
            '#' + this.arrrole[j] + 'email' + '#',
            EncyptionDecryption.Decrypt(this.userDepatmentDetails[k].emailId, this.decSecretKey, this.decsalt)
          );
          (k = k + 1), (j = j + 1);
        }
      }
    }

    const opt = {
      margin: 10,
      filename: 'pdf_Name.pdf',
      autoPaging: 'text',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: 'mm',
        format: 'A3',
        pageWidth: '210',
        pageHeight: '297',
        orientation: 'portrait',
        setFontSize: '8',
      },
      pagebreak: { mode: 'avoid-all' },
    };

    var temp: string;
    html2pdf()
      .set(opt)
      .from(content)
      .output()
      .then((data) => {
        temp = btoa(data);
        this.createPdfdata = temp;
        this.appOnBoarddetails[0].attachFilecontent = this.createPdfdata;
        this.selectedUserDepartmentDetails = this.userDepatmentDetails.filter(
          (i) =>
            (i['name'] && i['designation'] && i['mobileNo'] && i['emailId']) !=
            ''
        );
        this.FinalData = JSON.stringify(this.appOnBoarddetails[0]).substring(
          0,
          JSON.stringify(this.appOnBoarddetails[0]).length - 1
        );
        this.FinalData =
          this.FinalData +
          ',' +
          '"' +
          'contactdetails' +
          '"' +
          ':' +
          JSON.stringify(this.userDepatmentDetails) +
          '}';
        this.userdetails.SaveOnboardDetails(this.FinalData).subscribe({
          next: (response: any) => {
            const message = response;
            this.loader.isLoading = false;
            this.toastrService.success(message);
            this.Redirect();
            return false;
          },
          error: (err: any) => {
            const error = err.message;
            this.loader.isLoading = false;
            this.toastrService.error(error);
            return false;
          },
        });
      });
  }

  OnselectExaminationStart(event: any) {
    this.examinationScheduleStart = event.target.value;
  }

  onselectCounsellingStart(event: any) {
    this.CounsellingScheduleStart = event.target.value;
  }

  getRandomNumber() {
    const today = new Date();
    let date = this.datePipe.transform(today, 'YYMMddHHMMSSSSS');
    return date;
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

  generateOtpSms() {
    var uniquechar = '';
    const randomchar = '0123456789';
    for (let i = 1; i < 6; i++) {
      uniquechar += randomchar.charAt(Math.random() * randomchar.length);
    }
    this.OTPverificationSms = uniquechar;
    this.OTPSms = this.OTPverificationSms;
  }

  generateOtp() {
    var uniquechar = '';
    const randomchar = '0123456789';
    for (let i = 1; i < 6; i++) {
      uniquechar += randomchar.charAt(Math.random() * randomchar.length);
    }
    this.OTPverification = uniquechar;
    this.OTPEmail = this.OTPverification;
  }

  resendotpSms() {
    this.generateOtpSms();
    const OTP = "NA";
    const OTPSMS = this.OTPSms;
    const params = {
      otp: btoa(OTP).toString(),
      otpSms: btoa(OTPSMS).toString(),
      email: btoa(this.registerForm.get('CoEmail').value),
      mobile: btoa(this.registerForm.get('CoMobile').value),
      coodinatorName: btoa(this.registerForm.get('Coname').value),
    }
    this.isEnableSmsOtpLink = true;
    this.userdetails
      .sendOTP(params)
      .subscribe({
        next: (response: any) => {
          const message = response;
          this.loader.isLoading = false;
          if (message == "otp limit cross")
            this.toastrService.error("You've exceeded the OTP request limit. Please try again later.");
          else
            this.toastrService.success(message);
            this.isEnableSmsOtpLink = false;
          return false;
        },
        error: (e) => {
          const error = e.message;
          this.loader.isLoading = false;
          this.toastrService.error(error);
          this.isEnableSmsOtpLink = false;
          return false;
        },
      });
  }

  resendotpEmail() {
    this.generateOtp();
    const OTP = this.OTPEmail;
    const OTPSMS = "NA";
    const params = {
      otp: btoa(OTP).toString(),
      otpSms: btoa(OTPSMS).toString(),
      email: btoa(this.registerForm.get('CoEmail').value),
      mobile: btoa(this.registerForm.get('CoMobile').value),
      coodinatorName: btoa(this.registerForm.get('Coname').value),
    }
    this.isEnableEmailOtpLink = true;
    this.userdetails
      .sendOTP(params)
      .subscribe({
        next: (response: any) => {
          const message = response;
          this.loader.isLoading = false;
          if (message == "otp limit cross")
            this.toastrService.error("You've exceeded the OTP request limit. Please try again later.");
          else
            this.toastrService.success(message);
            this.isEnableEmailOtpLink = false;
          return false;
        },
        error: (e) => {
          const error = e.message;
          this.loader.isLoading = false;
          this.toastrService.error(error);
          this.isEnableEmailOtpLink = false;
          return false;
        },
      });
  }

  checkAuthMode(localotpE: string, otpE: String, localotpm: string, otpM: String,) {
    return this.otpmedium == "B" ? ((localotpE == otpE) && (localotpm == otpM)) :
      this.otpmedium == "A" ? ((localotpE == otpE) || (localotpm == otpM)) : this.otpmedium == "E" ? (localotpE == otpE) : this.otpmedium == "M" ? (localotpm == otpM) : false;
  }

  addData() {

    if (this.checkAuthMode(this.OTPEmail,
      (<HTMLInputElement>document.getElementById('OTPemail')).value,
      this.OTPSms,
      (<HTMLInputElement>document.getElementById('OTPMobile')).value)) {
      this.modalService.dismissAll();
      if (this.registerForm.get('websiteV').value == "") {
        this.registerForm.patchValue({
          websiteV: "NA",
        });
      }
      if (this.registerForm.get('firstSessionV').value == "") {
        this.registerForm.patchValue({
          firstSessionV: "NA",
        });
      }
      if (this.registerForm.get('ConductExamV').value == "") {
        this.registerForm.patchValue({
          ConductExamV: "NA",
        });
      }
      if (this.registerForm.get('techsupportEV').value == "") {
        this.registerForm.patchValue({
          techsupportEV: "NA",
        });
      }
      if (this.registerForm.get('conductedCounsV').value == "") {
        this.registerForm.patchValue({
          conductedCounsV: "NA",
        });
      }
      if (this.registerForm.get('techSupportCV').value == "") {
        this.registerForm.patchValue({
          techSupportCV: "NA",
        });
      }
      if (this.selectdissimilaritycouns == 0) {
        this.boolcounsdisOfsched = false;
      } else {
        this.boolcounsdisOfsched = true;
      }
      if (this.selectdissimilarityExams == 0) {
        this.boolexamdisOfsched = false;
      } else {
        this.boolexamdisOfsched = true;
      }
      if (this.registerForm.get('ExpecSpotRCV').value == null || this.registerForm.get('ExpecSpotRCV').value == '') {
        this.registerForm.patchValue({
          ExpecSpotRCV: 0,
        });
      }
      this.appOnBoarddetails[0] = {
        requestNo: this.requestId,
        website: this.registerForm.get('websiteV').value,
        yearOfFirstTimeAffilitionSession:
          this.registerForm.get('firstSessionV').value,
        examLastSessionConductedIn:
          this.registerForm.get('ConductExamV').value,
        examLastSessionTechSupportBy:
          this.registerForm.get('techsupportEV').value,
        examLastSessionDescription:
          this.registerForm.get('DescriptionEV').value,
        counsLastSessionConductedIn:
          this.registerForm.get('conductedCounsV').value,
        counsLastSessionTechSupportBy:
          this.registerForm.get('techSupportCV').value,
        counsLastSessionDescription:
          this.registerForm.get('DescriptionCV').value,
        examExpectedApplicant: this.registerForm.get('expectedAEV').value,
        examCourseList: this.registerForm.get('examinatinLtV').value,
        examTotalCourse: this.registerForm.get('totalCourseEV').value,
        examTentativeScheduleStart: this.registerForm.get(
          'TentativeScheduleSEV'
        ).value,
        examTentativeScheduleEnd: this.registerForm.get(
          'TentativeScheduleEEV'
        ).value,
        examDissimilarityOfSchedule: this.boolexamdisOfsched,
        counsExpectedApplicant:
          this.registerForm.get('expectedAppCounsCV').value,
        counsExpectedSeat: this.registerForm.get('ExpectedSeatCV').value,
        counsCourseList: this.registerForm.get('CounsellingltCV').value,
        counsTotalCourse: this.registerForm.get('totalCourseCV').value,
        counsExpectedRound: this.registerForm.get('ExpectedRoundCV').value,
        counsExpectedSpotRound: this.registerForm.get('ExpecSpotRCV').value,
        counsExpectedParticipatingInstitute:
          this.registerForm.get('ExpecpartInstCV').value,
        counsTentativeScheduleStart:
          this.registerForm.get('tentativeSSCV').value,
        counsTentativeScheduleEnd: this.registerForm.get(
          'TentativeScheduleECV'
        ).value,
        counsDissimilarityOfSchedule: this.boolcounsdisOfsched,
        submitTime: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
        ipaddress: '',
        status: '',
        remarks: '',
        isActive: '',
        mode: 'FinalSubmit',
        attachFilecontent: this.attachfile,
        coordinatorMail: this.registerForm.get('CoEmail').value,
        hodMail: this.hodemail,
      };
      this.userDepatmentDetails = [
        {
          id: 0,
          requestNo: this.requestId,
          departmentId: '1',
          roleId: '12',
          name: this.registerForm.get('Depconame').value,
          designation: this.registerForm.get('Depcodesignation').value,
          mobileNo: EncyptionDecryption.Encrypt(
            this.registerForm.get('Depcomobile').value, this.encSecretKey, this.encsalt
          ),
          emailId: EncyptionDecryption.Encrypt(
            this.registerForm.get('Depcoemail').value, this.encSecretKey, this.encsalt
          ),
        },
        {
          id: 0,
          requestNo: this.requestId,
          departmentId: '1',
          roleId: '13',
          name: (this.registerForm.get('programMname').value == "") ? "NA" : this.registerForm.get('programMname').value,
          designation: (this.registerForm.get('programMdesignation').value == "") ? "NA" : this.registerForm.get('programMdesignation').value,
          mobileNo: (this.registerForm.get('programMmobile').value == "") ? "NA" : EncyptionDecryption.Encrypt(this.registerForm.get('programMmobile').value, this.encSecretKey, this.encsalt),
          emailId: (this.registerForm.get('programMemail').value == "") ? "NA" : EncyptionDecryption.Encrypt(this.registerForm.get('programMemail').value, this.encSecretKey, this.encsalt),
        },
        {
          id: 0,
          requestNo: this.requestId,
          departmentId: '2',
          roleId: '21',
          name: this.registerForm.get('modalDname').value,
          designation: this.registerForm.get('modalDdesignation').value,
          mobileNo: EncyptionDecryption.Encrypt(
            this.registerForm.get('modaldmobile').value, this.encSecretKey, this.encsalt
          ),
          emailId: EncyptionDecryption.Encrypt(
            this.registerForm.get('modalemail').value, this.encSecretKey, this.encsalt
          ),
        },
        {
          id: 0,
          requestNo: this.requestId,
          departmentId: '2',
          roleId: '22',
          name: this.registerForm.get('authname').value,
          designation: this.registerForm.get('authdesignation').value,
          mobileNo: EncyptionDecryption.Encrypt(
            this.registerForm.get('authmobile').value, this.encSecretKey, this.encsalt
          ),
          emailId: EncyptionDecryption.Encrypt(
            this.registerForm.get('authemail').value, this.encSecretKey, this.encsalt
          ),
        },
        {
          id: 0,
          requestNo: this.requestId,
          departmentId: '3',
          roleId: '31',
          name: this.registerForm.get('systemName').value,
          designation: this.registerForm.get('systemdesignation').value,
          mobileNo: EncyptionDecryption.Encrypt(
            this.registerForm.get('systemmobile').value, this.encSecretKey, this.encsalt
          ),
          emailId: EncyptionDecryption.Encrypt(
            this.registerForm.get('systememail').value, this.encSecretKey, this.encsalt
          ),
        },
        {
          id: 0,
          requestNo: this.requestId,
          departmentId: '3',
          roleId: '32',
          name: this.registerForm.get('databasename').value,
          designation: this.registerForm.get('databasedesignation').value,
          mobileNo: EncyptionDecryption.Encrypt(
            this.registerForm.get('databasemobile').value, this.encSecretKey, this.encsalt
          ),
          emailId: EncyptionDecryption.Encrypt(
            this.registerForm.get('databaseemail').value, this.encSecretKey, this.encsalt
          ),
        },
        {
          id: 0,
          requestNo: this.requestId,
          departmentId: '3',
          roleId: '33',
          name: this.registerForm.get('webname').value,
          designation: this.registerForm.get('webdesignation').value,
          mobileNo: EncyptionDecryption.Encrypt(
            this.registerForm.get('webmobile').value, this.encSecretKey, this.encsalt
          ),
          emailId: EncyptionDecryption.Encrypt(
            this.registerForm.get('webemail').value, this.encSecretKey, this.encsalt
          ),
        },
      ];
      this.loader.isLoading = true;
      this.generatePDF();
    }
    else {
      this.modalService.dismissAll();
      this.toastrService.error('Invalid OTP.');
    }
  }

  getEncryptionKey() {
  ///  this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.encSecretKey = environment.secretKey
      this.encsalt = environment.salt
  ///  })
  }

  getIPAddress() {
    this.loader.isLoading = true;
    this.userdetails.GetIP().subscribe((res: any) => {
      this.ipAddress = res;
      this.loader.isLoading = false;
    })
  }
}
