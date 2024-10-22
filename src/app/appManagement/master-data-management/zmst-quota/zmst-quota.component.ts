
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstQuotaModel } from "src/app/shared/model/md-quota.model";
import { MDZmstQuotaService } from "src/app/shared/services/md-zmstQuota.service";
import { ToastrService } from "ngx-toastr";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { CommonFunctionServices } from "src/app/shared/common/commonFunction.services";

declare const $: any;

@Component({
  selector: "app-zmst-quota",
  templateUrl: "./zmst-quota.component.html",
  styleUrls: ["./zmst-quota.component.css"]
})
export class ZmstQuotaComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstquotaFrmGroup: FormGroup;
  zmstquotaModel: ZmstQuotaModel;
  zmstquotaList: ZmstQuotaModel[];
  constructor(private commonFunctionServices: CommonFunctionServices, private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstquotaServices: MDZmstQuotaService, private toastrService: ToastrService) {
    this.zmstquotaFrmGroup = this.formBuilder.group({
      quotaId: ["", [Validators.required]],
      name: ["", [Validators.required]],
      alternateNames: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstquotaGrid").DataTable({
      "order": []
    });
  }

  get zmstquotaFrmControl() {
    return this.zmstquotaFrmGroup.controls;
  }
  reset() {
    this.clear();
  }
  clear() {
    this.zmstquotaFrmGroup.reset();
    this.zmstquotaFrmGroup.controls['quotaId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;
    if (this.zmstquotaFrmGroup.valid) {
      const zmstquotaModel = {
        quotaId: this.zmstquotaFrmGroup.get("quotaId").value,
        name: this.zmstquotaFrmGroup.get("name").value,
        alternateNames: this.zmstquotaFrmGroup.get("alternateNames").value
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstquotaServices.insert(zmstquotaModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.getAll();
                  this.clear();
                  this.toastrService.success("Data Saved Successfully");
                },
                error: (err: any) => {
                  const message = err.message;
                  this.getAll();
                  this.clear();
                  this.toastrService.error("Already exists");
                  this.submitted = false;
                }
              })
            }
          }
        })
    }
  }

  edit(data: any) {
    this.updatehdn = true;
    this.zmstquotaFrmGroup.controls['quotaId'].disable();
    this.zmstquotaFrmGroup.patchValue({
      quotaId: data.quotaId,
      name: data.name,
      alternateNames: data.alternateNames
    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstquotaFrmGroup.valid) {
      const zmstquotaModel = {
        quotaId: this.zmstquotaFrmGroup.get("quotaId").value,
        name: this.zmstquotaFrmGroup.get("name").value,
        alternateNames: this.zmstquotaFrmGroup.get("alternateNames").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstquotaServices.update(zmstquotaModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.getAll();
                  this.updatehdn = false;
                  this.clear();
                  this.zmstquotaFrmGroup.controls['quotaId'].enable();
                  if (message != "Try Again") {
                    if (message > 0) {
                      this.toastrService.success("Update Successfully");
                    }
                  }
                  if (message == "Try Again") {
                    this.toastrService.error("Error Occured");
                  }
                },
                error: (err: any) => {
                  this.loader.isLoading = false;
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
            this.zmstquotaServices.delete(id).subscribe({
              next: (data: any) => {
                const message = data;
                this.toastrService.error(message);
                this.clear();
                this.getAll();
              },
              error: (err: any) => {
                this.loader.isLoading = false;
                this.toastrService.error(err);
              }
            })
          }
        }
      })
  }

  getAll() {
    this.zmstquotaServices.getAll().subscribe((data: any) => {
      this.zmstquotaList = data;
      this.commonFunctionServices.bindDataTable("zmstquotaGrid", 0);
      this.loaderTimeOut();
    })
  }

  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 2000);
  }
}