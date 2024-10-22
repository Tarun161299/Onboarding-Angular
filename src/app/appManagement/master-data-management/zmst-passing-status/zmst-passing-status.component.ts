import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstPassingStatusModel } from "src/app/shared/model/zmst-passingstatus.model";
import { ZmstPassingStatusService } from "src/app/shared/services/zmst-passingstatus.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;
@Component({
  selector: 'app-zmst-passing-status',
  templateUrl: './zmst-passing-status.component.html',
  styleUrls: ['./zmst-passing-status.component.css']
})

export class ZmstPassingStatusComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstpassingstatusFrmGroup: FormGroup;
  zmstpassingstatusModel: ZmstPassingStatusModel;
  zmstpassingstatusList: ZmstPassingStatusModel[];


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstpassingstatusServices: ZmstPassingStatusService, private toastrService: ToastrService) {
    this.zmstpassingstatusFrmGroup = this.formBuilder.group({
      passingStatusId: ["", [Validators.required]],
      description: ["", [Validators.required]],
      alternateNames: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstpassingstatusGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstpassingstatusFrmControl() {
    return this.zmstpassingstatusFrmGroup.controls;
  }
  reset() {
    this.clear()
  }
  clear() {
    this.zmstpassingstatusFrmGroup.reset();
    this.zmstpassingstatusFrmGroup.controls['passingStatusId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;

    if (this.zmstpassingstatusFrmGroup.valid) {
      const zmstpassingstatusModel = {
        passingStatusId: this.zmstpassingstatusFrmGroup.get("passingStatusId").value,
        description: this.zmstpassingstatusFrmGroup.get("description").value,
        alternateNames: this.zmstpassingstatusFrmGroup.get("alternateNames").value,

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
              this.zmstpassingstatusServices.insert(zmstpassingstatusModel).subscribe({
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
    this.zmstpassingstatusFrmGroup.controls['passingStatusId'].disable();
    this.zmstpassingstatusFrmGroup.patchValue({
      passingStatusId: data.passingStatusId,
      description: data.description,
      alternateNames: data.alternateNames,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstpassingstatusFrmGroup.valid) {
      const zmstpassingstatusModel = {
        passingStatusId: this.zmstpassingstatusFrmGroup.get("passingStatusId").value,
        description: this.zmstpassingstatusFrmGroup.get("description").value,
        alternateNames: this.zmstpassingstatusFrmGroup.get("alternateNames").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstpassingstatusServices.update(zmstpassingstatusModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstpassingstatusFrmGroup.controls['passingStatusId'].enable();
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
            this.zmstpassingstatusServices.delete(id).subscribe((data: any) => {
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
    this.zmstpassingstatusServices.getAll().subscribe((data: any) => {
      this.zmstpassingstatusList = data;
      this.loader.isLoading = false;
    })
  }
}