import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstQualifyingExamModel } from "src/app/shared/model/zmst-qualifyingexam.model";
import { ZmstQualifyingExamService } from "src/app/shared/services/zmst-qualifyingexam.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { CommonFunctionServices } from 'src/app/shared/common/commonFunction.services';

declare const $: any;
@Component({
  selector: 'app-zmst-qualifying-exam',
  templateUrl: './zmst-qualifying-exam.component.html',
  styleUrls: ['./zmst-qualifying-exam.component.css']
})

export class ZmstQualifyingExamComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstqualifyingexamFrmGroup: FormGroup;
  zmstqualifyingexamModel: ZmstQualifyingExamModel;
  zmstqualifyingexamList: ZmstQualifyingExamModel[];


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent,private commonFunctionServices: CommonFunctionServices, private confirmationDialogService: ConfirmationDialogService, private zmstqualifyingexamServices: ZmstQualifyingExamService, private toastrService: ToastrService) {
    this.zmstqualifyingexamFrmGroup = this.formBuilder.group({
      qualifyingExamId: ["", [Validators.required]],
      qualifyingExamName: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstqualifyingexamGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstqualifyingexamFrmControl() {
    return this.zmstqualifyingexamFrmGroup.controls;
  }
  reset() {
    this.clear()
  }
  clear() {
    this.zmstqualifyingexamFrmGroup.reset();
    this.zmstqualifyingexamFrmGroup.controls['qualifyingExamId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;

    if (this.zmstqualifyingexamFrmGroup.valid) {
      const zmstqualifyingexamModel = {
        qualifyingExamId: this.zmstqualifyingexamFrmGroup.get("qualifyingExamId").value,
        qualifyingExamName: this.zmstqualifyingexamFrmGroup.get("qualifyingExamName").value,

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
              this.zmstqualifyingexamServices.insert(zmstqualifyingexamModel).subscribe({
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
    this.zmstqualifyingexamFrmGroup.controls['qualifyingExamId'].disable();
    this.zmstqualifyingexamFrmGroup.patchValue({
      qualifyingExamId: data.qualifyingExamId,
      qualifyingExamName: data.qualifyingExamName,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstqualifyingexamFrmGroup.valid) {
      const zmstqualifyingexamModel = {
        qualifyingExamId: this.zmstqualifyingexamFrmGroup.get("qualifyingExamId").value,
        qualifyingExamName: this.zmstqualifyingexamFrmGroup.get("qualifyingExamName").value,

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
              this.zmstqualifyingexamServices.update(zmstqualifyingexamModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstqualifyingexamFrmGroup.controls['qualifyingExamId'].enable();
                this.commonFunctionServices.bindDataTable("zmstqualifyingexamGrid",0);
                if (message != "Try Again") {
                  if (message > 0) {
                    this.toastrService.success("Update Successfully");
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
            this.zmstqualifyingexamServices.delete(id).subscribe((data: any) => {
              this.loader.isLoading = false;
              const message = data;
              this.toastrService.error(message);
              this.clear();
              this.getAll();
              this.commonFunctionServices.bindDataTable("zmstqualifyingexamGrid",0);
            })
          }
        }
      })
  }

  getAll() {
    this.zmstqualifyingexamServices.getAll().subscribe((data: any) => {
      this.zmstqualifyingexamList = data;
      this.loader.isLoading = false;
    })
  }
}