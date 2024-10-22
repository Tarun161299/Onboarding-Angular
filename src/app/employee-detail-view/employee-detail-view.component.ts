import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeDetailsService } from '../shared/services/employeedetails.service';
import { MdIdTypeService } from '../shared/services/md-idtype.service';
import { QualificationDetailsService } from '../shared/services/qualificationdetails.service';
import { AppDocActivity } from '../shared/model/appDocActivityModel';
import { AppDocumentUploadDetailService } from '../shared/services/appDocumentUploadedDetailService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from "ngx-toastr";
import { EmployeeWorkOrderService } from '../shared/services/employeeworkorder.service';
import { WorkOrderDetailsService } from '../shared/services/workOrderDetailsService ';
import { ProjectDetailsServices } from '../shared/services/ProjectDetailsServices';
import { CommonFunctionServices } from '../shared/common/commonFunction.services';
import { EncyptionDecryption } from '../shared/common/EncyptionDecryption';
import { DomSanitizer } from '@angular/platform-browser';
import { AfterLoginComponent } from '../shared/after-login/after-login.component';
import { AppDocumentWorkOrderService } from '../shared/services/AppDocumentWorkOrderService';
import { DatePipe } from "@angular/common";
import { ActivityEnum } from '../shared/common/enums/activity.enums';
import { DocTypeEnum } from '../shared/common/enums/docType.enums';
import { AppDocFilter } from '../shared/model/appDocFilterModel';
import { ConfigurationApiSecureKey } from '../shared/services/ConfigurationApiSecureKey.Services';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-employee-detail-view',
  templateUrl: './employee-detail-view.component.html',
  styleUrls: ['./employee-detail-view.component.css']
})
export class EmployeeDetailViewComponent implements OnInit {
  employeId: string
  employeedata: any;
  identityData: any
  qualificationdetailsList: any = [];
  appDoc: AppDocActivity;
  docData: any;
  projectCode: string;
  selectedFileB64: string;
  workorderdetailsList: any = [];
  rowData: any;
  imgBase64String: string;
  imageSource: any;
  downloadData: string;
  params: AppDocFilter;
  workOrderid: string;
  encSecretKey: string;
  decSecretKey: string;
  decsalt: string;
  encsalt: string;
  constructor(private employeWorkOrderService: EmployeeWorkOrderService,
    private router: Router,
    private datePipe: DatePipe,
    private loader: AfterLoginComponent,
    private appDocumentWorkOrderService: AppDocumentWorkOrderService,
    private toastrService: ToastrService,
    private sanitizer: DomSanitizer,
    private commonFunctionServices: CommonFunctionServices,
    private projectuser: ProjectDetailsServices,
    private modalService: NgbModal,
    private workOrderDetailsService: WorkOrderDetailsService,
    private route: ActivatedRoute,
    private appDocumentUploadDetailService: AppDocumentUploadDetailService,
    private employeeDetailsService: EmployeeDetailsService,
    private mdIdTypeService: MdIdTypeService,
    private qualificationDetailsService: QualificationDetailsService,
    private employeeWorkOrderService: EmployeeWorkOrderService,
    private configurationApiSecureKey: ConfigurationApiSecureKey) { }
  @ViewChild('content') popupview !: ElementRef;

  ngOnInit(): void {
   // this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey
      this.decsalt = environment.salt
      this.employeId = this.route.snapshot.params['Id'].toString();
      this.employeId = EncyptionDecryption.Decrypt(this.employeId, this.decSecretKey, this.decsalt);
      this.employeId = this.employeId.substring(0, this.employeId.length - 15);
      this.employeeDetailsService.getById(this.employeId).subscribe((data: any) => {
        this.employeedata = data;
        this.getAllIdentityType();
        this.projectListGetAll();
        this.getProfile();
        $('#qualificationdetailsGrid,#workorderdetailsGrid').DataTable({});
      })
  //  })
  }

  ngAfterViewInit(): void {
  }

  getDecryptionKey() {
   // this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey
      this.decsalt = environment.salt
   // })
  }

  getAllIdentityType() {
    this.mdIdTypeService.getAll().subscribe((data: any) => {
      this.identityData = data;
      this.getQualificationDetail();
    })
  }

  getQualificationDetail() {
    this.qualificationDetailsService.getById(this.employeedata.empCode).subscribe((data: any) => {
      this.qualificationdetailsList = data;
      this.getProjectCode();
    })
  }

  viewDocument(data: any) {
    this.loader.isLoading = true;
    this.appDoc = {
      activityId: ActivityEnum.EmployeeQualificationDetails,
      id: data.qualificationDetailsId.toString(),
    }
    this.getDocumentbyProjectId(this.appDoc);
  }

