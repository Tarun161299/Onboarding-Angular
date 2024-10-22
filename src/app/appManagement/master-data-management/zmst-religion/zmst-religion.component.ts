
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstReligionModel } from "src/app/shared/model/md-religion.model";
import { MDZmstRiligionService } from "src/app/shared/services/md-zmstReligion.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { CommonFunctionServices } from "src/app/shared/common/commonFunction.services";

declare const $: any;

@Component({
  selector: "app-zmst-religion",
  templateUrl: "./zmst-religion.component.html",
  styleUrls: ["./zmst-religion.component.css"]
})
export class ZmstReligionComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstreligionFrmGroup: FormGroup;
  zmstreligionModel: ZmstReligionModel;
  zmstreligionList: ZmstReligionModel[] = [];


  constructor(private commonFunctionServices: CommonFunctionServices, private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstreligionServices: MDZmstRiligionService, private toastrService: ToastrService) {
    this.zmstreligionFrmGroup = this.formBuilder.group({
      religionId: ["", [Validators.required]],
      description: ["", [Validators.required]],
      alternateNames: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  ngAfterViewInit(): void {
    $("#zmstreligionGrid").DataTable({
      "order": []
    });
  }

  get zmstreligionFrmControl() {
    return this.zmstreligionFrmGroup.controls;
  }
  reset() {
    this.clear();
  }
  clear() {
    this.zmstreligionFrmGroup.reset();
    this.zmstreligionFrmGroup.controls['religionId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;

    if (this.zmstreligionFrmGroup.valid) {
      const zmstreligionModel = {
        religionId: this.zmstreligionFrmGroup.get("religionId").value,
        description: this.zmstreligionFrmGroup.get("description").value,
        alternateNames: this.zmstreligionFrmGroup.get("alternateNames").value
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstreligionServices.insert(zmstreligionModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.getAll();
                  this.clear();
                  this.toastrService.success("Data Saved Successfully");
                },
                error: (err: any) => {
                  const message = err.message;
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
    this.zmstreligionFrmGroup.controls['religionId'].disable();
    this.zmstreligionFrmGroup.patchValue({
      religionId: data.religionId,
      description: data.description,
      alternateNames: data.alternateNames
    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstreligionFrmGroup.valid) {
      const zmstreligionModel = {
        religionId: this.zmstreligionFrmGroup.get("religionId").value,
        description: this.zmstreligionFrmGroup.get("description").value,
        alternateNames: this.zmstreligionFrmGroup.get("alternateNames").value
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstreligionServices.update(zmstreligionModel).subscribe((data: any) => {
                const message = data;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstreligionFrmGroup.controls['religionId'].enable();
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
            this.zmstreligionServices.delete(id).subscribe((data: any) => {
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
    this.zmstreligionServices.getAll().subscribe((data: any) => {
      this.zmstreligionList = data;
      this.commonFunctionServices.bindDataTable("zmstreligionGrid", 0);
      this.loaderTimeOut();
    })
  }

  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 1000);
  }
}