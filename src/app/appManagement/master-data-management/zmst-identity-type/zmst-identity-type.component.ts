
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstIdentityTypeModel } from "src/app/shared/model/zmst-identitytype.model";
import { ZmstIdentityTypeService } from "src/app/shared/services/zmst-identitytype.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;
@Component({
  selector: 'app-zmst-identity-type',
  templateUrl: './zmst-identity-type.component.html',
  styleUrls: ['./zmst-identity-type.component.css']
})

export class ZmstIdentityTypeComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstidentitytypeFrmGroup: FormGroup;
  zmstidentitytypeModel: ZmstIdentityTypeModel;
  zmstidentitytypeList: ZmstIdentityTypeModel[];


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstidentitytypeServices: ZmstIdentityTypeService, private toastrService: ToastrService) {
    this.zmstidentitytypeFrmGroup = this.formBuilder.group({
      identityTypeId: ["", [Validators.required]],
      description: ["", [Validators.required]],
      alternateNames: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstidentitytypeGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstidentitytypeFrmControl() {
    return this.zmstidentitytypeFrmGroup.controls;
  }
  reset() {
    this.clear()
  }
  clear() {
    this.zmstidentitytypeFrmGroup.reset();
    this.zmstidentitytypeFrmGroup.controls['identityTypeId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;

    if (this.zmstidentitytypeFrmGroup.valid) {
      const zmstidentitytypeModel = {
        identityTypeId: this.zmstidentitytypeFrmGroup.get("identityTypeId").value,
        description: this.zmstidentitytypeFrmGroup.get("description").value,
        alternateNames: this.zmstidentitytypeFrmGroup.get("alternateNames").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstidentitytypeServices.insert(zmstidentitytypeModel).subscribe({
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
    this.zmstidentitytypeFrmGroup.controls['identityTypeId'].disable();
    this.zmstidentitytypeFrmGroup.patchValue({
      identityTypeId: data.identityTypeId,
      description: data.description,
      alternateNames: data.alternateNames,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstidentitytypeFrmGroup.valid) {
      const zmstidentitytypeModel = {
        identityTypeId: this.zmstidentitytypeFrmGroup.get("identityTypeId").value,
        description: this.zmstidentitytypeFrmGroup.get("description").value,
        alternateNames: this.zmstidentitytypeFrmGroup.get("alternateNames").value,

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
              this.zmstidentitytypeServices.update(zmstidentitytypeModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstidentitytypeFrmGroup.controls['identityTypeId'].enable();
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
            this.zmstidentitytypeServices.delete(id).subscribe((data: any) => {
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
    this.zmstidentitytypeServices.getAll().subscribe((data: any) => {
      this.zmstidentitytypeList = data;
      this.loader.isLoading = false;
    })
  }
}