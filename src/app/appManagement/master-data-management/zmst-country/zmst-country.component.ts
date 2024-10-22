import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstCountryModel } from "src/app/shared/model/zmst-country.model";
import { ZmstCountryService } from "src/app/shared/services/zmst-country.service";
import { ToastrService } from "ngx-toastr";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { CommonFunctionServices } from "src/app/shared/common/commonFunction.services";

declare const $: any;

@Component({
  selector: "app-zmst-country",
  templateUrl: "./zmst-country.component.html",
  styleUrls: ["./zmst-country.component.css"]
})
export class ZmstCountryComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstcountryFrmGroup: FormGroup;
  zmstcountryModel: ZmstCountryModel;
  zmstcountryList: ZmstCountryModel[] = [];

  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService,
    private commonFunctionServices: CommonFunctionServices, private zmstcountryServices: ZmstCountryService, private toastrService: ToastrService) {
    this.zmstcountryFrmGroup = this.formBuilder.group({
      code: ["", [Validators.required, Validators.pattern("^[A-Za-z. ]+$"), Validators.maxLength(2)]],
      name: ["", [Validators.required, Validators.pattern("^[A-Za-z. ]+$"), Validators.maxLength(100)]],
      sAARCCode: ["", [Validators.required, Validators.pattern("^[A-Za-z. ]+$"), Validators.maxLength(2)]],
      sAARCName: ["", [Validators.required, Validators.pattern("^[A-Za-z. ]+$"), Validators.maxLength(100)]],
      isdcode: ["", [Validators.required, Validators.maxLength(50), Validators.pattern("^[0-9]*$")]],
      priority: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstcountryGrid").DataTable({
      "order": []
    });
  }

  get zmstcountryFrmControl() {
    return this.zmstcountryFrmGroup.controls;
  }

  reset() {
    this.clear();
  }

  clear() {
    this.zmstcountryFrmGroup.reset();
    this.updatehdn = false;
    this.zmstcountryFrmGroup.controls['code'].enable();
    this.submitted = false;
  }

  save() {
    this.submitted = true;
    if (this.zmstcountryFrmGroup.valid) {
      this.zmstcountryModel = {
        code: this.zmstcountryFrmGroup.get("code").value,
        name: this.zmstcountryFrmGroup.get("name").value,
        sAarccode: this.zmstcountryFrmGroup.get("sAARCCode").value,
        sAarcname: this.zmstcountryFrmGroup.get("sAARCName").value,
        isdcode: this.zmstcountryFrmGroup.get("isdcode").value,
        priority: this.zmstcountryFrmGroup.get("priority").value
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstcountryServices.insert(this.zmstcountryModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.getAll();
                  this.clear();
                  this.toastrService.success("Data Saved Successfully");
                },
                error: (err: any) => {
                  const message = err.message;
                  this.loader.isLoading = false;
                  this.getAll();
                  this.toastrService.error("Already exists");
                  this.clear();
                }
              })
            }
          }
        })
    }
  }

  edit(data: any) {
    this.updatehdn = true;
    this.zmstcountryFrmGroup.controls['code'].disable();
    this.zmstcountryFrmGroup.patchValue({
      code: data.code,
      name: data.name,
      sAARCCode: data.sAarccode,
      sAARCName: data.sAarcname,
      isdcode: data.isdcode,
      priority: data.priority,
    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstcountryFrmGroup.valid) {
      this.zmstcountryModel = {
        code: this.zmstcountryFrmGroup.get("code").value,
        name: this.zmstcountryFrmGroup.get("name").value,
        sAarccode: this.zmstcountryFrmGroup.get("sAARCCode").value,
        sAarcname: this.zmstcountryFrmGroup.get("sAARCName").value,
        isdcode: this.zmstcountryFrmGroup.get("isdcode").value,
        priority: this.zmstcountryFrmGroup.get("priority").value
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstcountryServices.update(this.zmstcountryModel).subscribe((data: any) => {
                const message = data;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.toastrService.success(message);
                this.zmstcountryFrmGroup.controls['code'].enable();
                this.submitted = false;
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
            this.zmstcountryServices.delete(id).subscribe((data: any) => {
              const message = data;
              this.toastrService.error(message);
              this.clear();
              this.getAll();
              this.submitted = false;
            })
          }
        }
      })
  }

  getAll() {
    this.zmstcountryServices.getAll().subscribe((data: any) => {
      this.zmstcountryList = data;
      this.commonFunctionServices.bindDataTable("zmstcountryGrid", 0);
      this.loaderTimeOut();
    })
  }

  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 1000);
  }
}