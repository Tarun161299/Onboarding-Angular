
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstApplicantTypeModel } from "src/app/shared/model/zmst-applicant-type.model";
import { ZmstApplicantTypeService } from "src/app/shared/services/zmst-applicant-type.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { ErrorMessageService } from "src/app/shared/common/errorMessageService";

declare const $: any;

@Component({
  selector: "app-zmst-applicanttype",
  templateUrl: "./zmst-applicant-type.component.html",
  styleUrls: ["./zmst-applicant-type.component.css"]
})
export class ZmstApplicantTypeComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstapplicanttypeFrmGroup: FormGroup;
  zmstapplicanttypeList: ZmstApplicantTypeModel[] = [];
  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private errorMessage: ErrorMessageService, private zmstapplicanttypeServices: ZmstApplicantTypeService, private toastrService: ToastrService) {
    this.zmstapplicanttypeFrmGroup = this.formBuilder.group({
      iD: ["", [Validators.required]],
      typeName: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstapplicanttypeGrid").DataTable({
      "order": []
    });
  }

  get zmstapplicanttypeFrmControl() {
    return this.zmstapplicanttypeFrmGroup.controls;
  }

  clear() {
    this.zmstapplicanttypeFrmGroup.reset();
    this.submitted = false;
    this.updatehdn = false;
    this.zmstapplicanttypeFrmGroup.controls['iD'].enable();
  }
  save() {
    this.submitted = true;
    if (this.zmstapplicanttypeFrmGroup.valid) {
      const zmstapplicanttypeModel = {
        iD: this.zmstapplicanttypeFrmGroup.get("iD").value,
        typeName: this.zmstapplicanttypeFrmGroup.get("typeName").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstapplicanttypeServices.insert(zmstapplicanttypeModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.loader.isLoading = false;
                  this.getAll();
                  this.clear();
                  this.toastrService.success("Data Saved Successfully");
                },
                error: (err: any) => {
                  let errorno = err.status;
                  this.loader.isLoading = false;
                  this.errorMessage.showError(errorno);
                }
              })
            }
          }
        })
    }
  }
  edit(data: any) {
    this.updatehdn = true;
    this.zmstapplicanttypeFrmGroup.controls['iD'].disable();
    this.zmstapplicanttypeFrmGroup.patchValue({
      iD: data.id,
      typeName: data.typeName,
    },
    )
  }
  update() {
    this.submitted = true;
    if (this.zmstapplicanttypeFrmGroup.valid) {
      const zmstapplicanttypeModel = {
        iD: this.zmstapplicanttypeFrmGroup.get("iD").value,
        typeName: this.zmstapplicanttypeFrmGroup.get("typeName").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstapplicanttypeServices.update(zmstapplicanttypeModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstapplicanttypeFrmGroup.controls['iD'].enable();
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
            this.zmstapplicanttypeServices.delete(id).subscribe((data: any) => {
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
    this.zmstapplicanttypeServices.getAll().subscribe((data: any) => {
      this.zmstapplicanttypeList = data;
      this.loader.isLoading = false;
    })
  }
}