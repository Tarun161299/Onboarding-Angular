import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { MinistryDetail } from 'src/app/model/Ministry.model';
import { OnboardingRequestdata } from 'src/app/model/OnBoardingRequest.model';
import { MdOrganizationModel } from 'src/app/model/Organization.model';
import { Router } from '@angular/router';
import { AppOnBoardingRequestService } from 'src/app/shared/services/appOnBoardingRequest';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/shared/otp-localStorage/localStorageServices';
import { State } from 'src/app/shared/model/stateModel';
import { District } from 'src/app/shared/model/districtModel';
import { DatePipe } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BeforeLoginComponent } from 'src/app/shared/before-login/before-login.component';
import { HttpClient } from '@angular/common/http';
import { ServicesModel } from 'src/app/shared/model/serviceModel';
import * as html2pdf from 'html2pdf.js';
import * as jspdf from 'jspdf';
import { HTMLTemplatesForPdf } from 'src/app/shared/common/HTMLTemplatesForPdf';
import { ZmstServiceTypeService } from 'src/app/shared/services/zmst-service-type.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CaptchaService } from 'src/app/shared/services/captcha.service';
import { ConfigurationEnvironment } from 'src/app/shared/services/configEnvironment.services';
import { MdYearServices } from 'src/app/shared/services/md-YearService';
import { MdYearModel } from 'src/app/shared/model/md-YearModel';
import { MdYearEnum } from 'src/app/shared/common/enums/yearGroup.enums';
import { ConfigurationApiSecureKey } from 'src/app/shared/services/ConfigurationApiSecureKey.Services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-on-boarding-request',
  templateUrl: './on-boarding-request.component.html',
  styleUrls: ['./on-boarding-request.component.css'],
})

export class OnBoardingRequestComponent implements OnInit {
  OnboardingRequestdata: OnboardingRequestdata[] = [];
  registerForm: FormGroup;
  filename: string = '';
  fileextension: string = '';
  format: string = '';
  modifieddate: number = 1;
  submitted = false;
  submittedFinal = false;
  otherministry: string = '';
  otherorganisation: string = '';
  nameoforz: string = '';
  securitypin: string = '';
  organization: string = '';
  sessionYear: string = '';
  errorMessage: any;
  MinistryDetail: any = [];
  fileToUpload: File | null = null;
  previewPdf: boolean = false;
  ministry: string = '';
  disableinput = false;
  orgname: MdOrganizationModel[] = [];
  selectionagency: number = 1000;
  Agencyname: string = '';
  checkdata: string = '';
  Ministryname: MinistryDetail[] = [];
  year: MdYearModel[] = [];
  //y:any=[];
  public OrgTemp: MdOrganizationModel[] = [];
  private base64textString: String = '';
  datacontent: String = '';
  pdfSrc: string = '';
  Captchainputshowhide = false;
  Captchapinshowhide = false;
  UploadShowHide = false;
  btnPreview = true;
  states: State[] = [];
  districts: District[] = [];
  filterDistricts: District[] = [];
  flagService: Number = 0;
  OTPverificationSms: string;
  Oncentral: boolean = false;
  onState: boolean = false;
  CaptchaHide: boolean = false;
  ipAddress = '';
  organizationname: string = '';
  districtName: string = '';
  public OrganizationDetail: MdOrganizationModel[] = [];
  showservices: String[] = [];
  Servicespdf: string = '';
  createPdfdata: string = '';
  selectlist: any = {
    id: Number,
    name: String,
    value: String,
  };
  editButton = true;

