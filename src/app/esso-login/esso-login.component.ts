import { Component, OnInit } from '@angular/core';
import { CaptchaService } from '../shared/services/captcha.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppOnBoardingRequestService } from '../shared/services/appOnBoardingRequest';
import { ToastrService } from 'ngx-toastr';
import { TokenLocalStorageService } from '../shared/tokenLocalStorage/tokenLocalStorageService';
import { ConfigurationApiSecureKey } from '../shared/services/ConfigurationApiSecureKey.Services';
import { BeforeLoginComponent } from '../shared/before-login/before-login.component';
import { DatePipe } from '@angular/common';
import { UserLoginInfo } from '../shared/model/UserLoginInfomodel';
import { EncyptionDecryption } from '../shared/common/EncyptionDecryption';
import { EssoService } from '../shared/services/esso.service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-esso-login',
  templateUrl: './esso-login.component.html',
  styleUrls: ['./esso-login.component.css']
})
export class EssoLoginComponent implements OnInit {
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
EisId:string;
UserDetail:any;
  constructor(
    private captchaService: CaptchaService,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: Router,
    private user: AppOnBoardingRequestService,
    private router: ActivatedRoute,
    private toastrService: ToastrService,
    private configurationApiSecureKey: ConfigurationApiSecureKey,
    private loader: BeforeLoginComponent,
    private tokenLocalStorageService: TokenLocalStorageService,
    private datePipe: DatePipe,
    private essoServivce:EssoService
  ) {
    this.loader.isLoading = true;
  }

  ngOnInit(): void {
debugger
this.encSecretKey =environment.secretKey //data[0].secretKey
      this.encsalt = environment.salt 
      this.EisId=this.router.snapshot.params['id'].toString();
      
      //let hash: any = CryptoJS.SHA256(Eis);
      
      this.loader.isLoading = true;
      debugger
      this.essoServivce.getbyId(this.EisId).subscribe((data:any)=>{
        debugger
      if (data == null) {
        this.loader.isLoading = false;
        this.toastrService.error('UserId is not Correct');
        return;
      }
      this.UserDetail = JSON.parse(data.claimData);
      var eisId = this.UserDetail.sub;
        this.user.GetSalt().subscribe((response: any) => {
          const Salt = response;
          var Eis = EncyptionDecryption.Encrypt(eisId.toString()+Salt, this.encSecretKey, this.encsalt)
          const EisInfo = {
            eisId:(CryptoJS.SHA256(Eis.toString())).toString()// CryptoJS.SHA256(Eis)
          }
          this.user.UserLoginEisApi(EisInfo).subscribe({
            
            next: (response: any) => {
              let data = response;
              if (data.token != null) {
                if (data.appUserRoleMappingList.length == 0) {
                  this.toastrService.error("Role is not defined");
                  
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
                this.tokenLocalStorageService.set('userID', data.adminLogIn[0].userId);
                this.tokenLocalStorageService.set('token', data.token.createdToken);
                this.tokenLocalStorageService.set('requestNo', data.adminLogIn[0].requestNo);
                this.tokenLocalStorageService.set('refreshToken', data.token.refreshToken);
                this.tokenLocalStorageService.set('module_assigned', JSON.stringify(data.appUserRoleMappingList));
                this.tokenLocalStorageService.set('allRoles', JSON.stringify(data.userRoles));
                
                if (this.tokenLocalStorageService.ParseToken().RoleType=='PMUADMIN') {
                 // this.tokenLocalStorageService.set('RoleType', 'PMUADMIN');
                  this.route.navigate(['/auth/pmudashboard']);
                }
                else {
                 // this.tokenLocalStorageService.set('RoleType', 'USER');
                  
                  this.encryptedRequestNo = EncyptionDecryption.Encrypt(data.adminLogIn[0].requestNo + number, this.encSecretKey, this.encsalt);
                  //localStorage.setItem('encRequestNo', this.encryptedRequestNo);
                  this.route.navigate(['/auth/ProjectActivity/' + this.encryptedRequestNo]);
                }
              }
              else {
                this.loader.isLoading = false;
                this.toastrService.error("Invalid Credential");
                this.route.navigate(['/login']);
                
              }
            }, error: (err: any) => {
              this.loader.isLoading = false;
              this.route.navigate(['/login']);
              this.toastrService.error("Invalid Credential");
              this.form.patchValue({
                txtChoosePassword: '',
              })
            }
          })
        })
      })
     
    
   
  }
  getRandomNumber() {
    const today = new Date();
    let date = this.datePipe.transform(today, 'YYMMddHHMMSSSSS');
    return date;
  }

}
