import { Component, OnInit } from '@angular/core';
import { ForgotPasswordService } from 'src/app/shared/services/forgotPasswordService';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BeforeLoginComponent } from 'src/app/shared/before-login/before-login.component';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationApiSecureKey } from 'src/app/shared/services/ConfigurationApiSecureKey.Services';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgetpassword: FormGroup;
  submitted = false;
  requestId: any;
  encryptedRequestId: any;
  message: any;
  encSecretKey: string;
  decSecretKey: string;
  decsalt: string;
  encsalt: string
  constructor(private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private forgotPassword: ForgotPasswordService,
    private loader: BeforeLoginComponent,
    private configurationApiSecureKey: ConfigurationApiSecureKey) { }

  ngOnInit(): void {
    this.getEncryptionKey();
   // this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey;
      this.decsalt = environment.salt;
      this.loader.isLoading = false;
      this.forgetpassword = this.formBuilder.group({
        RequestNumber: ['', [Validators.required]],
      });
  //  })
  }
  getEncryptionKey() {
  //  this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.encSecretKey = environment.secretKey
      this.encsalt = environment.salt
  //  })
  }
  get formGroup() {
    return this.forgetpassword.controls;
  }

  onSend() {
    this.submitted = true;
    this.requestId = this.forgetpassword.get('RequestNumber').value;
    this.encryptedRequestId = EncyptionDecryption.Encrypt(this.requestId, this.encSecretKey, this.encsalt);
    this.loader.isLoading = true;

    this.forgotPassword.sendEmail(this.encryptedRequestId).subscribe({
      next: (response: any) => {
        this.message = response;
        let decryptedMessage = EncyptionDecryption.Decrypt(this.message, this.decSecretKey, this.decsalt);
        this.ResetPassword(this.encryptedRequestId, decryptedMessage);
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

  ResetPassword(encryptedRequestNumber: string, decryptedMessage: string) {
    const params =
    {
      encryptedRequestId: encryptedRequestNumber,
      decryptedEmail: decryptedMessage
    }
    if (this.forgetpassword.valid) {
      this.forgotPassword.sendResendEmail(params).subscribe({
        next: (response: any) => {
          this.message = response;
          this.loader.isLoading = false;
          this.toastrService.success(this.message);
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
}


