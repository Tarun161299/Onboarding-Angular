
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { MdStateModel } from "src/app/shared/model/md-state.model";
import { MdStateService } from "src/app/shared/services/md-state.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { ErrorMessageService } from "src/app/shared/common/errorMessageService";
import { TokenLocalStorageService } from "src/app/shared/tokenLocalStorage/tokenLocalStorageService";
import { CommonFunctionServices } from "src/app/shared/common/commonFunction.services";

declare const $: any;

@Component({
  selector: "app-md-state",
  templateUrl: "./md-state.component.html",
  styleUrls: ["./md-state.component.css"]
})
export class MdStateComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  mdstateFrmGroup: FormGroup;
  mdstateModel: MdStateModel;
  mdstateList: MdStateModel[];

  constructor(
    private commonFunctionServices: CommonFunctionServices, private storage: TokenLocalStorageService, private errorMessage: ErrorMessageService, private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private mdstateServices: MdStateService, private toastrService: ToastrService) {
    this.mdstateFrmGroup = this.formBuilder.group({
      id: ["", [Validators.required, Validators.maxLength(2), Validators.minLength(2), Validators.pattern('^([0-9][0-9]*)|([0]+)$')]],
      description: ['',[Validators.compose([Validators.required, this.scriptValidator]),Validators.pattern('^([A-Za-z])|([]+)$')]],
      hdnid: [""]
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
  }

  get mdstateFrmControl() {
    return this.mdstateFrmGroup.controls;
  }

  clear() {
    this.mdstateFrmGroup.reset();
    this.mdstateFrmGroup.controls['id'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;
    if (this.mdstateFrmGroup.valid) {
      const mdstateModel = {
        id: this.mdstateFrmGroup.get("id").value,
        description: this.mdstateFrmGroup.get("description").value,
        created_date: new Date(),
        created_by: this.storage.ParseToken().userId//this.storage.get('userID'),
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.mdstateServices.insert(mdstateModel).subscribe(
                {
                  next: (data: any) => {
                    const message = data;
                    this.commonFunctionServices.bindDataTable("mdstateGrid", 0);
                    this.getAll();
                    this.clear();
                    this.toastrService.success("Data Saved Successfully");
                  },
                  error: (err: any) => {
                    let errorno = err.status;
                    this.loader.isLoading = false;
                    this.errorMessage.showError(errorno);
                  }
                })
            }
          }
        })
    }
  }

  edit(data: any) {
    this.updatehdn = true;
    this.mdstateFrmGroup.controls['id'].disable();
    this.mdstateFrmGroup.patchValue({
      id: data.id,
      description: data.description,
      createdDate: data.createdDate,
      createdBy: data.createdBy,
      modifiedDate: data.modifiedDate,
      modifiedBy: data.modifiedBy,
      hdnid: data.id,
    },
    )
  }

  scriptValidator = function (control: AbstractControl): ValidationErrors | null {
    let value: string = control.value || '';
    if (value) {
      const matches = (value.includes('<script>')) || (value.includes('</script>')) || (value.includes('<style>')) || (value.includes('</style>'));
      return !matches ? null : { invalid: true };
    } else {
      return null;
    }
  }

  update() {
    this.submitted = true;

    if (this.mdstateFrmGroup.valid) {
      const mdstateModel = {
        id: this.mdstateFrmGroup.get("id").value,
        description: this.mdstateFrmGroup.get("description").value
      }
      const hdnid = this.mdstateFrmGroup.get("hdnid").value;
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.mdstateServices.update(mdstateModel, hdnid).subscribe(
                {
                  next: (data: any) => {
                    const message = data;
                    this.commonFunctionServices.bindDataTable("mdstateGrid", 0);
                    this.getAll();
                    this.updatehdn = false;
                    this.clear();
                    this.mdstateFrmGroup.controls['id'].enable();
                    this.toastrService.success("Data Updated Successfully");
                    this.submitted = false;
                  },
                  error: (err: any) => {
                    const message = err.message;
                    this.loader.isLoading = false;
                    this.getAll();
                    this.clear();
                    this.toastrService.error("This Record already exists");
                    this.submitted = false;
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
            this.mdstateServices.delete(id).subscribe(
              {
                next: (data: any) => {
                  const message = data;
                  this.commonFunctionServices.bindDataTable("mdstateGrid", 0);
                  this.getAll();
                  this.toastrService.error(message);
                  this.clear();
                },
                error: (err: any) => {

                  this.loader.isLoading = false;
                  if (err.error != null) {
                    if (JSON.stringify(err.error).includes("Data Can't Be Deleted")) {
                      this.toastrService.error("State can't be deleted. Please Delete District Data first.");
                    }
                    else {
                      this.toastrService.error(err.message);
                    }
                  }
                  else {
                    this.toastrService.error(err.message);
                  }
                }
              })
          }
        }
      })
  }

  getAll() {
    this.mdstateServices.getAll().subscribe((data: any) => {
      this.mdstateList = data;
      this.commonFunctionServices.bindDataTable("mdstateGrid", 0);
      this.loaderTimeOut();
    })
  }

  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 2000);
  }
}