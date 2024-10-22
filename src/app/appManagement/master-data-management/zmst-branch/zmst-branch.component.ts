
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstBranchModel } from "src/app/shared/model/zmst-branch.model";
import { ZmstBranchService } from "src/app/shared/services/zmst-branch.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;

@Component({
  selector: "app-zmst-branch",
  templateUrl: "./zmst-branch.component.html",
  styleUrls: ["./zmst-branch.component.css"]
})
export class ZmstBranchComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstbranchFrmGroup: FormGroup;
  zmstbranchModel: ZmstBranchModel;
  zmstbranchList: ZmstBranchModel[];


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstbranchServices: ZmstBranchService, private toastrService: ToastrService) {
    this.zmstbranchFrmGroup = this.formBuilder.group({
      brCd: ["", [Validators.required]],
      brNm: ["", [Validators.required]],
      stream: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstbranchGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstbranchFrmControl() {
    return this.zmstbranchFrmGroup.controls;
  }
  reset() {
    this.clear()
  }
  clear() {
    this.zmstbranchFrmGroup.reset();
    for (let control in this.zmstbranchFrmGroup.controls) {
      this.zmstbranchFrmGroup.controls[control].setErrors(null);
    }

  }

  save() {
    this.submitted = true;

    if (this.zmstbranchFrmGroup.valid) {
      const zmstbranchModel = {
        brCd: this.zmstbranchFrmGroup.get("brCd").value,
        brNm: this.zmstbranchFrmGroup.get("brNm").value,
        stream: this.zmstbranchFrmGroup.get("stream").value,

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
              this.zmstbranchServices.insert(zmstbranchModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.clear();
                this.toastrService.success("Data Saved Successfully");
              })
            }
          }
        })
    }
  }

  edit(data: any) {
    this.updatehdn = true;
    this.zmstbranchFrmGroup.patchValue({
      brCd: data.brCd,
      brNm: data.brNm,
      stream: data.stream,
    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstbranchFrmGroup.valid) {
      const zmstbranchModel = {
        brCd: this.zmstbranchFrmGroup.get("brCd").value,
        brNm: this.zmstbranchFrmGroup.get("brNm").value,
        stream: this.zmstbranchFrmGroup.get("stream").value,

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
              this.zmstbranchServices.update(zmstbranchModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
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
            this.zmstbranchServices.delete(id).subscribe((data: any) => {
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
    this.zmstbranchServices.getAll().subscribe((data: any) => {
      this.zmstbranchList = data;
      this.loader.isLoading = false;
    })
  }
}