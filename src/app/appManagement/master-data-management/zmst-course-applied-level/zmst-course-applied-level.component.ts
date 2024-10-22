
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstCourseAppliedLevelModel } from "src/app/shared/model/zmst-courseappliedlevel.model";
import { ZmstCourseAppliedLevelService } from "src/app/shared/services/zmst-courseappliedlevel.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;
// "./zmst-courseappliedlevel.component.html"
@Component({
  selector: "app-zmst-courseappliedlevel",
  templateUrl: './zmst-course-applied-level.component.html',
  styleUrls: ["./zmst-course-applied-level.component.css"]
})
export class ZmstCourseAppliedLevelComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstcourseappliedlevelFrmGroup: FormGroup;
  zmstcourseappliedlevelModel: ZmstCourseAppliedLevelModel;
  zmstcourseappliedlevelList: ZmstCourseAppliedLevelModel[] = [];


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstcourseappliedlevelServices: ZmstCourseAppliedLevelService, private toastrService: ToastrService) {
    this.zmstcourseappliedlevelFrmGroup = this.formBuilder.group({
      courseLevelId: ["", [Validators.required]],
      courseLevelName: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstcourseappliedlevelGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstcourseappliedlevelFrmControl() {
    return this.zmstcourseappliedlevelFrmGroup.controls;
  }
  reset() {
    this.clear()
  }
  clear() {
    this.zmstcourseappliedlevelFrmGroup.reset();
    this.zmstcourseappliedlevelFrmGroup.controls['courseLevelId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;

    if (this.zmstcourseappliedlevelFrmGroup.valid) {
      const zmstcourseappliedlevelModel = {
        courseLevelId: this.zmstcourseappliedlevelFrmGroup.get("courseLevelId").value,
        courseLevelName: this.zmstcourseappliedlevelFrmGroup.get("courseLevelName").value,

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
              this.zmstcourseappliedlevelServices.insert(zmstcourseappliedlevelModel).subscribe({
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
    this.zmstcourseappliedlevelFrmGroup.controls['courseLevelId'].disable();
    this.zmstcourseappliedlevelFrmGroup.patchValue({
      courseLevelId: data.courseLevelId,
      courseLevelName: data.courseLevelName,
    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstcourseappliedlevelFrmGroup.valid) {
      const zmstcourseappliedlevelModel = {
        courseLevelId: this.zmstcourseappliedlevelFrmGroup.get("courseLevelId").value,
        courseLevelName: this.zmstcourseappliedlevelFrmGroup.get("courseLevelName").value,

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
              this.zmstcourseappliedlevelServices.update(zmstcourseappliedlevelModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstcourseappliedlevelFrmGroup.controls['courseLevelId'].enable();
                if (message != "Try Again") {
                  if (message > 0) {
                    this.toastrService.success("Udate Successfully");
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
            this.zmstcourseappliedlevelServices.delete(id).subscribe((data: any) => {
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
    this.zmstcourseappliedlevelServices.getAll().subscribe((data: any) => {
      this.zmstcourseappliedlevelList = data;
      this.loader.isLoading = false;
    })
  }
}