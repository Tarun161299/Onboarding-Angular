import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
import { CommonFunctionServices } from 'src/app/shared/common/commonFunction.services';
import { MdAgencyModel } from 'src/app/shared/model/md-agency.model';
import { ZmstAgencyModel } from 'src/app/shared/model/zmst-agency.model';
import { AgencyServices } from 'src/app/shared/services/agencyServices';
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { ZmstAgencyService } from 'src/app/shared/services/zmst-agency.service';

@Component({
  selector: 'app-md-agency',
  templateUrl: './md-agency.component.html',
  styleUrls: ['./md-agency.component.css']
})

export class MdAgencyComponent implements OnInit {
  mdAgencyFormGroup: FormGroup;
  mdAgencyList : MdAgencyModel[] =[];
  submitted:boolean=false;
  agencyId:Number;
  zmstagencyList:ZmstAgencyModel[] = [];
  constructor(
    private mdAgencyServices: AgencyServices,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,    
    private loader: AfterLoginComponent,
    private confirmationDialogService: ConfirmationDialogService,
    private commonFunctionServices: CommonFunctionServices,
    private zmstagencyServices: ZmstAgencyService
  ) {
    this.mdAgencyFormGroup = this.formBuilder.group({
      mdAgencyDropDown: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {    
    this.loader.isLoading = true;
    this.getAllMdAgency();
    this.getAllZmstAgency();
  }

  getAllMdAgency() {
    this.mdAgencyServices.getMdAgencyAll().subscribe({
      next:(data:any)=>{        
        this.mdAgencyList = data;
        this.commonFunctionServices.bindDataTable("mdAgencyTable", 0);
        this.loader.isLoading = false; 
      },error:(err:any)=>{
        this.loader.isLoading = false;   
        this.toastrService.error(err);
      }
    })
  }

  delete(id: any) {
    this.confirmationDialogService.confirmPopUp("Do you really want to Delete ?")
      .then(confirmed => {
        if (confirmed == true) {
          {
            this.loader.isLoading = true;
            this.mdAgencyServices.deleteMdAgency(id).subscribe((data: any) => {
              this.loader.isLoading = false;
              const message = data;
              this.toastrService.error(message);
              this.clear();
              this.getAllMdAgency();
            })
          }
        }
      })
  }

  get mdAgencyFormControl() {
    return this.mdAgencyFormGroup.controls;
  }

  clear(){    
    this.mdAgencyFormGroup.reset();
    this.submitted = false;
  }

  insert(){
    this.submitted= true;
    if (this.mdAgencyFormGroup.valid) {  
      this.agencyId = Number(this.mdAgencyFormGroup.get("mdAgencyDropDown").value);      
      this.confirmationDialogService.confirmPopUp("Do you really want to Submit?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.mdAgencyServices.insertMdAgency(this.agencyId).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.getAllMdAgency();
                  this.clear();
                  this.toastrService.success("Data Saved Successfully");
                }, error: (err: any) => {
                  
                  const message = err;

                  this.loader.isLoading = false;
                  this.getAllMdAgency();
                  this.clear();
                  this.toastrService.error("AgencyId Alreeady Exist!");
                }
              })
            }
          }
        })
    }
  }

  getAllZmstAgency() {
    this.zmstagencyServices.getAll().subscribe((data: any) => {      
      this.zmstagencyList = data;
      this.commonFunctionServices.bindDataTable("zmstagencyGrid", 0);
      this.loader.isLoading=false;
    })
  }
}
