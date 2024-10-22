import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BeforeLoginComponent } from 'src/app/shared/before-login/before-login.component';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import { AppOnBoardingRequestService } from 'src/app/shared/services/appOnBoardingRequest';
import { CaptchaService } from 'src/app/shared/services/captcha.service';
import { TokenLocalStorageService } from 'src/app/shared/tokenLocalStorage/tokenLocalStorageService';

@Component({
  selector: 'app-on-boarding-status',
  templateUrl: './on-boarding-status.component.html',
  styleUrls: ['./on-boarding-status.component.css']
})
export class OnBoardingStatusComponent implements OnInit {
  registerForm: FormGroup;
  token: any;
  submitted: boolean = false;
  securitypin: string;
  captchaData: any;
  imageSource: any;
  captchaKey: string;
  staticSecurityPin: string;
  constructor(private captchaService: CaptchaService, private sanitizer: DomSanitizer, private storage: TokenLocalStorageService, private formBuilder: FormBuilder, private toastrService: ToastrService, private user: AppOnBoardingRequestService, private route: Router, private loader: BeforeLoginComponent) { this.loader.isLoading = true; }

  ngOnInit(): void {
      localStorage.clear();
    this.loader.isLoading = true;
    this.registerForm = this.formBuilder.group({
      RequestId: ['', Validators.compose([Validators.required, this.scriptValidator])],
      captcha: ['', Validators.compose([Validators.required, this.scriptValidator])],
      Email: [''],
    })
    this.token = this.storage.get('token')
    this.getCaptcha();
    
  }
  get formControl() {
    return this.registerForm.controls;
  }

  Submit() {
    
    this.submitted = true;
    const requestno = this.registerForm.get('RequestId').value;
    if (this.registerForm.valid) {


      this.captchaService.checkCaptcha(this.registerForm.get('captcha')?.value.toString()).subscribe((data: any) => {
        if (data == 1 && (this.registerForm.get('captcha')?.value.toString()==this.captchaKey || this.registerForm.get('captcha')?.value.toString()== this.staticSecurityPin)) 
       {
        this.user.getStatus(requestno).subscribe((data: any) => {
          if (data.statusRequest.length == 0 && data.statusDetail.length == 0) {
            this.toastrService.error("RequestId does not Exist");
          }
          else {
            this.route.navigate(['/onboardingviewstatus/' + requestno]);
          }
        })
       }
        else {
          this.loader.isLoading = false;
          this.toastrService.error("Invalid Security Pin");
          this.registerForm.patchValue({
            txtSecurityCode: '',
          })
          this.submitted = false;
        }
      })
    }
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

  getCaptcha() {
    this.loader.isLoading = true;
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
    this.loader.isLoading = false;
  }

  refreshCaptcha() {
    this.loader.isLoading = true;
    this.getCaptcha();
    this.registerForm.patchValue({
      captcha: ""
    })
    this.loader.isLoading = false;
  }
}
