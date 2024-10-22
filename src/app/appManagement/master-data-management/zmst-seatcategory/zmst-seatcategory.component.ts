
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstSeatCategoryModel } from "src/app/shared/model/md-seatCategory.model";
import { ZmstSeatCategoryService } from "src/app/shared/services/zmst-seatcategory.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { CommonFunctionServices } from "src/app/shared/common/commonFunction.services";

declare const $: any;

@Component({
  selector: "app-zmst-seatcategory",
  templateUrl: "./zmst-seatcategory.component.html",
  styleUrls: ["./zmst-seatcategory.component.css"]
})
export class ZmstSeatCategoryComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstseatcategoryFrmGroup: FormGroup;
  zmstseatcategoryModel: ZmstSeatCategoryModel;
  zmstseatcategoryList: ZmstSeatCategoryModel[];


  constructor(private commonFunctionServices: CommonFunctionServices,private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstseatcategoryServices: ZmstSeatCategoryService, private toastrService: ToastrService) {
    this.zmstseatcategoryFrmGroup = this.formBuilder.group({
      seatCategoryId: ["", [Validators.required]],
      description: ["", [Validators.required]],
      alternateNames: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstseatcategoryGrid").DataTable({
      "order": []
    });
  }

  get zmstseatcategoryFrmControl() {
    return this.zmstseatcategoryFrmGroup.controls;
  }
  reset() {
    this.clear();
  }
  clear() {
    this.zmstseatcategoryFrmGroup.reset();
    this.zmstseatcategoryFrmGroup.controls['seatCategoryId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;

    if (this.zmstseatcategoryFrmGroup.valid) {
      const zmstseatcategoryModel = {
        seatCategoryId: this.zmstseatcategoryFrmGroup.get("seatCategoryId").value,
        description: this.zmstseatcategoryFrmGroup.get("description").value,
        alternateNames: this.zmstseatcategoryFrmGroup.get("alternateNames").value
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstseatcategoryServices.insert(zmstseatcategoryModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.getAll();
                  this.clear();
                  this.toastrService.success("Data Saved Successfully");

                },
                error: (err: any) => {
                  const message = err.message;
                  this.getAll();
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
    this.zmstseatcategoryFrmGroup.controls['seatCategoryId'].disable();
    this.zmstseatcategoryFrmGroup.patchValue({
      seatCategoryId: data.seatCategoryId,
      description: data.description,
      alternateNames: data.alternateNames
    },
    )
  }
  update() {
    this.submitted = true;
    if (this.zmstseatcategoryFrmGroup.valid) {
      const zmstseatcategoryModel = {
        seatCategoryId: this.zmstseatcategoryFrmGroup.get("seatCategoryId").value,
        description: this.zmstseatcategoryFrmGroup.get("description").value,
        alternateNames: this.zmstseatcategoryFrmGroup.get("alternateNames").value
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstseatcategoryServices.update(zmstseatcategoryModel).subscribe({next:(data: any) => {
                const message = data;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstseatcategoryFrmGroup.controls['seatCategoryId'].enable();
                if (message != "Try Again") {
                  if (message > 0) {
                    this.toastrService.success("Update Successfully");
                  }
                }
                if (message == "Try Again") {
                  this.toastrService.error("Error Occured");
                }
              },error:(err:any)=>{
                this.loader.isLoading=false;
                this.toastrService.error(err);
              }})
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
            this.zmstseatcategoryServices.delete(id).subscribe({next:(data: any) => {
              const message = data;
              this.toastrService.error(message);
              this.clear();
              this.getAll();
            },error:(err:any)=>{
              this.loader.isLoading=false;
              this.toastrService.error(err);
            }})
          }
        }
      })
  }

  getAll() {
    this.zmstseatcategoryServices.getAll().subscribe((data: any) => {
      this.zmstseatcategoryList = data;
      this.commonFunctionServices.bindDataTable("zmstseatcategoryGrid", 0);
      this.loaderTimeOut();
    })
  }

  loaderTimeOut(){
		setTimeout(() => {
			this.loader.isLoading=false;
		  }, 1000);
	}
}