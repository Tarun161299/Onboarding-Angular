import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BeforeLoginComponent } from '../shared/before-login/before-login.component';
import { CustomvalidationService } from '../shared/common/customvalidation.service';
import { EncyptionDecryption } from '../shared/common/EncyptionDecryption';
import { ConfirmationDialogService } from '../shared/services/confirmation-dialog.service';
import { ForgotPasswordService } from '../shared/services/forgotPasswordService';
import { ResetPasswordService } from '../shared/services/resetPasswordService';

import * as CryptoJS from 'crypto-js';
import { ConfigurationApiSecureKey } from '../shared/services/ConfigurationApiSecureKey.Services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirmpassword',
  templateUrl: './confirmpassword.component.html',
  styleUrls: ['./confirmpassword.component.css']
})
export class ConfirmpasswordComponent implements OnInit {
  resetPassword: FormGroup;
  submitted = false;
  show: boolean = false;
  requestId: any;
  requestID: any;
  checkString: any;
  encSecretKey: string;
  encsalt: string;
  constructor(private configurationApiSecureKey: ConfigurationApiSecureKey, private router: ActivatedRoute, private route: Router, private resetPasswordService: ResetPasswordService, private confirmationDialogService: ConfirmationDialogService, private formBuilder: FormBuilder, private toastrService: ToastrService, private loader: BeforeLoginComponent,) { }

  ngOnInit(): void {
    this.getEncryptionKey();
    this.loader.isLoading = false;
    this.requestId = this.router.snapshot.params['Id'].toString();
    this.checkString = this.requestId.substring(this.requestId.length - 3, this.requestId.length)
    if (this.checkString == "@tn") {
      this.requestID = this.requestId.substring(0, this.requestId.length - 3) + "==";
    }
    this.resetPassword = this.formBuilder.group({
      NewPassword: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]],

    }, {
      validator: this.MatchPassword('NewPassword', 'ConfirmPassword'),
    }
    );
    this.show = false;
  }

  get formGroup() {
    return this.resetPassword.controls;
  }

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

  toggleFieldTextType() {
    this.show = !this.show;
  }

  onConfirmSend() {
    this.submitted = true;
    if (this.resetPassword.valid) {
      this.openConfirmationDialog();
    }
  }

  public openConfirmationDialog() {
    this.confirmationDialogService
      .confirm("Please Confirm.", "Do you want to submit ?")
      .then(confirmed => {
        if (confirmed == true) {
          this.loader.isLoading = true;
          if (this.resetPassword.valid) {
            const params =
            {
              newPassword: CryptoJS.SHA256(EncyptionDecryption.Encrypt(this.resetPassword.get('NewPassword')?.value, this.encSecretKey, this.encsalt)).toString(),
              confirmPassword: CryptoJS.SHA256(EncyptionDecryption.Encrypt(this.resetPassword.get('ConfirmPassword')?.value, this.encSecretKey, this.encsalt)).toString(),
              requestNumber: this.requestID
            }
            this.resetPasswordService.resetPassword(params).subscribe(
              {
                next: (response: any) => {
                  const message = response;
                  this.loader.isLoading = false;
                  this.toastrService.success("Password Changed Successfully");
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
            )
          }
        }
      }
      )
  }

  getEncryptionKey() {
  //  this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.encSecretKey = environment.secretKey
      this.encsalt = environment.salt
   // })
  }
}
