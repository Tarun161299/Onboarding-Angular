
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstFeeTypeModel } from "src/app/shared/model/zmst-feetype.model";
import { ZmstFeeTypeService } from "src/app/shared/services/zmst-feetype.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;
@Component({
  selector: 'app-zmst-fee-type',
  templateUrl: './zmst-fee-type.component.html',
  styleUrls: ['./zmst-fee-type.component.css']
})
export class ZmstFeeTypeComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstfeetypeFrmGroup: FormGroup;
  zmstfeetypeModel: ZmstFeeTypeModel;
  zmstfeetypeList: ZmstFeeTypeModel[];


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstfeetypeServices: ZmstFeeTypeService, private toastrService: ToastrService) {
    this.zmstfeetypeFrmGroup = this.formBuilder.group({
      activityId: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstfeetypeGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstfeetypeFrmControl() {
    return this.zmstfeetypeFrmGroup.controls;
  }

  clear() {
    this.zmstfeetypeFrmGroup.reset();
    this.zmstfeetypeFrmGroup.controls['activityId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;

    if (this.zmstfeetypeFrmGroup.valid) {
      const zmstfeetypeModel = {
        activityId: this.zmstfeetypeFrmGroup.get("activityId").value,
        description: this.zmstfeetypeFrmGroup.get("description").value,

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
              this.zmstfeetypeServices.insert(zmstfeetypeModel).subscribe({
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
    this.zmstfeetypeFrmGroup.controls['activityId'].disable();
    this.zmstfeetypeFrmGroup.patchValue({
      activityId: data.activityId,
      description: data.description,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstfeetypeFrmGroup.valid) {
      const zmstfeetypeModel = {
        activityId: this.zmstfeetypeFrmGroup.get("activityId").value,
        description: this.zmstfeetypeFrmGroup.get("description").value,

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
              this.zmstfeetypeServices.update(zmstfeetypeModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstfeetypeFrmGroup.controls['activityId'].enable();
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
            this.zmstfeetypeServices.delete(id).subscribe((data: any) => {
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
    this.zmstfeetypeServices.getAll().subscribe((data: any) => {
      this.zmstfeetypeList = data;
      this.loader.isLoading = false;
    })
  }
}