import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { AppRoleModulePermissionModel } from "src/app/shared/model/app-role-module-permission.model";
import { AppRoleModulePermissionService } from "src/app/shared/services/app-role-module-permission.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { CaptchaService } from '../../shared/services/captcha.service';
import { DomSanitizer } from '@angular/platform-browser';
import { usermanagementservice } from '../../shared/services/usermanagementservice.Service'
import { SignUPDetailService } from 'src/app/shared/services/signUpDetail';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import * as CryptoJS from 'crypto-js';
import { UsermanagementModel } from '../../shared/model/UsermanagementmodelModel';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CommonFunctionServices } from '../../shared/common/commonFunction.services';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { param } from 'jquery';
import { AppRoleModulemodel } from 'src/app/model/AppRoleModulemodel.model';

declare const $: any;

@Component({
  selector: 'app-role-module',
  templateUrl: './role-module.component.html',
  styleUrls: ['./role-module.component.css']
})
export class RoleModuleComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  approlemodulepermissionfrm: FormGroup;
  approlemodulepermissionModel: AppRoleModulePermissionModel ;
  approlemodulemodel: AppRoleModulemodel = new AppRoleModulemodel();
  approlemodulepermissionList: AppRoleModulePermissionModel[];
  rolegrid:AppRoleModulePermissionModel[]=[];
  rolegridtemp:AppRoleModulePermissionModel[]=[];
  rolegridtempchk:AppRoleModulePermissionModel[]=[];
  selection: AppRoleModulePermissionModel[] = [];

  selectionisreadonly: AppRoleModulePermissionModel[] = [];
  selectionisactive: AppRoleModulePermissionModel[] = [];
  Roledropdown: any = [];
  Assign = [];
  checkdata: string = '';
  flagService: Number = 0;
  idval:string;
  moduleval:string;
  constructor(private formBuilder: FormBuilder, 
    private loader: AfterLoginComponent, 
    private confirmationDialogService: ConfirmationDialogService, 
    private approlemodulepermissionServiceses: AppRoleModulePermissionService,
    private toastrService: ToastrService,
    private captchaService: CaptchaService,
    private sanitizer: DomSanitizer,
    private commonFunctionServices: CommonFunctionServices,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
    )
   {
    this.approlemodulepermissionfrm = this.formBuilder.group({
      Role: ['',[Validators.required,Validators.required]],
      rolemodule:['',[Validators.required,Validators.required]],
     });
   }


  ngOnInit(): void {
    this.loader.isLoading = true;
	  this.BindRoledropdown();
   
  }

  getSelection(item: any) {
    return (
      this.selection.findIndex(
        (s) => s.moduleId === item.moduleId
      ) !== -1
    );
  }

getModule(e, module,i){
 
 if(e.target.checked)
 {
   this.rolegridtemp[i].assign =  this.rolegridtemp[i].moduleId.toString();
 }
 else
 {
   this.rolegridtemp[i].assign = null;
 }
 
}



getModule1(e, module,i){
  
  if(e.target.checked)
  {
    this.rolegridtemp[i].isReadOnly =  "Y";
  }
  else
  {
    this.rolegridtemp[i].isReadOnly =  "N";
  }
 }

 getModule2(e, module,i){
  
    if(e.target.checked)
    {
      this.rolegridtemp[i].isActive =  "Y";
    }
    else
    {
      this.rolegridtemp[i].isActive =  "N";
    }
 }


  ngAfterViewInit(): void {
    $("#roledetailsGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get approlemodulepermissionFrmControl() {
    return this.approlemodulepermissionfrm.controls;
  }

  cancel() {
     this.approlemodulepermissionfrm.reset();
     this.approlemodulepermissionfrm.reset({Role:''});
     this.commonFunctionServices.bindDataTable("roledetailsGrid", 0);
     this.rolegrid = [];
     this.rolegridtemp=[];
     this.rolegridtempchk=[];
	 this.submitted = false;
  }

  GetByRoll(Id:any)
  { 
      this.idval =  Id.target.value
      this.approlemodulepermissionServiceses.getById(this.idval).subscribe((data: any) => {
        if(data==null || this.idval=='')
        {
          this.loader.isLoading = true;
          this.rolegrid = [];
          this.rolegridtemp=[];
          this.loader.isLoading = false;
          this.commonFunctionServices.bindDataTable("roledetailsGrid", 0);
        }
       else
       {
          this.loader.isLoading = true;
          this.commonFunctionServices.bindDataTable("roledetailsGrid", 0);
          this.rolegrid = data;
          this.rolegridtemp=data;
          this.loader.isLoading = false;
       }
     })
  }


  btnSave() {
    this.submitted = true;
    this.rolegridtempchk =  this.rolegridtemp.filter(item => item.assign!=null)
      this.approlemodulemodel.roleId = this.approlemodulepermissionfrm.get('Role').value.toString();
      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
            if(confirmed==true)
            {
              this.loader.isLoading = true;
            
              this.approlemodulepermissionServiceses.insert(this.rolegridtempchk,this.approlemodulemodel.roleId).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.submitted = false;
                  this.toastrService.success(message);
                  this.loader.isLoading = false;
                  this.cancel();
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
     
  BindRoledropdown() {
    this.approlemodulepermissionServiceses.BindRoledropdown().subscribe((data: any) => {
      this.Roledropdown = data;
      this.loader.isLoading = false;
    })
  }

}
