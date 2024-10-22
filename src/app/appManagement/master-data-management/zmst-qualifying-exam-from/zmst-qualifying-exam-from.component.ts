import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstQualifyingExamFromModel } from "src/app/shared/model/zmst-qualifyingexamfrom.model";
import { ZmstQualifyingExamFromService } from "src/app/shared/services/zmst-qualifyingexamfrom.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { ErrorMessageService } from 'src/app/shared/common/errorMessageService';
import { CommonFunctionServices } from 'src/app/shared/common/commonFunction.services';

declare const $: any;

@Component({
  selector: 'app-zmst-qualifying-exam-from',
  templateUrl: './zmst-qualifying-exam-from.component.html',
  styleUrls: ['./zmst-qualifying-exam-from.component.css']
})

export class ZmstQualifyingExamFromComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstqualifyingexamfromFrmGroup: FormGroup;
  zmstqualifyingexamfromModel: ZmstQualifyingExamFromModel;
  zmstqualifyingexamfromList: ZmstQualifyingExamFromModel[];
  constructor(private commonFunctionServices: CommonFunctionServices, private formBuilder: FormBuilder, private loader: AfterLoginComponent, private errorMessage: ErrorMessageService, private confirmationDialogService: ConfirmationDialogService, private zmstqualifyingexamfromServices: ZmstQualifyingExamFromService, private toastrService: ToastrService) {
    this.zmstqualifyingexamfromFrmGroup = this.formBuilder.group({
      qualExamFromId: ["", [Validators.required]],
      qualExamFromName: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstqualifyingexamfromGrid").DataTable({
      "order": []
    });
  }

  get zmstqualifyingexamfromFrmControl() {
    return this.zmstqualifyingexamfromFrmGroup.controls;
  }
  reset() {
    this.clear()
  }

  clear() {
    this.zmstqualifyingexamfromFrmGroup.reset();
    this.submitted = false;
    this.updatehdn = false;
    this.zmstqualifyingexamfromFrmGroup.controls['qualExamFromId'].enable();
  }

  save() {
    this.submitted = true;
    if (this.zmstqualifyingexamfromFrmGroup.valid) {
      const zmstqualifyingexamfromModel = {
        qualExamFromId: this.zmstqualifyingexamfromFrmGroup.get("qualExamFromId").value,
        qualExamFromName: this.zmstqualifyingexamfromFrmGroup.get("qualExamFromName").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstqualifyingexamfromServices.insert(zmstqualifyingexamfromModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.loader.isLoading = false;
                  this.getAll();
                  this.clear();
                  this.toastrService.success("Data Saved Successfully");
                },
                error: (err: any) => {
                  let errorno = err.status;
                  this.loader.isLoading = false;
                  this.errorMessage.showError(errorno);
                }
              })
            }
          }
        })
    }
  }

  edit(data: any) {
    this.zmstqualifyingexamfromFrmGroup.controls['qualExamFromId'].disable();
    this.updatehdn = true;
    this.zmstqualifyingexamfromFrmGroup.patchValue({
      qualExamFromId: data.qualExamFromId,
      qualExamFromName: data.qualExamFromName,
    },
    )
  }
  update() {
    if (this.zmstqualifyingexamfromFrmGroup.valid) {
      const zmstqualifyingexamfromModel = {
        qualExamFromId: this.zmstqualifyingexamfromFrmGroup.get("qualExamFromId").value,
        qualExamFromName: this.zmstqualifyingexamfromFrmGroup.get("qualExamFromName").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstqualifyingexamfromServices.update(zmstqualifyingexamfromModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.submitted = false
                this.zmstqualifyingexamfromFrmGroup.controls['qualExamFromId'].enable();
                this.commonFunctionServices.bindDataTable("zmstqualifyingexamfromGrid", 0);
                if (message != "Try Again") {
                  if (message > 0) {
                    this.toastrService.success("Update Successfully");
                  }
                }
                if (message == "Try Again") {
                  this.loader.isLoading = false;
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
            this.zmstqualifyingexamfromServices.delete(id).subscribe(
              {
                next: (data: any) => {
                  this.loader.isLoading = false;
                  const message = data;
                  this.commonFunctionServices.bindDataTable("zmstqualifyingexamfromGrid", 0);
                  this.getAll();
                  this.toastrService.error(message);
                  this.clear();
                },
                error: (err: any) => {
                  let errorno = err.status;
                  this.loader.isLoading = false;
                  this.errorMessage.showError(errorno);
                }
              })
          }
        }
      })
  }

  getAll() {
    this.zmstqualifyingexamfromServices.getAll().subscribe((data: any) => {
      this.zmstqualifyingexamfromList = data;
      this.loader.isLoading = false;
    })
  }
}
