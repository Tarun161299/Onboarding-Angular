import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import { MdStatusEnum } from 'src/app/shared/common/enums/MdStatus.enums';
import { ActivityEnum } from 'src/app/shared/common/enums/activity.enums';
import { DocTypeEnum } from 'src/app/shared/common/enums/docType.enums';
import { AppDocFilter } from 'src/app/shared/model/appDocFilterModel';
import { Documents } from 'src/app/shared/model/documentsModel';
import { ConfigurationApiSecureKey } from 'src/app/shared/services/ConfigurationApiSecureKey.Services';
import { ProjectDetailsServices } from 'src/app/shared/services/ProjectDetailsServices';
import { AppDocumentUploadDetailHistoryService } from 'src/app/shared/services/app-Document-Uploaded.Details.History';
import { AppProjectActivityService } from 'src/app/shared/services/app-project-activity.service';
import { AppDocumentUploadDetailService } from 'src/app/shared/services/appDocumentUploadedDetailService';
import { AppOnBoardingRequestService } from 'src/app/shared/services/appOnBoardingRequest';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
import { DocumentTypeService } from 'src/app/shared/services/documentTypeService';
import { TokenLocalStorageService } from 'src/app/shared/tokenLocalStorage/tokenLocalStorageService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-mou',
  templateUrl: './user-mou.component.html',
  styleUrls: ['./user-mou.component.css'],
})
export class UserMOUComponent implements OnInit {
  requestId: string;
  rowData: any;
  projectYear: string = '';
  appDocFilter: AppDocFilter;
  mouDocument: string = '';
  unsinMou: any = 0;
  signMou: any = 0;
  nicMou: any = 0;
  rowdataMou: any;
  isavailMousign: any;
  selectedFileB64: any;
  isavailMouunsign: any;
  isAvailNICmou: any = 0;
  fileSizeValidation: any
  filename: any
  fileToUpload: any;
  id: any;
  fileextension: string = "";
  modifieddate: any;
  pdfSrc: any;
  fileUploadValidation: any;
  base64textString: any;
  datacontent: any;
  submitted: boolean = false;
  documentCycles: any;
  documentDetails: Documents[] = [];
  getStatusModel: AppDocFilter;
  approved: boolean = false;
  decSecretKey: string;
  decsalt: string;
  selecteFile: any;
  fileExtension: any;
  fileName: any;
  ipAddress = '_._._._';
  unsignedMouSubmitTime: Date;
  signedMouSubmitTime: Date;
  appProjectActivityModel: any;
  fileExtensionsCount:boolean=false;
  @ViewChild('content') popupview !: ElementRef;
  myDate = new Date();
  constructor(
    private loader: AfterLoginComponent,
    private projectService: ProjectDetailsServices,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private docUploadService: AppDocumentUploadDetailService,
    private formBuilder: FormBuilder,
    private documentTypeService: DocumentTypeService,
    private confirmationDialogService: ConfirmationDialogService,
    private datePipe: DatePipe,
    private configurationApiSecureKey: ConfigurationApiSecureKey,
    private storage: TokenLocalStorageService,
    private appProjectActivityService: AppProjectActivityService,
    private appDocumentUploadDetailHistoryService: AppDocumentUploadDetailHistoryService,
    private user: AppOnBoardingRequestService

  ) {
    this.documentCycles = this.formBuilder.group({
      Uploadfile: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    // this.getDecryptionKey();
  //  this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey
      this.decsalt =environment.salt
      this.requestId = this.route.snapshot.params['id'].toString();
      this.requestId = EncyptionDecryption.Decrypt(this.requestId, this.decSecretKey, this.decsalt);
      this.requestId = this.requestId.substring(0, this.requestId.length - 15);
      this.loader.isLoading = true;
      this.getProjectServiceDetails();
      this.getDocumentData();
  //  })
  }

  getProjectServiceDetails() {
    this.projectService.getbyId(this.requestId).subscribe({
      next: (data: any) => {
        this.rowData = data;
        this.loader.isLoading = false;
      },
      error: (err: any) => {
        this.loader.isLoading = false;
      },
    });
  }

  getDecryptionKey() {
  //  this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey
      this.decsalt = environment.salt
   // })
  }
  getDocumentData() {
    this.appDocFilter = {
      moduleRefId: this.requestId,
      docType: "",
      activityId: ActivityEnum.MOU
    }
    this.documentTypeService.getByRequestId(this.appDocFilter).subscribe((data: any) => {

      this.getstatus();
      this.rowdataMou = data;
      this.isavailMousign = this.rowdataMou.filter(x => x.docType == DocTypeEnum.MOU_Signed).length;

      this.isavailMouunsign = this.rowdataMou.filter(x => x.docType == DocTypeEnum.MOU_UnSigned).length;
      this.isAvailNICmou = this.rowdataMou.filter(x => x.docType == DocTypeEnum.NIC_MOU).length;
      this.unsinMou = (this.isavailMouunsign == 0) ? null : this.rowdataMou.filter(x => x.docType == DocTypeEnum.MOU_UnSigned)[0].documentId;
      this.unsignedMouSubmitTime = (this.isavailMouunsign == 0) ? null : this.rowdataMou.filter(x => x.docType == DocTypeEnum.MOU_UnSigned)[0].submit;
      this.signMou = (this.isavailMousign == 0) ? null : this.rowdataMou.filter(x => x.docType == DocTypeEnum.MOU_Signed)[0].documentId;
      this.nicMou = (this.isAvailNICmou == 0) ? null : this.rowdataMou.filter(x => x.docType == DocTypeEnum.NIC_MOU)[0].documentId;
      this.signedMouSubmitTime = (this.isavailMousign == 0) ? null : this.rowdataMou.filter(x => x.docType == DocTypeEnum.MOU_Signed)[0].submit;
      this.loader.isLoading = false;
    })

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
      const fileName = 'userMOU.pdf';
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    })
  }
  handleFileInput(event: any) {
    this.selecteFile = event.target.files[0];
    const fileNameWithExtension: string = this.selecteFile.name;
    const [fileName, fileExtension] = fileNameWithExtension.split('.');
    this.fileName = fileNameWithExtension;
    this.fileExtension = fileExtension;
    this.fileToUpload = event.target.files[0];
    this.filename = event.target.files[0].name;
    this.fileextension = event.target.files[0].type;
    var size = event.target.files[0].size;
    this.fileSizeValidation = size / 1024 * 1024;
    
//this.filename = event.target.files[0].name;
if(event.target.files[0].name.split('.').length>1){
    this.fileExtensionsCount=true;
    return
  }
  this.fileExtensionsCount=false;
    if (size / (1024 * 1024) > 10) {
      return
    }
    this.modifieddate = event.target.files[0].lastModified;
    if (this.fileextension != 'application/pdf') {
      this.fileUploadValidation = true;
      this.toastrService.error('Please Upload Pdf File only');
    } else {
      this.fileUploadValidation = false;
      let $img: any = document.querySelector('#Uploadfile');
      var reader = new FileReader();
      var readerbuffer = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      readerbuffer.onload = this._handleReaderLoaded2.bind(this);
      reader.readAsBinaryString(event.target.files[0]);
      readerbuffer.readAsArrayBuffer($img.files[0]);
    }
  }

