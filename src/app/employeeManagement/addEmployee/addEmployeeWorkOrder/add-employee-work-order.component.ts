import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { employeeWorkOrderModel } from "src/app/shared/model/employeeworkorder.model";
import { EmployeeWorkOrderService } from "src/app/shared/services/employeeworkorder.service";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { EmployeeDetailsService } from "src/app/shared/services/employeedetails.service";
import { WorkOrderDetailsService } from "src/app/shared/services/workOrderDetailsService ";
import { AppDocumentWorkOrderService } from "src/app/shared/services/AppDocumentWorkOrderService";
import { CommonFunctionServices } from "src/app/shared/common/commonFunction.services";
import { ActivityEnum } from "src/app/shared/common/enums/activity.enums";
import { AppDocFilter } from "src/app/shared/model/appDocFilterModel";
import { DocTypeEnum } from "src/app/shared/common/enums/docType.enums";
declare const $: any;

@Component({
  selector: 'app-add-employee-work-order',
  templateUrl: './add-employee-work-order.component.html',
  styleUrls: ['./add-employee-work-order.component.css']
})
export class AddEmployeeWorkOrderComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  employeeworkorderFrmGroup: FormGroup;
  employeeworkorderModel: employeeWorkOrderModel;
  employeeworkorderList: employeeWorkOrderModel[] = [];
  empCodeData: any;
  workOrderData: any;
  selectedFileB64: string;
  empCode: string;
  orderno: string;
  workOrderid: string;
  workorderListTemp: any[];
  params: AppDocFilter;
  constructor(
    private workOrderDetailsService: WorkOrderDetailsService,
    private employeeDetailsService: EmployeeDetailsService,
    private formBuilder: FormBuilder,
    private loader: AfterLoginComponent,
    private confirmationDialogService: ConfirmationDialogService,
    private employeeworkorderServices: EmployeeWorkOrderService,
    private toastrService: ToastrService,
    private appDocumentWorkOrderService: AppDocumentWorkOrderService,
    private modalService: NgbModal, private commonFunctionServices: CommonFunctionServices) {
    this.employeeworkorderFrmGroup = this.formBuilder.group({
      empCode: ["", [Validators.required]],
      workorderNo: ["", [Validators.required]],
    });
  }
  @ViewChild('content') popupview !: ElementRef;
  ngOnInit(): void {
    this.getAll();
    this.getAllEmpCode()
    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#employeeworkorderGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get employeeworkorderFrmControl() {
    return this.employeeworkorderFrmGroup.controls;
  }
  getAllEmpCode() {
    this.employeeDetailsService.getAllEmployee().subscribe((data: any) => {
      this.empCodeData = data
      this.getAllWorkorder()
    })
  }
  
  getAllWorkorder() {
    this.workOrderDetailsService.getactiveworkOrderAll().subscribe((data: any) => {
      this.workOrderData = data;
    })
  }
  reset() {
    this.clear()
  }

  clear() {
    this.employeeworkorderFrmGroup.reset();
    this.getAll();
    this.getAllEmpCode()
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;
    if (this.employeeworkorderFrmGroup.valid) {
      const employeeworkorderModel = {
        empCode: this.employeeworkorderFrmGroup.get("empCode").value,
        workorderNo: this.employeeworkorderFrmGroup.get("workorderNo").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.employeeworkorderServices.insert(employeeworkorderModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.loader.isLoading = false;
                  this.getAll();
                  this.clear();
                  this.toastrService.success("Data Saved Successfully");
                },
                error: (err: any) => {
                  const message = err.message;
                  this.getAll();
                  this.toastrService.error("Already exist");
                }
              })
            }
          }
        })
    }
  }

  edit(data: any) {
    this.updatehdn = true;
    this.employeeworkorderFrmGroup.patchValue({
      empCode: data.empCode,
      workorderNo: data.workorderNo,
    },
    )
  }

  update() {
    this.submitted = true;

    if (this.employeeworkorderFrmGroup.valid) {
      const employeeworkorderModel = {
        empCode: this.employeeworkorderFrmGroup.get("empCode").value,
        workorderNo: this.employeeworkorderFrmGroup.get("workorderNo").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.employeeworkorderServices.update(employeeworkorderModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
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

  delete(data: any) {
    this.confirmationDialogService.confirmPopUp("Do you really want to Delete ?")
      .then(confirmed => {
        if (confirmed == true) {
          {
            this.loader.isLoading = true;
            const workOrderMappingData = {
              empCode: data.empCode,
              workorderNo: data.workorderNo
            }
            this.employeeworkorderServices.delete(workOrderMappingData).subscribe((data: any) => {
              this.loader.isLoading = false;
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
    this.employeeworkorderServices.getAll().subscribe((data: any) => {
      this.workorderListTemp = data;
      this.employeeworkorderList = data;
      this.commonFunctionServices.bindDataTable("employeeworkorderGrid", 0);
      this.loader.isLoading = false;
    })
  }
  showIdDocument(data: any) {
    this.workOrderDetailsService.getByProjectCode(data.workorderNo).subscribe((data: any) => {
      this.workOrderid = data[0].workorderId.toString();
      this.params = {
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
      })
    })
  }

  byEmpCode(event: any) {
    
    this.employeeworkorderList = this.workorderListTemp.filter(x => x.empCode == (this.employeeworkorderFrmGroup.get("empCode").value == "" ? x.empCode : this.employeeworkorderFrmGroup.get("empCode").value) &&
      x.workorderNo == (this.employeeworkorderFrmGroup.get("workorderNo").value == "" ? x.workorderNo : this.employeeworkorderFrmGroup.get("workorderNo").value))
    this.commonFunctionServices.bindDataTable("employeeworkorderGrid", 0);
    this.empCode = event;
  }

  getWorkOrderByCode(empCode: string) {
    this.employeeworkorderServices.GetByEmpCode(empCode).subscribe((data: any) => {
      this.loader.isLoading = false;
      this.employeeworkorderList = data;
      this.commonFunctionServices.bindDataTable("employeeworkorderGrid", 0);
    })
  }
}