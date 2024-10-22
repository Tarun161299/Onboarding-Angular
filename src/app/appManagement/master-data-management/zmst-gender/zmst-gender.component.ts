
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstGenderModel } from "src/app/shared/model/zmst-gender.model";
import { ZmstGenderService } from "src/app/shared/services/zmst-gender.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;

@Component({
  selector: 'app-zmst-gender',
  templateUrl: './zmst-gender.component.html',
  styleUrls: ['./zmst-gender.component.css']
})
export class ZmstGenderComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstgenderFrmGroup: FormGroup;
  zmstgenderModel: ZmstGenderModel;
  zmstgenderList: ZmstGenderModel[];


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstgenderServices: ZmstGenderService, private toastrService: ToastrService) {
    this.zmstgenderFrmGroup = this.formBuilder.group({
      genderId: ["", [Validators.required]],
      genderName: ["", [Validators.required]],
      alternateNames: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstgenderGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstgenderFrmControl() {
    return this.zmstgenderFrmGroup.controls;
  }
  reset() {
    this.clear()
  }
  clear() {
    this.zmstgenderFrmGroup.reset();
    this.zmstgenderFrmGroup.controls['genderId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;
    if (this.zmstgenderFrmGroup.valid) {
      const zmstgenderModel = {
        genderId: this.zmstgenderFrmGroup.get("genderId").value,
        genderName: this.zmstgenderFrmGroup.get("genderName").value,
        alternateNames: this.zmstgenderFrmGroup.get("alternateNames").value,
 
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
              this.zmstgenderServices.insert(zmstgenderModel).subscribe({
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
    this.zmstgenderFrmGroup.controls['genderId'].disable();
    this.zmstgenderFrmGroup.patchValue({
      genderId: data.genderId,
      genderName: data.genderName,
      alternateNames: data.alternateNames,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstgenderFrmGroup.valid) {
      const zmstgenderModel = {
        genderId: this.zmstgenderFrmGroup.get("genderId").value,
        genderName: this.zmstgenderFrmGroup.get("genderName").value,
        alternateNames: this.zmstgenderFrmGroup.get("alternateNames").value,

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
              this.zmstgenderServices.update(zmstgenderModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstgenderFrmGroup.controls['genderId'].enable();
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
            this.zmstgenderServices.delete(id).subscribe((data: any) => {
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
    this.zmstgenderServices.getAll().subscribe((data: any) => {
      this.zmstgenderList = data;
      this.loader.isLoading = false;
    })
  }
}