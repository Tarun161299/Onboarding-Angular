import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstQualifyingCourseModel } from "src/app/shared/model/zmst-qualifyingcourse.model";
import { ZmstQualifyingCourseService } from "src/app/shared/services/zmst-qualifyingcourse.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { CommonFunctionServices } from 'src/app/shared/common/commonFunction.services';
import { ZmstQualificationService } from 'src/app/shared/services/zmst-qualification.service';
import { ZmstQualificationModel } from 'src/app/shared/model/zmst-qualification.model';

declare const $: any;

@Component({
  selector: 'app-zmst-qualifying-course',
  templateUrl: './zmst-qualifying-course.component.html',
  styleUrls: ['./zmst-qualifying-course.component.css']
})

export class ZmstQualifyingCourseComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstqualifyingcourseFrmGroup: FormGroup;
  zmstqualifyingcourseModel: ZmstQualifyingCourseModel;
  zmstqualifyingcourseList: ZmstQualifyingCourseModel[];
  QualList: ZmstQualificationModel[];
  zmstqualifyingcourseListTemp:any[];
  qualificationCourseId:string;


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private commonFunctionServices: CommonFunctionServices, private qualificationServices: ZmstQualificationService, private confirmationDialogService: ConfirmationDialogService, private zmstqualifyingcourseServices: ZmstQualifyingCourseService, private toastrService: ToastrService) {
    this.zmstqualifyingcourseFrmGroup = this.formBuilder.group({
      qualificationCourseId: ["", [Validators.required]],
      qualificationCourseName: ["", [Validators.required]],
      qualificationId: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.getQualificationList();
    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstqualifyingcourseGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstqualifyingcourseFrmControl() {
    return this.zmstqualifyingcourseFrmGroup.controls;
  }
  reset() {
    this.clear()
  }
  clear() {
    this.zmstqualifyingcourseFrmGroup.reset();
    this.zmstqualifyingcourseFrmGroup.controls['qualificationCourseId'].enable();
    this.zmstqualifyingcourseFrmGroup.controls['qualificationId'].enable();
    this.getQualificationList();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;

    if (this.zmstqualifyingcourseFrmGroup.valid) {
      const zmstqualifyingcourseModel = {
        qualificationCourseId: this.zmstqualifyingcourseFrmGroup.get("qualificationCourseId").value,
        qualificationCourseName: this.zmstqualifyingcourseFrmGroup.get("qualificationCourseName").value,
        qualificationId: this.zmstqualifyingcourseFrmGroup.get("qualificationId").value,
        qualificationName:"",

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
              this.zmstqualifyingcourseServices.insert(zmstqualifyingcourseModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.loader.isLoading = false;
                  this.getAll();
                  this.clear();
                  this.getQualificationList();
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
    this.zmstqualifyingcourseFrmGroup.controls['qualificationCourseId'].disable();
    this.zmstqualifyingcourseFrmGroup.controls['qualificationId'].disable();
    this.zmstqualifyingcourseFrmGroup.patchValue({
      qualificationCourseId: data.qualificationCourseId,
      qualificationCourseName: data.qualificationCourseName,
      qualificationId: data.qualificationId,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstqualifyingcourseFrmGroup.valid) {
      const zmstqualifyingcourseModel = {
        qualificationCourseId: this.zmstqualifyingcourseFrmGroup.get("qualificationCourseId").value,
        qualificationCourseName: this.zmstqualifyingcourseFrmGroup.get("qualificationCourseName").value,
        qualificationId: this.zmstqualifyingcourseFrmGroup.get("qualificationId").value,
        qualificationName:"",
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstqualifyingcourseServices.update(zmstqualifyingcourseModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.getQualificationList();
                this.commonFunctionServices.bindDataTable("zmstqualifyingcourseGrid", 0);
                this.zmstqualifyingcourseFrmGroup.controls['qualificationCourseId'].enable();
                this.zmstqualifyingcourseFrmGroup.controls['qualificationId'].enable();
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
            this.zmstqualifyingcourseServices.delete(id).subscribe((data: any) => {
              this.loader.isLoading = false;
              const message = data;
              this.toastrService.error(message);
              this.clear();
              this.getAll();
              this.commonFunctionServices.bindDataTable("zmstqualifyingcourseGrid", 0);
            })
          }
        }
      })
  }

  byqualCourse(event:any)
  {
    
    this.zmstqualifyingcourseList = this.zmstqualifyingcourseListTemp.filter(x => x.qualificationId == (this.zmstqualifyingcourseFrmGroup.get("qualificationId").value == "" ? x.qualificationId : this.zmstqualifyingcourseFrmGroup.get("qualificationId").value))
    this.commonFunctionServices.bindDataTable("zmstqualifyingcourseGrid", 0);
    this.qualificationCourseId = event;
  }
  getAll() {
    this.zmstqualifyingcourseServices.getAll().subscribe((data: any) => {
      this.zmstqualifyingcourseListTemp=data;
      this.zmstqualifyingcourseList = data;
      this.loader.isLoading = false;
    })
  }
  getQualificationList() {
    this.qualificationServices.getAll().subscribe((data: any) => {
      this.QualList = data;
    });
  }
}