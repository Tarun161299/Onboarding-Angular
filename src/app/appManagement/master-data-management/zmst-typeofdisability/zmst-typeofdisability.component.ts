
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstTypeofDisabilityModel } from "src/app/shared/model/md-typeOfDisability.model";
import { ZmstTypeofDisabilityService } from "src/app/shared/services/zmst-typeofdisability.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;

@Component({
  selector: "app-zmst-typeofdisability",
  templateUrl: "./zmst-typeofdisability.component.html",
  styleUrls: ["./zmst-typeofdisability.component.css"]
})
export class ZmstTypeofDisabilityComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmsttypeofdisabilityFrmGroup: FormGroup;
  zmsttypeofdisabilityModel: ZmstTypeofDisabilityModel;
  zmsttypeofdisabilityList: ZmstTypeofDisabilityModel[];
  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmsttypeofdisabilityServices: ZmstTypeofDisabilityService, private toastrService: ToastrService) {
    this.zmsttypeofdisabilityFrmGroup = this.formBuilder.group({
      id: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmsttypeofdisabilityGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmsttypeofdisabilityFrmControl() {
    return this.zmsttypeofdisabilityFrmGroup.controls;
  }
  reset() {
    this.clear();
  }
  clear() {
    this.zmsttypeofdisabilityFrmGroup.reset();
    this.zmsttypeofdisabilityFrmGroup.controls['id'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;

    if (this.zmsttypeofdisabilityFrmGroup.valid) {
      const zmsttypeofdisabilityModel = {
        id: this.zmsttypeofdisabilityFrmGroup.get("id").value,
        description: this.zmsttypeofdisabilityFrmGroup.get("description").value,

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
              this.zmsttypeofdisabilityServices.insert(zmsttypeofdisabilityModel).subscribe({
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
    this.zmsttypeofdisabilityFrmGroup.controls['id'].disable();
    this.zmsttypeofdisabilityFrmGroup.patchValue({
      id: data.id,
      description: data.description,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmsttypeofdisabilityFrmGroup.valid) {
      const zmsttypeofdisabilityModel = {
        id: this.zmsttypeofdisabilityFrmGroup.get("id").value,
        description: this.zmsttypeofdisabilityFrmGroup.get("description").value,

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
              this.zmsttypeofdisabilityServices.update(zmsttypeofdisabilityModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmsttypeofdisabilityFrmGroup.controls['id'].enable();
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
            this.zmsttypeofdisabilityServices.delete(id).subscribe((data: any) => {
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
    this.zmsttypeofdisabilityServices.getAll().subscribe((data: any) => {
      this.zmsttypeofdisabilityList = data;
      this.loader.isLoading = false;
    })
  }
}