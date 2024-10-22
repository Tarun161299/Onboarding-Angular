import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstQualifyingExamBoardModel } from "src/app/shared/model/zmst-qualifyingexamboard.model";
import { ZmstQualifyingExamBoardService } from "src/app/shared/services/zmst-qualifyingexamboard.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { CommonFunctionServices } from 'src/app/shared/common/commonFunction.services';
import { ZmstQualificationModel } from 'src/app/shared/model/zmst-qualification.model';
import { ZmstQualificationService } from 'src/app/shared/services/zmst-qualification.service';

declare const $: any;

@Component({
  selector: 'app-zmst-qualifying-exam-board',
  templateUrl: './zmst-qualifying-exam-board.component.html',
  styleUrls: ['./zmst-qualifying-exam-board.component.css']
})
export class ZmstQualifyingExamBoardComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstqualifyingexamboardFrmGroup: FormGroup;
  zmstqualifyingexamboardModel: ZmstQualifyingExamBoardModel;
  zmstqualifyingexamboardList: ZmstQualifyingExamBoardModel[];
  QualList: ZmstQualificationModel[];
  zmstqualifyingexamboardListTemp:any[];
  qualificationId:string;


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private commonFunctionServices: CommonFunctionServices, private confirmationDialogService: ConfirmationDialogService, private zmstqualifyingexamboardServices: ZmstQualifyingExamBoardService, private toastrService: ToastrService, private qualificationServices: ZmstQualificationService) {
    this.zmstqualifyingexamboardFrmGroup = this.formBuilder.group({
      id: ["", [Validators.required]],
      description: ["", [Validators.required]],
      qualificationId: ["", [Validators.required]],
      alternateNames: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.getQualificationList();
    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstqualifyingexamboardGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstqualifyingexamboardFrmControl() {
    return this.zmstqualifyingexamboardFrmGroup.controls;
  }
  reset() {
    this.clear()
  }
  clear() {
    this.zmstqualifyingexamboardFrmGroup.reset();
    this.zmstqualifyingexamboardFrmGroup.controls['id'].enable();
    this.zmstqualifyingexamboardFrmGroup.controls['qualificationId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;

    if (this.zmstqualifyingexamboardFrmGroup.valid) {
      const zmstqualifyingexamboardModel = {
        id: this.zmstqualifyingexamboardFrmGroup.get("id").value,
        description: this.zmstqualifyingexamboardFrmGroup.get("description").value,
        qualificationId: this.zmstqualifyingexamboardFrmGroup.get("qualificationId").value,
        alternateNames: this.zmstqualifyingexamboardFrmGroup.get("alternateNames").value,

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
              this.zmstqualifyingexamboardServices.insert(zmstqualifyingexamboardModel).subscribe({
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
    this.zmstqualifyingexamboardFrmGroup.controls['id'].disable();
    this.zmstqualifyingexamboardFrmGroup.controls['qualificationId'].disable();
    this.zmstqualifyingexamboardFrmGroup.patchValue({
      id: data.id,
      description: data.description,
      qualificationId: data.qualificationId,
      alternateNames: data.alternateNames,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstqualifyingexamboardFrmGroup.valid) {
      const zmstqualifyingexamboardModel = {
        id: this.zmstqualifyingexamboardFrmGroup.get("id").value,
        description: this.zmstqualifyingexamboardFrmGroup.get("description").value,
        qualificationId: this.zmstqualifyingexamboardFrmGroup.get("qualificationId").value,
        alternateNames: this.zmstqualifyingexamboardFrmGroup.get("alternateNames").value,

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
              this.zmstqualifyingexamboardServices.update(zmstqualifyingexamboardModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.updatehdn = false;
                this.clear();
                this.getAll();
                this.commonFunctionServices.bindDataTable("zmstqualifyingexamboardGrid", 0);
                this.zmstqualifyingexamboardFrmGroup.controls['id'].enable();
                this.zmstqualifyingexamboardFrmGroup.controls['qualificationId'].enable();
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
            this.zmstqualifyingexamboardServices.delete(id).subscribe((data: any) => {
              this.loader.isLoading = false;
              const message = data;
              this.toastrService.error(message);
              this.clear();
              this.getAll();
              this.commonFunctionServices.bindDataTable("zmstqualifyingexamboardGrid", 0);
            })
          }
        }
      })
  }

  getAll() {
    this.zmstqualifyingexamboardServices.getAll().subscribe((data: any) => {
      this.zmstqualifyingexamboardListTemp=data;
      this.zmstqualifyingexamboardList = data;
      this.loader.isLoading = false;
    })
  }

  getQualificationList() {
    this.qualificationServices.getAll().subscribe((data: any) => {
      this.QualList = data;
    });
  }
  
  byqualCourse(event:any)
  {
    this.zmstqualifyingexamboardList = this.zmstqualifyingexamboardListTemp.filter(x => x.qualificationId == (this.zmstqualifyingexamboardFrmGroup.get("qualificationId").value == "" ? x.qualificationId : this.zmstqualifyingexamboardFrmGroup.get("qualificationId").value))
    this.commonFunctionServices.bindDataTable("zmstqualifyingexamboardGrid", 0);
    this.qualificationId = event;
  }
}