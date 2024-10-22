
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstActivityModel } from "src/app/shared/model/zmst-activity.model";
import { ZmstActivityService } from "src/app/shared/services/zmst-activity.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { ErrorMessageService } from "src/app/shared/common/errorMessageService";

declare const $: any;

@Component({
  selector: "app-zmst-activity",
  templateUrl: "./zmst-activity.component.html",
  styleUrls: ["./zmst-activity.component.css"]
})
export class ZmstActivityComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstactivityFrmGroup: FormGroup;
  zmstactivityModel: ZmstActivityModel;
  zmstactivityList: ZmstActivityModel[];
  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private errorMessage: ErrorMessageService, private confirmationDialogService: ConfirmationDialogService, private zmstactivityServices: ZmstActivityService, private toastrService: ToastrService) {
    this.zmstactivityFrmGroup = this.formBuilder.group({
      activityId: ["", [Validators.required]],
      activityName: ["", [Validators.required]],
      displayPriority: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstactivityGrid").DataTable({
      "order": []
    });
  }

  get zmstactivityFrmControl() {
    return this.zmstactivityFrmGroup.controls;
  }
  clear() {
    this.zmstactivityFrmGroup.reset();
    this.submitted = false;
    this.updatehdn = false;
    this.zmstactivityFrmGroup.controls['activityId'].enable();
  }
  save() {
    this.submitted = true;
    if (this.zmstactivityFrmGroup.valid) {
      const zmstactivityModel = {
        activityId: this.zmstactivityFrmGroup.get("activityId").value,
        activityName: this.zmstactivityFrmGroup.get("activityName").value,
        displayPriority: this.zmstactivityFrmGroup.get("displayPriority").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstactivityServices.insert(zmstactivityModel).subscribe({
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
                  //this.toastrService.error("This Record already exists");
                }
              })
            }
          }
        })
    }
  }
  edit(data: any) {
    this.updatehdn = true;
    this.zmstactivityFrmGroup.controls['activityId'].disable();
    this.zmstactivityFrmGroup.patchValue({
      activityId: data.activityId,
      activityName: data.activityName,
      displayPriority: data.displayPriority,
    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstactivityFrmGroup.valid) {
      const zmstactivityModel = {
        activityId: this.zmstactivityFrmGroup.get("activityId").value,
        activityName: this.zmstactivityFrmGroup.get("activityName").value,
        displayPriority: this.zmstactivityFrmGroup.get("displayPriority").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstactivityServices.update(zmstactivityModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstactivityFrmGroup.controls['activityId'].enable();
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
            this.zmstactivityServices.delete(id).subscribe((data: any) => {
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
    this.zmstactivityServices.getAll().subscribe((data: any) => {
      this.zmstactivityList = data;
      this.loader.isLoading = false;
    })
  }
}