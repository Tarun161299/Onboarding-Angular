
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstMinimumQualificationModel } from "src/app/shared/model/zmst-minimumqualification.model";
import { ZmstMinimumQualificationService } from "src/app/shared/services/zmst-minimumqualification.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;

@Component({
  selector: 'app-zmst-minimum-qualification',
  templateUrl: './zmst-minimum-qualification.component.html',
  styleUrls: ['./zmst-minimum-qualification.component.css']
})
export class ZmstMinimumQualificationComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstminimumqualificationFrmGroup: FormGroup;
  zmstminimumqualificationModel: ZmstMinimumQualificationModel;
  zmstminimumqualificationList: ZmstMinimumQualificationModel[];


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstminimumqualificationServices: ZmstMinimumQualificationService, private toastrService: ToastrService) {
    this.zmstminimumqualificationFrmGroup = this.formBuilder.group({
      minimumQualId: ["", [Validators.required]],
      description: ["", [Validators.required]],
      alternateNames: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstminimumqualificationGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstminimumqualificationFrmControl() {
    return this.zmstminimumqualificationFrmGroup.controls;
  }
  reset() {
    this.clear()
  }
  clear() {
    this.zmstminimumqualificationFrmGroup.reset();
    this.zmstminimumqualificationFrmGroup.controls['minimumQualId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;

    if (this.zmstminimumqualificationFrmGroup.valid) {
      const zmstminimumqualificationModel = {
        minimumQualId: this.zmstminimumqualificationFrmGroup.get("minimumQualId").value,
        description: this.zmstminimumqualificationFrmGroup.get("description").value,
        alternateNames: this.zmstminimumqualificationFrmGroup.get("alternateNames").value,

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
              this.zmstminimumqualificationServices.insert(zmstminimumqualificationModel).subscribe({
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
    this.zmstminimumqualificationFrmGroup.controls['minimumQualId'].disable();
    this.zmstminimumqualificationFrmGroup.patchValue({
      minimumQualId: data.minimumQualId,
      description: data.description,
      alternateNames: data.alternateNames,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstminimumqualificationFrmGroup.valid) {
      const zmstminimumqualificationModel = {
        minimumQualId: this.zmstminimumqualificationFrmGroup.get("minimumQualId").value,
        description: this.zmstminimumqualificationFrmGroup.get("description").value,
        alternateNames: this.zmstminimumqualificationFrmGroup.get("alternateNames").value,

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
              this.zmstminimumqualificationServices.update(zmstminimumqualificationModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstminimumqualificationFrmGroup.controls['minimumQualId'].enable();
                if (message != "Try Again") {
                  if (message > 0) {
                    this.toastrService.success("Udate Successfully");
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
            this.zmstminimumqualificationServices.delete(id).subscribe((data: any) => {
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
    this.zmstminimumqualificationServices.getAll().subscribe((data: any) => {
      this.zmstminimumqualificationList = data;
      this.loader.isLoading = false;
    })
  }
}