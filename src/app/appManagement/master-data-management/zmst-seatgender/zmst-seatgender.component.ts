
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstSeatGenderModel } from "src/app/shared/model/md-seatGender.model";
import { ZmstSeatGenderService } from "src/app/shared/services/zmst-seatgender.service";
import { ToastrService } from "ngx-toastr";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { CommonFunctionServices } from "src/app/shared/common/commonFunction.services";

declare const $: any;

@Component({
  selector: "app-zmst-seatgender",
  templateUrl: "./zmst-seatgender.component.html",
  styleUrls: ["./zmst-seatgender.component.css"]
})
export class ZmstSeatGenderComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstseatgenderFrmGroup: FormGroup;
  zmstseatgenderModel: ZmstSeatGenderModel;
  zmstseatgenderList: ZmstSeatGenderModel[];


  constructor(private commonFunctionServices: CommonFunctionServices, private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstseatgenderServices: ZmstSeatGenderService, private toastrService: ToastrService) {
    this.zmstseatgenderFrmGroup = this.formBuilder.group({
      seatGenderId: ["", [Validators.required]],
      description: ["", [Validators.required]],
      alternateNames: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  ngAfterViewInit(): void {
    $("#zmstseatgenderGrid").DataTable({
      "order": []
    });
  }

  get zmstseatgenderFrmControl() {
    return this.zmstseatgenderFrmGroup.controls;
  }
  reset() {
    this.clear();
  }
  clear() {
    this.zmstseatgenderFrmGroup.reset();
    this.zmstseatgenderFrmGroup.controls['seatGenderId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;
    if (this.zmstseatgenderFrmGroup.valid) {
      const zmstseatgenderModel = {
        seatGenderId: this.zmstseatgenderFrmGroup.get("seatGenderId").value,
        description: this.zmstseatgenderFrmGroup.get("description").value,
        alternateNames: this.zmstseatgenderFrmGroup.get("alternateNames").value
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstseatgenderServices.insert(zmstseatgenderModel).subscribe({
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
    this.zmstseatgenderFrmGroup.controls['seatGenderId'].disable();
    this.zmstseatgenderFrmGroup.patchValue({
      seatGenderId: data.seatGenderId,
      description: data.description,
      alternateNames: data.alternateNames
    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstseatgenderFrmGroup.valid) {
      const zmstseatgenderModel = {
        seatGenderId: this.zmstseatgenderFrmGroup.get("seatGenderId").value,
        description: this.zmstseatgenderFrmGroup.get("description").value,
        alternateNames: this.zmstseatgenderFrmGroup.get("alternateNames").value
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstseatgenderServices.update(zmstseatgenderModel).subscribe((data: any) => {
                const message = data;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstseatgenderFrmGroup.controls['seatGenderId'].enable();
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
            this.zmstseatgenderServices.delete(id).subscribe((data: any) => {
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
    this.zmstseatgenderServices.getAll().subscribe((data: any) => {
      this.zmstseatgenderList = data;
      this.commonFunctionServices.bindDataTable("zmstseatgenderGrid", 0);
      this.loaderTimeOut();
    })
  }

  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 1000);
  }
}