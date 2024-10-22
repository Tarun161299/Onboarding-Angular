import { Component, OnInit } from '@angular/core';
import { UserLoginInfo } from 'src/app/shared/model/UserLoginInfomodel';
import { AppOnBoardingRequestService } from 'src/app/shared/services/appOnBoardingRequest';
import { Router } from '@angular/router';
import { BeforeLoginComponent } from 'src/app/shared/before-login/before-login.component';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import { HttpClient } from '@angular/common/http';
import { TokenLocalStorageService } from 'src/app/shared/tokenLocalStorage/tokenLocalStorageService';
import { DatePipe } from '@angular/common';
//import * as bcrypt from 'bcrypt';
import { response } from 'express';
import * as CryptoJS from 'crypto-js';
import { DomSanitizer } from '@angular/platform-browser';
import { CaptchaService } from 'src/app/shared/services/captcha.service';
import saltHash from 'password-salt-and-hash'
import { ConfigurationApiSecureKey } from 'src/app/shared/services/ConfigurationApiSecureKey.Services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  action:any                  // ='https://identity.ecounselling.nic.in/authserver/Api/Authorize/';
  eisLogin:any=true;
  response_type:any           //  ="token";
client_Id :any                //="10002175RG7CB52K2280";
redirect_uri :any             //   ="http://localhost:55480/api/ExtEndPoint";
scope :any                    //  ="Profile";
state :any                    //   ="12132132131";
  userinfo: UserLoginInfo[] = [];
  securitypin: string = "";
  password: string = "";
  encryptedRequestNo: string = "";
  show: boolean = false;
  ipAddress = '_._._._';
  captchaData: any;
  imageSource: any;
  captchaKey: string;
  staticSecurityPin: string;
  form: FormGroup = new FormGroup({
    txtUserId: new FormControl(''),
    txtChoosePassword: new FormControl(''),
    txtSecurityCode: new FormControl('')
  });
  randomstr: string = "";
  submitted = false;
  encSecretKey: string;
  encsalt: string;

  constructor(
    private captchaService: CaptchaService,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: Router,
    private user: AppOnBoardingRequestService,
    private toastrService: ToastrService,
    private configurationApiSecureKey: ConfigurationApiSecureKey,
    private loader: BeforeLoginComponent,
    private tokenLocalStorageService: TokenLocalStorageService,
    private datePipe: DatePipe
  ) {
    this.loader.isLoading = true;
  }

  ngOnInit(): void {
    this.getEncryptionKey();
    this.loader.isLoading = true;
    this.getCaptcha();
    this.EISAuth();
    this.password = 'password';
    this.show = false;
    this.form = this.formBuilder.group(
      {
        txtUserId: ['', [Validators.required]],
        txtChoosePassword: ['', [Validators.required]],
        txtSecurityCode: ['', [Validators.required]],
      }
    );
    this.getIPAddress();
  }

  get loginFormControl(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getCaptcha() {
    this.loader.isLoading = true;
    this.captchaService.getAll().subscribe({
      next: (data: any) => {
        this.captchaData = data;
        this.captchaKey = data.captchaKey;
        this.staticSecurityPin = 'OBS123';
        this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.captchaData.captchBaseString}`);
        this.loader.isLoading = false;
      }, error: (err: any) => {
        this.loader.isLoading = true;
        const message = err.message;
        this.toastrService.error(message);
        this.loader.isLoading = false;
      }
    });
  }

  refreshCaptcha() {
    this.getCaptcha();
    this.form.patchValue({
      txtSecurityCode: ""
    })
  }

  OnSigninClick() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.captchaService.checkCaptcha(this.form.get('txtSecurityCode')?.value.toString()).subscribe((data: any) => {
      if (data == 1) {
        const password = EncyptionDecryption.Encrypt(this.form.get('txtChoosePassword')?.value.toString(), this.encSecretKey, this.encsalt)
        let hash: any = CryptoJS.SHA256(password);
        this.form.patchValue({
          txtChoosePassword: (CryptoJS.SHA256(hash.toString())).toString(),
        })
        this.loader.isLoading = true;
        this.generateRandomString();
        debugger
        this.user.GetSalt().subscribe((response: any) => {
          const Salt = response;
          const userInfo = {
            username: this.form.get('txtUserId')?.value.toString(),
            password: (CryptoJS.SHA256(hash.toString() + Salt)).toString(),
            captcha:this.form.get('txtSecurityCode')?.value.toString(),
            ipAddress:this.ipAddress
          }
          this.user.UserLoginApi(userInfo).subscribe({
            
            next: (response: any) => {
              let data = response;
              if (data.token != null) {
                if (data.appUserRoleMappingList.length == 0) {
                  this.toastrService.error("Role is not defined");
                  this.refreshCaptcha();
                  this.form.patchValue({
                  txtChoosePassword: '',
                 })
                  this.loader.isLoading = false;
                  return
                }
                this.loader.isLoading = false;
                debugger
                this.toastrService.success("Login success");
                let number = this.getRandomNumber();
                debugger
                
                //this.tokenLocalStorageService.set('userID', userInfo.username);
                this.tokenLocalStorageService.set('token', data.token.createdToken);
                // this.tokenLocalStorageService.set('requestNo', data.adminLogIn[0].requestNo);
                this.tokenLocalStorageService.set('refreshToken', data.token.refreshToken);
                // this.tokenLocalStorageService.set('module_assigned', JSON.stringify(data.appUserRoleMappingList));
                // this.tokenLocalStorageService.set('allRoles', JSON.stringify(data.userRoles));
                debugger
                if (this.tokenLocalStorageService.ParseToken().RoleType =='PMUADMIN') {
                //  this.tokenLocalStorageService.set('RoleType', 'PMUADMIN');
                  this.route.navigate(['/auth/pmudashboard']);
                }
                else {
                  //this.tokenLocalStorageService.set('RoleType', 'USER');
                  
                  this.encryptedRequestNo = EncyptionDecryption.Encrypt(data.adminLogIn[0].requestNo + number, this.encSecretKey, this.encsalt);
                 // localStorage.setItem('encRequestNo', this.encryptedRequestNo);
                  this.route.navigate(['/auth/ProjectActivity/' + this.encryptedRequestNo]);
                }
              }
              else {
                this.loader.isLoading = false;
                this.toastrService.error("Invalid Credential");
                this.refreshCaptcha();
                this.form.patchValue({
                  txtChoosePassword: '',
                })
              }
            }, error: (err: any) => {
              this.loader.isLoading = false;
              this.refreshCaptcha();
              this.toastrService.error("Invalid Credential");
              this.form.patchValue({
                txtChoosePassword: '',
              })
            }
          })
        })
      }
      else {
        this.loader.isLoading = false;
        this.toastrService.error("Invalid Security Pin");
        this.refreshCaptcha();
        this.form.patchValue({
          txtSecurityCode: '',
        })
        this.submitted = false;
      }
    })

  }
  EISAuth() {
    debugger
    this.action = environment.action;
    this.response_type = environment.response_type;
    this.client_Id = environment.client_Id;
    this.redirect_uri = environment.redirect_uri;
    this.scope = environment.scope;
    this.state = environment.state;
  }
  onClickShoHidePassword() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  getIPAddress() {
    this.loader.isLoading = true;
    this.user.GetIP().subscribe((res: any) => {
      this.ipAddress = res;
      this.loader.isLoading = false;
    })
  }

  getRandomNumber() {
    const today = new Date();
    let date = this.datePipe.transform(today, 'YYMMddHHMMSSSSS');
    return date;
  }

  generateRandomString() {
    var uniquechar = "";
    const randomchar = "abced015637";
    for (let i = 1; i < 10; i++) {
      uniquechar += randomchar.charAt(
        Math.random() * randomchar.length)
    }
    this.randomstr = uniquechar;
  }

  getEncryptionKey() {
  //  this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.encSecretKey = environment.secretKey
      this.encsalt =environment.salt
 //   })
  }
}

