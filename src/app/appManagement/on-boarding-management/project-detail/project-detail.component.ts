import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProjectDetailsServices } from 'src/app/shared/services/ProjectDetailsServices';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProjectCreation } from 'src/app/shared/model/projectCreationModel';
import { DatePipe } from '@angular/common';
import { DocumentTypeService } from 'src/app/shared/services/documentTypeService';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { PIDetails } from 'src/app/shared/model/pIDetailsModel';
import { AppOnBoardingRequestService } from 'src/app/shared/services/appOnBoardingRequest';
import { Documents } from 'src/app/shared/model/documentsModel';
import { AppDocumentUploadDetailService } from 'src/app/shared/services/appDocumentUploadedDetailService';
import { ZmstAgencyExamCouns } from 'src/app/shared/services/zmstAgencyExamCouns';
import { ZmstProjectServices } from 'src/app/shared/services/ZmstProjectServices';
import { MdProjectFinancialComponentServices } from 'src/app/shared/services/mdProjectFinancialComponent';
import { AppProjectCost } from 'src/app/shared/model/appProjectCostModel';
import { AppProjectCostService } from 'src/app/shared/services/appProjectCostService';
import { MultiSelectDropdown } from 'src/app/shared/model/multiSelectDropdownModel';
import { ServicesModel } from 'src/app/shared/model/serviceModel';
import { TokenLocalStorageService } from 'src/app/shared/tokenLocalStorage/tokenLocalStorageService';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import { AgencyServices } from 'src/app/shared/services/agencyServices';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { event } from 'jquery';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
import { ZmstServiceTypeService } from 'src/app/shared/services/zmst-service-type.service';
import { AppProjectPaymentDetailsService } from 'src/app/shared/services/app-project-payment-details.service';
import { ConfigurationApiSecureKey } from 'src/app/shared/services/ConfigurationApiSecureKey.Services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  projectId: string;
  rowData: any;
  decSecretKey: string
  decsalt: string
  commonRecords: any = [];
  constructor(private storage: TokenLocalStorageService,
    private appProjectPaymentDetailsService: AppProjectPaymentDetailsService,
    private zmstServiceTypeService: ZmstServiceTypeService,
    private confirmationDialogService: ConfirmationDialogService,
    private agencyUser: AgencyServices, private pdfService: NgxExtendedPdfViewerService,
    private docUploadService: AppDocumentUploadDetailService,
    private zmstProjectService: ZmstProjectServices,
    private ZmstAgencyExamCoun: ZmstAgencyExamCouns,
    private appProjectCostUser: AppProjectCostService,
    private financialUser: MdProjectFinancialComponentServices,
    private documentTypeService: DocumentTypeService,
    private zmstProjectUser: ZmstProjectServices,
    private formBuilder: FormBuilder,
    private users: AppOnBoardingRequestService,
    private toastrService: ToastrService,
    private configurationApiSecureKey: ConfigurationApiSecureKey,
    private datePipe: DatePipe,
    private loader: AfterLoginComponent,
    private route: ActivatedRoute,
    private projectService: ProjectDetailsServices,
    private modalService: NgbModal) {
  }


  @ViewChild('content') popupview !: ElementRef;
  ngOnInit(): void {
    //this.getDecryptionKey();
   // this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey
      this.decsalt = environment.salt
    this.projectId = this.route.snapshot.params['Id'].toString();
    this.projectId = EncyptionDecryption.Decrypt(this.projectId,this.decSecretKey,this.decsalt)
    this.projectId = this.projectId.substring(0, this.projectId.length - 15);
    this.loader.isLoading = true;
    this.projectService.getbyProjectId(this.projectId).subscribe((data: any) => {
      this.rowData = data;
      this.getRecords();
    })

    //})
  }
  getDecryptionKey() {
   // this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey
      this.decsalt = environment.salt
   // })
  }
  getRecords() {
    this.commonRecords = this.rowData;
  }

}