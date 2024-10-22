
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstExamTypeModel } from "src/app/shared/model/zmst-exam-type.model";
import { ZmstExamTypeService } from "src/app/shared/services/zmst-exam-type.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { CommonFunctionServices } from "src/app/shared/common/commonFunction.services";

declare const $: any;

@Component({
  selector: "app-zmst-examtype",
  templateUrl: "./zmst-exam-type.component.html",
  styleUrls: ["./zmst-exam-type.component.css"]
})
export class ZmstExamTypeComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstexamtypeFrmGroup: FormGroup;
  zmstexamtypeModel: ZmstExamTypeModel;
  zmstexamtypeList: ZmstExamTypeModel[];


  constructor(private commonFunctionServices: CommonFunctionServices, private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstexamtypeServices: ZmstExamTypeService, private toastrService: ToastrService) {
    this.zmstexamtypeFrmGroup = this.formBuilder.group({
      id: ["", [Validators.required, Validators.maxLength(2), Validators.minLength(1), Validators.pattern('^([0-9][0-9]*)|([0]+)$')]],
      description: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstexamtypeGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstexamtypeFrmControl() {
    return this.zmstexamtypeFrmGroup.controls;
  }
  reset() {
    this.clear();

  }
  clear() {
    this.zmstexamtypeFrmGroup.reset();
    this.submitted = false;
    this.updatehdn = false;
    this.zmstexamtypeFrmGroup.controls['id'].enable();
  }

  save() {
    this.submitted = true;

    if (this.zmstexamtypeFrmGroup.valid) {
      const zmstexamtypeModel = {
        id: this.zmstexamtypeFrmGroup.get("id").value,
        description: this.zmstexamtypeFrmGroup.get("description").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstexamtypeServices.insert(zmstexamtypeModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.loader.isLoading = true;
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
    this.zmstexamtypeFrmGroup.controls['id'].disable();
    this.zmstexamtypeFrmGroup.patchValue({
      id: data.id,
      description: data.description
    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstexamtypeFrmGroup.valid) {
      const zmstexamtypeModel = {
        id: this.zmstexamtypeFrmGroup.get("id").value,
        description: this.zmstexamtypeFrmGroup.get("description").value,

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
              this.zmstexamtypeServices.update(zmstexamtypeModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = true;
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
            this.zmstexamtypeServices.delete(id).subscribe((data: any) => {
              this.loader.isLoading = false;
              const message = data;
              this.toastrService.error(message);
              this.getAll();
              this.clear();
            })
          }
        }
      })
  }

  getAll() {
    this.zmstexamtypeServices.getAll().subscribe((data: any) => {
      this.zmstexamtypeList = data;
      this.commonFunctionServices.bindDataTable("zmstexamtypeGrid", 0);
      this.loader.isLoading = false;
    })
  }
}