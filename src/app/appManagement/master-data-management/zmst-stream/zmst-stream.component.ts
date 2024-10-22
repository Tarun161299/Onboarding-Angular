
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstStreamModel } from "src/app/shared/model/md-strem.model";
import { ZmstStreamService } from "src/app/shared/services/zmst-stream.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { CommonFunctionServices } from "src/app/shared/common/commonFunction.services";

declare const $: any;

@Component({
  selector: "app-zmst-stream",
  templateUrl: "./zmst-stream.component.html",
  styleUrls: ["./zmst-stream.component.css"]
})
export class ZmstStreamComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmststreamFrmGroup: FormGroup;
  zmststreamModel: ZmstStreamModel;
  zmststreamList: ZmstStreamModel[];


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private commonFunctionServices: CommonFunctionServices, private confirmationDialogService: ConfirmationDialogService, private zmststreamServices: ZmstStreamService, private toastrService: ToastrService) {
    this.zmststreamFrmGroup = this.formBuilder.group({
      streamId: ["", [Validators.required]],
      streamName: ["", [Validators.required]],
      alternateNames: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmststreamGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmststreamFrmControl() {
    return this.zmststreamFrmGroup.controls;
  }
  reset() {
    this.clear();
  }
  clear() {
    this.zmststreamFrmGroup.reset();
    this.zmststreamFrmGroup.controls['streamId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;

    if (this.zmststreamFrmGroup.valid) {
      const zmststreamModel = {
        streamId: this.zmststreamFrmGroup.get("streamId").value,
        streamName: this.zmststreamFrmGroup.get("streamName").value,
        alternateNames: this.zmststreamFrmGroup.get("alternateNames").value,

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
              this.zmststreamServices.insert(zmststreamModel).subscribe({
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
    this.zmststreamFrmGroup.controls['streamId'].disable();
    this.zmststreamFrmGroup.patchValue({
      streamId: data.streamId,
      streamName: data.streamName,
      alternateNames: data.alternateNames,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmststreamFrmGroup.valid) {
      const zmststreamModel = {
        streamId: this.zmststreamFrmGroup.get("streamId").value,
        streamName: this.zmststreamFrmGroup.get("streamName").value,
        alternateNames: this.zmststreamFrmGroup.get("alternateNames").value,

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
              this.zmststreamServices.update(zmststreamModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmststreamFrmGroup.controls['streamId'].enable();
                this.commonFunctionServices.bindDataTable("zmststreamGrid", 0);
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
            this.zmststreamServices.delete(id).subscribe((data: any) => {
              this.loader.isLoading = false;
              const message = data;
              this.toastrService.error(message);
              this.clear();
              this.getAll();
              this.commonFunctionServices.bindDataTable("zmststreamGrid", 0);
            })
          }
        }
      })
  }

  getAll() {
    this.zmststreamServices.getAll().subscribe((data: any) => {
      this.zmststreamList = data;
      this.loader.isLoading = false;
    })
  }
}