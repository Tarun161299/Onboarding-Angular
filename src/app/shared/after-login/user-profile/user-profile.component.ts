import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { FormGroup } from '@angular/forms';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AfterLoginComponent } from '../after-login.component';
import { ToastrService } from 'ngx-toastr';
import { SignUp } from 'src/app/model/SignUp.model';
import { CaptchaService } from '../../services/captcha.service';
import { DomSanitizer } from '@angular/platform-browser';
import { EncyptionDecryption } from '../../common/EncyptionDecryption';
import { ConfirmationDialogComponent } from '../../confirmation-popup/confirmation-dialog.component/confirmation-dialog.component.component';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';
import { usermanagementservice } from '../../services/usermanagementservice.Service';
import { TokenLocalStorageService } from '../../tokenLocalStorage/tokenLocalStorageService';
import { AppOnBoardingRequestService } from '../../services/appOnBoardingRequest';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDocumentUploadDetailService } from '../../services/appDocumentUploadedDetailService';
import { Documents } from '../../model/documentsModel';
import { ActivityEnum } from '../../common/enums/activity.enums';
import { get } from 'jquery';
import { DatePipe } from '@angular/common';
import { ConfigurationApiSecureKey } from '../../services/ConfigurationApiSecureKey.Services';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userprofilefrm: FormGroup;
  uploadProfileForm: FormGroup;
  signUpDetail: SignUp = new SignUp();
  captchaData: any;
  show: boolean = false;

  flag: boolean = true;
  captchaKey: string;
  staticSecurityPin: string;
  imageSource: any;
  imageSourcepop: any;
  fileupload: any = "";
  selectedFileB64: string;
  submitted: boolean = false;
  isProfileSubmitted: boolean = false;
  selectedFile: File | null = null;
  SecurityQuestiondropdown: any = [];
  AuthenticationModedropdown: any = [];
  userName: any;
  base64textString: any;
  imgsrc: any;
  profileData: any;
  documentDetails: Documents[] = [];
  fileToUpload: any;
  filename: any;
  fileextension: any
  fileSizeValidation: any
  modifieddate: any
  fileUploadValidation: any
  pdfSrc: any;
  datacontent: any;
  encryptedRequestId: string;
  decSecretKey: string;
  selecteFile:any;
  fileExtension:any;
  fileName:any;
  fileExtensionsCount:boolean=false;
  decsalt: string;
  @ViewChild('image') imageView !: ElementRef;
  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private toastrService: ToastrService, private captchaService: CaptchaService, private sanitizer: DomSanitizer,
    private confirmationDialogService: ConfirmationDialogService, private usermanagementservice: usermanagementservice, private modalService: NgbModal,
    private storage: TokenLocalStorageService, private users: AppOnBoardingRequestService, private router: Router, private appdocmentserve: AppDocumentUploadDetailService,
    private datePipe: DatePipe, private route: ActivatedRoute, private configurationApiSecureKey: ConfigurationApiSecureKey) {
    {
      this.userprofilefrm = this.formBuilder.group({
        UserName: ['', [Validators.required]],
        Designation: ['', [Validators.required]],
        EmailId: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,5}$'),],],
        Mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[6-9][0-9]{9}$'),],],
        UserId: ['', [Validators.required]],
        UserPassword: [''],
        ConfirmPassword: [''],
        SecurityQuestion: ['', [Validators.required]],
        securityanswer: ['', [Validators.required]],
        AuthenticationMode: ['', [Validators.required]],
        securitypin: ['', [Validators.required]]
      });

      this.uploadProfileForm = this.formBuilder.group({
        flupload: ['', [Validators.required]],
      });
    }
  }
  ngOnInit(): void {
   // this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey;
      this.decsalt = environment.salt;
      this.BindAuthenticationModedropdown();
    this.BindSecurityQuestiondropdown();
    this.getCaptcha();
    this.getuserData()
   // })
    
  }
  get userprofileFormControl() {
    return this.userprofilefrm.controls;
  }

  get uploadProfileFormControl() {
    return this.uploadProfileForm.controls;
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
  BindSecurityQuestiondropdown() {

    this.usermanagementservice.BindZmstSecurityQuestion().subscribe((data: any) => {
      this.SecurityQuestiondropdown = data;
      this.loader.isLoading = false;
    })
  }

  getuserData() {
    
    this.userName = this.storage.ParseToken().userId
    this.loader.isLoading = true;
    this.users.getUserProfile(this.userName).subscribe((data: any) => {
      
      this.profileData = data[0];
      
      this.userprofilefrm.patchValue({
        AuthenticationMode: this.profileData.authenticationType,
        UserName: this.profileData.username,
        Designation: this.profileData.designation,
        EmailId: EncyptionDecryption.Decrypt(this.profileData.emailId, this.decSecretKey, this.decsalt),
        Mobile: EncyptionDecryption.Decrypt(this.profileData.mobileNo, this.decSecretKey, this.decsalt),
        UserId: this.profileData.userId,
        SecurityQuestion: this.profileData.securityQuestionId,
        securityanswer: (this.profileData.securityAnswer==null)?null: EncyptionDecryption.Decrypt(this.profileData.securityAnswer, this.decSecretKey, this.decsalt),
      })
      this.userprofilefrm.controls['UserId'].disable();
      this.userprofilefrm.controls['EmailId'].disable();

      if (data[0].docContent.trim() != "") {
        this.selectedFileB64 = data[0].docContent;
        this.imgsrc = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.selectedFileB64}`);

      }
      else {
        this.imgsrc = "assets/images/avatars/avatar-1.png";
      }
      this.loader.isLoading = false;
    })
    this.userprofilefrm.controls['username'].disable();
    this.userprofilefrm.controls['emailId'].disable()
  }
  BindAuthenticationModedropdown() {

    this.usermanagementservice.BindZmstAuthenticationMode().subscribe((data: any) => {

      this.AuthenticationModedropdown = data;
      this.loader.isLoading = false;
    })
  }

  refreshCaptcha() {
    this.getCaptcha();
    this.userprofilefrm.patchValue({
      securitypin: ""
    })
  }
  getDocumentbyAddress(mode: any) {

    if (mode == 'img') {

      this.selectedFileB64 = this.fileupload;
      this.imageSourcepop = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.selectedFileB64}`);
      this.loader.isLoading = false;
      this.modalService.open(this.imageView, { size: 'xl' });
    }
  }
  btnUpdate() {

    if (this.userprofilefrm.invalid ||  this.fileExtensionsCount==true) {
      return;
    }
    else {
      
      if (this.captchaKey == this.userprofilefrm.get('securitypin').value) {
        
        this.signUpDetail.userID = this.userprofilefrm.get('UserId').value;
        this.signUpDetail.password = this.profileData.password;
        //this.signUpDetail.requestNo = "";
        this.signUpDetail.requestNo = this.profileData.requestNo;
        this.signUpDetail.userName = this.userprofilefrm.get('UserName').value;
        this.signUpDetail.designation = this.userprofilefrm.get('Designation').value;
        this.signUpDetail.emailId =EncyptionDecryption.Encrypt(this.userprofilefrm.get('EmailId').value, this.decSecretKey, this.decsalt),
        this.signUpDetail.mobileNo = EncyptionDecryption.Encrypt(this.userprofilefrm.get('Mobile').value, this.decSecretKey, this.decsalt),
        this.signUpDetail.securityQuestionId = this.userprofilefrm.get('SecurityQuestion').value;
        this.signUpDetail.securityAnswer =EncyptionDecryption.Encrypt(this.userprofilefrm.get('securityanswer').value, this.decSecretKey, this.decsalt), 
        this.signUpDetail.authenticationType = this.userprofilefrm.get('AuthenticationMode').value;
        this.signUpDetail.photopath = this.profileData.docContent;
        this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
          .then(confirmed => {
            if (confirmed == true) {
              this.loader.isLoading = true;
              this.usermanagementservice.update(this.signUpDetail).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.appdocmentserve.refreshProfileHeader();
                  this.toastrService.success(message);
                  this.getuserData();
                  this.loader.isLoading = false;
                  this.refreshCaptcha();
                  this.userprofilefrm.controls['UserId'].enable();
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

  CancelUserProfileFormGroup() {
    this.userprofilefrm.reset();
    for (let control in this.userprofilefrm.controls) {
      this.userprofilefrm.controls[control].setErrors(null);
    }
  }
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  readURL(event: any): void {
    this.fileupload = this.base64textString;
    const file = event.target.files[0];
    this.base64textString = btoa(event.target.files[0])
    const reader = new FileReader();
    reader.onload = e => this.imgsrc = reader.result;
    this.base64textString = btoa(this.imgsrc);
    reader.readAsDataURL(file);

  }
  handleFileInput(event: any) {
    this.selecteFile = event.target.files[0] ;
    const fileNameWithExtension: string = this.selecteFile.name;
    const [fileName, fileExtension] = fileNameWithExtension.split('.');
    this.fileName=fileNameWithExtension;
    this.fileExtension=fileExtension;
    if(event.target.files[0].name.split('.').length>1){
      this.fileExtensionsCount=true;
      return
    }
 this.fileExtensionsCount=false;
    const file = event.target.files[0];
    const reader1 = new FileReader();
    reader1.onload = e => this.imgsrc = reader1.result;
    reader1.readAsDataURL(file);
    this.fileToUpload = event.target.files[0];
    this.filename = event.target.files[0].name;
    this.fileextension = event.target.files[0].type;
    //var size = event.target.files[0].size;
    //this.fileSizeValidation = size / 1024;
    this.modifieddate = event.target.files[0].lastModified;
    this.fileUploadValidation = false;
    let $img: any = document.querySelector('#Uploadfile');
    var reader = new FileReader();
    var readerbuffer = new FileReader();
    reader.onload = this._handleReaderLoaded3.bind(this);
    readerbuffer.onload = this._handleReaderLoaded2.bind(this);
    reader.readAsBinaryString(event.target.files[0]);
    readerbuffer.readAsArrayBuffer($img.files[0]);

  }
  _handleReaderLoaded2(readerEvt: any) {
    let $img: any = document.querySelector('#Uploadfile');
    this.pdfSrc = readerEvt.target.result;
  }
  _handleReaderLoaded3(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.datacontent = this.base64textString;

    return false;
  }
  saveuserphoto() {
    this.isProfileSubmitted = true;
    if (this.uploadProfileForm.valid && 
      this.fileExtensionsCount==false) {
      this.documentDetails[0] = {
        docSubject: "",
        requestNo: "",
        documentId: 0,
        activityid: ActivityEnum.ProfileDetails,
        moduleRefId: this.userName,
        docType: "",
        docId: '',
        docContent: this.base64textString,
        // docFileName: 'test.pdf',
        // docContentType: 'pdf',
        objectId: '',
        objectUrl: '',
        docNatureId: '',
        ipAddress: '',
        subTime: '2023-02-27T09:53:56.110Z',
        createdBy: this.storage.ParseToken().userId,
        docFileName: this.fileName,
        docContentType: this.fileExtension,
     
      };
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            this.loader.isLoading = true;
            this.appdocmentserve.Saveprofilephoto(this.documentDetails[0]).subscribe((data: any) => {
              if (data > 0) {
                this.appdocmentserve.refreshProfileHeader();
                this.toastrService.success("profile Update SuccessFully")
                this.loader.isLoading = false;
                
                this.encryptedRequestId = this.route.snapshot.params['id'].toString();
                if (atob(localStorage.getItem('RoleType')) == 'PMUADMIN') {
                  
                  
                  this.router.navigate(['/auth/pmudashboard']);
                }
                else if (atob(localStorage.getItem('RoleType')) == 'USER') {
                  this.encryptedRequestId = this.route.snapshot.params['id'].toString();
                  this.router.navigate(['/auth/ProjectActivity/' + this.encryptedRequestId]);
                }
                else {
                  this.router.navigate(['/auth/pmudashboard']);
                }

              }
              else {
                this.toastrService.error("Try Again")
              }
            })
          }

        })
    }
  }

  getRandomNumber() {
    const today = new Date();
    let date = this.datePipe.transform(today, 'YYMMddHHMMSSSSS');
    return date;
  }
}
