import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstQualificationModel } from "src/app/shared/model/zmst-qualification.model";
import { ZmstQualificationService } from "src/app/shared/services/zmst-qualification.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;

@Component({
  selector: 'app-zmst-qualification',
  templateUrl: './zmst-qualification.component.html',
  styleUrls: ['./zmst-qualification.component.css']
})
export class ZmstQualificationComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstqualificationFrmGroup: FormGroup;
  zmstqualificationModel: ZmstQualificationModel;
  zmstqualificationList: ZmstQualificationModel[];


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstqualificationServices: ZmstQualificationService, private toastrService: ToastrService) {
    this.zmstqualificationFrmGroup = this.formBuilder.group({
      qualificationId: ["", [Validators.required]],
      description: ["", [Validators.required]],
      name: ["", [Validators.required]],
      alternateNames: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstqualificationGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstqualificationFrmControl() {
    return this.zmstqualificationFrmGroup.controls;
  }
  reset() {
    this.clear()
  }
  clear() {
    this.zmstqualificationFrmGroup.reset();
    this.zmstqualificationFrmGroup.controls['qualificationId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;

    if (this.zmstqualificationFrmGroup.valid) {
      const zmstqualificationModel = {
        qualificationId: this.zmstqualificationFrmGroup.get("qualificationId").value,
        description: this.zmstqualificationFrmGroup.get("description").value,
        name: this.zmstqualificationFrmGroup.get("name").value,
        alternateNames: this.zmstqualificationFrmGroup.get("alternateNames").value,

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
              this.zmstqualificationServices.insert(zmstqualificationModel).subscribe({
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
    this.zmstqualificationFrmGroup.controls['qualificationId'].disable();
    this.zmstqualificationFrmGroup.patchValue({
      qualificationId: data.qualificationId,
      description: data.description,
      name: data.name,
      alternateNames: data.alternateNames,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstqualificationFrmGroup.valid) {
      const zmstqualificationModel = {
        qualificationId: this.zmstqualificationFrmGroup.get("qualificationId").value,
        description: this.zmstqualificationFrmGroup.get("description").value,
        name: this.zmstqualificationFrmGroup.get("name").value,
        alternateNames: this.zmstqualificationFrmGroup.get("alternateNames").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstqualificationServices.update(zmstqualificationModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstqualificationFrmGroup.controls['qualificationId'].enable();
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
            this.zmstqualificationServices.delete(id).subscribe((data: any) => {
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
    this.zmstqualificationServices.getAll().subscribe((data: any) => {
      this.zmstqualificationList = data;
      this.loader.isLoading = false;
    })
  }
}