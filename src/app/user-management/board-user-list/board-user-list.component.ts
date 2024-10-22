
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { UserManagementComponent } from 'src/app/user-management/AddUser/user-management.component';
import { Router, ActivatedRoute } from '@angular/router';
import { param } from 'jquery';
import { ConfigurationApiSecureKey } from 'src/app/shared/services/ConfigurationApiSecureKey.Services';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-board-user-list',
  templateUrl: './board-user-list.component.html',
  styleUrls: ['./board-user-list.component.css']
})
export class BoardUserListComponent implements OnInit {
  username: string ="";
  usernamedesignation: string = "";
  useremail: string = "";
  usermobile: string = "";
  securityquestion: string = "";
  securityanswer:string = "";
  authenticationtype:string = "";
  authModedesc:string = "";

  brduserdetailsList:boolean = true; 
  brduserdetails:boolean =false;

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
  fileupload:any ="" ;
  selectedFileB64:string;
  CheckUser:boolean=false;
  encSecretKey: string;
  encsalt: string;
  decSecretKey:string;
  decsalt:string;

  UsermanagementModel: UsermanagementModel;
  UsermanagementModelList: UsermanagementModel[]=[];
  @ViewChild('image') imageView !: ElementRef;

  usermanagementcomp:UserManagementComponent;
  boardusermanagementfrm:FormGroup;
  imageUrl:any;
  hasData:any;
  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private commonFunctionServices: CommonFunctionServices,
    private toastrService: ToastrService,
    private usermanagementservice: usermanagementservice,
    private loader: AfterLoginComponent,
    private signUPDetailService: SignUPDetailService,
    private confirmationDialogService: ConfirmationDialogService,
    private configurationApiSecureKey: ConfigurationApiSecureKey,
    private modalService: NgbModal,
    private router: Router) 
    { 

      this.boardusermanagementfrm = this.formBuilder.group({
       
      });

    }

  ngOnInit(): void {   
    this.getDecryptionKey();
    
  }

  ngAfterViewInit(): void {
    $("#BoarduserdetailsGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  addDetails() {  
   this.router.navigate(['/auth/Adduser/'+ 0]);
 }


GetBoardUserAll(){  
  this.loader.isLoading = true;
  this.usermanagementservice.BoardUsergetalldetails().subscribe((data:any)=>{   
    
    this.commonFunctionServices.bindDataTable("BoarduserdetailsGrid", 0);
    
    this.UsermanagementModelList = data;
    
    this.brduserdetails=false;
    this.brduserdetailsList=true;
    this.loader.isLoading = false;
  })
 
}


showPhoto(id: any ) {
   this.loader.isLoading = true;
    this.usermanagementservice.getdoc(id).subscribe((data:any) => {
     if(data==null)
     {
       this.toastrService.error('Document not available');
       return;
     }
    
     this.selectedFileB64 = data[0].photopath;
     this.hasData = data[0].photopath;

     if(this.hasData.length > 0){
      this.imageSourcepop = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.selectedFileB64}`);
      this.modalService.open(this.imageView, { size: 'xl' });
      this.loader.isLoading = false;
     }
     else {
       this.toastrService.error('image not available');
       this.loader.isLoading = false;
       return;
     }
  });
}

  Showdetails(id: any){  
    this.loader.isLoading = true;
    this.usermanagementservice.getuserdetails(id).subscribe((data:any)=>{
      this.username = data[0].userName;
      this.usernamedesignation = data[0].designation;
      this.useremail = data[0].emailId;
      this.usermobile = data[0].mobileNo;
      this.securityquestion = data[0].securityQuesdesc;
      this.securityanswer = data[0].securityAnswer;
      this.authenticationtype = data[0].authenticationType;
      this.authModedesc = data[0].authModedesc;
      this.brduserdetails=true;
      this.brduserdetailsList=false;

      this.usermanagementservice.getdoc(id).subscribe((data1:any) => {
        this.selectedFileB64 = data1[0].photopath;
        this.hasData = data1[0].photopath;
        this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.selectedFileB64}`);
     });

      this.loader.isLoading = false;
     })
  }

  Back()
  {
    this.brduserdetails=false;
    this.brduserdetailsList=true;
    this.commonFunctionServices.bindDataTable("BoarduserdetailsGrid", 0);   
  }

  get userManagementFormControl() {
    return this.boardusermanagementfrm.controls;
  }

  getDecryptionKey() {
  //  this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey;
      this.decsalt = environment.salt;
      this.GetBoardUserAll();
   // })
  }
}
