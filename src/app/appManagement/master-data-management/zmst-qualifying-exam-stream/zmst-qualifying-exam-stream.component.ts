import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstQualifyingExamStreamModel } from "src/app/shared/model/zmst-qualifyingexamstream.model";
import { ZmstQualifyingExamStreamService } from "src/app/shared/services/zmst-qualifyingexamstream.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { CommonFunctionServices } from 'src/app/shared/common/commonFunction.services';

declare const $: any;
@Component({
  selector: 'app-zmst-qualifying-exam-stream',
  templateUrl: './zmst-qualifying-exam-stream.component.html',
  styleUrls: ['./zmst-qualifying-exam-stream.component.css']
})

export class ZmstQualifyingExamStreamComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstqualifyingexamstreamFrmGroup: FormGroup;
  zmstqualifyingexamstreamModel: ZmstQualifyingExamStreamModel;
  zmstqualifyingexamstreamList: ZmstQualifyingExamStreamModel[];
  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent,private commonFunctionServices: CommonFunctionServices, private confirmationDialogService: ConfirmationDialogService, private zmstqualifyingexamstreamServices: ZmstQualifyingExamStreamService, private toastrService: ToastrService) {
    this.zmstqualifyingexamstreamFrmGroup = this.formBuilder.group({
      qualStreamId: ["", [Validators.required]],
      qualStreamName: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstqualifyingexamstreamGrid").DataTable({
      "order": []
    });
  }

  get zmstqualifyingexamstreamFrmControl() {
    return this.zmstqualifyingexamstreamFrmGroup.controls;
  }
  reset() {
    this.clear()
  }
  clear() {
    this.zmstqualifyingexamstreamFrmGroup.reset();
    this.submitted = false;
    this.updatehdn = false;
    this.zmstqualifyingexamstreamFrmGroup.controls['qualStreamId'].enable();
  }

  save() {
    this.submitted = true;
    if (this.zmstqualifyingexamstreamFrmGroup.valid) {
      const zmstqualifyingexamstreamModel = {
        qualStreamId: this.zmstqualifyingexamstreamFrmGroup.get("qualStreamId").value,
        qualStreamName: this.zmstqualifyingexamstreamFrmGroup.get("qualStreamName").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstqualifyingexamstreamServices.insert(zmstqualifyingexamstreamModel).subscribe({
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
    this.zmstqualifyingexamstreamFrmGroup.controls['qualStreamId'].disable();
    this.zmstqualifyingexamstreamFrmGroup.patchValue({
      qualStreamId: data.qualStreamId,
      qualStreamName: data.qualStreamName,
    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstqualifyingexamstreamFrmGroup.valid) {
      const zmstqualifyingexamstreamModel = {
        qualStreamId: this.zmstqualifyingexamstreamFrmGroup.get("qualStreamId").value,
        qualStreamName: this.zmstqualifyingexamstreamFrmGroup.get("qualStreamName").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstqualifyingexamstreamServices.update(zmstqualifyingexamstreamModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.commonFunctionServices.bindDataTable("zmstqualifyingexamstreamGrid",0);
                if (message != "Try Again") {
                  if (message > 0) {
                    this.toastrService.success("Update Successfully");
                  }
                }
                if (message == "Try Again") {
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
            this.zmstqualifyingexamstreamServices.delete(id).subscribe((data: any) => {
              this.loader.isLoading = false;
              const message = data;
              this.toastrService.error(message);
              this.clear();
              this.commonFunctionServices.bindDataTable("zmstqualifyingexamstreamGrid",0);
              this.getAll();
            })
          }
        }
      })
  }

  getAll() {
    this.zmstqualifyingexamstreamServices.getAll().subscribe((data: any) => {
      this.zmstqualifyingexamstreamList = data;
      this.loader.isLoading = false;
    })
  }
}
