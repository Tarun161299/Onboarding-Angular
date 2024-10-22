import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SignUp } from 'src/app/model/SignUp.model'
import { SignUPDetailService } from 'src/app/shared/services/signUpDetail';
import { Router } from '@angular/router';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import { ActivatedRoute } from '@angular/router';
import { AppOnBoardingRequestService } from 'src/app/shared/services/appOnBoardingRequest';
import { ToastrService } from 'ngx-toastr';
import { BeforeLoginComponent } from 'src/app/shared/before-login/before-login.component';
import { CustomvalidationService } from 'src/app/shared/common/customvalidation.service';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
import * as CryptoJS from 'crypto-js';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'src/app/shared/otp-localStorage/localStorageServices';
import { DomSanitizer } from '@angular/platform-browser';
import { CaptchaService } from 'src/app/shared/services/captcha.service';
import { ConfigurationEnvironment } from 'src/app/shared/services/configEnvironment.services';
import { ConfigurationApiSecureKey } from 'src/app/shared/services/ConfigurationApiSecureKey.Services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  password: string = "";
  show: boolean = false;
  securitypin: string = "";
  signUpForm: FormGroup;
  signUpDetail: SignUp = new SignUp();
  Agency: string = "";
  Services: string = "";
  ministry: string = "";
  nameOfOrganisation: string = "";
  requestEncyptId: string;
  requestId: string = "";
  submitted = false;
  userid: string;
  userIdAvailable: boolean;
  showservices: String[] = [];
  OTPverification: string = '';
  OTPverificationSms: string;
  coordinatoremail: string = "";
  coordinatormobileno: string = "";
  coordinatorName: string = "";
  closeResult: string;
  imageSource: any;
  captchaKey: string;
  staticSecurityPin: string;
  otpmedium: string;
  authMode: string;
  showauthMode: boolean = false;
  mobileOtp: boolean = false;
  emailOtp: boolean = false;
  otpHeading: string;
  decSecretKey: string;
  decsalt: string;
  configEnvDetails: any;
  encSecretKey: string
  encsalt: string;
  OTPEmail: string;
  OTPSms: string;
  isEnableSmsOtpLink :boolean = false;
  
  ipAddress:string// = '_._._._';
  isEnableEmailOtpLink :boolean = false;
  constructor(
    private user: AppOnBoardingRequestService,private captchaService: CaptchaService, private sanitizer: DomSanitizer, private localstore: LocalStorageService, private confirmationDialogService: ConfirmationDialogService, private signUPDetailService: SignUPDetailService, private loader: BeforeLoginComponent,
    private toastrService: ToastrService, private route: Router, public formBuilder: FormBuilder,
    private userdetails: AppOnBoardingRequestService, private activeRoute: ActivatedRoute,
    private appOnboardingRequestService: AppOnBoardingRequestService,
    private modalService: NgbModal,
    private configurationApiSecureKey: ConfigurationApiSecureKey,
    private customValidator: CustomvalidationService,
    private configurationEnvironment: ConfigurationEnvironment) {
    this.signUpForm = this.formBuilder.group({
      userID: ['', [Validators.required]],
      txtSecurityPin: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.required, this.patternValidator()])],
      confirmPassword: ['', [Validators.required]],
      userName: ['', [Validators.required, Validators.pattern("^[A-Za-z. ]+$")]]
    },
      {
        validator: this.MatchPassword('password', 'confirmPassword'),
      }
    );

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
    this.getIPAddress();
    this.getDecryptionKey();
  }
  get signUpFormControl() { return this.signUpForm.controls; }
  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
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
  getDecryptionKey() {
   // this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey
      this.decsalt = environment.salt
      this.encSecretKey= environment.secretKey;
       this.encsalt=environment.salt
      this.getconfigEnvDetails();
      this.getCaptcha();
      this.password = 'password';
      this.show = false;
      this.requestEncyptId = this.activeRoute.snapshot.params['Id'].toString();
      this.requestId = EncyptionDecryption.Decrypt(this.requestEncyptId, this.decSecretKey, this.decsalt)
      this.requestId = this.requestId.substring(0, this.requestId.length - 15);
      this.userdetails.getdatafromRequestList(this.requestId).subscribe(
        (data: any) => {
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
          this.requestId = data.requestNo;
          this.Agency = data.agencyType;
          this.ministry = data.ministryName;
          this.nameOfOrganisation = data.oranizationName;
          this.coordinatoremail = EncyptionDecryption.Decrypt(data.coordinatorEmail, this.decSecretKey, this.decsalt);
          this.coordinatormobileno = EncyptionDecryption.Decrypt(data.coordinatorPhone, this.decSecretKey, this.decsalt);
          this.coordinatorName = data.coordinatorName;
          this.loader.isLoading = false;
        }
      )
  //  })
  }
  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  toggleFieldTextType() {
    this.show = !this.show;
  }

  alphanumericOnly(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9._]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  checkUserIDAvailibility(event) {
    this.userid = event.target.value;
    this.signUPDetailService.getUserDetails(this.userid).subscribe(
      (data: any) => {
        if (data == true) {
          this.userIdAvailable = true;
        }
        else {
          this.userIdAvailable = false;
        }
      }
    );
  }
  resendotpEmail() {
    this.generateOtp();
    const OTP = this.OTPEmail;
    const params = {
      otp: btoa(OTP).toString(),
      otpSms: btoa("NA"),
      email: btoa(this.coordinatoremail),
      mobile: btoa(this.coordinatormobileno),
      coodinatorName: btoa(this.coordinatorName),
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
      email: btoa(this.coordinatoremail),
      mobile: btoa(this.coordinatormobileno),
      coodinatorName: btoa(this.coordinatorName),
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

  signUpSubmit(content) {
    this.submitted = true;
    if (this.signUpForm.valid) {
      this.captchaService.checkCaptcha(this.signUpForm.get('txtSecurityPin')?.value.toString()).subscribe((data: any) => {
        if (data == 1) {
          this.loader.isLoading = true;
          this.generateOtp();
          this.generateOtpSms();
          const OTP = this.OTPEmail;
          const OTPSMS = this.OTPSms;
          const params = {
            otp: btoa(OTP).toString(),
            otpSms: btoa(OTPSMS).toString(),
            email: btoa(this.coordinatoremail),
            mobile: btoa(this.coordinatormobileno),
            coodinatorName: btoa(this.coordinatorName),
          }
          this.appOnboardingRequestService
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
        else {
          const error = "Security pin did not matched.";
          this.loader.isLoading = false;
          this.toastrService.error(error);
          this.signUpForm.patchValue({
            txtSecurityPin: ''
          })
          this.submitted = false;
        }
      })
    }
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
  checkAuthMode(localotpE: string, otpE: String, localotpm: string, otpM: String,) {
    return this.otpmedium == "B" ? ((localotpE == otpE) && (localotpm == otpM)) :
      this.otpmedium == "A" ? ((localotpE == otpE) || (localotpm == otpM)) : this.otpmedium == "E" ? (localotpE == otpE) : this.otpmedium == "M" ? (localotpm == otpM) : false;
  }

  addData() {
    if (
      this.checkAuthMode(this.OTPEmail,
        (<HTMLInputElement>document.getElementById('OTPemail')).value,
        this.OTPSms,
        (<HTMLInputElement>document.getElementById('OTPMobile')).value
      )) {
      this.modalService.dismissAll();
      this.loader.isLoading = true;
      this.loader.isLoading = true;
      if (this.userIdAvailable == false) {
        if (this.signUpForm.valid) {
          this.signUpDetail.userID = this.signUpForm.get('userID')?.value;
          this.signUpDetail.password = CryptoJS.SHA256(EncyptionDecryption.Encrypt(this.signUpForm.get('password')?.value, this.encSecretKey, this.encsalt)).toString()
          this.signUpDetail.confirmpassword = EncyptionDecryption.Encrypt(this.signUpForm.get('confirmPassword')?.value, this.encSecretKey, this.encsalt)
          this.signUpDetail.requestNo = this.requestId;
          this.signUpDetail.userName = this.signUpForm.get('userName')?.value
          this.signUpDetail.captcha=this.signUpForm.get('txtSecurityPin')?.value
         this.signUpDetail.ipAdress=this.ipAddress
          this.signUPDetailService.AddSignUpDetail(this.signUpDetail).subscribe(
            {
              next: (response: any) => {
                const message = response;
                this.loader.isLoading = false;
                this.toastrService.success("Login cridential created successfully");
                this.route.navigate(['/login']);
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
      }
      else {
        const error = "User Id is not available.";
        this.loader.isLoading = false;
        this.toastrService.error(error);
      }
    }
  }

  getCaptcha() {
    this.captchaService.getAll().subscribe({
      next: (data: any) => {
        this.captchaKey = data.captchaKey;
        this.staticSecurityPin = 'OBS123';
        this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${data.captchBaseString}`);
      }, error: (err: any) => {
        const message = err;
        this.toastrService.error(message);
      }
    });
  }
  refreshCaptcha() {
    this.getCaptcha();
    this.signUpForm.patchValue({
      txtSecurityPin: ""
    })
  }
  getIPAddress() {
    this.loader.isLoading = true;
    this.user.GetIP().subscribe((res: any) => {
      this.ipAddress = res;
      this.loader.isLoading = false;
    })
  }
  getEncryptionKey() {
   // this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.encSecretKey = environment.secretKey
      this.encsalt = environment.salt
   // })
  }
}
