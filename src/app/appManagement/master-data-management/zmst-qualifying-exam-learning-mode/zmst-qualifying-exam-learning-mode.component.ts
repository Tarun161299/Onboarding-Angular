import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstQualifyingExamLearningModeModel } from "src/app/shared/model/zmst-qualifyingexamlearningmode.model";
import { ZmstQualifyingExamLearningModeService } from "src/app/shared/services/zmst-qualifyingexamlearningmode.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { CommonFunctionServices } from 'src/app/shared/common/commonFunction.services';

declare const $: any;

@Component({
  selector: 'app-zmst-qualifying-exam-learning-mode',
  templateUrl: './zmst-qualifying-exam-learning-mode.component.html',
  styleUrls: ['./zmst-qualifying-exam-learning-mode.component.css']
})

export class ZmstQualifyingExamLearningModeComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstqualifyingexamlearningmodeFrmGroup: FormGroup;
  zmstqualifyingexamlearningmodeModel: ZmstQualifyingExamLearningModeModel;
  zmstqualifyingexamlearningmodeList: ZmstQualifyingExamLearningModeModel[];
  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private commonFunctionServices: CommonFunctionServices, private confirmationDialogService: ConfirmationDialogService, private zmstqualifyingexamlearningmodeServices: ZmstQualifyingExamLearningModeService, private toastrService: ToastrService) {
    this.zmstqualifyingexamlearningmodeFrmGroup = this.formBuilder.group({
      id: ["", [Validators.required]],
      description: ["", [Validators.required]],
      alternateNames: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstqualifyingexamlearningmodeGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstqualifyingexamlearningmodeFrmControl() {
    return this.zmstqualifyingexamlearningmodeFrmGroup.controls;
  }

  reset() {
    this.clear()
  }

  clear() {
    this.zmstqualifyingexamlearningmodeFrmGroup.reset();
    this.submitted = false;
    this.updatehdn = false;
    this.zmstqualifyingexamlearningmodeFrmGroup.controls['id'].enable();
  }

  save() {
    this.submitted = true;
    if (this.zmstqualifyingexamlearningmodeFrmGroup.valid) {
      const zmstqualifyingexamlearningmodeModel = {
        id: this.zmstqualifyingexamlearningmodeFrmGroup.get("id").value,
        description: this.zmstqualifyingexamlearningmodeFrmGroup.get("description").value,
        alternateNames: this.zmstqualifyingexamlearningmodeFrmGroup.get("alternateNames").value,

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
              this.zmstqualifyingexamlearningmodeServices.insert(zmstqualifyingexamlearningmodeModel).subscribe({
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
    this.zmstqualifyingexamlearningmodeFrmGroup.controls['id'].disable();
    this.zmstqualifyingexamlearningmodeFrmGroup.patchValue({
      id: data.id,
      description: data.description,
      alternateNames: data.alternateNames,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstqualifyingexamlearningmodeFrmGroup.valid) {
      const zmstqualifyingexamlearningmodeModel = {
        id: this.zmstqualifyingexamlearningmodeFrmGroup.get("id").value,
        description: this.zmstqualifyingexamlearningmodeFrmGroup.get("description").value,
        alternateNames: this.zmstqualifyingexamlearningmodeFrmGroup.get("alternateNames").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstqualifyingexamlearningmodeServices.update(zmstqualifyingexamlearningmodeModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.commonFunctionServices.bindDataTable("zmstqualifyingexamlearningmodeGrid", 0);
                this.zmstqualifyingexamlearningmodeFrmGroup.controls['id'].enable();
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
            this.zmstqualifyingexamlearningmodeServices.delete(id).subscribe((data: any) => {
              this.loader.isLoading = false;
              const message = data;
              this.toastrService.error(message);
              this.clear();
              this.getAll();
              this.commonFunctionServices.bindDataTable("zmstqualifyingexamlearningmodeGrid", 0);
            })
          }
        }
      })
  }

  getAll() {
    this.zmstqualifyingexamlearningmodeServices.getAll().subscribe((data: any) => {
      this.zmstqualifyingexamlearningmodeList = data;
      this.loader.isLoading = false;
    })
  }
}