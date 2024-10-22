
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstSubCategoryModel } from "src/app/shared/model/md-subCategory.model";
import { ZmstSubCategoryService } from "src/app/shared/services/zmst-subcategory.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;

@Component({
  selector: "app-zmst-subcategory",
  templateUrl: "./zmst-subcategory.component.html",
  styleUrls: ["./zmst-subcategory.component.css"]
})
export class ZmstSubcategoryComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstsubcategoryFrmGroup: FormGroup;
  zmstsubcategoryModel: ZmstSubCategoryModel;
  zmstsubcategoryList: ZmstSubCategoryModel[];


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstsubcategoryServices: ZmstSubCategoryService, private toastrService: ToastrService) {
    this.zmstsubcategoryFrmGroup = this.formBuilder.group({
      subCategoryId: ["", [Validators.required]],
      subCategoryName: ["", [Validators.required]],
      alternateNames: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstsubcategoryGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstsubcategoryFrmControl() {
    return this.zmstsubcategoryFrmGroup.controls;
  }
  reset() {
    this.clear();
  }
  clear() {
    this.zmstsubcategoryFrmGroup.reset();
    this.zmstsubcategoryFrmGroup.controls['subCategoryId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;
    if (this.zmstsubcategoryFrmGroup.valid) {
      const zmstsubcategoryModel = {
        subCategoryId: this.zmstsubcategoryFrmGroup.get("subCategoryId").value,
        subCategoryName: this.zmstsubcategoryFrmGroup.get("subCategoryName").value,
        alternateNames: this.zmstsubcategoryFrmGroup.get("alternateNames").value,

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
              this.zmstsubcategoryServices.insert(zmstsubcategoryModel).subscribe({
                next:(data: any) =>{
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
    this.zmstsubcategoryFrmGroup.controls['subCategoryId'].disable();
    this.zmstsubcategoryFrmGroup.patchValue({
      subCategoryId: data.subCategoryId,
      subCategoryName: data.subCategoryName,
      alternateNames: data.alternateNames,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstsubcategoryFrmGroup.valid) {
      const zmstsubcategoryModel = {
        subCategoryId: this.zmstsubcategoryFrmGroup.get("subCategoryId").value,
        subCategoryName: this.zmstsubcategoryFrmGroup.get("subCategoryName").value,
        alternateNames: this.zmstsubcategoryFrmGroup.get("alternateNames").value,

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
              this.zmstsubcategoryServices.update(zmstsubcategoryModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstsubcategoryFrmGroup.controls['subCategoryId'].enable();
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
            this.zmstsubcategoryServices.delete(id).subscribe((data: any) => {
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
    this.zmstsubcategoryServices.getAll().subscribe((data: any) => {
      this.zmstsubcategoryList = data;
      this.loader.isLoading = false;
    })
  }
}