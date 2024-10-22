import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CaptchaService } from '../../shared/services/captcha.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { usermanagementservice } from '../../shared/services/usermanagementservice.Service'
import { AfterLoginComponent } from '../../shared/after-login/after-login.component';
import { SignUPDetailService } from 'src/app/shared/services/signUpDetail';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import * as CryptoJS from 'crypto-js';
import { UsermanagementModel } from '../../shared/model/UsermanagementmodelModel';
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CommonFunctionServices } from '../../shared/common/commonFunction.services';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { param } from 'jquery';
import { SignUp } from 'src/app/model/SignUp.model';
import saltHash from 'password-salt-and-hash';
import { ConfigurationApiSecureKey } from 'src/app/shared/services/ConfigurationApiSecureKey.Services';
import { AppOnBoardingRequestService } from 'src/app/shared/services/appOnBoardingRequest';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {
  usermanagementfrm: FormGroup;
  flag: boolean = true;
  submitted: boolean = false;
  SecurityQuestiondropdown: any = [];
  AuthenticationModedropdown: any = [];
  selectedFile: File | null = null;
  base64textString: any;
  imageSource: any;
  imageSourcepop: any;
  captchaData: any;
  captchaKey: string;
  staticSecurityPin: string;
  adduser: boolean = false;
  updateuser: boolean = true;
  userIdAvailable: boolean;
  userid: any;
  fileupload: any = "";
  selectedFileB64: string;
  uid: string;
  password: string = "";
  show: boolean = false;
  showconfirm: boolean = false;
  confirmpassword: string = "";
  UsermanagementModel: UsermanagementModel;
  UsermanagementModelList: UsermanagementModel[] = [];
  @ViewChild('image') imageView !: ElementRef;
  encSecretKey: string;
  encsalt: string;
  signUpDetail: SignUp = new SignUp();
  selecteFile:any;
  fileExtension:any;
  fileName:any;
  allowedFileExtensions = ['jpg', 'jpeg', 'png'];
  ufilesize: number;
  upass:any;

  fileExtensionsCount:boolean=false;
  constructor(
    private formBuilder: FormBuilder
    , private captchaService: CaptchaService,
    private sanitizer: DomSanitizer,
    private commonFunctionServices: CommonFunctionServices,
    private toastrService: ToastrService,
    private usermanagementservice: usermanagementservice,
    private loader: AfterLoginComponent,
    private signUPDetailService: SignUPDetailService,
    private confirmationDialogService: ConfirmationDialogService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private configurationApiSecureKey: ConfigurationApiSecureKey
  ) {
    this.usermanagementfrm = this.formBuilder.group({
      UserName: ['', [Validators.required]],
      Designation: ['', [Validators.required]],
      EmailId: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,5}$'),],],
      Mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[6-9][0-9]{9}$'),],],
      UserId: ['', [Validators.required]],
      UserPassword: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]],
      SecurityQuestion: ['', [Validators.required]],
      securityanswer: ['', [Validators.required]],
      AuthenticationMode: ['', [Validators.required]],
      flupload: ['', [Validators.required]],
      securitypin: ['', [Validators.required]],
      //flupload: [{ value: '', disabled: false },[this.fileUploadValidator(this.allowedFileExtensions)]],
    });
  }

  ngOnInit(): void {

   // this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.encSecretKey = environment.secretKey
      this.encsalt =environment.salt
       //this.getEncryptionKey();
    this.password = 'password';
    this.confirmpassword = 'password';
    this.show = false;
    this.showconfirm = false;
    this.BindSecurityQuestiondropdown();
    this.BindAuthenticationModedropdown();
    this.getCaptcha();
    //=======================================================
    // this.route.paramMap.subscribe((params: ParamMap) => {
    // this.uid =  params.get('id')

    this.uid = this.route.snapshot.params['id'].toString();
    if (this.uid != "0") {

      this.loader.isLoading = true;
      this.usermanagementservice.getdoc(this.uid).subscribe((data: any) => {
        if (data == null) {
          this.fileupload = "";
          this.adduser = false;
          this.updateuser = true;
          this.cancel();
        }
        else {

          this.adduser = true;
          this.updateuser = false;
          this.usermanagementfrm.patchValue({
            UserName: data[0].userName,
            Designation: data[0].designation,
            EmailId:EncyptionDecryption.Decrypt(data[0].emailId,this.encSecretKey ,this.encsalt),
            Mobile:EncyptionDecryption.Decrypt(data[0].mobileNo,this.encSecretKey ,this.encsalt) ,
            UserId: data[0].userID,
            SecurityQuestion: data[0].securityQuestionId.trim(),
            securityanswer: data[0].securityAnswer,
            AuthenticationMode: data[0].authenticationType.trim(),

          },)
          this.fileupload = data[0].photopath;

          // this.fileupload = "";
        }
        this.usermanagementfrm.controls['UserId'].disable();
        this.loader.isLoading = false;
      });
    }

    //})
   
    //})

    //======================

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

  alphanumericOnly(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9._]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
    }
    return true;
  }

  BindSecurityQuestiondropdown() {

    this.usermanagementservice.BindZmstSecurityQuestion().subscribe((data: any) => {
      this.SecurityQuestiondropdown = data;
    })
  }

  BindAuthenticationModedropdown() {
    this.usermanagementservice.BindZmstAuthenticationMode().subscribe((data: any) => {
      this.AuthenticationModedropdown = data;
    })
  }


  get userManagementFormControl() {
    return this.usermanagementfrm.controls;
  }

  handleFileInput(evt: any) {
    this.selecteFile = evt.target.files[0] ;
    const fileNameWithExtension: string = this.selecteFile.name;
    const [fileName, fileExtension] = fileNameWithExtension.split('.');
    this.fileName=fileNameWithExtension;
    this.fileExtension=fileExtension;
    if(evt.target.files[0].name.split('.').length>1){
      this.fileExtensionsCount=true;
      return
    }
 this.fileExtensionsCount=false;
    this.selectedFile = evt.target.files[0];
    var files = evt.target.files;
    var file = files[0];
    var ufilename = files[0].name;
    var fufilename = ufilename.split('.')[1];

    if (fufilename.toUpperCase() == "JPG" || fufilename.toUpperCase() == "JPEG" || fufilename.toUpperCase() == "PNG" || fufilename.toUpperCase() == "SVG") { }
    else {
      this.usermanagementfrm.patchValue({
        flupload: ""
      })
      this.toastrService.error("Invalid Photograph, Please upload only .jpg,.svg,.png,.jpeg file");
      return;
    }


    this.ufilesize = files[0].size / 1000;
    if (this.ufilesize > 50) {
      this.usermanagementfrm.patchValue({
        flupload: ""
      })
      this.toastrService.error("File Size can not greater than 50KB");
      return;
    }


    if (files && file) {
      var reader = new FileReader();
      var readerbuffer = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);

    }
  }


  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.fileupload = this.base64textString;

  }


  getCaptcha() {

    this.captchaService.getAll().subscribe({
      next: (data: any) => {
        this.captchaData = data;
        this.captchaKey = data.captchaKey;
        this.staticSecurityPin = 'OBS123';
        this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.captchaData.captchBaseString}`);
      }, error: (err: any) => {
        const message = err.message;
        this.toastrService.error(message);
      }
    });
  }
  refreshCaptcha() {
    this.getCaptcha();
    this.usermanagementfrm.patchValue({
      securitypin: ""
    })
  }

  save() {
    this.submitted = true;
    if (this.usermanagementfrm.invalid || 
      this.fileExtensionsCount==true) {
      return;
    }
    else if (this.usermanagementfrm.get('UserPassword')?.value != this.usermanagementfrm.get('ConfirmPassword')?.value) {
      this.toastrService.error("Password and Confirm Password did not match?");
      return;
    }

    else {
      
      if (this.captchaKey == this.usermanagementfrm.get('securitypin').value) {
        this.signUpDetail.userID = this.usermanagementfrm.get('UserId').value;
        this.signUpDetail.password = CryptoJS.SHA256(EncyptionDecryption.Encrypt(this.usermanagementfrm.get('UserPassword')?.value, this.encSecretKey, this.encsalt)).toString();
        this.signUpDetail.confirmpassword = EncyptionDecryption.Encrypt(this.usermanagementfrm.get('ConfirmPassword')?.value, this.encSecretKey, this.encsalt);
        this.signUpDetail.requestNo = "";
        this.signUpDetail.userName = this.usermanagementfrm.get('UserName').value;
        this.signUpDetail.designation = this.usermanagementfrm.get('Designation').value;
        this.signUpDetail.emailId = EncyptionDecryption.Encrypt(this.usermanagementfrm.get('EmailId')?.value, this.encSecretKey, this.encsalt),// this.usermanagementfrm.get('EmailId').value;
        this.signUpDetail.mobileNo = EncyptionDecryption.Encrypt(this.usermanagementfrm.get('Mobile')?.value, this.encSecretKey, this.encsalt),//this.usermanagementfrm.get('Mobile').value;
        this.signUpDetail.securityQuestionId = this.usermanagementfrm.get('SecurityQuestion').value;
        this.signUpDetail.securityAnswer = this.usermanagementfrm.get('securityanswer').value;
        this.signUpDetail.authenticationType = this.usermanagementfrm.get('AuthenticationMode').value;
        this.signUpDetail.photopath = this.fileupload;
        this.signUpDetail.docFileName=this.fileName;
        this.signUpDetail.docContentType=this.fileExtension;

        this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
          .then(confirmed => {
            if (confirmed == true) {
              this.loader.isLoading = true;
              this.usermanagementservice.insert(this.signUpDetail).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.submitted = false;
                  this.toastrService.success(message);
                  this.loader.isLoading = false;
                  this.refreshCaptcha();
                  this.cancel();
                  this.router.navigate(['/auth/UserManagement']);
                },
                error: (err: any) => {
                  this.loader.isLoading = false;
                  const message = err;
                  this.toastrService.error("Invalid Data");
                }

              })
            }
          })

      }
      else {
        this.loader.isLoading = false;
        this.toastrService.error("Invalid Security Code");
      }
    }
  }

  CancelUserMaangementFormGroup() {
    this.usermanagementfrm.reset();
    for (let control in this.usermanagementfrm.controls) {
      this.usermanagementfrm.controls[control].setErrors(null);
    }
  }

  btnUpdate() {
debugger
this.submitted=true;
    if (this.usermanagementfrm.invalid || this.fileExtensionsCount==true) {
      return;
    }
    else if (this.usermanagementfrm.get('UserPassword')?.value != this.usermanagementfrm.get('ConfirmPassword')?.value) {
      this.toastrService.error("Password and Confirm Password did not match?");
      return;
    }
    else {
      if (this.captchaKey == this.usermanagementfrm.get('securitypin').value) {
        this.signUpDetail.userID = this.usermanagementfrm.get('UserId').value;
        this.signUpDetail.password = CryptoJS.SHA256(EncyptionDecryption.Encrypt(this.usermanagementfrm.get('UserPassword')?.value, this.encSecretKey, this.encsalt)).toString();
        this.signUpDetail.confirmpassword = EncyptionDecryption.Encrypt(this.usermanagementfrm.get('ConfirmPassword')?.value, this.encSecretKey, this.encsalt);
        this.signUpDetail.requestNo = "";
        this.signUpDetail.userName = this.usermanagementfrm.get('UserName').value;
        this.signUpDetail.designation = this.usermanagementfrm.get('Designation').value;
        this.signUpDetail.emailId =EncyptionDecryption.Encrypt(this.usermanagementfrm.get('EmailId')?.value, this.encSecretKey, this.encsalt);// this.usermanagementfrm.get('EmailId').value;
        this.signUpDetail.mobileNo =EncyptionDecryption.Encrypt(this.usermanagementfrm.get('Mobile')?.value, this.encSecretKey, this.encsalt);// this.usermanagementfrm.get('Mobile').value;
        this.signUpDetail.securityQuestionId = this.usermanagementfrm.get('SecurityQuestion').value;
        this.signUpDetail.securityAnswer = this.usermanagementfrm.get('securityanswer').value;
        this.signUpDetail.authenticationType = this.usermanagementfrm.get('AuthenticationMode').value;
        debugger
        this.signUpDetail.photopath = this.fileupload;
        this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
          .then(confirmed => {
            if (confirmed == true) {
              this.loader.isLoading = true;
              this.usermanagementservice.update(this.signUpDetail).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.toastrService.success(message);
                  //this.GetAll();
                  this.loader.isLoading = false;
                  this.refreshCaptcha();
                  this.cancel();
                  this.adduser = false;
                  this.updateuser = true;
                  this.usermanagementfrm.controls['UserId'].enable();
                  this.router.navigate(['/auth/UserManagement']);
                },
                error: (err: any) => {
                  this.loader.isLoading = false;
                  const message = err;
                  this.toastrService.error("Invalid Data")

                }
              })

            }

          })

      }
      else {
        this.loader.isLoading = false;
        this.toastrService.error("Invalid Security Code");
      }

    }
  }

  cancel() {
    this.CancelUserMaangementFormGroup();
    this.fileupload = "";
    this.usermanagementfrm.reset({ SecurityQuestion: '', AuthenticationMode: '' });
    this.usermanagementfrm.controls['UserId'].enable();
  }


  getDocumentbyAddress(mode: any) {
    if (mode == 'img') {

      this.selectedFileB64 = this.fileupload;
      this.imageSourcepop = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.selectedFileB64}`); //this.datacontentUploadPhoto;
      this.loader.isLoading = false;
      this.modalService.open(this.imageView, { size: 'xl' });
    }
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

  onClickShoHideConfirmPassword() {

    if (this.confirmpassword === 'password') {
      this.confirmpassword = 'text';
      this.showconfirm = true;
    } else {
      this.confirmpassword = 'password';
      this.showconfirm = false;
    }
  }

  getEncryptionKey() {
   
  }
  
}
