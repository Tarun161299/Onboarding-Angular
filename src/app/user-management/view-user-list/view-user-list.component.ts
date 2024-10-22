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
  selector: 'app-view-user-list',
  templateUrl: './view-user-list.component.html',
  styleUrls: ['./view-user-list.component.css']
})
export class ViewUserListComponent implements OnInit {

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
  CheckUser: boolean = false;
  decSecretKey: any;
  decsalt: any;
  UsermanagementModel: UsermanagementModel;
  UsermanagementModelList: UsermanagementModel[] = [];
  @ViewChild('image') imageView !: ElementRef;
  usermanagementcomp: UserManagementComponent;
  hasData: any;

  constructor(private formBuilder: FormBuilder
    , private captchaService: CaptchaService,
    private sanitizer: DomSanitizer,
    private commonFunctionServices: CommonFunctionServices,
    private toastrService: ToastrService,
    private usermanagementservice: usermanagementservice,
    private loader: AfterLoginComponent,
    private signUPDetailService: SignUPDetailService,
    private confirmationDialogService: ConfirmationDialogService,
    private modalService: NgbModal,
    private configurationApiSecureKey: ConfigurationApiSecureKey,
    private router: Router) { }

  ngOnInit(): void {
  //  this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey
      this.decsalt = environment.salt
      this.GetAll();
  //  });

  }

  ngAfterViewInit(): void {
    $("#userdetailsGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }





  edit(data1: any) {

    this.usermanagementservice.CheckUserId(data1.userID).subscribe((data: any) => {



      if (data != null) {
        this.loader.isLoading = false;
        if (data[0].roleId == "SUPERADMIN") {
          this.toastrService.error("Super Admin can not be edit");
          return;
        }
      }

      this.router.navigate(['/auth/Adduser', data1.userID]);
    })
  }

  addDetails() {

    this.router.navigate(['/auth/Adduser/' + 0]);
  }


  delete(id: any) {
    this.usermanagementservice.CheckUserId(id).subscribe((data: any) => {



      if (data != null) {
        this.loader.isLoading = false;
        if (data[0].roleId == "SUPERADMIN") {
          this.toastrService.error("Super Admin can not be delete");
          return;
        }

      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Delete ?")
        .then(confirmed => {
          if (confirmed == true) {
            this.loader.isLoading = true;
            this.usermanagementservice.delete(id).subscribe((data: any) => {
              this.loader.isLoading = false;
              const message = data;
              this.toastrService.error(message);
              this.GetAll();
            })

          }
        }
        )

    })


  }


  GetAll() {
    this.loader.isLoading = true;
    this.usermanagementservice.getall().subscribe((data: any) => {

      this.commonFunctionServices.bindDataTable("userdetailsGrid", 0);
      this.UsermanagementModelList = data;
      this.loader.isLoading = false;
    })

  }

  showPhoto(id: any) {
    //getdoc
    this.loader.isLoading = true;

    this.usermanagementservice.getdoc(id).subscribe((data: any) => {

      if (data == null) {
        this.toastrService.error('Document not available');
        return;
      }

      this.selectedFileB64 = data[0].photopath;
      this.hasData = data[0].photopath;
      if (this.hasData.length > 0) {
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
}
