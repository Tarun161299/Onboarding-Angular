
import { userrolemodulemodel } from "src/app/shared/model/userrolemodule.model";

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { AppUserRoleMappingService } from "src/app/shared/services/app-user-role-mapping.service";

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

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {

  appuserrolemappingFrmGroup:FormGroup;
  appuserrolemappingListgrid:userrolemodulemodel[]=[];
  appuserrolemappingListgridtemp:userrolemodulemodel[]=[];
  appuserrolemappingListgridtempchk:userrolemodulemodel[]=[];
  submitted: boolean = false;
  UserRoledropdown: any = [];
  roleidforfilter:any;
  
  constructor(private formBuilder: FormBuilder,  
    private loader: AfterLoginComponent,
    private appUserRoleMappingService:AppUserRoleMappingService,
    private commonFunctionServices: CommonFunctionServices,
    private confirmationDialogService: ConfirmationDialogService, 
    private toastrService: ToastrService,
    ) 
    {
      this.appuserrolemappingFrmGroup = this.formBuilder.group({
      Role: ['',[Validators.required]],
       });
     }

  ngOnInit(): void {
    this.loader.isLoading = true;
	  this.BindRoledropdown();
  }

  
  ngAfterViewInit(): void {
    $("#appuserrolemappingGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }


  BindRoledropdown() {
    
    this.appUserRoleMappingService.BindRoledropdown().subscribe((data: any) => {
      this.UserRoledropdown = data;
      this.loader.isLoading = false;
    })
  }

  
  GetByUserRoll(Id:any)
  {
     this.appUserRoleMappingService.getById(Id.target.value).subscribe((data: any) => {
     if(data==null || Id.target.value=='')
     {
      this.loader.isLoading = true;
      this.commonFunctionServices.bindDataTable("appuserrolemappingGrid", 0);
      this.appuserrolemappingListgrid = [];
      this.appuserrolemappingListgridtemp=[];
      this.loader.isLoading = false;
     }
     else
     {
        this.loader.isLoading = true;
        this.commonFunctionServices.bindDataTable("appuserrolemappingGrid", 0);
        this.appuserrolemappingListgrid = data;
        this.appuserrolemappingListgridtemp=data;
        this.loader.isLoading = false;
     }
  })
}

  btnSave() {
    this.submitted = true;
    this.appuserrolemappingListgridtempchk =  this.appuserrolemappingListgridtemp.filter(item => item.assign!=null)
    this.roleidforfilter = this.appuserrolemappingFrmGroup.get('Role').value.toString();
    this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
            if(confirmed==true)
            {
              this.loader.isLoading = true;
              this.appUserRoleMappingService.insert(this.appuserrolemappingListgridtempchk, this.roleidforfilter).subscribe({
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



  getRole(e, module,i){
    if(e.target.checked)
    {
      this.appuserrolemappingListgridtemp[i].assign =  this.appuserrolemappingListgridtemp[i].roleId.toString();
    }
    else
    {
      this.appuserrolemappingListgridtemp[i].assign = null;
    }
    
   }

   getModule1(e, module,i){
    if(e.target.checked)
    {
      this.appuserrolemappingListgridtemp[i].isReadOnly =  "Y";
    }
    else
    {
      this.appuserrolemappingListgridtemp[i].isReadOnly =  "N";
    }
   }
  
   getModule2(e, module,i){
      if(e.target.checked)
      {
        this.appuserrolemappingListgridtemp[i].isActive =  "Y";
      }
      else
      {
        this.appuserrolemappingListgridtemp[i].isActive =  "N";
      }
   }
  get userrolemoduleFrmControl() {
    return this.appuserrolemappingFrmGroup.controls;
  }
  cancel() {
    this.appuserrolemappingFrmGroup.reset();
    this.appuserrolemappingFrmGroup.reset({Role:''});
    this.commonFunctionServices.bindDataTable("appuserrolemappingGrid", 0);
    this.appuserrolemappingListgrid = [];
    this.appuserrolemappingListgridtemp=[];
    this.appuserrolemappingListgridtempchk=[];
    this.submitted = false;
 }

}
