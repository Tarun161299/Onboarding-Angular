
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { AppProjectActivityModel } from "src/app/shared/model/app-project-activity.model";
import { AppProjectActivityService } from "src/app/shared/services/app-project-activity.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { EncyptionDecryption } from "src/app/shared/common/EncyptionDecryption";
import { ActivatedRoute } from "@angular/router";
import { ProjectDetailsServices } from "src/app/shared/services/ProjectDetailsServices";
import { ProjectDetailComponent } from "../project-detail/project-detail.component";
import { AppProjectDetails } from "src/app/public/on-boarding-request/z";
import { AppDocumentUploadDetailService } from "src/app/shared/services/appDocumentUploadedDetailService";
import { AppDocFilter } from "src/app/shared/model/appDocFilterModel";
import { ActivityEnum } from "src/app/shared/common/enums/activity.enums";
import { DocumentTypeService } from "src/app/shared/services/documentTypeService";
import { MdStatusEnum } from "src/app/shared/common/enums/MdStatus.enums";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MdYearEnum } from "src/app/shared/common/enums/yearGroup.enums";
import { MdYearServices } from "src/app/shared/services/md-YearService";
import { MdYearModel } from "src/app/shared/model/md-YearModel";
import { ConfigurationApiSecureKey } from "src/app/shared/services/ConfigurationApiSecureKey.Services";
import { DocTypeEnum } from "src/app/shared/common/enums/docType.enums";
import { environment } from "src/environments/environment";

declare const $: any;

@Component({
  selector: "app-app-project-activity",
  templateUrl: "./app-project-activity.component.html",
  styleUrls: ["./app-project-activity.component.css"]
})
export class AppProjectActivityComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  requestId: string;
  rowData: any;
  projectYear: MdYearModel[] = [];
  status: string = '';
  appprojectactivityFrmGroup: FormGroup;
  appprojectactivityModel: any;
  appprojectactivityList: any;
  appDocFilter: AppDocFilter;
  projectdetailListModel: AppProjectDetails;
  projectdetailList: any;
  rowdataStrs: any;
  isavailStRSsign: any;
  isavailStRSUNsign: any;
  unsinSTRS: any = 0;
  signSTRS: any = 0;
  getStatusModel: AppDocFilter;
  approved: boolean = false;
  selectedFileB64: any;
  decSecretKey: string
  decsalt: string

  @ViewChild('content') popupview !: ElementRef;
  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private projectdetailServices: ProjectDetailsServices, private appprojectactivityServices: AppProjectActivityService, private toastrService: ToastrService, private route: ActivatedRoute,
    private projectService: ProjectDetailsServices, private docdownloadService: AppDocumentUploadDetailService, private documentTypeService: DocumentTypeService, private appProjectActivityService: AppProjectActivityService,
    private modalService: NgbModal, private mdYearService: MdYearServices, private configurationApiSecureKey: ConfigurationApiSecureKey) {
    this.appprojectactivityFrmGroup = this.formBuilder.group({
      id: ["", [Validators.required, Validators.required]],
      projectId: ["", [Validators.required, Validators.required]],
      activityId: ["", [Validators.required, Validators.required]],
      status: ["", [Validators.required, Validators.required]],
      submitTime: ["", [Validators.required, Validators.required]],
      ipAddress: ["", [Validators.required, Validators.required]],
    });
  }

  ngOnInit(): void {
    
    //this.getDecryptionKey();
    this.getOnboardingRequestYear();
    //this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey
      this.decsalt = environment.salt
      this.loader.isLoading = true;
      
      
      

      this.requestId = this.route.snapshot.params['id'].toString();
      this.requestId = EncyptionDecryption.Decrypt(this.requestId, this.decSecretKey, this.decsalt);
      this.requestId = this.requestId.substring(0, this.requestId.length - 15);
      this.getProjectServiceDetails();
      this.getByParentRefId();
      this.getCounsDoc();
   // })
  }

  ngAfterViewInit(): void {
    $("#appprojectactivityGrid,#projectdocyGrid")
    // .DataTable({
    //   //dom: "Bfrtip",
    //   //buttons: ["copy", "excel", "csv", "pdf", "print"],
    //   "order": []
    // });
  }

  get appprojectactivityFrmControl() {
    return this.appprojectactivityFrmGroup.controls;
  }

  clear() {
    this.appprojectactivityFrmGroup.reset();
    this.submitted = false;
  }
  getOnboardingRequestYear() {
    this.loader.isLoading = true;
    this.mdYearService
      .getById(MdYearEnum.Onboarding_Project).subscribe({
        next: (res) => {
          this.projectYear = res;
          this.loader.isLoading = false;
        }, error: (err: any) => {
          this.toastrService.error(err);
          this.loader.isLoading = false;
        }
      });
  }
  getProjectServiceDetails() {
    
    
    
    
    this.projectService.getbyId(this.requestId).subscribe({
      next: (data: any) => {
        
        
        
        
        this.rowData = data;
      },
      error: (err: any) => {
      },
    });
  }
  getByParentRefId() {
    this.appprojectactivityServices.GetByParentRefId(this.requestId).subscribe((data: any) => {
      
      this.appprojectactivityList = data;
    })
  }

  getCounsDoc() {
    
    this.projectdetailServices.GetByRequestNo(this.requestId).subscribe((data: any) => {
      this.projectdetailList = data;

      this.loader.isLoading = false;
    })
  }

  btndownload(data: any) {
    this.docdownloadService.getById(data).subscribe((res: any) => {
      const linkSource = 'data:application/pdf;base64,' + res.docContent;
      const downloadLink = document.createElement('a');
      const fileName = 'StRs.pdf';
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    })
  }

  viewDocument(data: any) {
    this.docdownloadService.getById(data).subscribe((res: any) => {
      this.selectedFileB64 = res.docContent;
      this.modalService.open(this.popupview, { size: 'xl' });
    })
  }

  getDocumentData() {
    
    this.appDocFilter = {
      moduleRefId: this.requestId,
      docType: "",
      activityId: ActivityEnum.CounsellingDocuments
    }
    this.documentTypeService.getByRequestId(this.appDocFilter).subscribe((data: any) => {
      this.getstatus();
      this.rowdataStrs = data;
      this.isavailStRSsign = this.rowdataStrs.filter(x => x.docType == DocTypeEnum.StRS_Approval).length;
      this.isavailStRSUNsign = this.rowdataStrs.filter(x => x.docType ==DocTypeEnum.StRS).length;

      this.unsinSTRS = (this.isavailStRSUNsign == 0) ? null : this.rowdataStrs.filter(x => x.docType == DocTypeEnum.StRS)[0].docType;
      this.signSTRS = (this.isavailStRSsign == 0) ? null : this.rowdataStrs.filter(x => x.docType ==DocTypeEnum.StRS_Approval)[0].docType;
      this.loader.isLoading = false;
    })

  }
  getDecryptionKey() {
   // this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey
      this.decsalt = environment.salt
  //  })
  }
  getstatus() {
    this.getStatusModel = {
      moduleRefId: this.requestId,
      docType: "",
      activityId: ActivityEnum.CounsellingDocuments
    }
    this.appProjectActivityService.getById(this.getStatusModel).subscribe((data: any) => {
      if (data.status == MdStatusEnum.Completed) {
        this.approved = true;
      }
    })
  }
}