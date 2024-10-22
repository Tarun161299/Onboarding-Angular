import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { MdMinistryModel } from "src/app/shared/model/md-ministry.model";
import { MdMinistryService } from "src/app/shared/services/md-ministry.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { CommonFunctionServices } from "src/app/shared/common/commonFunction.services";
import { error } from "jquery";

declare const $: any;
@Component({
  selector: 'app-md-ministry',
  templateUrl: './md-ministry.component.html',
  styleUrls: ['./md-ministry.component.css']
})
export class MdMinistryComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  mdministryFrmGroup: FormGroup;
  mdministryModel: MdMinistryModel;
  mdministryList: MdMinistryModel[];

  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private commonFunctionServices: CommonFunctionServices, private confirmationDialogService: ConfirmationDialogService, private mdministryServices: MdMinistryService, private toastrService: ToastrService) {
    this.mdministryFrmGroup = this.formBuilder.group({
      ministryId: ["", [Validators.required, Validators.required]],
      ministryName: ["", [Validators.required, Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#mdministryGrid").DataTable({
      "order": []
    });
  }

  get mdministryFrmControl() {
    return this.mdministryFrmGroup.controls;
  }

  clear() {
    this.mdministryFrmGroup.reset();
    this.mdministryFrmGroup.controls['ministryId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;
    if (this.mdministryFrmGroup.valid) {
      const mdministryModel = {
        ministryId: this.mdministryFrmGroup.get("ministryId").value,
        ministryName: this.mdministryFrmGroup.get("ministryName").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.mdministryServices.insert(mdministryModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.getAll();
                  this.clear();
                  this.toastrService.success("Data Saved Successfully");
                },
                error: (err: any) => {
                  const message = err.message;
                  this.loader.isLoading=false;
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
    this.mdministryFrmGroup.controls['ministryId'].disable();
    this.mdministryFrmGroup.patchValue({
      ministryId: data.ministryId,
      ministryName: data.ministryName,
    },
    )
  }

  update() {
    this.submitted = true;
    if (this.mdministryFrmGroup.valid) {
      const mdministryModel = {
        ministryId: this.mdministryFrmGroup.get("ministryId").value,
        ministryName: this.mdministryFrmGroup.get("ministryName").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.mdministryServices.update(mdministryModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.getAll();
                  this.updatehdn = false;
                  this.clear();
                  this.mdministryFrmGroup.controls['ministryId'].enable();
                  if (message != "Try Again") {
                    if (message > 0) {
                      this.toastrService.success("Update Successfully");
                    }
                  }
                  if (message == "Try Again") {
                    this.toastrService.error("Error Occured");
                  }
                }, error: (err: any) => {
                  this.loader.isLoading=false;
                  this.toastrService.error(err);                  
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
            this.mdministryServices.delete(id).subscribe((data: any) => {
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
    this.mdministryServices.getAll().subscribe((data: any) => {
      this.mdministryList = data;
      this.commonFunctionServices.bindDataTable("mdministryGrid", 0);
      this.loaderTimeOut();
    })
  }

  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 1000);
  }
}