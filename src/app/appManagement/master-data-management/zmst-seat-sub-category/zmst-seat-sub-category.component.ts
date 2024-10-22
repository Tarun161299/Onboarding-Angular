
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstSeatSubCategoryModel } from "src/app/shared/model/zmst-seat-sub-category.model";
import { ZmstSeatSubCategoryService } from "src/app/shared/services/zmst-seat-sub-category.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;

@Component({
  selector: "app-zmst-seat-sub-category",
  templateUrl: "./zmst-seat-sub-category.component.html",
  styleUrls: ["./zmst-seat-sub-category.component.css"]
})
export class ZmstSeatSubCategoryComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstseatsubcategoryFrmGroup: FormGroup;
  zmstseatsubcategoryModel: ZmstSeatSubCategoryModel;
  zmstseatsubcategoryList: ZmstSeatSubCategoryModel[];

  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstseatsubcategoryServices: ZmstSeatSubCategoryService, private toastrService: ToastrService) {
    this.zmstseatsubcategoryFrmGroup = this.formBuilder.group({
      seatSubCategoryId: ["", [Validators.required, Validators.required]],
      description: ["", [Validators.required, Validators.required]],
      alternatenames: ["", [Validators.required, Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstseatsubcategoryGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstseatsubcategoryFrmControl() {
    return this.zmstseatsubcategoryFrmGroup.controls;
  }

  clear() {
    this.zmstseatsubcategoryFrmGroup.controls['seatSubCategoryId'].enable();
    this.zmstseatsubcategoryFrmGroup.reset();
    this.submitted = false;
    this.updatehdn=false;
  }

  save() {

    this.submitted = true;

    if (this.zmstseatsubcategoryFrmGroup.valid) {
      const zmstseatsubcategoryModel = {
        seatSubCategoryId: this.zmstseatsubcategoryFrmGroup.get("seatSubCategoryId").value,
        description: this.zmstseatsubcategoryFrmGroup.get("description").value,
        alternatenames: this.zmstseatsubcategoryFrmGroup.get("alternatenames").value,

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
              this.zmstseatsubcategoryServices.insert(zmstseatsubcategoryModel).subscribe({next:(data: any) => {
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
    this.zmstseatsubcategoryFrmGroup.controls['seatSubCategoryId'].disable();
    this.zmstseatsubcategoryFrmGroup.patchValue({
      seatSubCategoryId: data.seatSubCategoryId,
      description: data.description,
      alternatenames: data.alternatenames,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstseatsubcategoryFrmGroup.valid) {
      const zmstseatsubcategoryModel = {
        seatSubCategoryId: this.zmstseatsubcategoryFrmGroup.get("seatSubCategoryId").value,
        description: this.zmstseatsubcategoryFrmGroup.get("description").value,
        alternatenames: this.zmstseatsubcategoryFrmGroup.get("alternatenames").value,

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
              this.zmstseatsubcategoryServices.update(zmstseatsubcategoryModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.toastrService.success(message);
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
            this.zmstseatsubcategoryServices.delete(id).subscribe((data: any) => {
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
    this.zmstseatsubcategoryServices.getAll().subscribe((data: any) => {
      this.zmstseatsubcategoryList = data;
      this.loader.isLoading = false;
    })
  }
}