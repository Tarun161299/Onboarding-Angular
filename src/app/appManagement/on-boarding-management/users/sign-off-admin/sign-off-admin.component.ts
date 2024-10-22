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
import { DocTypeEnum } from 'src/app/shared/common/enums/docType.enums';
import { AppOnBoardingRequestService } from 'src/app/shared/services/appOnBoardingRequest';
import { ProjectDetailsServices } from 'src/app/shared/services/ProjectDetailsServices';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import { ConfigurationApiSecureKey } from 'src/app/shared/services/ConfigurationApiSecureKey.Services';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-off-admin',
  templateUrl: './sign-off-admin.component.html',
  styleUrls: ['./sign-off-admin.component.css']
})
export class SignOffAdminComponent implements OnInit {
  @Input() signOff: any;

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
  SignOffForm: FormGroup;
  dropdownList = [];
  dropdownSettings: IDropdownSettings = {};
  public rowdataMou: any[] = [];
  public rowdataMouSign: any[] = [];
  selectedFile: any = "";
  isavailSignOff: number = 0;
  isavailMousign: number = 0;
  selectedFilePath: any = "";
  selectedFileB64: any = "";
  myDate = new Date();
  cyclehide: boolean = false;
  fileUploadValidation: boolean = false;
  userRole: string;
  commonRecords: any = [];
  appDocFilter: AppDocFilter;
  signoffdocId: any = 0;
  verified: boolean = false;
  getStatusModel:AppDocFilter;
  projectActivityStatus:AppProjectActivityModel;
  signMou: any = 0;
  appProjectActivityModel: AppProjectActivityModel;
  approved:boolean=false;
  rowData:any;
  decSecretKey: string
  decsalt: string
  ipAddress = '_._._._';
  signOffSubmitTime:Date;
  constructor(
    private modalService: NgbModal,
    private zmstProjectService: ZmstProjectServices,
    private documentTypeService: DocumentTypeService,
    private docUploadService: AppDocumentUploadDetailService,
    private toastrService: ToastrService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private configurationApiSecureKey: ConfigurationApiSecureKey,
    private loader: AfterLoginComponent,
    private confirmationDialogService: ConfirmationDialogService,
    private storage: TokenLocalStorageService,
    private projectService: ProjectDetailsServices,
    private formBuilder: FormBuilder,
    private appProjectActivityService: AppProjectActivityService,
    private appDocumentUploadDetailHistoryService: AppDocumentUploadDetailHistoryService,
  private user: AppOnBoardingRequestService,
  ) {
    this.SignOffForm = this.formBuilder.group({
      Uploadfile: [''],

    })
  }

  ngOnInit(): void {
   //  this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey
      this.decsalt = environment.salt
    this.requestId = this.route.snapshot.params['id'].toString();
    this.requestId = EncyptionDecryption.Decrypt(this.requestId,this.decSecretKey,this.decsalt);
    this.requestId = this.requestId.substring(0, this.requestId.length - 15);
    this.userRole = this.storage.ParseToken().RoleType;
    this.getDocumentData();
    this.getProjectServiceDetails();
  //})
}

  get projectDocumentFormControl() {
    return this.SignOffForm.controls;
  }

  onSelectDocumentType(event: any) {
    this.id = event.target.value;
    if (this.id != "03" && this.id != "09" && this.id != "05" && this.id != "02") {
      this.cyclehide = false;
      this.SignOffForm.controls['cycle'].setValidators([Validators.required]);
      this.SignOffForm.controls['cycle'].updateValueAndValidity();
    }
    else {
      this.cyclehide = true;
      this.SignOffForm.controls['cycle'].clearValidators();
      this.SignOffForm.controls['cycle'].updateValueAndValidity();
    }
  }

  onItemSelect(item: any) {
    this.multiSelect = [...this.multiSelect, item];
  }

  onSelectAll(item: any) {
    this.multiSelect = item;
  }

  onItemDeSelect(item: any) {
    this.multiSelect = this.multiSelect.filter((user) => user.projectId !== item.projectId);
  }

  onUnSelectAll() {
    this.multiSelect = null;
  }


  resetdocumentCycles() {
    this.cleardocumentCycles()
  }

  cleardocumentCycles() {
    this.SignOffForm.reset();
    for (let control in this.SignOffForm.controls) {
      this.SignOffForm.controls[control].setErrors(null);
    }
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
      const fileName = 'SignOffAndDataHandover.pdf';
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    })
  }
  getDocumentData() {
    this.appDocFilter = {
      moduleRefId: this.requestId,
      docType: "45",
      activityId: ActivityEnum.SignOffAndDataHandover
    }
    this.documentTypeService.getByRequestId(this.appDocFilter).subscribe((data: any) => {
      this.rowdataMou = data;
      
      
      
      
      
      
      
      this.isavailSignOff = this.rowdataMou.filter(x => x.docType == DocTypeEnum.SignOffAndDataHandover).length;
      if(this.isavailSignOff>0){
        this.signoffdocId=this.rowdataMou.filter(x => x.docType ==DocTypeEnum.SignOffAndDataHandover)[0].documentId;
        this.signOffSubmitTime = this.rowdataMou.filter(x => x.docType == DocTypeEnum.SignOffAndDataHandover.toString())[0].submit;
      }
    })
    this.dropdownSettings = {
      idField: 'projectId',
      textField: 'projectName',
      enableCheckAll: true,
      noDataAvailablePlaceholderText: "There is no item availabale to show"
    };
  }

  get registerFormControl() {
    return this.SignOffForm.controls;
  }
  // documentData() {
  //   this.documentTypeService.getbyRoleId(this.userRole).subscribe((data: any) => {
  //     this.documentType = data;
  //     this.zmstProjectService.GetbyId(this.signOff.id).subscribe((data: any) => {
  //       this.zmstProject = data;
  //     })
  //   })
  // }
  verifiedMou() {
    this.confirmationDialogService.confirmPopUp("Do you really want to Verify this document?")
      .then(confirmed => {
        if (confirmed == true) {
          {
            this.appProjectActivityModel = {
              id: 0,
              activityParentRefId: this.signOff.requestNo,
              activityId: Number(ActivityEnum.MOU),
              status: MdStatusEnum.Completed,
              submitTime: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
              ipAddress: this.ipAddress,
            }
            this.appProjectActivityService.update(this.appProjectActivityModel).subscribe((data: any) => {
              if (data > 0) {
                this.toastrService.success("Document Verified")
                this.verified = true;
              }
            })
          }
        }
      })
  }
  getIPAddress() {
    this.loader.isLoading = true;
    this.user.GetIP().subscribe((res: any) => {
      this.ipAddress = res;
      this.loader.isLoading = false;
    })
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
