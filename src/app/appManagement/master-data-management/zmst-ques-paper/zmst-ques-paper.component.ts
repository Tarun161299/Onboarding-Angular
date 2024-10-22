import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstQuesPaperModel } from "src/app/shared/model/zmst-quespaper.model";
import { ZmstQuesPaperService } from "src/app/shared/services/zmst-quespaper.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;
@Component({
  selector: 'app-zmst-ques-paper',
  templateUrl: './zmst-ques-paper.component.html',
  styleUrls: ['./zmst-ques-paper.component.css']
})

export class ZmstQuesPaperComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstquespaperFrmGroup: FormGroup;
  zmstquespaperModel: ZmstQuesPaperModel;
  zmstquespaperList: ZmstQuesPaperModel[];


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstquespaperServices: ZmstQuesPaperService, private toastrService: ToastrService) {
    this.zmstquespaperFrmGroup = this.formBuilder.group({
      paperId: ["", [Validators.required]],
      paperName: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstquespaperGrid").DataTable({
      "order": []
    });
  }

  get zmstquespaperFrmControl() {
    return this.zmstquespaperFrmGroup.controls;
  }
  reset() {
    this.clear()
  }
  clear() {
    this.zmstquespaperFrmGroup.reset();
    this.submitted = false;
    this.updatehdn = false;
    this.zmstquespaperFrmGroup.controls['paperId'].enable();
  }

  save() {
    this.submitted = true;
    if (this.zmstquespaperFrmGroup.valid) {
      const zmstquespaperModel = {
        paperId: this.zmstquespaperFrmGroup.get("paperId").value,
        paperName: this.zmstquespaperFrmGroup.get("paperName").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstquespaperServices.insert(zmstquespaperModel).subscribe( {
                next:(data: any) =>{
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
    this.zmstquespaperFrmGroup.controls['paperId'].disable();
    this.zmstquespaperFrmGroup.patchValue({
      paperId: data.paperId,
      paperName: data.paperName,
    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstquespaperFrmGroup.valid) {
      const zmstquespaperModel = {
        paperId: this.zmstquespaperFrmGroup.get("paperId").value,
        paperName: this.zmstquespaperFrmGroup.get("paperName").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstquespaperServices.update(zmstquespaperModel).subscribe((data: any) => {
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
            this.zmstquespaperServices.delete(id).subscribe((data: any) => {
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
    this.zmstquespaperServices.getAll().subscribe((data: any) => {
      this.zmstquespaperList = data;
      this.loader.isLoading = false;
    })
  }
}