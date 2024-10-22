import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
import { MdDistrictModel } from 'src/app/shared/model/md-district.model';
import { MdDistrictService } from 'src/app/shared/services/md-district.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { MdStateService } from 'src/app/shared/services/md-state.service';
import { MdStateModel } from 'src/app/shared/model/md-state.model';

import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
import { TokenLocalStorageService } from 'src/app/shared/tokenLocalStorage/tokenLocalStorageService';
import { CommonFunctionServices } from 'src/app/shared/common/commonFunction.services';
declare const $: any;

@Component({
  selector: 'app-md-district',
  templateUrl: './md-district.component.html',
  styleUrls: ['./md-district.component.css'],
})
export class MdDistrictComponent implements OnInit {
  submitted: boolean = false;
  mddistrictFrmGroup: FormGroup;
  mddistrictModel: MdDistrictModel;
  mddistrictList!: MdDistrictModel[];
  stateList: MdStateModel[];
  updatehdn: boolean = true;
  submithdn: boolean = false;
  token: any;
  districtListTemp:any[];
  stateId:string;
  constructor(
    private commonFunctionServices: CommonFunctionServices,
    private formBuilder: FormBuilder,
    private loader: AfterLoginComponent,
    private mddistrictServices: MdDistrictService,
    private toastrService: ToastrService,
    private stateServices: MdStateService,
    private confirmationDialogService: ConfirmationDialogService,
    private storage: TokenLocalStorageService
  ) {
    this.mddistrictFrmGroup = this.formBuilder.group({
      stateId: ["", [Validators.required]],
      id: ["", [Validators.required, Validators.maxLength(2), Validators.minLength(1), Validators.pattern('^([0-9][0-9]*)|([0]+)$')]],
      description: ['', Validators.compose([Validators.required, Validators.pattern('^([A-Za-z])|([]+)$'), this.scriptValidator])],
    });
  }

  ngOnInit(): void {
    this.token = this.storage.get('token');
    this.getAll();
    this.getStateList();
    this.loader.isLoading = false;
  }

  get mddistrictFrmControl() {
    return this.mddistrictFrmGroup.controls;
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
    if (this.mddistrictFrmGroup.valid) {
      const mddistrictmodel =
      {
        stateId: this.mddistrictFrmGroup.get('stateId').value,
        id: this.mddistrictFrmGroup.get('id').value,
        description: this.mddistrictFrmGroup.get('description').value,
        created_by: '',
        created_date: new Date(),
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.mddistrictServices.insert(mddistrictmodel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.commonFunctionServices.bindDataTable("mddistrictGrid", 0);
                  this.loader.isLoading = true;
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
                  this.submitted = false;
                }
              })
            }
          }
        })
    }
  }
  clear() {
    this.mddistrictFrmGroup.reset();
    this.mddistrictFrmGroup.controls['stateId'].enable();
    this.mddistrictFrmGroup.controls['id'].enable();
    this.updatehdn = true;
    this.submithdn = false;
    this.getStateList();
    this.submitted = false;
  }
  update() {
    this.submitted = true;
    if (this.mddistrictFrmGroup.valid) {
      const mddistrictmodel =
      {
        stateId: this.mddistrictFrmGroup.get("stateId").value,
        id: this.mddistrictFrmGroup.get("id").value,
        description: this.mddistrictFrmGroup.get("description").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.mddistrictServices.update(mddistrictmodel).subscribe((data: any) => {
                const message = data;
                this.commonFunctionServices.bindDataTable("mddistrictGrid", 0);
                this.getAll();
                this.clear();
                this.getStateList();
                this.toastrService.success(message);
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
            this.mddistrictServices.delete(id).subscribe((data: any) => {
              const message = data;
              this.loader.isLoading = true;
              this.commonFunctionServices.bindDataTable("mddistrictGrid", 0);
              this.getAll();
              this.clear();   
              this.toastrService.success(message);
            });
          }
        }
      })
  }

  getAll() {
    this.mddistrictServices.getAll().subscribe((data: any) => {
      this.districtListTemp=data;
      this.mddistrictList = data;
      this.commonFunctionServices.bindDataTable("mddistrictGrid", 0);
      this.loaderTimeOut();
    });
  }

  getStateList() {
    this.stateServices.getAll().subscribe((data: any) => {
      this.stateList = data;
    });
  }

  edit(data: any) {
    this.updatehdn = false;
    this.submithdn = true;
    this.mddistrictFrmGroup.controls['stateId'].disable();
    this.mddistrictFrmGroup.controls['id'].disable();
    this.mddistrictFrmGroup.patchValue({
      stateId: data.stateId,
      id: data.id,
      description: data.description,
    },
    )
  }
  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 2000);
  }

  byStateCode(event: any) {
    this.mddistrictList = this.districtListTemp.filter(x => x.stateId == (this.mddistrictFrmGroup.get("stateId").value == "" ? x.stateId : this.mddistrictFrmGroup.get("stateId").value))
    this.commonFunctionServices.bindDataTable("mddistrictGrid", 0);
    this.stateId = event;
  }
}
