import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
import { employeeWorkOrderModel } from 'src/app/shared/model/employeeworkorder.model';
import { EmployeeDetailsService } from 'src/app/shared/services/employeedetails.service';
import { EmployeeWorkOrderService } from 'src/app/shared/services/employeeworkorder.service';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
import { CommonFunctionServices } from 'src/app/shared/common/commonFunction.services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkOrderDetailsService } from 'src/app/shared/services/workOrderDetailsService ';
import { AppDocumentWorkOrderService } from 'src/app/shared/services/AppDocumentWorkOrderService';
import { ActivityEnum } from 'src/app/shared/common/enums/activity.enums';
import { AppDocFilter } from 'src/app/shared/model/appDocFilterModel';
import { DocTypeEnum } from 'src/app/shared/common/enums/docType.enums';


@Component({
  selector: 'app-add-work-order',
  templateUrl: './add-work-order.component.html',
  styleUrls: ['./add-work-order.component.css'],
})
export class AddWorkOrderComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  employeeworkorderFrmGroup: FormGroup;
  employeeworkorderModel: employeeWorkOrderModel;
  employeeworkorderList: employeeWorkOrderModel[];
  empCodeData: any;
  workOrderData: any;
  workOrderid: string;
  selectedFileB64: string;
  employeeCode: string;
  params: AppDocFilter;
  constructor(
    private modalService: NgbModal,
    private commonFunctionServices: CommonFunctionServices,
    private formBuilder: FormBuilder,
    private confirmationDialogService: ConfirmationDialogService,
    private employeeworkorderServices: EmployeeWorkOrderService,
    private workOrderDetailsService: WorkOrderDetailsService,
    private appDocumentWorkOrderService: AppDocumentWorkOrderService,
    private toastrService: ToastrService,
    private loader: AfterLoginComponent
  ) {
    this.employeeworkorderFrmGroup = this.formBuilder.group({
      workorderNo: ['', [Validators.required]],
    });
  }
  @ViewChild('content') popupview!: ElementRef;
  @Input() workOrderDetails: any;
  ngOnInit(): void {
    this.getAllWorkorder();
    this.getWorkOrderByCode(this.workOrderDetails);
    this.loader.isLoading = false;
  }
  get employeeworkorderFrmControl() {
    return this.employeeworkorderFrmGroup.controls;
  }
  getAllWorkorder() {
    this.workOrderDetailsService.getAll().subscribe((data: any) => {
      this.workOrderData = data;
    });
  }
  reset() {
    this.clear();
  }

  clear() {
    this.employeeworkorderFrmGroup.reset();
    for (let control in this.employeeworkorderFrmGroup.controls) {
      this.employeeworkorderFrmGroup.controls[control].setErrors(null);
    }
  }

  save() {
    this.submitted = true;
    
    if (this.employeeworkorderFrmGroup.valid) {
      this.employeeworkorderModel = {
        empName: '',
        empCode: this.workOrderDetails.toString(),
        workorderNo: this.employeeworkorderFrmGroup.get('workorderNo').value,
        workorderFrom:null,//(new Date()).toString(),
        workorderTo:null,//(new Date()).toString(),
        agencyName:'',
      };
      this.confirmationDialogService
        .confirmPopUp('Do you really want to Save?')
        .then((confirmed) => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.employeeworkorderServices
                .insert(this.employeeworkorderModel)
                .subscribe({
                  next: (data: any) => {
                    
                    const message = data;
                    this.loader.isLoading = false;
                    this.getWorkOrderByCode(this.workOrderDetails);
                    this.clear();
                    this.getAllWorkorder();
                    this.toastrService.success('Data Saved Successfully');
                  },
                  error: (err: any) => {
                    this.loader.isLoading = false;
                    this.getWorkOrderByCode(this.workOrderDetails);
                    this.clear();
                    this.getAllWorkorder();
                    this.toastrService.error('Already Exist');
                  },
                });
            }
          }
        });
    }
  }

  edit(data: any) {
    this.updatehdn = true;
    this.employeeworkorderFrmGroup.patchValue({
      workorderNo: data.workorderNo,
    });
  }

  update() {
    this.submitted = true;
    if (this.employeeworkorderFrmGroup.valid) {
      this.employeeworkorderModel = {
        empName: '',
        empCode: this.workOrderDetails,
        workorderFrom:'',
        workorderTo:'',
        agencyName:'',
        workorderNo: this.employeeworkorderFrmGroup.get('workorderNo').value,
      };

      this.confirmationDialogService
        .confirmPopUp('Do you really want to Update?')
        .then((confirmed) => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.employeeworkorderServices
                .update(this.employeeworkorderModel)
                .subscribe((data: any) => {
                  const message = data;
                  this.loader.isLoading = false;
                  this.getWorkOrderByCode(this.workOrderDetails);
                  this.updatehdn = false;
                  this.clear();
                  this.toastrService.success(message);
                });
            }
          }
        });
    }
  }

  delete(data: any) {
    this.confirmationDialogService
      .confirmPopUp('Do you really want to Delete ?')
      .then((confirmed) => {
        if (confirmed == true) {
          {
            this.loader.isLoading = true;
            const workOrderData = {
              empCode: data.empCode,
              workorderNo: data.workorderNo,
            };
            this.employeeworkorderServices
              .delete(workOrderData)
              .subscribe((data: any) => {
                this.loader.isLoading = false;
                const message = data;
                this.toastrService.error(message);
                this.clear();
                this.getAllWorkorder();
                this.getWorkOrderByCode(this.workOrderDetails);
              });
          }
        }
      });
  }
  getWorkOrderdetail(workOrderNo: string) {
    this.workOrderDetailsService
      .getByProjectCode(workOrderNo)
      .subscribe((data: any) => {
        this.workOrderid = data[0].workorderId.toString();
      });
  }
  showIdDocument(data: any) {
    this.workOrderDetailsService.getByProjectCode(data.workorderNo).subscribe((data: any) => {
        this.workOrderid = data[0].workorderId.toString();
         this.params  = {
          moduleRefId: this.workOrderid,
          docType: DocTypeEnum.WorkOrder.toString(),
          activityId: ActivityEnum.WorkOrderDetails,
        };
        this.loader.isLoading = true;
        this.appDocumentWorkOrderService.getByDocType(this.params).subscribe((data: any) => {        
          if (data == null) {
            this.loader.isLoading = false;
            this.toastrService.error('Document not available')
            return;
          }
            this.loader.isLoading = false;
            this.selectedFileB64 = data.docContent;
            this.modalService.open(this.popupview, { size: 'xl' });
          });
      });    
  }

  getWorkOrderByCode(empCode: string) {
    this.employeeworkorderServices
      .GetByEmpCode(empCode)
      .subscribe((data: any) => {
        this.loader.isLoading = false;
        this.employeeworkorderList = data;
        this.commonFunctionServices.bindDataTable('#employeeworkorderGrid', 0);
      });
  }
}
