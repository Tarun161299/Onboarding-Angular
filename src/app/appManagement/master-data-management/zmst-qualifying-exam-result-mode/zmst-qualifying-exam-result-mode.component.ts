import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstQualifyingExamResultModeModel } from "src/app/shared/model/zmst-qualifyingexamresultmode.model";
import { ZmstQualifyingExamResultModeService } from "src/app/shared/services/zmst-qualifyingexamresultmode.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;
@Component({
  selector: 'app-zmst-qualifying-exam-result-mode',
  templateUrl: './zmst-qualifying-exam-result-mode.component.html',
  styleUrls: ['./zmst-qualifying-exam-result-mode.component.css']
})

export class ZmstQualifyingExamResultModeComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstqualifyingexamresultmodeFrmGroup: FormGroup;
  zmstqualifyingexamresultmodeModel: ZmstQualifyingExamResultModeModel;
  zmstqualifyingexamresultmodeList: ZmstQualifyingExamResultModeModel[];


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstqualifyingexamresultmodeServices: ZmstQualifyingExamResultModeService, private toastrService: ToastrService) {
    this.zmstqualifyingexamresultmodeFrmGroup = this.formBuilder.group({
      id: ["", [Validators.required]],
      description: ["", [Validators.required]],
      alternatenames: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstqualifyingexamresultmodeGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstqualifyingexamresultmodeFrmControl() {
    return this.zmstqualifyingexamresultmodeFrmGroup.controls;
  }
  reset() {
    this.clear()
  }
  clear() {
    this.zmstqualifyingexamresultmodeFrmGroup.reset();
    this.submitted = false;
    this.updatehdn = false;
    this.zmstqualifyingexamresultmodeFrmGroup.controls['id'].enable();
  }

  save() {
    this.submitted = true;

    if (this.zmstqualifyingexamresultmodeFrmGroup.valid) {
      const zmstqualifyingexamresultmodeModel = {
        id: this.zmstqualifyingexamresultmodeFrmGroup.get("id").value,
        description: this.zmstqualifyingexamresultmodeFrmGroup.get("description").value,
        alternatenames: this.zmstqualifyingexamresultmodeFrmGroup.get("alternatenames").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              
              this.zmstqualifyingexamresultmodeServices.insert(zmstqualifyingexamresultmodeModel).subscribe({
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
    this.zmstqualifyingexamresultmodeFrmGroup.controls['id'].disable();
    this.zmstqualifyingexamresultmodeFrmGroup.patchValue({
      id: data.id,
      description: data.description,
      alternatenames: data.alternatenames,
    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstqualifyingexamresultmodeFrmGroup.valid) {
      const zmstqualifyingexamresultmodeModel = {
        id: this.zmstqualifyingexamresultmodeFrmGroup.get("id").value,
        description: this.zmstqualifyingexamresultmodeFrmGroup.get("description").value,
        alternatenames: this.zmstqualifyingexamresultmodeFrmGroup.get("alternatenames").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstqualifyingexamresultmodeServices.update(zmstqualifyingexamresultmodeModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstqualifyingexamresultmodeFrmGroup.controls['id'].enable();
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
            this.zmstqualifyingexamresultmodeServices.delete(id).subscribe((data: any) => {
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
    this.zmstqualifyingexamresultmodeServices.getAll().subscribe((data: any) => {
      this.zmstqualifyingexamresultmodeList = data;
      this.loader.isLoading = false;
    })
  }
}