  _handleReaderLoaded2(readerEvt: any) {
    let $img: any = document.querySelector('#Uploadfile');
    this.pdfSrc = readerEvt.target.result;
  }
  _handleReaderLoaded(readerEvt: any) {

    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.datacontent = this.base64textString;
    return false;
  }
  get registerFormControl() {
    return this.documentCycles.controls;
  }

  documentSubmit() {
    this.submitted = true;
    if (this.documentCycles.valid && this.fileUploadValidation == false && this.fileExtensionsCount==false) {
      this.confirmationDialogService.confirmPopUp("Do you really want to Submit ?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              if (1 == 1) {
                this.documentDetails[0] = {
                  requestNo: this.requestId,
                  documentId: 0,
                  activityid: ActivityEnum.MOU,
                  moduleRefId: this.requestId,
                  docType: DocTypeEnum.MOU_Signed.toString(),
                  docId: '',
                  docSubject: '',
                  docContent: this.base64textString,
                  docFileName: this.fileName,
                  docContentType: this.fileExtension,
                  objectId: '',
                  objectUrl: '',
                  docNatureId: '',
                  ipAddress: this.ipAddress,
                  subTime: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
                  createdBy: this.storage.ParseToken().userId,
                }
                if (this.isavailMousign != 0) {
                  this.appDocumentUploadDetailHistoryService.save(this.documentDetails[0]).subscribe((data: any) => {
                    this.saveDocument();
                  })
                }
                else {
                  this.saveDocument();
                }

              }
            }
          }
        }
        )
    }
  }
  saveDocument() {
    this.docUploadService.save(this.documentDetails).subscribe((data: any) => {
      const message = data;

      this.loader.isLoading = false;
      this.documentDetails = [];

      this.appProjectActivityModel = {
        id: 0,
        activityParentRefId: this.documentDetails[0].requestNo,
        activityId: Number(ActivityEnum.MOU),
        status: MdStatusEnum.SignedButNotVerified,
        submitTime: "2023-10-19T12:53:17.277Z",
        ipAddress: "",
      }
      this.appProjectActivityService.update(this.appProjectActivityModel).subscribe((data: any) => {
        if (data > 0) {
          this.toastrService.success(message);
          //this.verified = true;
          this.getDocumentData();

        }
      })


    })
  }

  changeStatus() {

  }
  getIPAddress() {
    this.loader.isLoading = true;
    this.user.GetIP().subscribe((res: any) => {
      this.ipAddress = res;
      this.loader.isLoading = false;
    })
  }
  getstatus() {
    this.getStatusModel = {
      moduleRefId: this.requestId,
      docType: "",
      activityId: ActivityEnum.MOU
    }
    this.appProjectActivityService.getById(this.getStatusModel).subscribe((data: any) => {
      if (data.status == MdStatusEnum.Completed) {
        this.approved = true;
      }
    })
  }
}