  RADIO_LIST = [
    { id: 1, name: 'Central Agency', value: 'Central Agency' },
    { id: 2, name: 'State Agency', value: 'State Agency', checked: false },
  ];
  selectedUser: any;
  filteredOptions = [];
  selection: ServicesModel[] = [];
  CHECK_LIST: ServicesModel[] = [];
  staticSecurityPin: string;
  fileBlob: any;
  captchaData: any;
  imageSource: any;
  captchaKey: string;
  authMode: string;
  showauthMode: boolean = false;
  mobileOtp: boolean = false;
  emailOtp: boolean = false;
  otpHeading: string;
  otpmedium: string;
  encSecretKey: string
  encsalt: string;
  OTPEmail: string;
  OTPSms: string;
  isEnableSmsOtpLink: boolean = false;
  isEnableEmailOtpLink: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private http: HttpClient,
    private datePipe: DatePipe,
    private loader: BeforeLoginComponent,
    private route: Router,
    public ngxSmartModalService: NgxSmartModalService,
    private formBuilder: FormBuilder,
    private zmstServiceTypeService: ZmstServiceTypeService,
    private appOnboardingRequestService: AppOnBoardingRequestService,
    private toastrService: ToastrService,
    private localstore: LocalStorageService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private captchaService: CaptchaService,
    private configurationEnvironment: ConfigurationEnvironment,
    private mdYearService: MdYearServices,
    private configurationApiSecureKey: ConfigurationApiSecureKey,
    
