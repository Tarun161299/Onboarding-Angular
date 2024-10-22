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
import { ActivityEnum } from 'src/app/shared/common/enums/activity.enums';
import { CommonFunctionServices } from 'src/app/shared/common/commonFunction.services';
import { AppDocFilter } from 'src/app/shared/model/appDocFilterModel';
import { AppOnBoardingRequestService } from 'src/app/shared/services/appOnBoardingRequest';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  @Input() Documentsdata: any;
  requestId: any;
  multiSelect: MultiSelectDropdown[] = [];
  id: any;
  fileextension: string = "";
  documentDetails: Documents[] = [];
  documentType: any;
  zmstProject: any;
  submittedDocument: boolean = false;
  documentCycles: FormGroup;
  dropdownList = [];
  dropdownSettings: IDropdownSettings = {};
  public rowdata!: any[];
  selectedFile: any = "";
  selectedFilePath: any = "";
  selectedFileB64: any = "";
  myDate = new Date();
  cyclehide: boolean = false;
  fileUploadValidation: boolean = false;
  userRole: string;
  commonRecords: any = [];
  getRecordByReq: AppDocFilter;
  pptData: any;
  showViewer: any;
  selecteFile: any;
  fileExtension: any;
  fileName: any;
  imgSource: any;
  ipAddress = '_._._._';
  fileExtensionsCount:boolean=false;
  getDocuments: any;
  constructor(
    private commonFunctionServices: CommonFunctionServices,
    private modalService: NgbModal,
    private zmstProjectService: ZmstProjectServices,
    private documentTypeService: DocumentTypeService,
    private docUploadService: AppDocumentUploadDetailService,
    private toastrService: ToastrService,
    private datePipe: DatePipe,
    private loader: AfterLoginComponent,
    private confirmationDialogService: ConfirmationDialogService,
    private storage: TokenLocalStorageService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private user: AppOnBoardingRequestService) {
    this.documentCycles = this.formBuilder.group({
      docType: ['', [Validators.required]],
      subject: ['', Validators.compose([Validators.required, Validators.pattern("^[A-Za-z. ]+$")])],
      chooseFile: ['', [Validators.required]],
    })
  }

  @ViewChild('content') popupview !: ElementRef;
  @ViewChild('image') imageView !: ElementRef;
  ngOnInit(): void {
    this.userRole = this.storage.ParseToken().RoleType//.get('RoleType');
    this.documentData();
    this.getAllDocumentData();
    $('#projectDetailsDocuments').DataTable({
    });
  }

  get projectDocumentFormControl() {
    return this.documentCycles.controls;
  }

  onSelectDocumentType(event: any) {
    this.id = event.target.value;
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

  documentSubmit() {
    this.submittedDocument = true;
    if (this.documentCycles.valid && this.fileUploadValidation == false && this.fileExtensionsCount==false) {
      this.confirmationDialogService.confirmPopUp("Do you really want to Submit ?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.documentDetails[0] = {
                requestNo: this.Documentsdata.requestNo,
                documentId: 0,
                activityid: (this.id == '08') ? ActivityEnum.StRS : (this.id == '10') ? ActivityEnum.UAT : ActivityEnum.CounsellingDocuments,
                moduleRefId: this.Documentsdata.requestNo,
                docType: this.id,
                docId: '',
                docSubject: this.documentCycles.get('subject').value,
                docContent: this.selectedFileB64,
                docFileName: this.fileName,
                docContentType: this.fileExtension,
                objectId: '',
                objectUrl: '',
                docNatureId: '',
                ipAddress: this.ipAddress,
                subTime: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
                createdBy:this.storage.ParseToken().userId,
              }
              this.docUploadService.save(this.documentDetails).subscribe((data: any) => {
                const message = data;
                this.getAllDocumentData();
                this.loader.isLoading = false;
                this.documentDetails = [];
                this.toastrService.success(message);
              })
            }
          }
        }
        )
    }
  }

  resetdocumentCycles() {
    this.cleardocumentCycles()
  }

  cleardocumentCycles() {
    this.documentCycles.reset();
    for (let control in this.documentCycles.controls) {
      this.documentCycles.controls[control].setErrors(null);
    }
  }

  delete(data: any) {
    this.confirmationDialogService.confirmPopUp("Do you really want to Delete ?")
      .then(confirmed => {
        if (confirmed == true) {
          {
            this.docUploadService.deleteByDocumentId(data).subscribe({
              next: (data: any) => {

                const message = data;
                this.toastrService.error(message);
                this.documentData();
                this.getAllDocumentData();
              }, error: (err: any) => {
                this.toastrService.error(err);
              }
            });
          }
        }
      })
  }

  viewDocument(data: any) {
    this.loader.isLoading = true;
    this.docUploadService.getById(data).subscribe((res: any) => {
      this.selectedFileB64 = res.docContent;
      this.loader.isLoading = false;

      let fileFormat = this.getFileExtension(this.selectedFileB64)
      if (fileFormat == '.jpg' || fileFormat == '.png' || fileFormat == '.jpeg' || fileFormat == '.jpeg') {
        this.imgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.selectedFileB64}`);
        this.modalService.open(this.imageView, { size: 'lg', windowClass: 'custom-modal-size' });
        return
      }
      else if (fileFormat == '.doc' || fileFormat == '.docx' || fileFormat == '.ppt') {
        alert("This document cannot be viewed. Please download it.")
        return
      }

      else if (fileFormat == '.dat') {
        this.modalService.open(this.popupview, { size: 'xl' });
      }
    })
  }

  getPermissionToView(fileFormat: any): any {
    if (fileFormat == '.jpg' || fileFormat == '.png' || fileFormat == '.jpeg' || fileFormat == '.jpeg' || fileFormat == '.pdf' || fileFormat == 'pdf' || fileFormat == 'img' || fileFormat == 'PDF') {
      return true
    }
    else {
      return false
    }
  }


  getFileExtension(data: string): string {
    const binaryData = atob(data);
    const headerBytes = binaryData.substring(0, 4);
    const signatures: { [key: string]: string } = {
      "\x89PNG": '.png',
      "GIF8": '.gif',
      "\xFF\xD8\xFF\xE0": '.jpg',
      "\xFF\xD8\xFF\xDB": '.jpg',
      "%PDF-": '.pdf',
      "\xFF\xD8\xFF\xE1": '.jpeg',
      "\xD0\xCF\x11\xE0": '.ppt',
      "\x50\x4B\x03\x04\x06\x00\x08\x00": '.pptx',
      //"\xD0\xCF\x11\xE0": '.ppt', // PPT signature
      "\x50\x4B\x03\x04": '.docx', // DOCX signature
      "\xD0\xCF\x11\xE0\xA1\xB1\x1A\xE1": '.doc', // DOC signature
      // "\xD0\xCF\x11\xE0\xA1\xB1\x1A\xE1": '.doc', // DOC signature
      // "\x50\x4B\x03\x04\x14\x00\x06\x00": '.docx', // DOCX sign

      // Add more file signatures as needed
    };

    for (const signature in signatures) {
      if (headerBytes.startsWith(signature)) {
        return signatures[signature];
      }
    }
    return '.dat';
  }


  btndownload(data: any, subject: string) {
    this.loader.isLoading = true;
    this.docUploadService.getById(data).subscribe((res: any) => {
      this.loader.isLoading = false;
      const linkSource = 'data:application/pdf;base64,' + res.docContent;
      // let format = this.getFileExtension(res.docContent);
      const downloadLink = document.createElement('a');
      const fileName = 'Documents.' + subject;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    })
  }

  getExtensionFromFileName(subject: string): string {

    if (subject.indexOf('.jpg') != -1) {
      return '.jpg'
    }
    if (subject.indexOf('.ppt') != -1) {
      return '.ppt'
    }
    if (subject.indexOf('.pptx') != -1) {
      return '.pptx'
    }
    if (subject.indexOf('.doc') != -1) {
      return '.doc'
    }
    if (subject.indexOf('.jpeg') != -1) {
      return '.jpeg'
    }
    if (subject.indexOf('.docx') != -1) {
      return '.docx'
    }

    return ".pdf"
  }

  getAllDocumentData() {
    this.getDocuments = {
      moduleRefId: this.Documentsdata.requestNo,
      role: this.userRole
    }
    this.docUploadService.ModuleRefId(this.getDocuments).subscribe((data: any) => {

      this.rowdata = data;
      this.commonFunctionServices.bindDataTable("projectDetailsDocuments", 0);
      this.loader.isLoading = false;
    })
  };

  getIPAddress() {
    this.loader.isLoading = true;
    this.user.GetIP().subscribe((res: any) => {
      this.ipAddress = res;
      this.loader.isLoading = false;
    })
  }

  documentData() {
    this.documentTypeService.getbyRoleId(this.userRole).subscribe((data: any) => {
      this.documentType = data;
      this.zmstProjectService.GetbyId(this.Documentsdata.id).subscribe((data: any) => {
        this.zmstProject = data;
      })
    })
  }

  handleFileInput(event: any) {
    this.selecteFile = event.target.files[0];
    const fileNameWithExtension: string = this.selecteFile.name;
    const [fileName, fileExtension] = fileNameWithExtension.split('.');
    this.fileName = fileNameWithExtension;
    this.fileExtension = fileExtension;
  if(this.selecteFile.split('.').length>1){
      this.fileExtensionsCount=true;
      return
    }

    if (event.target.files[0] == undefined) {
      this.selectedFileB64 = "";
    }
    this.selectedFile = event.target.files[0] ?? null;
    this.fileextension = event.target.files[0].type;
    // if (this.fileextension == "application/vnd.ms-excel" || this.fileextension == "image/png") {
    //   this.fileUploadValidation = true;
    //   this.toastrService.error('Excel and PNG file are not Allowed !');
    // }
    //  else if (this.selectedFile) {
    this.fileUploadValidation = false;
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);   //read file as data url
    reader.onload = (event) => {
      let path = event.target == null ? '' : event.target.result;
      this.selectedFilePath = path as string;
      this.selectedFileB64 = this.selectedFilePath.split(",")[1];
    }
    //}
  }
}
