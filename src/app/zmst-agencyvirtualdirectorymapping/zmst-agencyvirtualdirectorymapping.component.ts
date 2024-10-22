


import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstAgencyVirtualDirectoryMappingModel } from "src/app/shared/model/zmst-agencyvirtualdirectorymapping.model";
import { ZmstAgencyVirtualDirectoryMappingService } from "src/app/shared/services/zmst-agencyvirtualdirectorymapping.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { ZmstAgencyService } from "../shared/services/zmst-agency.service";
import { CommonFunctionServices } from "../shared/common/commonFunction.services";

declare const $: any;

@Component({
  selector: "app-zmst-agencyvirtualdirectorymapping",
  templateUrl: "./zmst-agencyvirtualdirectorymapping.component.html",
  styleUrls: ["./zmst-agencyvirtualdirectorymapping.component.css"]
})
export class ZmstAgencyvirtualdirectorymappingComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstagencyvirtualdirectorymappingFrmGroup: FormGroup;
  zmstagencyvirtualdirectorymappingModel: ZmstAgencyVirtualDirectoryMappingModel;
  zmstagencyvirtualdirectorymappingList: any = []
  agencyList: any
  isactive: any;
  AgencyName: any;
  RADIO_LIST = [
    { id: true, name: 'Active', value: 'Active' },
    { id: false, name: 'Not Active', value: 'Not Active', checked: false },
  ];

  constructor(private commonFunctionServices: CommonFunctionServices, private zmstAgencyService: ZmstAgencyService, private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstagencyvirtualdirectorymappingServices: ZmstAgencyVirtualDirectoryMappingService, private toastrService: ToastrService) {
    this.zmstagencyvirtualdirectorymappingFrmGroup = this.formBuilder.group({
      agencyId: ["", [Validators.required]],
      baseDirectory: ["", [Validators.required]],
      virtualDirectory: ["", [Validators.required]],
      virtualDirectoryType: ["", [Validators.required]],
      isActive: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllAgency()
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstagencyvirtualdirectorymappingGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstagencyvirtualdirectorymappingFrmControl() {
    return this.zmstagencyvirtualdirectorymappingFrmGroup.controls;
  }

  clear() {
    this.zmstagencyvirtualdirectorymappingFrmGroup.reset();
    this.zmstagencyvirtualdirectorymappingFrmGroup.controls['virtualDirectoryType'].enable()
    this.zmstagencyvirtualdirectorymappingFrmGroup.controls['agencyId'].enable()
    this.submitted=false;
    this.updatehdn=false;
  }

  save() {
    this.submitted = true;

    if (this.zmstagencyvirtualdirectorymappingFrmGroup.valid) {
      this.zmstagencyvirtualdirectorymappingModel = {
        agencyId: this.zmstagencyvirtualdirectorymappingFrmGroup.get("agencyId").value,
        baseDirectory: this.zmstagencyvirtualdirectorymappingFrmGroup.get("baseDirectory").value,
        virtualDirectory: this.zmstagencyvirtualdirectorymappingFrmGroup.get("virtualDirectory").value,
        virtualDirectoryType: this.zmstagencyvirtualdirectorymappingFrmGroup.get("virtualDirectoryType").value,
        isActive: this.zmstagencyvirtualdirectorymappingFrmGroup.get("isActive").value,
        agencyName: ""
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              
              this.loader.isLoading = true;
              this.zmstagencyvirtualdirectorymappingServices.insert(this.zmstagencyvirtualdirectorymappingModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.loader.isLoading = false;
                  this.getAll();
                  this.clear();
                  this.toastrService.success("Data Saved Successfully");
                }, error: (err: any) => {
                  this.loader.isLoading = false;
                  this.getAll();
                  this.clear();
                  this.toastrService.error("Already Exist");
                }
              })
            }
          }
        })
    }
  }

  getAllAgency() {
    this.zmstAgencyService.getAll().subscribe((data: any) => {
      this.agencyList = data;
    })
  }
  edit(data: any) {
    this.updatehdn = true;
    this.AgencyName = data.agencyName;
    this.zmstagencyvirtualdirectorymappingFrmGroup.controls['virtualDirectoryType'].disable()
    this.zmstagencyvirtualdirectorymappingFrmGroup.controls['agencyId'].disable()
    this.zmstagencyvirtualdirectorymappingFrmGroup.patchValue({
      agencyId: data.agencyId,
      baseDirectory: data.baseDirectory,
      virtualDirectory: data.virtualDirectory,
      virtualDirectoryType: data.virtualDirectoryType,
      isActive: data.isActive,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstagencyvirtualdirectorymappingFrmGroup.valid) {
      this.zmstagencyvirtualdirectorymappingModel = {
        agencyId: this.zmstagencyvirtualdirectorymappingFrmGroup.get("agencyId").value,
        baseDirectory: this.zmstagencyvirtualdirectorymappingFrmGroup.get("baseDirectory").value,
        virtualDirectory: this.zmstagencyvirtualdirectorymappingFrmGroup.get("virtualDirectory").value,
        virtualDirectoryType: this.zmstagencyvirtualdirectorymappingFrmGroup.get("virtualDirectoryType").value,
        isActive: this.zmstagencyvirtualdirectorymappingFrmGroup.get("isActive").value,
        agencyName: this.AgencyName

      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              
              this.zmstagencyvirtualdirectorymappingFrmGroup.controls['virtualDirectoryType'].enable()
              this.zmstagencyvirtualdirectorymappingFrmGroup.controls['agencyId'].enable()
              this.loader.isLoading = true;
              this.zmstagencyvirtualdirectorymappingServices.update(this.zmstagencyvirtualdirectorymappingModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.loader.isLoading = false;
                  this.getAll();
                  this.updatehdn = false;
                  this.clear();
                  this.zmstagencyvirtualdirectorymappingFrmGroup.controls['virtualDirectoryType'].enable()
                  this.zmstagencyvirtualdirectorymappingFrmGroup.controls['agencyId'].enable()
                  this.toastrService.success("Data Update Successfully");
                },
                error: (err: any) => {
                  this.loader.isLoading = false;
                  this.getAll();
                  this.updatehdn = false;
                  this.clear();
                  this.toastrService.error("Invalid Data");
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
            this.zmstagencyvirtualdirectorymappingServices.delete(id).subscribe((data: any) => {
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
    this.zmstagencyvirtualdirectorymappingServices.getAll().subscribe((data: any) => {
      this.zmstagencyvirtualdirectorymappingList = data;
      this.commonFunctionServices.bindDataTable('zmstagencyvirtualdirectorymappingGrid', 0)
      this.loaderTimeOut()
    })
  }

  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 1000);
  }
}
