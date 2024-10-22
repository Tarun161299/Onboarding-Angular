
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstSubCategoryPriorityModel } from "src/app/shared/model/md-subCategoryPriority.model";
import { ZmstSubCategoryPriorityService } from "src/app/shared/services/zmst-subcategorypriority.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { ErrorMessageService } from "src/app/shared/common/errorMessageService";
import { ZmstCategoryService } from "src/app/shared/services/zmst-category.service";
import { ZmstCategoryModel } from "src/app/shared/model/zmst-category.model";
import { CommonFunctionServices } from "src/app/shared/common/commonFunction.services";
import { ZmstSubCategoryService } from "src/app/shared/services/zmst-subcategory.service";
import { ZmstSubCategoryModel } from "src/app/shared/model/md-subCategory.model";

declare const $: any;

@Component({
  selector: "app-zmst-subcategorypriority",
  templateUrl: "./zmst-subcategorypriority.component.html",
  styleUrls: ["./zmst-subcategorypriority.component.css"]
})
export class ZmstSubCategoryPriorityComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstsubcategorypriorityFrmGroup: FormGroup;
  zmstsubcategorypriorityModel: ZmstSubCategoryPriorityModel;
  zmstsubcategorypriorityList: ZmstSubCategoryPriorityModel[];
  catList: ZmstSubCategoryModel[];
  zmstsubcategorypriorityListTemp:any[];
  subCategoryId:string;


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private commonFunctionServices: CommonFunctionServices, private errorMessage: ErrorMessageService, private confirmationDialogService: ConfirmationDialogService, private zmstsubcategorypriorityServices: ZmstSubCategoryPriorityService, private toastrService: ToastrService, private catServices: ZmstSubCategoryService) {
    this.zmstsubcategorypriorityFrmGroup = this.formBuilder.group({
      subCategoryPriorityId: ["", [Validators.required]],
      description: ["", [Validators.required]],
      subCategoryId: ["", [Validators.required]],
      alternateNames: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.getSubCateist();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstsubcategorypriorityGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstsubcategorypriorityFrmControl() {
    return this.zmstsubcategorypriorityFrmGroup.controls;
  }
  reset() {
    this.clear();
  }
  clear() {
    this.zmstsubcategorypriorityFrmGroup.reset();
    this.submitted = false;
    this.updatehdn = false;
    this.getSubCateist();
    this.zmstsubcategorypriorityFrmGroup.controls["subCategoryPriorityId"].enable();
    this.zmstsubcategorypriorityFrmGroup.controls["subCategoryId"].enable();
  }

  save() {
    this.submitted = true;
    if (this.zmstsubcategorypriorityFrmGroup.valid) {
      const zmstsubcategorypriorityModel = {
        subCategoryPriorityId: this.zmstsubcategorypriorityFrmGroup.get("subCategoryPriorityId").value,
        description: this.zmstsubcategorypriorityFrmGroup.get("description").value,
        subCategoryId: this.zmstsubcategorypriorityFrmGroup.get("subCategoryId").value,
        alternateNames: this.zmstsubcategorypriorityFrmGroup.get("alternateNames").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstsubcategorypriorityServices.insert(zmstsubcategorypriorityModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.loader.isLoading = false;
                  this.clear();
                  this.getAll();
                  this.getSubCateist();
                  this.toastrService.success("Data Saved Successfully");
                },
                error: (err: any) => {
                  let errorno = err.status;
                  this.loader.isLoading = false;
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
    this.zmstsubcategorypriorityFrmGroup.controls["subCategoryPriorityId"].disable();
    this.zmstsubcategorypriorityFrmGroup.controls["subCategoryId"].disable();
    this.zmstsubcategorypriorityFrmGroup.patchValue({
      subCategoryPriorityId: data.subCategoryPriorityId,
      description: data.description,
      subCategoryId: data.subCategoryId,
      alternateNames: data.alternateNames,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstsubcategorypriorityFrmGroup.valid) {
      const zmstsubcategorypriorityModel = {
        subCategoryPriorityId: this.zmstsubcategorypriorityFrmGroup.get("subCategoryPriorityId").value,
        description: this.zmstsubcategorypriorityFrmGroup.get("description").value,
        subCategoryId: this.zmstsubcategorypriorityFrmGroup.get("subCategoryId").value,
        alternateNames: this.zmstsubcategorypriorityFrmGroup.get("alternateNames").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstsubcategorypriorityServices.update(zmstsubcategorypriorityModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.commonFunctionServices.bindDataTable("zmstsubcategorypriorityGrid", 0);
                this.zmstsubcategorypriorityFrmGroup.controls["subCategoryPriorityId"].enable();
                this.zmstsubcategorypriorityFrmGroup.controls["subCategoryId"].enable();
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
            this.zmstsubcategorypriorityServices.delete(id).subscribe((data: any) => {
              this.loader.isLoading = false;
              const message = data;
              this.toastrService.error(message);
              this.clear();
              this.getAll();
              this.commonFunctionServices.bindDataTable("zmstsubcategorypriorityGrid", 0);
            })
          }
        }
      })
  }

  getAll() {
    this.zmstsubcategorypriorityServices.getAll().subscribe((data: any) => {
      this.zmstsubcategorypriorityListTemp=data;
      this.zmstsubcategorypriorityList = data;
      this.loader.isLoading = false;
    })
  }
  getSubCateist() {
    this.catServices.getAll().subscribe((data: any) => {
      this.catList = data;
    });
  }

  byqualCourse(event:any)
  {
    this.zmstsubcategorypriorityList = this.zmstsubcategorypriorityListTemp.filter(x => x.subCategoryId == (this.zmstsubcategorypriorityFrmGroup.get("subCategoryId").value == "" ? x.subCategoryId : this.zmstsubcategorypriorityFrmGroup.get("subCategoryId").value))
    this.commonFunctionServices.bindDataTable("zmstsubcategorypriorityGrid", 0);
    this.subCategoryId = event;
  }
}