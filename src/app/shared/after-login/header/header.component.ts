import { Component, Input, OnInit } from '@angular/core';
import { AppOnBoardingRequestService } from '../../services/appOnBoardingRequest';
import { TokenLocalStorageService } from '../../tokenLocalStorage/tokenLocalStorageService';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AfterLoginComponent } from '../../../shared/after-login/after-login.component';
import { DatePipe } from '@angular/common';
import { EncyptionDecryption } from '../../common/EncyptionDecryption';
import { AppDocumentUploadDetailService } from '../../services/appDocumentUploadedDetailService';
import { ConfigurationApiSecureKey } from '../../services/ConfigurationApiSecureKey.Services';
import { timer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Name: string;
  Designation: string;
  userName: any;
  token: any;
  imgsrc: any;
  selectedFileB64: string;
  requestNo: string;
  encSecretKey: string;
  encsalt: string;
  encryptedRequestNo: string;
  interval: any;
  intervalLogOut: any;
  AuthenticateDetail: any;
  delayInMilliseconds: any;
  timeNow: any;
  logout:any;
  @Input() unsubscribeTimer: any;
  constructor(private documentUploadDetailService: AppDocumentUploadDetailService,
    private router: Router, private storage: TokenLocalStorageService,
    private toastrService: ToastrService,
    private tokenService: TokenLocalStorageService,
    private users: AppOnBoardingRequestService,
    private sanitizer: DomSanitizer,
    private loader: AfterLoginComponent,
    private configurationApiSecureKey: ConfigurationApiSecureKey,
    private datePipe: DatePipe,
    private appOnBoardingRequestService:AppOnBoardingRequestService) { }

  ngOnInit(): void {
    this.getEncryptionKey();
    this.userName =  this.storage.ParseToken().userId;
    this.token = this.storage.get('token');
    this.loader.isLoading = true;
    this.users.getUserProfile(this.userName).subscribe((data: any) => {
      this.Name = data[0].username;
      this.Designation = data[0].userrole;
      if (data[0].docContent.trim() != "") {
        this.selectedFileB64 = data[0].docContent;
        this.imgsrc = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.selectedFileB64}`);
      }
      else {
        this.imgsrc = "assets/images/avatars/avatar-1.png";
      }
      this.loader.isLoading = false;
    });
    this.onEventChanges();
    this.removeTimer();
    this.interval = timer(0, (1000 * 60 * 60)).subscribe({next:(res) => {


      if (res) {
        this.refreshToken();
      }
    },error:(err)=>{
      //localStorage.clear();
       this.logout = {
        userId:  this.storage.ParseToken().userId,
        refreshToken: this.storage.get('refreshToken'),
        token: this.storage.get('token')
      }
      this.users.logout(this.logout).subscribe((res: any) => {
        this.toastrService.success(res);
        localStorage.removeItem('token');
        this.tokenService.removeData('requestNo');
        this.tokenService.removeData('userRoleID');
        localStorage.clear();
        this.router.navigate(['/login']);
      })
    }})

    // this.intervalLogOut = timer(0, (1000 * 60 * 60)).subscribe((res) => {
    //   this.timeNow = new Date().getTime();


    //   var diff = Math.abs(this.timeNow - new Date(localStorage.getItem('time')).getTime()) / 1000
    //   if (diff > 60 * 60) {
    //     localStorage.clear();
    //     this.interval.unsubscribe();
    //     this.intervalLogOut.unsubscribe();
    //   }
    // })
  }
  refreshToken() {
    this.appOnBoardingRequestService.getRefreshToken().subscribe((data: any) => {
      this.AuthenticateDetail = data;
      localStorage.setItem('token', this.AuthenticateDetail.token);
      localStorage.setItem('refreshToken', this.AuthenticateDetail.refreshToken);
    });
  }
  onLogoutClick() {
    const logout = {
      userId:  this.storage.ParseToken().userId,
      refreshToken: this.storage.get('refreshToken'),
      token: this.storage.get('token')
    }
    this.users.logout(logout).subscribe((res: any) => {
      this.toastrService.success(res);
      localStorage.removeItem('token');
      this.tokenService.removeData('requestNo');
      this.tokenService.removeData('userRoleID');
      localStorage.clear();
      this.interval.unsubscribe();
      this.router.navigate(['/login']);
    })
  }
  cngPssClick() {
    this.router.navigate(['auth/changePassword']);
  }
  userprofile() {
    let number = this.getRandomNumber();
    if (atob(localStorage.getItem('Role')) == 'ADMIN') {
      this.encryptedRequestNo = EncyptionDecryption.Encrypt(number, this.encSecretKey, this.encsalt);
      this.router.navigate(['auth/UserProfile/' + this.encryptedRequestNo]);
    }
    else if (atob(localStorage.getItem('Role')) == 'USER') {
      this.requestNo = this.storage.ParseToken().requestNo//get('requestNo');
      this.encryptedRequestNo = EncyptionDecryption.Encrypt(this.requestNo + number, this.encSecretKey, this.encsalt);
      this.router.navigate(['auth/UserProfile/' + this.encryptedRequestNo]);
    }
    else {
      this.requestNo = this.storage.ParseToken().requestNo;
      this.encryptedRequestNo = EncyptionDecryption.Encrypt(this.requestNo + number, this.encSecretKey, this.encsalt);
      this.router.navigate(['auth/UserProfile/' + this.encryptedRequestNo]);
    }
  }

  getRandomNumber() {
    const today = new Date();
    let date = this.datePipe.transform(today, 'YYMMddHHMMSSSSS');
    return date;
  }

  onEventChanges() {
    this.documentUploadDetailService.getRefreshProfileHeader().subscribe((data: any) => {
      this.userName = this.storage.ParseToken().userId;
      this.token = this.storage.get('token');
      this.loader.isLoading = true;
      this.users.getUserProfile(this.userName).subscribe((data: any) => {
        this.Name = data[0].username;
        this.Designation = data[0].userrole;
        if (data[0].docContent.trim() != "") {
          this.selectedFileB64 = data[0].docContent;
          this.imgsrc = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.selectedFileB64}`);
        }
        else {
          this.imgsrc = "assets/images/avatars/avatar-1.png";
        }
        this.loader.isLoading = false;
      })
    });
  }
  getEncryptionKey() {
    //this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.encSecretKey =environment.secretKey //data[0].secretKey
      this.encsalt = environment.salt // data[0].salt
    //})
  }
  removeTimer(){
    this.users.getRemoveTimer().subscribe((data:any)=>{
      
      this.interval.unsubscribe();
    })
  }
}
