
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstExperienceTypeModel } from "src/app/shared/model/zmst-experience-type.model";
import { ZmstExperienceTypeService } from "src/app/shared/services/zmst-experience-type.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;

@Component({
  selector: "app-zmst-experience-type",
  templateUrl: "./zmst-experience-type.component.html",
  styleUrls: ["./zmst-experience-type.component.css"]
})
export class ZmstExperienceTypeComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstexperiencetypeFrmGroup: FormGroup;
  zmstexperiencetypeModel: ZmstExperienceTypeModel;
  zmstexperiencetypeList: ZmstExperienceTypeModel[];

  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstexperiencetypeServices: ZmstExperienceTypeService, private toastrService: ToastrService) {
    this.zmstexperiencetypeFrmGroup = this.formBuilder.group({
      id: ["", [Validators.required, Validators.required]],
      experienceType: ["", [Validators.required, Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstexperiencetypeGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstexperiencetypeFrmControl() {
    return this.zmstexperiencetypeFrmGroup.controls;
  }

  clear() {
    this.zmstexperiencetypeFrmGroup.controls['id'].enable();
    this.zmstexperiencetypeFrmGroup.reset();
    this.submitted = false;
    this.updatehdn=false;
  }

  save() {

    this.submitted = true;

    if (this.zmstexperiencetypeFrmGroup.valid) {
      const zmstexperiencetypeModel = {
        id: this.zmstexperiencetypeFrmGroup.get("id").value,
        experienceType: this.zmstexperiencetypeFrmGroup.get("experienceType").value,

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
              this.zmstexperiencetypeServices.insert(zmstexperiencetypeModel).subscribe({next:(data: any) => {
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
    this.zmstexperiencetypeFrmGroup.controls['id'].disable();
    this.zmstexperiencetypeFrmGroup.patchValue({
      id: data.id,
      experienceType: data.experienceType,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstexperiencetypeFrmGroup.valid) {
      const zmstexperiencetypeModel = {
        id: this.zmstexperiencetypeFrmGroup.get("id").value,
        experienceType: this.zmstexperiencetypeFrmGroup.get("experienceType").value,

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
              this.zmstexperiencetypeServices.update(zmstexperiencetypeModel).subscribe((data: any) => {
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
            this.zmstexperiencetypeServices.delete(id).subscribe((data: any) => {
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
    this.zmstexperiencetypeServices.getAll().subscribe((data: any) => {
      this.zmstexperiencetypeList = data;
      this.loader.isLoading = false;
    })
  }
}