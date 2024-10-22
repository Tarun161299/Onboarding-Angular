
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstCourseAppliedModel } from "src/app/shared/model/zmst-courseapplied.model";
import { ZmstCourseAppliedService } from "src/app/shared/services/zmst-courseapplied.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;

@Component({
  selector: "app-zmst-courseapplied",
  templateUrl: "./zmst-course-applied.component.html",
  styleUrls: ["./zmst-course-applied.component.css"]
})
export class ZmstCourseAppliedComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstcourseappliedFrmGroup: FormGroup;
  zmstcourseappliedModel: ZmstCourseAppliedModel;
  zmstcourseappliedList: ZmstCourseAppliedModel[];


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstcourseappliedServices: ZmstCourseAppliedService, private toastrService: ToastrService) {
    this.zmstcourseappliedFrmGroup = this.formBuilder.group({
      courseId: ["", [Validators.required]],
      courseName: ["", [Validators.required]],
      alternameNames: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstcourseappliedGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstcourseappliedFrmControl() {
    return this.zmstcourseappliedFrmGroup.controls;
  }
  reset() {
    this.clear()
  }
  clear() {
    this.zmstcourseappliedFrmGroup.reset();
    this.zmstcourseappliedFrmGroup.controls['courseId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;

    if (this.zmstcourseappliedFrmGroup.valid) {
      const zmstcourseappliedModel = {
        courseId: this.zmstcourseappliedFrmGroup.get("courseId").value,
        courseName: this.zmstcourseappliedFrmGroup.get("courseName").value,
        alternameNames: this.zmstcourseappliedFrmGroup.get("alternameNames").value,

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
              this.zmstcourseappliedServices.insert(zmstcourseappliedModel).subscribe({
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
    this.zmstcourseappliedFrmGroup.controls['courseId'].disable();
    this.zmstcourseappliedFrmGroup.patchValue({
      courseId: data.courseId,
      courseName: data.courseName,
      alternameNames: data.alternameNames,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstcourseappliedFrmGroup.valid) {
      const zmstcourseappliedModel = {
        courseId: this.zmstcourseappliedFrmGroup.get("courseId").value,
        courseName: this.zmstcourseappliedFrmGroup.get("courseName").value,
        alternameNames: this.zmstcourseappliedFrmGroup.get("alternameNames").value,

      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstcourseappliedServices.update(zmstcourseappliedModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstcourseappliedFrmGroup.controls['courseId'].enable();
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
            this.zmstcourseappliedServices.delete(id).subscribe((data: any) => {
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
    this.zmstcourseappliedServices.getAll().subscribe((data: any) => {
      this.zmstcourseappliedList = data;
      this.loader.isLoading = false;
    })
  }
}