  getDocumentbyProjectId(data: any) {
    this.appDocumentUploadDetailService.getDocumentByRequestId(data).subscribe((data: any) => {
      this.docData = data;
      this.selectedFileB64 = data.docContent;
      this.loader.isLoading = false;
      this.modalService.open(this.popupview, { size: 'xl' });
    })
  }

  getProjectCode() {
    this.employeeWorkOrderService.getById(this.employeedata.empCode).subscribe((data: any) => {
      this.projectCode = data.workorderNo;
      this.getWorkOrderDetails();
    })
  }

  getWorkOrderDetails() {
    this.employeWorkOrderService.GetByEmpCode(this.employeedata.empCode).subscribe((data: any) => {
      this.workorderdetailsList = data;
    })
  }

  showIdDocument(data: any) {
    this.workOrderDetailsService.getByProjectCode(data.workorderNo).subscribe((data: any) => {
      this.workOrderid = data[0].workorderId.toString();
      const param = {
        moduleRefId: this.workOrderid,
        DocType: DocTypeEnum.WorkOrder.toString(),
        ActivityId: ActivityEnum.WorkOrderDetails,
      }
      this.loader.isLoading = true;
      this.appDocumentWorkOrderService.getByDocType(param).subscribe((data: any) => {
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

  viewPdf(data: any) {
    this.loader.isLoading = true;
    this.appDoc = {
      activityId: ActivityEnum.WorkOrderDetails,
      id: data.workorderId.toString(),
    }
    this.getDocumentbyProjectId(this.appDoc);
  }

  projectListGetAll() {
    this.projectuser.getProjectList().subscribe(data => {
      if (data.length > 0) {
        this.rowData = data;
      }
    })
  }

  getProfile() {
    this.params = {
      moduleRefId: this.employeedata.empCode,
      docType: (DocTypeEnum.Photo).toString(),
      activityId: ActivityEnum.EmployeeDetails
    }
    this.appDocumentUploadDetailService.getByDocType(this.params).subscribe((data: any) => {
      this.imgBase64String = data.docContent;
      this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.imgBase64String}`);
    });
  }

  onIconClickDownload(doctype: string) {
    if (doctype == "AddressProof") {
      var doc = (DocTypeEnum.AddressProof).toString()
    }
    if (doctype == "IdProof") {
      var doc = (DocTypeEnum.IdProof).toString()
    }
    this.params = {
      moduleRefId: this.employeedata.empCode,
      docType: doc,
      activityId: ActivityEnum.EmployeeDetails
    }
    this.appDocumentUploadDetailService.getByDocType(this.params).subscribe((data: any) => {

      this.downloadData = data.docContent;
      if (this.downloadData != null) {
        const linkSource = 'data:application/pdf;base64,' + this.downloadData;
        const downloadLink = document.createElement('a');
        const fileName = 'employDetailsDocument.pdf';
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      }
    });
  }

  viewEmployeeDocument(data: any) {
    this.loader.isLoading = true;
    this.params = {
      moduleRefId: data.empCode,
      docType: (DocTypeEnum.IdProof).toString(),
      activityId: ActivityEnum.EmployeeDetails
    }
    this.appDocumentUploadDetailService.getByDocType(this.params).subscribe((data: any) => {
      this.selectedFileB64 = data.docContent;
      this.loader.isLoading = false;
      this.modalService.open(this.popupview, { size: 'xl' });
    });
  }

  showAddressProof(data: any) {
    this.params = {
      moduleRefId: data.empCode,
      docType: (DocTypeEnum.AddressProof).toString(),
      activityId: ActivityEnum.EmployeeDetails
    }
    this.appDocumentUploadDetailService.getByDocType(this.params).subscribe((data: any) => {
      if (data == null) {
        this.toastrService.error('Document not available')
        return;
      }
      this.selectedFileB64 = data.docContent;
      this.modalService.open(this.popupview, { size: 'xl' });
    })
  }

  getRandomNumber() {
    const today = new Date();
    let date = this.datePipe.transform(today, 'YYMMddHHMMSSSSS');
    return date;
  }

  edit(data: any) {
  //  this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.encSecretKey = environment.secretKey
      this.encsalt = environment.salt
      let number = this.getRandomNumber();
      let id = data.empCode.toString();
      let ID = EncyptionDecryption.Encrypt(id + number, this.encSecretKey, this.encsalt);
      this.router.navigate(['/auth/addEmployeeNew/' + ID]);
  //  })
  }
  getEncryptionKey() {
   // this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {

      this.encSecretKey = environment.secretKey
      this.encsalt = environment.salt
   // })
  }

}
