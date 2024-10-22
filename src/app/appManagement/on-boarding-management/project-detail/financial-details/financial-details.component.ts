import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppProjectCostService } from 'src/app/shared/services/appProjectCostService';
import { MdProjectFinancialComponentServices } from 'src/app/shared/services/mdProjectFinancialComponent';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
import { ActivatedRoute } from '@angular/router';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
import { AppProjectCost } from 'src/app/shared/model/appProjectCostModel';
import { TokenLocalStorageService } from 'src/app/shared/tokenLocalStorage/tokenLocalStorageService';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-financial-details',
  templateUrl: './financial-details.component.html',
  styleUrls: ['./financial-details.component.css']
})
export class FinancialDetailsComponent implements OnInit {
  @Input() finanicialdata: any;
  financial: FormGroup;
  projectFinancialComponent: any[];
  addhdn: boolean = false;
  submittedFinancial: boolean = false;
  updatehdn: boolean = true;
  costListData: any[];
  updateprojectCost: AppProjectCost;
  rowData: any;
  myDate = new Date();
  projectCost: AppProjectCost;
  total: number;
  constructor(private storage: TokenLocalStorageService,
    private toastrService: ToastrService, private datePipe: DatePipe, private loader: AfterLoginComponent, private route: ActivatedRoute, private confirmationDialogService: ConfirmationDialogService, private appProjectCostUser: AppProjectCostService, private financialUser: MdProjectFinancialComponentServices, private formBuilder: FormBuilder) {
    this.financial = this.formBuilder.group({
      finacialComponent: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.finanicialdata;
    this.GetAllprojectFinancialComponent();
    this.getProjectCostList(this.finanicialdata.id);
  }

  get FinancialControls() {
    return this.financial.controls;
  }

  GetAllprojectFinancialComponent() {

    this.financialUser.GetAll().subscribe((data: any) => {
      this.projectFinancialComponent = data;
    })
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  edit(list: any) {
    this.financial.patchValue({
      finacialComponent: list.financialComponentId,
      amount: list.amount,
    },
    )
    this.addhdn = true;
    this.updatehdn = false;
    this.financial.controls['finacialComponent'].disable();
  }

  onUpdate() {
    this.submittedFinancial = true;
    if (this.financial.valid) {
      this.confirmationDialogService.confirmPopUp("Do you really want to Update ?")
        .then(confirmed => {
          if (confirmed == true) {
            this.loader.isLoading = true;
            this.updateprojectCost = {
              projectId: this.finanicialdata.id,
              financialComponentId: this.financial.get('finacialComponent').value,
              amount: Number(this.financial.get('amount').value),
              createdBy: null,
              createdOn: "2023-03-31T05:49:44.468Z",
              modifiedBy: this.storage.ParseToken().userId,
              modifiedOn: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
              isActive: true,
            }
            this.appProjectCostUser.update(this.updateprojectCost).subscribe((data: any) => {
              this.getProjectCostList(this.finanicialdata.id);
              const message = data;
              this.loader.isLoading = false;
              this.financial.controls['finacialComponent'].enable();
              this.addhdn = false;
              this.updatehdn = true;
              this.financial.patchValue({
                finacialComponent: "",
                amount: "",
              },)
              this.clearFinanicalComponentFormGroup();
              this.toastrService.success(message);
            })
          }
        }
        )
    }
  }
  clearFinanicalComponentFormGroup() {
    this.financial.reset();
    for (let control in this.financial.controls) {
      this.financial.controls[control].setErrors(null);
    }
  }
  onAdd() {
    this.submittedFinancial = true;
    if (this.financial.valid) {
      this.confirmationDialogService.confirmPopUp("Do you really want to Add ?")
        .then(confirmed => {
          if (confirmed == true) {

            this.loader.isLoading = true;
            this.projectCost = {
              projectId: this.finanicialdata.id,
              financialComponentId: this.financial.get('finacialComponent').value,
              amount: Number(this.financial.get('amount').value),
              createdBy: this.storage.ParseToken().userId,
              createdOn: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
              modifiedBy: null,
              modifiedOn: null,
              isActive: true,
            }
            this.appProjectCostUser.save(this.projectCost).subscribe((data: any) => {
              this.getProjectCostList(this.finanicialdata.id);
              const message = data;
              this.loader.isLoading = false;
              if (message == "Success") {
                this.toastrService.success(message);
              }
              if (message == "Already Exist") {
                this.toastrService.error(message);
              }
              if (message == "Try Again") {
                this.toastrService.error(message);
              }
              this.financial.reset();
              this.submittedFinancial = false;
            })
          }
        }
        )
    }
  }

  getProjectCostList(id: Number) {
    this.appProjectCostUser.getbyId(id).subscribe((data: any) => {
      this.costListData = data;
      this.total = 0;
      for (let i = 0; i < this.costListData.length; i++) {
        this.total = this.total + this.costListData[i].amount;
      }
    })
  }
  deleterow(id: number, projectId: number) {
    this.confirmationDialogService.confirmPopUp("Do you really want to Delete ?")
      .then(confirmed => {
        if (confirmed == true) {
          const financialData = {
            financialComponentId: id,
            projectId: projectId
          }
          this.appProjectCostUser.delete(financialData).subscribe((data: any) => {
            const message = data;
            this.getProjectCostList(this.finanicialdata.id);
            this.toastrService.error(message);
          })
        }
      }
      )
  }
}
