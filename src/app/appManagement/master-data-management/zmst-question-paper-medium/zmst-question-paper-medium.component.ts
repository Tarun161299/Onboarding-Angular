import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstQuestionPaperMediumModel } from "src/app/shared/model/zmst-questionpapermedium.model";
import { ZmstQuestionPaperMediumService } from "src/app/shared/services/zmst-questionpapermedium.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;
@Component({
  selector: 'app-zmst-question-paper-medium',
  templateUrl: './zmst-question-paper-medium.component.html',
  styleUrls: ['./zmst-question-paper-medium.component.css']
})

export class ZmstQuestionPaperMediumComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstquestionpapermediumFrmGroup: FormGroup;
  zmstquestionpapermediumModel: ZmstQuestionPaperMediumModel;
  zmstquestionpapermediumList: ZmstQuestionPaperMediumModel[];


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstquestionpapermediumServices: ZmstQuestionPaperMediumService, private toastrService: ToastrService) {
    this.zmstquestionpapermediumFrmGroup = this.formBuilder.group({
      mediumId: ["", [Validators.required]],
      mediumName: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }
  ngAfterViewInit(): void {
    $("#zmstquestionpapermediumGrid").DataTable({
      "order": []
    });
  }

  get zmstquestionpapermediumFrmControl() {
    return this.zmstquestionpapermediumFrmGroup.controls;
  }
  reset() {
    this.clear()
  }
  clear() {
    this.zmstquestionpapermediumFrmGroup.reset();
    this.submitted = false;
    this.updatehdn = false;
    this.zmstquestionpapermediumFrmGroup.controls["mediumId"].enable();
  }

  save() {
    this.submitted = true;
    if (this.zmstquestionpapermediumFrmGroup.valid) {
      const zmstquestionpapermediumModel = {
        mediumId: this.zmstquestionpapermediumFrmGroup.get("mediumId").value,
        mediumName: this.zmstquestionpapermediumFrmGroup.get("mediumName").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstquestionpapermediumServices.insert(zmstquestionpapermediumModel).subscribe( {
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
    this.zmstquestionpapermediumFrmGroup.controls["mediumId"].disable();
    this.zmstquestionpapermediumFrmGroup.patchValue({
      mediumId: data.mediumId,
      mediumName: data.mediumName,
    },
    )
  }

  update() {
    this.submitted = true;
    this.zmstquestionpapermediumFrmGroup.controls["mediumId"].enable();
    if (this.zmstquestionpapermediumFrmGroup.valid) {
      const zmstquestionpapermediumModel = {
        mediumId: this.zmstquestionpapermediumFrmGroup.get("mediumId").value,
        mediumName: this.zmstquestionpapermediumFrmGroup.get("mediumName").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstquestionpapermediumServices.update(zmstquestionpapermediumModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
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
            this.zmstquestionpapermediumServices.delete(id).subscribe((data: any) => {
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
    this.zmstquestionpapermediumServices.getAll().subscribe((data: any) => {
      this.zmstquestionpapermediumList = data;
      this.loader.isLoading = false;
    })
  }
}