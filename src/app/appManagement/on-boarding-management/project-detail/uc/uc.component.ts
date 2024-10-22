
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenLocalStorageService } from 'src/app/shared/tokenLocalStorage/tokenLocalStorageService';
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
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import { AppProjectActivityModel } from 'src/app/shared/model/app-project-activity.model';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
import { DocTypeEnum } from 'src/app/shared/common/enums/docType.enums';
import { AppOnBoardingRequestService } from 'src/app/shared/services/appOnBoardingRequest';
@Component({
  selector: 'app-uc',
  templateUrl: './uc.component.html',
  styleUrls: ['./uc.component.css']
})
export class UcComponent implements OnInit {
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
  id: any;
  fileextension: string = "";
  documentDetails: Documents[] = [];
  documentType: any;
  zmstProject: any;
  submitted: boolean = false;
  signOffFormGroup: FormGroup;
  dropdownList = [];
  dropdownSettings: IDropdownSettings = {};
  public rowdataMou: any[] = [];
  public rowdataMouSign: any[] = [];
  selectedFile: any = "";
  isavail: number = 0;
  selectedFilePath: any = "";
  selectedFileB64: any = "";
  userRole: string;
  appDocFilter: AppDocFilter;
  uCdocId:any=0;
  signMou:any=0;
  izd:any;
  appProjectActivityModel:AppProjectActivityModel;
  fileUploadValidation:boolean=false;
  selecteFile:any;
  fileExtension:any;
  fileName:any;
  myDate = new Date();
  isavailUC:number=0;
  ipAddress = '_._._._';
  isAvailUcSubmitTime:Date;
  fileExtensionsCount:boolean=false;
  constructor(
    private documentTypeService: DocumentTypeService,
    private route: ActivatedRoute,
    private docUploadService: AppDocumentUploadDetailService,
    private loader: AfterLoginComponent,
    private storage: TokenLocalStorageService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private confirmationDialogService: ConfirmationDialogService,
    private user: AppOnBoardingRequestService,
    ) 
    {
    this.signOffFormGroup = this.formBuilder.group({
      Uploadfile: ['']
    })
  }

  ngOnInit(): void {
    this.getDocumentData();
  }
  
  btndownload(data:any) {
    this.docUploadService.getById(data).subscribe((res: any) => {
      const linkSource = 'data:application/pdf;base64,' + res.docContent;
      const downloadLink = document.createElement('a');
      const fileName = 'UCDocument.pdf';
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    })
  }

  getDocumentData() {
    
    this.appDocFilter = {
      moduleRefId:this.UCData.requestNo,
      docType: "",
      activityId: ActivityEnum.UC
    }
    this.documentTypeService.getByRequestId(this.appDocFilter).subscribe((data: any) => {
      
      this.rowdataMou = data;
      this.isavailUC = this.rowdataMou.filter(x => x.docType == "40").length;
      this.isAvailUcSubmitTime = (this.isavailUC == 0) ? null :this.rowdataMou.filter(x => x.docType == "40")[0].submit;
      this.uCdocId = (this.isavailUC == 0) ? null : this.rowdataMou.filter(x => x.docType == "40")[0].documentId;
    })
    this.dropdownSettings = {
      idField: 'projectId',
      textField: 'projectName',
      enableCheckAll: true,
      noDataAvailablePlaceholderText: "There is no item availabale to show"
    };
  }


  get signOffFormControl() {
    return this.signOffFormGroup.controls;
  }

  handleFileInput(event:any){
    this.selecteFile = event.target.files[0] ;
    const fileNameWithExtension: string = this.selecteFile.name;
    const [fileName, fileExtension] = fileNameWithExtension.split('.');
    this.fileName=fileNameWithExtension;
    this.fileExtension=fileExtension;
    this.fileToUpload = event.target.files[0];
    this.filename = event.target.files[0].name;
    this.filename = event.target.files[0].name;
  if(this.filename.split('.').length>1){
      this.fileExtensionsCount=true;
      return
    }
    this.fileExtensionsCount=false;
    this.fileextension = event.target.files[0].type;
    var size = event.target.files[0].size;
    this.fileSizeValidation = size /(1024*1024) ;
    if (size / (1024*1024) > 10) {
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

  btnSubmit(){
    this.submitted = true;
    if(this.fileSizeValidation>10){
      this.toastrService.error("Please Select Valid Size File");
      return
    }
    if (this.signOffFormGroup.valid && this.fileUploadValidation == false && this.fileExtensionsCount==false) {
      this.confirmationDialogService.confirmPopUp("Do you really want to Submit ?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              if (1 == 1) {
                this.documentDetails[0] = {
                  requestNo: this.UCData.requestNo,
                  documentId: 0,
                  activityid: ActivityEnum.UC,
                  moduleRefId: this.UCData.requestNo,
                  docType: (DocTypeEnum.UC).toString(),
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
                  createdBy:this.storage.ParseToken().userId,
                }
                  this.loader.isLoading = false;
                  this.docUploadService.SaveDocumetAndUpdateStatus(this.documentDetails[0]).subscribe((data: any) => {
                    if (data =="Data Stored Successfully") {
                      this.signOffFormGroup.reset();
                      this.getDocumentData();
                      this.toastrService.success("Data Stored Successfully")
                    }
                  })
              }
            }
          }
        }
        )
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
  btncancel(){
    this.signOffFormGroup.reset();
      this.submitted = false;
  }
  getIPAddress() {
    this.loader.isLoading = true;
    this.user.GetIP().subscribe((res: any) => {
      this.ipAddress = res;
      this.loader.isLoading = false;
    })
  }
}
