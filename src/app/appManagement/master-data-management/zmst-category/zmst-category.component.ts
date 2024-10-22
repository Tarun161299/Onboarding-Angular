
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstCategoryModel } from "src/app/shared/model/zmst-category.model";
import { ZmstCategoryService } from "src/app/shared/services/zmst-category.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { CommonFunctionServices } from "src/app/shared/common/commonFunction.services";

declare const $: any;

@Component({
  selector: "app-zmst-category",
  templateUrl: "./zmst-category.component.html",
  styleUrls: ["./zmst-category.component.css"]
})
export class ZmstCategoryComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstcategoryFrmGroup: FormGroup;
  zmstcategoryModel: ZmstCategoryModel;
  zmstcategoryList: ZmstCategoryModel[];


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private commonFunctionServices: CommonFunctionServices, private zmstcategoryServices: ZmstCategoryService, private toastrService: ToastrService) {
    this.zmstcategoryFrmGroup = this.formBuilder.group({
      categoryId: ["", [Validators.required]],
      categoryName: ["", [Validators.required]],
      alternateNames: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstcategoryGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstcategoryFrmControl() {
    return this.zmstcategoryFrmGroup.controls;
  }
  reset() {
    this.clear()
  }
  clear() {
    this.zmstcategoryFrmGroup.reset();
    this.zmstcategoryFrmGroup.controls['categoryId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;

    if (this.zmstcategoryFrmGroup.valid) {
      const zmstcategoryModel = {
        categoryId: this.zmstcategoryFrmGroup.get("categoryId").value,
        categoryName: this.zmstcategoryFrmGroup.get("categoryName").value,
        alternateNames: this.zmstcategoryFrmGroup.get("alternateNames").value,

        /* AuditColumns If any */
        //created_by: "",
        //created_date: "2023-02-27T09:53:56.110Z",
        //modified_by: "",
        //modified_date: "2023-02-27T09:53:56.110Z"
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstcategoryServices.insert(zmstcategoryModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.loader.isLoading = false;
                  this.getAll();
                  this.clear();
                  this.toastrService.success("Data Saved Successfully");
                },
                error: (err: any) => {
                  const message = err.message;
                  this.loader.isLoading = false;
                  this.getAll();
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
    this.zmstcategoryFrmGroup.controls['categoryId'].disable();
    this.zmstcategoryFrmGroup.patchValue({
      categoryId: data.categoryId,
      categoryName: data.categoryName,
      alternateNames: data.alternateNames,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstcategoryFrmGroup.valid) {
      const zmstcategoryModel = {
        categoryId: this.zmstcategoryFrmGroup.get("categoryId").value,
        categoryName: this.zmstcategoryFrmGroup.get("categoryName").value,
        alternateNames: this.zmstcategoryFrmGroup.get("alternateNames").value,

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
              this.zmstcategoryServices.update(zmstcategoryModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstcategoryFrmGroup.controls['zmstcategoryGrid'].enable();
                this.commonFunctionServices.bindDataTable("exampleDD", 0);
                if (message != "Try Again") {
                  if (message > 0) {
                    this.toastrService.success("Update Successfully");
                  }
                }
                if (message == "Try Again") {
                  this.loader.isLoading=false;
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
            this.zmstcategoryServices.delete(id).subscribe((data: any) => {
              this.loader.isLoading = false;
              const message = data;
              this.toastrService.error(message);
              this.clear();
              this.getAll();
              this.zmstcategoryFrmGroup.controls['zmstcategoryGrid'].enable();
            })
          }
        }
      })
  }

  getAll() {
    this.zmstcategoryServices.getAll().subscribe((data: any) => {
      this.zmstcategoryList = data;
      this.loader.isLoading = false;
    })
  }
}