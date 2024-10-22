
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstSeatTypeModel } from "src/app/shared/model/zmst-seat-type.model";
import { ZmstSeatTypeService } from "src/app/shared/services/zmst-seat-type.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;

@Component({
  selector: "app-zmst-seat-type",
  templateUrl: "./zmst-seat-type.component.html",
  styleUrls: ["./zmst-seat-type.component.css"]
})
export class ZmstSeatTypeComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstseattypeFrmGroup: FormGroup;
  zmstseattypeModel: ZmstSeatTypeModel;
  zmstseattypeList: ZmstSeatTypeModel[];

  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstseattypeServices: ZmstSeatTypeService, private toastrService: ToastrService) {
    this.zmstseattypeFrmGroup = this.formBuilder.group({
      id: ["", [Validators.required, Validators.required]],
      description: ["", [Validators.required, Validators.required]],
      alternateNames: ["", [Validators.required, Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstseattypeGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstseattypeFrmControl() {
    return this.zmstseattypeFrmGroup.controls;
  }

  clear() {
    
    this.zmstseattypeFrmGroup.controls['id'].enable();
    this.zmstseattypeFrmGroup.reset();
    this.submitted = false;
    this.updatehdn=false;
  }

  save() {

    this.submitted = true;

    if (this.zmstseattypeFrmGroup.valid) {
      const zmstseattypeModel = {
        id: this.zmstseattypeFrmGroup.get("id").value,
        description: this.zmstseattypeFrmGroup.get("description").value,
        alternateNames: this.zmstseattypeFrmGroup.get("alternateNames").value,

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
              this.zmstseattypeServices.insert(zmstseattypeModel).subscribe({next:(data: any) => {
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
    this.zmstseattypeFrmGroup.controls['id'].disable();
    this.zmstseattypeFrmGroup.patchValue({
      id: data.id,
      description: data.description,
      alternateNames: data.alternateNames,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstseattypeFrmGroup.valid) {
      const zmstseattypeModel = {
        id: this.zmstseattypeFrmGroup.get("id").value,
        description: this.zmstseattypeFrmGroup.get("description").value,
        alternateNames: this.zmstseattypeFrmGroup.get("alternateNames").value,

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
              this.zmstseattypeServices.update(zmstseattypeModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.toastrService.success(message);
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
            this.zmstseattypeServices.delete(id).subscribe((data: any) => {
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
    this.zmstseattypeServices.getAll().subscribe((data: any) => {
      this.zmstseattypeList = data;
      this.loader.isLoading = false;
    })
  }
}