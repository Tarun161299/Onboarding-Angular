import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
import { TokenLocalStorageService } from 'src/app/shared/tokenLocalStorage/tokenLocalStorageService';
import { changePasswordModel } from 'src/app/shared/model/changePassword.model';
import { changePasswordService } from 'src/app/shared/services/changePassword.service';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import { AppOnBoardingRequestService } from 'src/app/shared/services/appOnBoardingRequest';
import { Router } from '@angular/router';
import { ConfigurationApiSecureKey } from 'src/app/shared/services/ConfigurationApiSecureKey.Services';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changepasswordFrmGroup: FormGroup;
  submitted: boolean = false;
  token: any;
  password: string = "";
  oldpassword: string = "";
  newPassword: string = "";
  confirmNewPassword: string = "";
  passwordsMatch: boolean = true;
  show: boolean = false;
  showN: boolean = false;
  changePasswordModelObj: changePasswordModel;
  encSecretKey: string
  encsalt: string

  constructor(
    private router: Router,
    private storage: TokenLocalStorageService,
    private loader: AfterLoginComponent,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private confirmationDialogService: ConfirmationDialogService,
    private changePasswordServiceObj: changePasswordService,
    private tokenService: TokenLocalStorageService,
    private users: AppOnBoardingRequestService,
    private configurationApiSecureKey: ConfigurationApiSecureKey
  ) {
    this.changepasswordFrmGroup = this.formBuilder.group({
      oldPassword: ["", [Validators.required]],
      newPassword: ['', Validators.compose([Validators.required, this.scriptValidator])],
      confirmNewPassword: ['', Validators.compose([Validators.required, this.scriptValidator])],
    },
      {
        validator: this.MatchPassword('newPassword', 'confirmNewPassword'),
      });
  }

  ngOnInit(): void {
    this.token = this.storage.get('token');
    this.loader.isLoading = false;
    this.oldpassword = 'password';
    this.password = 'password';
    this.confirmNewPassword = 'password';
    this.getEncryptionKey();
  }
  get changePasswordFrmControl() {
    return this.changepasswordFrmGroup.controls;
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
  save() {
    this.submitted = true;
    if (this.changepasswordFrmGroup.valid) {
      if (this.changepasswordFrmGroup.get('newPassword').value == this.changepasswordFrmGroup.get('confirmNewPassword').value) {
        const oldpassword = EncyptionDecryption.Encrypt(this.changepasswordFrmGroup.get('oldPassword').value, this.encSecretKey, this.encsalt);
        const newPassword = EncyptionDecryption.Encrypt(this.changepasswordFrmGroup.get('newPassword').value, this.encSecretKey, this.encsalt);
        const ConfirmPassword = EncyptionDecryption.Encrypt(this.changepasswordFrmGroup.get('confirmNewPassword').value, this.encSecretKey, this.encsalt)
        const changePasswordModelObj =
        {
          oldPassword: (CryptoJS.SHA256(oldpassword)).toString(),
          newPassword: (CryptoJS.SHA256(newPassword)).toString(),
          ConfirmPassword: (CryptoJS.SHA256(ConfirmPassword)).toString(),
          userid: this.storage.ParseToken().userId//(localStorage.getItem('userID')).toString(),
        }
        this.confirmationDialogService.confirmPopUp("Do you really Changed Password?")
          .then(confirmed => {
            if (confirmed == true) {
              {
                this.loader.isLoading = true;
                this.changePasswordServiceObj.insert(changePasswordModelObj).subscribe({
                  next: (data: any) => {
                    const message = data;
                    this.clear();
                    this.submitted = false;
                    this.loader.isLoading = false;
                    this.toastrService.success("Password Changed Successfully");
                    this.onLogoutClick();
                  },
                  error: (err: any) => {
                    const message =  err.message;
                    this.loader.isLoading = false;
                    this.clear();
                    this.loader.isLoading = false;
                    this.toastrService.error("Old Password not Matched");
                    this.submitted = false;
                  }
                })
              }
            }
          })
      }
      else {
        this.toastrService.error("New Password and Confirm Password not Matched");
      }
    }
  }
  reset() {
    this.clear();
  }
  clear() {
    this.changepasswordFrmGroup.reset();
    this.submitted = false;
  }
  onLogoutClick() {
    
    const logout = {
      userId: this.storage.ParseToken().userId,//this.storage.get('userID'),
      refreshToken: this.storage.get('refreshToken'),
      token: this.storage.get('token')
    }
    this.users.logout(logout).subscribe((res: any) => {
      localStorage.removeItem('token');
      this.tokenService.removeData('requestNo');
      this.tokenService.removeData('userRoleID');
      this.router.navigate(['/login']);
    })
    localStorage.clear();
  }
  onClickOldPassword() {
    if (this.oldpassword === 'password') {
      this.oldpassword = 'text';
      this.show = true;
    } else {
      this.oldpassword = 'password';
      this.show = false;
    }
  }

  onClickNewPassword() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
  getEncryptionKey(){
//this.configurationApiSecureKey.getAllKey().subscribe((data:any)=>{
  this.encSecretKey=environment.secretKey//data[0].secretKey
  this.encsalt=environment.salt//data[0].salt
//})
  }

  onClickConfirmPassword() {
    if (this.confirmNewPassword === 'password') {
      this.confirmNewPassword = 'text';
      this.show = true;
    } else {
      this.confirmNewPassword = 'password';
      this.show = false;
    }
  }

  MatchPassword(newPassword: string, confirmNewPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[newPassword];
      const confirmPasswordControl = formGroup.controls[confirmNewPassword];

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

}
