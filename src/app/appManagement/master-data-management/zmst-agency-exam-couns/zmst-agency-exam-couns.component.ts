import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstAgencyExamCounsModel } from 'src/app/shared/model/zmstAgencyExamCounsModel';
import { ZmstAgencyExamCounsService } from 'src/app/shared/services/zmstAgencyExamCounsService';
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { ZmstAgencyModel } from 'src/app/shared/model/zmst-agency.model';
import { ZmstAgencyService } from 'src/app/shared/services/zmst-agency.service';
import { CommonFunctionServices } from 'src/app/shared/common/commonFunction.services';

declare const $: any;
@Component({
  selector: 'app-zmst-agency-exam-couns',
  templateUrl: './zmst-agency-exam-couns.component.html',
  styleUrls: ['./zmst-agency-exam-couns.component.css']
})
export class ZmstAgencyExamCounsComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstagencyexamcounsFrmGroup: FormGroup;
  zmstagencyexamcounsModel: ZmstAgencyExamCounsModel;
  zmstagencyexamcounsList: ZmstAgencyExamCounsModel[];
  AgencyList: ZmstAgencyModel[];
  ddlagency: any;
  agencyData: any = [];
  constructor(private formBuilder: FormBuilder,
    private loader: AfterLoginComponent,
    private confirmationDialogService: ConfirmationDialogService,
    private zmstagencyexamcounsServices: ZmstAgencyExamCounsService,
    private toastrService: ToastrService,
    private commonFunctionServices: CommonFunctionServices,
    private AgencyServices: ZmstAgencyService

  ) {
    this.zmstagencyexamcounsFrmGroup = this.formBuilder.group({
      agencyId: ["", [Validators.required, Validators.required]],
      examCounsId: ["", [Validators.required, Validators.required]],
      description: ["", [Validators.required, Validators.required]],
    });
  }

  ngOnInit(): void {

    this.loader.isLoading = true;
    this.getAll();
    this.getAgencyList();
  }

  ngAfterViewInit(): void {
    $("#zmstagencyexamcounsGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstagencyexamcounsFrmControl() {
    return this.zmstagencyexamcounsFrmGroup.controls;
  }

  clear() {
    this.zmstagencyexamcounsFrmGroup.reset();
    this.zmstagencyexamcounsFrmGroup.controls['agencyId'].enable();
    this.zmstagencyexamcounsFrmGroup.controls['examCounsId'].enable();
    this.submitted = false;
    this.updatehdn = false;
    this.getAll();
    this.getAgencyList();

  }
  getAgencyList() {
    
    this.AgencyServices.getAll().subscribe((data: any) => {
      this.AgencyList = data;
    });
  }
  save() {
    this.submitted = true;

    if (this.zmstagencyexamcounsFrmGroup.valid) {
      const zmstagencyexamcounsModel = {
        agencyId: this.zmstagencyexamcounsFrmGroup.get("agencyId").value,
        examCounsId: this.zmstagencyexamcounsFrmGroup.get("examCounsId").value,
        description: this.zmstagencyexamcounsFrmGroup.get("description").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstagencyexamcounsServices.insert(zmstagencyexamcounsModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.loader.isLoading = false;
                  this.filterNewData();
                  this.toastrService.success("Data Saved Successfully");
                },
                error: (err: any) => {
                  const message = err.message;
                  this.loader.isLoading = false;
                  this.clear();
                  this.toastrService.error("Already exists");
                }
              })
            }
          }
        })
    }
  }

  edit(data: any) {

    this.updatehdn = true;
    this.zmstagencyexamcounsFrmGroup.controls['agencyId'].disable();
    this.zmstagencyexamcounsFrmGroup.controls['examCounsId'].disable();
    this.zmstagencyexamcounsFrmGroup.patchValue({
      agencyId: (data.agencyId).toString(),
      examCounsId: data.examCounsId,
      description: data.description,
    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstagencyexamcounsFrmGroup.valid) {
      const zmstagencyexamcounsModel = {
        agencyId: this.zmstagencyexamcounsFrmGroup.get("agencyId").value,
        examCounsId: this.zmstagencyexamcounsFrmGroup.get("examCounsId").value,
        description: this.zmstagencyexamcounsFrmGroup.get("description").value,

        /* AuditColumns If any */
        //created_by: "",
        //created_date: "2023-02-27T09:53:56.110Z",
        //modified_by: "",
        //modified_date: "2023-02-27T09:53:56.110Z"
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {

              this.loader.isLoading = true;
              this.zmstagencyexamcounsServices.update(zmstagencyexamcounsModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.filterNewData();
                this.zmstagencyexamcounsFrmGroup.controls['agencyId'].enable();
                if (message != "Try Again") {
                  if (message > 0) {
                    this.toastrService.success("Update Successfully");
                  }
                }
                if (message == "Try Again") {
                  this.toastrService.error("Error Occured");
                }
              })
            }
          }
        })
    }
  }

  delete(id: any) {
    this.confirmationDialogService.confirmPopUp("Do you really want to Delete ?")
      .then(confirmed => {
        if (confirmed == true) {
          {
            this.loader.isLoading = true;
            this.zmstagencyexamcounsServices.delete(id).subscribe((data: any) => {
              this.loader.isLoading = false;
              const message = data;
              this.toastrService.error(message);
              this.clear();
              this.getAll();
            })
          }
        }
      })
  }

  getAll() {
    this.loader.isLoading = true;
    this.zmstagencyexamcounsServices.getAll().subscribe((data: any) => {
      this.zmstagencyexamcounsList = data;
      this.agencyData = data;
      this.commonFunctionServices.bindDataTable("zmstagencyexamcounsGrid", 0);
      this.loaderTimeOut();
    })
  }


  onAgencySelect() {
    this.loader.isLoading = true;
    this.zmstagencyexamcounsList = [];
    this.ddlagency = this.zmstagencyexamcounsFrmGroup.get("agencyId").value;
    if(this.ddlagency == 0){
      this.zmstagencyexamcounsList = this.agencyData;
      this.commonFunctionServices.bindDataTable("zmstagencyexamcounsGrid", 0);
      this.loaderTimeOut();
    }
    else{
      this.zmstagencyexamcounsList = this.agencyData.filter(x => x.agencyId == Number(this.ddlagency))
      this.commonFunctionServices.bindDataTable("zmstagencyexamcounsGrid", 0);
      this.loaderTimeOut();
    }
    
  }

  filterNewData() {
    this.zmstagencyexamcounsServices.getAll().subscribe((data: any) => {
      this.zmstagencyexamcounsList = data;

      this.agencyData = data;
      this.loader.isLoading = false;
      this.onAgencySelect()
    })
  }

  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 300);
  }
}