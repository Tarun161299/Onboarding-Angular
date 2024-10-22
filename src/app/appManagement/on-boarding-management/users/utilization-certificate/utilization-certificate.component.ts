import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenLocalStorageService } from 'src/app/shared/tokenLocalStorage/tokenLocalStorageService';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
import { MultiSelectDropdown } from 'src/app/shared/model/multiSelectDropdownModel';
import { Documents } from 'src/app/shared/model/documentsModel';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { AppDocumentUploadDetailService } from 'src/app/shared/services/appDocumentUploadedDetailService';
import { DocumentTypeService } from 'src/app/shared/services/documentTypeService';
import { ZmstProjectServices } from 'src/app/shared/services/ZmstProjectServices';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDocFilter } from 'src/app/shared/model/appDocFilterModel';
import { ActivityEnum } from 'src/app/shared/common/enums/activity.enums';
import { AppProjectActivityService } from 'src/app/shared/services/app-project-activity.service';
import { AppProjectActivityModel } from 'src/app/shared/model/app-project-activity.model';
import { MdStatusEnum } from 'src/app/shared/common/enums/MdStatus.enums';
import { AppDocumentUploadDetailHistoryService } from 'src/app/shared/services/app-Document-Uploaded.Details.History';
import { ActivatedRoute } from '@angular/router';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import { ConfigurationApiSecureKey } from 'src/app/shared/services/ConfigurationApiSecureKey.Services';
import { DocTypeEnum } from 'src/app/shared/common/enums/docType.enums';
import { ProjectDetailsServices } from 'src/app/shared/services/ProjectDetailsServices';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-utilization-certificate',
  templateUrl: './utilization-certificate.component.html',
  styleUrls: ['./utilization-certificate.component.css']
})
export class UtilizationCertificateComponent implements OnInit {

  @Input() UCData: any;

  @ViewChild('content') popupview !: ElementRef;
  requestId: string;
  base64textString: any
  datacontent: any
  pdfSrc: any
  modifieddate: any
  fileSizeValidation: any
  filename: any
  fileToUpload: any;
  multiSelect: MultiSelectDropdown[] = [];
  id: any;
  fileextension: string = "";
  documentDetails: Documents[] = [];
  documentType: any;
  zmstProject: any;
  submitted: boolean = false;
  utilizationCertificate: FormGroup;
  dropdownList = [];
  dropdownSettings: IDropdownSettings = {};
  public rowdataMou: any[] = [];
  public rowdataMouSign: any[] = [];
  selectedFile: any = "";
  isavailMouunsign: number = 0;
  isavailUC: number = 0;
  selectedFilePath: any = "";
  selectedFileB64: any = "";
  myDate = new Date();
  cyclehide: boolean = false;
  fileUploadValidation: boolean = false;
  userRole: string;
  commonRecords: any = [];
  appDocFilter: AppDocFilter;
  UC: any = 0;
  verified: boolean = false;
  getStatusModel: AppDocFilter;
  projectActivityStatus: AppProjectActivityModel;
  signMou: any = 0;
  appProjectActivityModel: AppProjectActivityModel;
  approved: boolean = false;
  decSecretKey: string;
  rowData:any;
  decsalt: string;
  isAvailUcSubmitTime:Date;
  constructor(
    private modalService: NgbModal,
    private documentTypeService: DocumentTypeService,
    private docUploadService: AppDocumentUploadDetailService,
    private router: ActivatedRoute,
    private configurationApiSecureKey: ConfigurationApiSecureKey,
    private loader: AfterLoginComponent,
    private projectService: ProjectDetailsServices,
    private storage: TokenLocalStorageService,
    private formBuilder: FormBuilder,
  ) {
    this.utilizationCertificate = this.formBuilder.group({
      Uploadfile: ['', [Validators.required]],

    })
  }

  ngOnInit(): void {
    //this.getDecryptionKey();
    //this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey =environment.secretKey
      this.decsalt = environment.salt
      this.loader.isLoading = false;
      this.userRole = this.storage.ParseToken().RoleType;//this.storage.get('Role');
      this.requestId = this.router.snapshot.params['id'].toString();
      this.requestId = EncyptionDecryption.Decrypt(this.requestId, this.decSecretKey, this.decsalt);
      this.requestId = this.requestId.substring(0, this.requestId.length - 15);
      this.getDocumentData();
      this.getProjectServiceDetails();
   // })
  }

  get projectDocumentFormControl() {
    return this.utilizationCertificate.controls;
  }
  getDecryptionKey() {
  //  this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey
      this.decsalt = environment.salt
  //  })
  }
  viewDocument(data: any) {
    this.loader.isLoading = true;
    this.docUploadService.getById(data).subscribe((res: any) => {
      this.selectedFileB64 = res.docContent;
      this.loader.isLoading = false;
      this.modalService.open(this.popupview, { size: 'xl' });
    })
  }

  btndownload(data: any) {
    this.docUploadService.getById(data).subscribe((res: any) => {
      const linkSource = 'data:application/pdf;base64,' + res.docContent;
      const downloadLink = document.createElement('a');
      const fileName = 'utilizationCertificate.pdf';
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    })
  }
  getDocumentData() {
    this.appDocFilter = {
      moduleRefId: this.requestId,
      docType: "",
      activityId: ActivityEnum.UC
    }
    this.documentTypeService.getByRequestId(this.appDocFilter).subscribe((data: any) => {
      this.rowdataMou = data;
      this.isavailUC = this.rowdataMou.filter(x => x.docType == DocTypeEnum.UC).length;
      if (this.isavailUC > 0) {
        this.UC = this.rowdataMou.filter(x => x.docType == DocTypeEnum.UC)[0].documentId;
        this.isAvailUcSubmitTime = this.rowdataMou.filter(x => x.docType == DocTypeEnum.UC)[0].submit;
      }
    })
    this.dropdownSettings = {
      idField: 'projectId',
      textField: 'projectName',
      enableCheckAll: true,
      noDataAvailablePlaceholderText: "There is no item availabale to show"
    };
  }

  getProjectServiceDetails(){
    this.projectService.getbyId(this.requestId).subscribe({
      next:(data:any)=>{
        this.rowData=data;
        this.loader.isLoading=false;
      },
      error:(err:any)=>{
        this.loader.isLoading=false;
      },     
    });
  }
}
