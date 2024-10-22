
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstResidentialEligibility } from "src/app/shared/model/md-residentialEligibilty.model";
import { ZmstResidentialEligibilityService } from "src/app/shared/services/zmst-residentialeligibility.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;

@Component({
  selector: "app-zmst-residentialeligibility",
  templateUrl: "./zmst-residentialeligibility.component.html",
  styleUrls: ["./zmst-residentialeligibility.component.css"]
})
export class ZmstResidentialEligibilityComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstresidentialeligibilityFrmGroup: FormGroup;
  zmstresidentialeligibilityModel: ZmstResidentialEligibility;
  zmstresidentialeligibilityList: ZmstResidentialEligibility[] = [];


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstresidentialeligibilityServices: ZmstResidentialEligibilityService, private toastrService: ToastrService) {
    this.zmstresidentialeligibilityFrmGroup = this.formBuilder.group({
      residentialEligibilityId: ["", [Validators.required]],
      residentialEligibilityName: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstresidentialeligibilityGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstresidentialeligibilityFrmControl() {
    return this.zmstresidentialeligibilityFrmGroup.controls;
  }
  reset() {
    this.clear();
  }
  clear() {
    this.zmstresidentialeligibilityFrmGroup.reset();
    this.zmstresidentialeligibilityFrmGroup.controls['residentialEligibilityId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;

    if (this.zmstresidentialeligibilityFrmGroup.valid) {
      const zmstresidentialeligibilityModel = {
        residentialEligibilityId: this.zmstresidentialeligibilityFrmGroup.get("residentialEligibilityId").value,
        residentialEligibilityName: this.zmstresidentialeligibilityFrmGroup.get("residentialEligibilityName").value,

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
              this.zmstresidentialeligibilityServices.insert(zmstresidentialeligibilityModel).subscribe({
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
    this.zmstresidentialeligibilityFrmGroup.controls['residentialEligibilityId'].disable();
    this.zmstresidentialeligibilityFrmGroup.patchValue({
      residentialEligibilityId: data.residentialEligibilityId,
      residentialEligibilityName: data.residentialEligibilityName,
    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstresidentialeligibilityFrmGroup.valid) {
      const zmstresidentialeligibilityModel = {
        residentialEligibilityId: this.zmstresidentialeligibilityFrmGroup.get("residentialEligibilityId").value,
        residentialEligibilityName: this.zmstresidentialeligibilityFrmGroup.get("residentialEligibilityName").value,

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
              this.zmstresidentialeligibilityServices.update(zmstresidentialeligibilityModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstresidentialeligibilityFrmGroup.controls['residentialEligibilityId'].enable();
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
            this.zmstresidentialeligibilityServices.delete(id).subscribe((data: any) => {
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
    this.zmstresidentialeligibilityServices.getAll().subscribe((data: any) => {
      this.zmstresidentialeligibilityList = data;
      this.loader.isLoading = false;
    })
  }
}