    private user: AppOnBoardingRequestService,
  ) {
    this.loader.isLoading = true;
    this.registerForm = this.formBuilder.group({
      comAddress: ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9. '-/']*$"), this.scriptValidator])],
      Pincode: [
        '',
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.minLength(6),
          Validators.pattern('^[1-9][0-9]{5}$'),
        ],
      ],
      Headoforg: [
        '',
        [Validators.required, Validators.pattern("^[a-zA-Z. '-]*$")],
      ],
      Email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^[a-zA-Z0-9./_%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,5}$'
          ),
        ],
      ],
      Mobileno: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('^[6-9][0-9]{9}$'),
        ],
      ],
      Designation: ['', [Validators.required, Validators.pattern("^[A-Za-z. ]+$")]],
      securitypin: ['', [Validators.required]],
      CPEmail: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9./_%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,5}$'),],],
      CPDesignation: ['', [Validators.required, Validators.pattern("^[A-Za-z. ]+$")]],
      CPMobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[6-9][0-9]{9}$'),],],
      MinisteryName: [''],
      Otherministry: [''],
      Nameoforg: ['', [Validators.required]],
      Sessionyear: ['', [Validators.required]],
      AgencyState: [''],
      otherofSY: [''],
      Uploadfile: ['', [Validators.required]],
      agency: ['', [Validators.required]],
      checkboxArrayList: [false, Validators.requiredTrue],
      CPname: ['', [Validators.required, Validators.pattern("^[a-zA-Z. '-]*$")]],
      state: ['', [Validators.required]],
      district: ['', [Validators.required]],
      termAndCondition: [false],
    });
  }
  agency: string = '';
  ministries: string = '';
  orgnametemp: string = '';
  Id: string = '';
  nameOfOrganization: string = '';
  mailingAddress: string = '';
  pinCoDe: string = '';
  HeadOfOrganization: string = '';
  Designation: string = '';
  eMail: string = '';
  mobileNumber: string = '';
  Services: string = '';
  submitButton = false;
  FinalSubmitButton = true;
  HideAndShowAgreetermCondition = true;
  OTPverification: string = '';
  show: boolean = false;
  closeResult: string;
  title: 'appBootstrap';
  selectedFileB64: any;
  fileUploadValidation: boolean = false;
  fileSizeValidation: number;
  fileExtensionCount:boolean=false;
  stateName: string = '';
  configEnvDetails: any;
  selecteFile: any;
  fileExtension: any;
  fileName: any;

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  agencyStateID: number = 0;
  ministryId: number = 0;
  @ViewChild('content') popupview!: ElementRef;
  ngOnInit(): void {
    this.getEncryptionKey();
    localStorage.clear();
    this.loader.isLoading = true;
    this.getCaptcha();
    this.getMinistry();
    this.getStates();
    this.getIPAddress();
    this.bindZmstServiceType();
    this.getconfigEnvDetails();
    this.getOnboardingRequestYear();
    this.loader.isLoading = false;
  }

  get registerFormControl() {
    return this.registerForm.controls;
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
  getIPAddress() {
    
    this.user.GetIP().subscribe((res: any) => {
      this.ipAddress = res;
    })
  }
  bindZmstServiceType() {
    this.zmstServiceTypeService.bindZmstServiceTypeList().subscribe((res) => {
      this.CHECK_LIST = res;
    });
  }
  getMinistry() {
    this.loader.isLoading = true;
    this.appOnboardingRequestService
      .getMinistryDropDownData()
      .subscribe((res) => {
        this.MinistryDetail = res;
      });
    this.loader.isLoading = false;
  }
  onSelectMinistry() {
    this.Ministryname = this.MinistryDetail.filter(
      (item) => item.ministryId === Number(this.registerForm.get('MinisteryName')?.value)
    )[0].ministryName;
    this.ministryId = this.registerForm.get('MinisteryName')?.value;

    if (this.ministryId.toString() == '999') {
      this.registerForm.controls['Otherministry'].setValidators([
        Validators.compose([Validators.required, this.scriptValidator]),
      ]);

      this.registerForm.controls['Otherministry'].updateValueAndValidity();
    } else {
      this.registerForm.get('Otherministry').clearValidators();
      this.registerForm.controls['Otherministry'].updateValueAndValidity();
    }
    this.onselectOrganization(0);
    return false;
  }

  onSelectAgencyState(stateId: any) {
    this.onselectOrganization(stateId);
    this.agencyStateID = Number(stateId);
    return false;
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onselectOrganization(id: any) {
    this.appOnboardingRequestService
      .getOrganizationDropDownData(id)
      .subscribe((item: any) => {
        this.OrganizationDetail = item;
      });
  }
  getStates() {
    this.loader.isLoading = true
    this.appOnboardingRequestService.getStates().subscribe({
      next: (response: any) => {
        this.states = response;
        return false;
      },
      error: (e) => {
        const error = e.message;
        return false;
      },
    });
    this.loader.isLoading = false;
  }

  getDistrict(stateId: any) {
    this.loader.isLoading = true
    this.appOnboardingRequestService.getDistrict(stateId).subscribe({
      next: (response: any) => {
        this.districts = response;
        return false;
      },
      error: (e) => {
        const error = e.message;
        return false;
      },
    });
    this.loader.isLoading = false;
  }
  onSelectState(stateId: any) {
    this.registerForm.controls['district'].setValue('');
    this.districts = [];
    this.stateName = this.states.filter((x) => x.id == stateId)[0].description;
    this.getDistrict(stateId);
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
  generateOtpSms() {
    var uniquechar = '';
    const randomchar = '0123456789';
    for (let i = 1; i < 6; i++) {
      uniquechar += randomchar.charAt(Math.random() * randomchar.length);
    }
    this.OTPverificationSms = uniquechar;
    this.OTPSms = this.OTPverificationSms;
  }
  onSubmit() {

    this.submitted = true;
    this.submittedFinal = false;
    if (this.registerForm.valid && this.fileUploadValidation == false && this.fileSizeValidation <= 10 && this.fileExtensionCount==false) {
      this.captchaService.checkCaptcha(this.registerForm.get('securitypin')?.value.toString()).subscribe((data: any) => {
      if (
       data==1
      ) {
        var ministery = this.registerForm.get('Ministery')?.value;
        var inputOtherMinistry = this.registerForm.get('Otherministry')?.value;
        if (ministery != undefined || ministery != null) {
          if (ministery == '999') {
            this.ministries = inputOtherMinistry.toString();
          } else if (this.Ministryname.length >= 0) {
            this.ministries = this.Ministryname.toString();
          }
        }

        if (inputOtherMinistry != undefined) {
          this.otherministry = inputOtherMinistry.toString();
        } else {
          this.otherministry = 'null';
        }

        var inputagencystate = this.registerForm.get('AgencyState')?.value;
        if (inputagencystate == undefined || inputagencystate == null) {
          this.agencyStateID = 0;
        }

        if (this.registerForm.get('otherofSY')?.value == '') {
          this.registerForm.get('otherofSY')?.value == 'null';
          this.otherorganisation = 'null';
        } else {
          this.otherorganisation = this.registerForm.get('otherofSY')?.value.toString();
        }
        if (this.flagService == 0) {
          this.checkdata = '';
          for (let i = 0; i < this.selection.length; i++) {
            if (i == this.selection.length - 1) {
              this.checkdata += this.selection[i].serviceTypeId;
            } else {
              this.checkdata += this.selection[i].serviceTypeId + ',';
            }
          }
        }
        this.flagService = 1;

        if (
          this.fileextension.substring(
            this.fileextension.length - 3,
            this.fileextension.length
          ) == 'pdf' ||
          this.fileextension.substring(
            this.fileextension.length - 3,
            this.fileextension.length
          ) == 'PDF'
        ) {
          this.format = 'PDF';
          this.Id = '01';
        }
        if (
          this.fileextension.substring(
            this.fileextension.length - 3,
            this.fileextension.length
          ) == 'jpg' ||
          this.fileextension.substring(
            this.fileextension.length - 3,
            this.fileextension.length
          ) == 'JPG'
        ) {
          this.format = 'JPG';
          this.Id = '02';
        }
        if (
          this.fileextension.substring(
            this.fileextension.length - 4,
            this.fileextension.length
          ) == 'xlsx' ||
          this.fileextension.substring(
            this.fileextension.length - 4,
            this.fileextension.length
          ) == 'XLSX' ||
          this.fileextension.substring(
            this.fileextension.length - 3,
            this.fileextension.length
          ) == 'XLS' ||
          this.fileextension.substring(
            this.fileextension.length - 3,
            this.fileextension.length
          ) == 'xls'
        ) {
          this.format = 'XLS';
          this.Id = '03';
        }
        this.agency = this.Agencyname;

        if (this.registerForm.get('Nameoforg')?.value == '999') {
          this.nameOfOrganization = this.registerForm.get('otherofSY')?.value.toString();
        } else {

          this.orgnametemp = this.registerForm.get('Nameoforg')?.value;
          this.orgname = this.OrganizationDetail.filter(
            (item) => item.organizationId === Number(this.orgnametemp)
          );
          this.nameOfOrganization = this.orgname[0].organizationName;
        }
        this.mailingAddress = this.registerForm.get('comAddress')?.value.toString();
        this.pinCoDe = this.registerForm.get('Pincode')?.value.toString();
        this.HeadOfOrganization = this.registerForm.get('Headoforg')?.value.toString();
        this.Designation = this.registerForm.get('Designation')?.value.toString();
        this.eMail = this.registerForm.get('Email')?.value.toString();
        this.mobileNumber = this.registerForm.get('Mobileno')?.value.toString();
        this.Services = this.checkdata.toString();
        this.disableinput = true;
        var Nameoforg = this.registerForm.get('Nameoforg')?.value;
        var organizationIdT = 0;

        if (Nameoforg != undefined || Nameoforg != null) {
          organizationIdT = Number(Nameoforg);
        }
        let content = HTMLTemplatesForPdf.OnBoardingRequest;

        let j = 0;
        for (let i = 0; i < this.checkdata.toString().length; i++) {
          if (this.checkdata.toString()[i] != ',') {
            if (this.checkdata.toString()[i] == '1') {
              this.showservices[j] = 'Examination Services';
              j = j + 1;
            }
            if (this.checkdata.toString()[i] == '2') {
              this.showservices[j] = 'Counselling Services';
              j = j + 1;
            }
            if (this.checkdata.toString()[i] == '3') {
              this.showservices[j] = 'Result Services';
              j = j + 1;
            }
          }
        }
        for (let k = 0; k < this.showservices.length; k++) {
          if (k == this.showservices.length - 1) {
            this.Servicespdf = this.Servicespdf + this.showservices[k];
          } else {
            this.Servicespdf = this.Servicespdf + this.showservices[k] + ',';
          }
        }
        content = content.replace('#Agency#', this.Agencyname);
        content = content.replace('#Ministry#', this.ministries);
        content = content.replace('#Organization#', this.nameOfOrganization);
        content = content.replace('#AcademicSession#', this.registerForm.get('Sessionyear')?.value.toString());
        content = content.replace('#address#', this.registerForm.get('comAddress')?.value.toString());
        content = content.replace('#State#', this.stateName);
        content = content.replace('#District#', this.districtName.toString());
        content = content.replace('#PinCode#', this.registerForm.get('Pincode')?.value.toString());
        content = content.replace('#HODName#', this.registerForm.get('Headoforg')?.value.toString());
        content = content.replace('#HODDesignation#', this.registerForm.get('Designation')?.value.toString());
        content = content.replace('#HODMobile#', this.registerForm.get('Mobileno')?.value.toString());
        content = content.replace('#HODEmail#', this.registerForm.get('Email')?.value.toString());
        content = content.replace('#Coordinatorname#', this.registerForm.get('CPname')?.value.toString());
        content = content.replace('#CoordinatorDesignation#', this.registerForm.get('CPDesignation')?.value.toString());
        content = content.replace('#CoordinatorMobile#', this.registerForm.get('CPMobile')?.value.toString());
        content = content.replace('#CoordinatorEmail#', this.registerForm.get('CPEmail')?.value);
        content = content.replace('#Services#', this.Servicespdf);
        this.showservices = [];
        this.Servicespdf = '';
        const opt = {
          margin: 10,
          filename: 'pdf_Name.pdf',
          autoPaging: 'text',
          image: { type: 'jpeg', quality: 1 },
          html2canvas: { scale: 4 },
          jsPDF: {
            unit: 'mm',
            format: 'A4',
            pageWidth: '210',
            pageHeight: '297',
            orientation: 'portrait',
          },
          pagebreak: { mode: 'avoid-all' },
        };
        const doc = new jspdf.jsPDF();
        var temp: string;
        html2pdf()
          .set(opt)
          .from(content)
          .output()
          .then((data) => {

            temp = btoa(data);
            this.createPdfdata = temp;
          });

        this.OnboardingRequestdata[0] = {
          agencyTypeId: this.selectionagency,
          ministryId: Number(this.ministryId),
          ministryOther: this.otherministry.toString(),
          organizationId: organizationIdT,
          organizationOther: this.otherorganisation.toString(),
          sessionYear: this.registerForm.get('Sessionyear')?.value,
          address: this.registerForm.get('comAddress')?.value.toString(),
          pincode: this.registerForm.get('Pincode')?.value.toString(),
          contactPerson: this.registerForm.get('Headoforg')?.value.toString(),
          designation: this.registerForm.get('Designation')?.value.toString(),
          services: this.checkdata.toString(),
          hodEncryptedMail: EncyptionDecryption.Encrypt(
            this.registerForm.get('Email')?.value, this.encSecretKey, this.encsalt
          ),
          email: this.registerForm.get('Email')?.value.toString(),
          mobileNo: EncyptionDecryption.Encrypt(
            this.registerForm.get('Mobileno')?.value, this.encSecretKey, this.encsalt
          ),
          ipAddress: this.ipAddress,
          fileName: this.filename,
          fileExtension: this.fileextension,
          docFileName: this.fileName,
          docContentType: this.fileExtension,
          modifiedDate: this.modifieddate.toString(),
          content: this.base64textString.toString(),
          format: this.format,
          id: this.Id,
          coodinatorName: this.registerForm.get('CPname')?.value.toString(),
          coodinatorDesignation: this.registerForm
            .get('CPDesignation')
            ?.value.toString(),
          cordinatiorEncryptedMail: EncyptionDecryption.Encrypt(
            this.registerForm.get('CPEmail')?.value, this.encSecretKey, this.encsalt
          ),
          coodinatorEmail: this.registerForm.get('CPEmail')?.value.toString(),
          coodinatorMobile: EncyptionDecryption.Encrypt(
            this.registerForm.get('CPMobile')?.value, this.encSecretKey, this.encsalt
          ),
          stateID: this.registerForm.get('state')?.value.toString(),
          districtID: this.registerForm.get('district')?.value.toString(),
          agencyStateId: this.agencyStateID,
          currentStage: 'Request Pending',
          stateName: '',
          pdfContent: this.createPdfdata,
          captcha:this.registerForm.get('securitypin')?.value.toString()
        };

        this.registerForm.disable();
        this.registerForm.controls['termAndCondition'].enable();
        this.submitButton = true;
        this.editButton = false;
        this.FinalSubmitButton = false;
        this.Captchainputshowhide = true;
        this.Captchapinshowhide = true;
        this.UploadShowHide = true;
        this.HideAndShowAgreetermCondition = false;
        this.btnPreview = false;
        this.CaptchaHide = true;
      }
      else {
        const error = 'Security pin did not matched.';
        this.toastrService.error(error);
        this.registerForm.patchValue({
          securitypin: ""
        });
        this.submitted = false;
      }
    })
    }
  }
  onchange(item: any) {
    this.ministryId = 0;
    this.selectionagency = item.id;
    this.Agencyname = item.name;
    this.registerForm.patchValue({
      Nameoforg: ""
    });
    if (this.selectionagency == 1) {
      this.registerForm.patchValue({
        AgencyState: ""
      });
      this.Oncentral = true;
      this.onState = false;
      this.registerForm.controls['MinisteryName'].setValidators([
        Validators.required,
      ]);
      this.registerForm.controls['MinisteryName'].updateValueAndValidity();
      this.registerForm.controls['AgencyState'].clearValidators();
      this.registerForm.controls['AgencyState'].updateValueAndValidity();
    }
    if (this.selectionagency == 2) {
      this.Oncentral = false;
      this.onState = true;
      this.registerForm.patchValue({
        MinisteryName: ""
      });
      this.registerForm.controls['AgencyState'].setValidators([
        Validators.required,
      ]);
      this.registerForm.controls['AgencyState'].updateValueAndValidity();
      this.registerForm.controls['MinisteryName'].clearValidators();
      this.registerForm.controls['MinisteryName'].updateValueAndValidity();
    }
  }
  
  onSelectDistrict(district: any) {
    this.districtName = this.districts.filter(
      (x) => x.id == this.registerForm.get('district')?.value.toString(),
    )[0].description;
  }
  getSelection(item: any) {
    return (
      this.selection.findIndex(
        (s) => s.serviceTypeId === item.serviceTypeId
      ) !== -1
    );
  }
  get ordersFormArray() {
    return this.registerForm.controls.orders as FormArray;
  }
  changeHandler(item: any) {
    this.checkdata = '';
    this.flagService = 0;
    const serviceTypeId = item.serviceTypeId;
    const index = this.selection.findIndex(
      (u) => u.serviceTypeId === serviceTypeId
    );
    if (index === -1) {
      this.selection = [...this.selection, item];
    } else {
      this.selection = this.selection.filter(
        (user) => user.serviceTypeId !== item.serviceTypeId
      );
    }
  }
   
  handleFileInput(event: any) {
    debugger
    this.selecteFile = event.target.files[0];
    const fileNameWithExtension: string = this.selecteFile.name;
    const lastDotIndex = fileNameWithExtension.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      this.fileName = fileNameWithExtension.slice(0, lastDotIndex);
      this.fileExtension = fileNameWithExtension.slice(lastDotIndex + 1);
    }
    /*
    const [fileName, fileExtension] = fileNameWithExtension.split('.');
    this.fileName=fileNameWithExtension;
    this.fileExtension=fileExtension;
    */
    this.fileToUpload = event.target.files[0];
    this.filename = event.target.files[0].name;
    this.fileextension = event.target.files[0].type;
    var size = event.target.files[0].size;
    this.fileSizeValidation = size / (1024 * 1024);
    if (size / (1024 * 1024) > 10) {
      return
    }
    if(this.selecteFile.name.split('.').length>1){
this.fileExtensionCount=true;
    }
    this.modifieddate = event.target.files[0].lastModified;
    if (this.fileextension != 'application/pdf') {
      this.fileUploadValidation = true;
      this.toastrService.error('Please Upload Pdf File only');
    } else {
      this.fileUploadValidation = false;
      this.fileExtensionCount=false;
      let $img: any = document.querySelector('#Uploadfile');
      var reader = new FileReader();
      var readerbuffer = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      readerbuffer.onload = this._handleReaderLoaded2.bind(this);

      reader.readAsBinaryString(event.target.files[0]);
      readerbuffer.readAsArrayBuffer($img.files[0]);
    }
  }
  _handleReaderLoaded2(readerEvt: any) {
    let $img: any = document.querySelector('#Uploadfile');
    this.pdfSrc = readerEvt.target.result;
  }
  _handleReaderLoaded(readerEvt: any) {

    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.datacontent = this.base64textString;
    return false;
  }
  resendotpEmail() {
    this.generateOtp();
    const OTP = this.OTPEmail;
    const params = {
      otp: btoa(OTP).toString(),
      otpSms: btoa("NA"),
      email: btoa(this.registerForm.get('CPEmail')?.value.toString()),
      mobile: btoa(this.registerForm.get('CPMobile')?.value.toString()),
      coodinatorName: btoa(this.registerForm.get('CPname')?.value.toString()),
    }
    this.isEnableEmailOtpLink = true;
    this.appOnboardingRequestService
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

  resendotpSms() {
    this.generateOtpSms();
    const OTPSMS = this.OTPSms;
    const params = {
      otp: btoa("NA"),
      otpSms: btoa(OTPSMS).toString(),
      email: btoa(this.registerForm.get('CPEmail')?.value.toString()),
      mobile: btoa(this.registerForm.get('CPMobile')?.value.toString()),
      coodinatorName: btoa(this.registerForm.get('CPname')?.value.toString()),
    }
    this.isEnableSmsOtpLink = true;
    this.appOnboardingRequestService
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
      this.loader.isLoading = true;
      this.appOnboardingRequestService.OnBoardrequestDetails(this.OnboardingRequestdata[0]).subscribe(
        {
          next: (response: any) => {
            if(response==""){
              this.toastrService.error("Invalid Captcha Server Side");
              return false;
            }
            const message = response;
            this.loader.isLoading = false;
            this.toastrService.success(
              'Your Request no. is ' + message,
              'Your request save successfully.'
            );
            let number = this.getRandomNumber();
            ;
            let requestId = EncyptionDecryption.Encrypt(message + number, this.encSecretKey, this.encsalt);
            this.route.navigate(['/requestNoMessage'], {
              queryParams: { Id: requestId },
            });
            return false;
          },
          error: (e) => {
            ;
            const error = e.message;
            this.loader.isLoading = false;
            this.toastrService.error(error);
            return false;
          },
        });
    }
    else {
      this.toastrService.error('Invalid OTP');
    }
  }

  closeModal(myform: any) {
    this.ngxSmartModalService.close('mobileEmailModal');
  }
  btnPreviewPdf() {
    this.selectedFileB64 = this.datacontent;
    this.modalService.open(this.popupview, { size: 'xl' });
  }
  Onedit() {
    this.registerForm.controls['termAndCondition'].clearValidators();
    this.registerForm.controls['termAndCondition'].updateValueAndValidity();
    this.editButton = true;
    this.submitButton = false;
    this.registerForm.enable();
    this.FinalSubmitButton = true;
    this.previewPdf = true;
    this.Captchainputshowhide = false;
    this.Captchapinshowhide = false;
    this.UploadShowHide = false;
    this.HideAndShowAgreetermCondition = true;
    this.btnPreview = true;
    this.CaptchaHide = false;
    return false;
  }

  FinalSubmit(content) {
    this.submittedFinal = true;
    this.registerForm.controls['termAndCondition'].setValidators([
      Validators.requiredTrue,
    ]);
    this.registerForm.controls['termAndCondition'].updateValueAndValidity();
    if (this.registerForm.valid) {
      this.generateOtp();
      this.generateOtpSms();
      const OTP = this.OTPEmail;
      const OTPSMS = this.OTPSms;
      const params = {
        otp: btoa(OTP).toString(),
        otpSms: btoa(OTPSMS).toString(),
        email: btoa(this.registerForm.get('CPEmail')?.value.toString()),
        mobile: btoa(this.registerForm.get('CPMobile')?.value.toString()),
        coodinatorName: btoa(this.registerForm.get('CPname')?.value.toString()),
      }
      this.loader.isLoading = true;
      this.appOnboardingRequestService
        .sendOTP(params).subscribe({
          next: (response: any) => {
            const message = response;
            this.loader.isLoading = false;
            this.toastrService.success(message);
            this.show = !this.show;
            this.modalService.open(content, {
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
  getRandomNumber() {
    const today = new Date();
    let date = this.datePipe.transform(today, 'YYMMddHHMMSSSSS');
    return date;
  }
  showModal() {
    this.show = !this.show;
  }
  changeFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  uploadFile(event) {
    if (event.target.value) {
      const file = event.target.files[0];
      const type = file.type;
      this.changeFile(file).then((base64: string): any => {
        (base64);
        this.fileBlob = this.b64Blob([base64], type);
        (this.fileBlob);
      });
    } else alert('Nothing');
  }

  b64Blob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };
  SelectOrganization(organizationId: any) {
    this.organization = organizationId;
    this.organizationname = this.OrganizationDetail.filter(
      (item) => item.organizationId === (this.registerForm.get('Nameoforg')?.value)
    )[0].organizationName.toString();

    if (this.organization.toString() == '999') {
      this.registerForm.controls['otherofSY'].setValidators([
        Validators.compose([Validators.required, this.scriptValidator]),
      ]);
      this.registerForm.controls['otherofSY'].updateValueAndValidity();
    } else {
      this.registerForm.get('otherofSY').clearValidators();
      this.registerForm.controls['otherofSY'].updateValueAndValidity();
    }
  }
  onselect() { }

  scriptValidator = function (control: AbstractControl): ValidationErrors | null {
    let value: string = control.value || '';
    if (value) {
      const matches = (value.includes('<script>')) || (value.includes('</script>')) || (value.includes('<style>')) || (value.includes('</style>'));
      return !matches ? null : { invalid: true };
    } else {
      return null;
    }
  }

  getCaptcha() {
    this.loader.isLoading = true;
    this.captchaService.getAll().subscribe((data: any) => {
      this.captchaKey = data.captchaKey;
      this.staticSecurityPin = 'OBS123';
      this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${data.captchBaseString}`);
      this.loader.isLoading = false;
    });

  }

  refreshCaptcha() {
    this.loader.isLoading = true;
    this.getCaptcha();
    this.registerForm.patchValue({
      securitypin: ""
    })
    this.loader.isLoading = false;
  }

  getOnboardingRequestYear() {
    let yearTemp = (new Date()).getFullYear().toString();;
    for (let i = 0; i < 3; i++) {
      this.year[i] = {
        yearId: yearTemp,
        description: yearTemp.toString() + "-" + (Number(yearTemp) + 1).toString(),
        abbrivation: "",
        yearGroup: "",
        isActive: ""
      }
      yearTemp = (Number(yearTemp) + 1).toString();
    }
  }
  getEncryptionKey() {
   // this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {

      this.encSecretKey = environment.secretKey
      this.encsalt = environment.salt
      
   // })
  }
}
