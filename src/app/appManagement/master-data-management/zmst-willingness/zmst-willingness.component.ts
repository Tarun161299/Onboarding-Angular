
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, MaxValidator, ValidationErrors, Validators } from '@angular/forms';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
import { ZmstwillingnessModel } from 'src/app/shared/model/md-zmstwillingness.model';
import { MDZmstWillingnessService } from 'src/app/shared/services/md-zmstwillingness.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
import { TokenLocalStorageService } from 'src/app/shared/tokenLocalStorage/tokenLocalStorageService';
import { CommonFunctionServices } from 'src/app/shared/common/commonFunction.services';
declare const $: any;
@Component({
  selector: 'app-zmst-willingness',
  templateUrl: './zmst-willingness.component.html',
  styleUrls: ['./zmst-willingness.component.css']
})
export class ZmstWillingnessComponent implements OnInit {
  submitted: boolean = false;
  zmstWillingnessFrmGroup: FormGroup;
  zmstwillingnessModelList!: ZmstwillingnessModel[];
  updatehdn: boolean = true;
  submithdn: boolean = false;
  readonly: boolean = false;
  stateList: any;
  token: any;
  constructor(private commonFunctionServices: CommonFunctionServices, private formBuilder: FormBuilder, private loader: AfterLoginComponent, private mdZmstwillingnessService: MDZmstWillingnessService, private toastrService: ToastrService, private confirmationDialogService: ConfirmationDialogService, private storage: TokenLocalStorageService) {
    this.zmstWillingnessFrmGroup = this.formBuilder.group({
      willingnessId: ['', Validators.compose([Validators.required, Validators.maxLength(2),Validators.pattern('^([A-Za-z])|([]+)$'), this.scriptValidator])],
      alternateNames: ['', Validators.compose([Validators.required, Validators.maxLength(200),Validators.pattern('^([A-Za-z])|([]+)$'), this.scriptValidator])],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(500),Validators.pattern('^([A-Za-z])|([]+)$'), this.scriptValidator])],
    });
  }

  ngOnInit(): void {
    this.token = this.storage.get('token');
    this.getAll();
    this.loader.isLoading = false;
  }

  get mdwillingnessFrmControl() {
    return this.zmstWillingnessFrmGroup.controls;
  }
  ngAfterViewInit(): void {
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

  save() {
    this.submitted = true;
    if (this.zmstWillingnessFrmGroup.valid) {
      const zmstwillingnessModel =
      {
        AlternateNames: this.zmstWillingnessFrmGroup.get('alternateNames').value,
        WillingnessId: this.zmstWillingnessFrmGroup.get('willingnessId').value,
        Description: this.zmstWillingnessFrmGroup.get('description').value,
        created_by: '',
        created_date: new Date(),
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.mdZmstwillingnessService.insert(zmstwillingnessModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.getAll();
                  this.clear();
                  this.submitted = false;
                  this.toastrService.success("Data Saved Successfully");
                },
                error: (err: any) => {
                  const message = err.message;
                  this.loader.isLoading = false;
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
  reset() {
    this.clear();
  }
  clear() {
    this.zmstWillingnessFrmGroup.reset();
    this.zmstWillingnessFrmGroup.controls['willingnessId'].enable();
    this.updatehdn = true;
    this.submithdn = false;
    this.submitted = false;
  }

  update() {
    this.submitted = true;
    if (this.zmstWillingnessFrmGroup.valid) {
      const mddistrictmodel =
      {
        AlternateNames: this.zmstWillingnessFrmGroup.get("alternateNames").value,
        WillingnessId: this.zmstWillingnessFrmGroup.get("willingnessId").value,
        Description: this.zmstWillingnessFrmGroup.get("description").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.mdZmstwillingnessService.update(mddistrictmodel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.commonFunctionServices.bindDataTable("tblwillingness", 0);
                  this.getAll();
                  this.updatehdn = false;
                  this.readonly = true;
                  this.clear();
                  if (message != "Try Again") {

                    this.toastrService.success("Update Successfully");
                  }

                  if (message == "Try Again") {
                    this.toastrService.error("Error Occured");
                  }
                }, error: (err: any) => {
                  this.toastrService.error(err);
                }
              })
            }
          }
        })
    }
  }

  delete(WillingnessId: any) {
    this.confirmationDialogService.confirmPopUp("Do you really want to Delete ?")
      .then(confirmed => {
        if (confirmed == true) {
          {
            this.loader.isLoading = true;
            this.mdZmstwillingnessService.delete(WillingnessId).subscribe({
              next: (data: any) => {
                const message = data;
                this.commonFunctionServices.bindDataTable("tblwillingness", 0);
                this.toastrService.error(message);
                this.getAll();
                this.clear();
                this.submitted = false;
              }, error: (err: any) => {
                this.toastrService.error(err);
              }
            });
          }
        }
      })
  }

  getAll() {
    this.mdZmstwillingnessService.getAll().subscribe((data: any) => {
      this.zmstwillingnessModelList = data;
      this.commonFunctionServices.bindDataTable("tblwillingness", 0);
      this.loaderTimeOut();
    });
  }
  edit(data: any) {
    this.updatehdn = false;
    this.submithdn = true;
    this.zmstWillingnessFrmGroup.controls['willingnessId'].disable();
    this.zmstWillingnessFrmGroup.patchValue({
      willingnessId: data.willingnessId,
      alternateNames: data.alternateNames,
      description: data.description,
    },
    )
  }
  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 1000);
  }
}
