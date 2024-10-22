import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
import { ActivityEnum } from 'src/app/shared/common/enums/activity.enums';
import { DocTypeEnum } from 'src/app/shared/common/enums/docType.enums';
import { AppDocFilter } from 'src/app/shared/model/appDocFilterModel';
import { PIDetails } from 'src/app/shared/model/pIDetailsModel';
import { ProjectDetailsServices } from 'src/app/shared/services/ProjectDetailsServices';
import { AppProjectPaymentDetailsService } from 'src/app/shared/services/app-project-payment-details.service';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
import { DocumentTypeService } from 'src/app/shared/services/documentTypeService';
import { TokenLocalStorageService } from 'src/app/shared/tokenLocalStorage/tokenLocalStorageService';

@Component({
  selector: 'app-pi-details',
  templateUrl: './pi-details.component.html',
  styleUrls: ['./pi-details.component.css']
})
export class PIDetailsComponent implements OnInit {
  @Input() piDetailsdata: any;
  pidetails: FormGroup;
  piDetails: PIDetails;
  date: any;
  filename: string = '';
  fileToUpload: File | null = null;
  fileSizeValidation: number;
  pdfSrc: string = '';
  private base64textString: String = '';
  datacontent: String = '';
  ModeType: any;
  selectedFileB64: any = "";
  submittedPi: boolean = false;
  myDate = new Date();
  fileUploadValidation: boolean = false;
  checkData: boolean = false;
  selectedFile: any = "";
  fileextension: string = "";
  selectedFilePath: any = "";
  rowdata: any;
  fileProposal: any;
  fileContentPI: any;
  fileCover: any;
  public rowdataMou: any[] = [];
  public rowdataMouSign: any[] = [];
  dicIdpi: number = 0;
  isavailPI: boolean = false;
  isavailProposal:  boolean = false;
  isavailCoverLetter:  boolean = false;
  Proposal: number = 0;
  CoverLetter: number = 0;
  appDocFilter: AppDocFilter;
  selecteFile:any;
  fileExtension:any;
  fileName:any;
  fileNameCoverLetter:any;
  fileNameProposal:any;
  fileNameUploadPI:any;
  piDocumentSubmitTime:Date;
  proposalDocumentSubmitTime:Date;
  coverLetterSubmitTime:Date;
  checkFileExtensionPI:boolean=false;
  checkFileExtensionProposal:boolean=false;
  checkFileExtensionCoverLetter:boolean=false;
  constructor(private toastrService: ToastrService,private appProjectPaymentDetailsService:AppProjectPaymentDetailsService, private modalService: NgbModal, private storage: TokenLocalStorageService, private documentTypeService: DocumentTypeService, private projectService: ProjectDetailsServices, private loader: AfterLoginComponent, private route: ActivatedRoute, private formBuilder: FormBuilder, private datePipe: DatePipe, private confirmationDialogService: ConfirmationDialogService) {
    this.pidetails = this.formBuilder.group({
      nicProjectCode: [''],
      nicPInumber: [''],//, [Validators.required]
      dataOfPi: [''],//, [Validators.required]
      piAmount: [''],//, [Validators.required]
      uploadPi: [''],//[Validators.required]
      uploadCoverLetter: [''],//, [Validators.required]
      uploadProposal: [''],// [Validators.required]
    })
  }
  @ViewChild('content') popupview !: ElementRef;
  ngOnInit(): void {
    if (this.piDetailsdata.length != 0) {
      this.checkData = true;
    }
    this.getPiDetailsData(this.piDetailsdata)
    this.getDocument();
  }
  getPiDetailsData(rowData: any) {
    
    this.pidetails.patchValue({
      nicProjectCode: rowData.projectCode,
      nicPInumber: rowData.nicsipino,
      dataOfPi: this.Changedateformat(rowData.pidate),
      piAmount: rowData.piamount
    })
    
  }
  Changedateformat(datein: string) {
    this.date = this.datePipe.transform(datein, 'yyyy-MM-dd');
    return this.date;
  }
  get pidetailsFormControl() {
    return this.pidetails.controls;
  }
  piDetailsSubmit() {
    
    this.submittedPi = true;
    if (this.pidetails.valid && this.fileUploadValidation == false && this.checkFileExtensionPI==false && this.checkFileExtensionProposal==false && this.checkFileExtensionCoverLetter==false) {
      this.confirmationDialogService.confirmPopUp("Do you really want to Submit ?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              
              this.piDetails = {
                requestNo: this.piDetailsdata.requestNo,
                projectCode: this.pidetails.get("nicProjectCode").value,
                nicsipino: this.pidetails.get("nicPInumber").value,
                pidate: (this.pidetails.get("dataOfPi").value),//this.pidetails.get("dataOfPi").value=='')? null:(
                piamount: this.pidetails.get("piAmount").value,
                fileContent: this.fileContentPI,
                docType: DocTypeEnum.PI.toString(),
                docTypeProposal: DocTypeEnum.Proposal.toString(),
                docTypeCover: DocTypeEnum.CoverLetter.toString(),
                fileContentProposal: this.fileProposal,
                fileContentCover: this.fileCover,
                docFileNameUploadPI: this.fileNameUploadPI,
                docFileNameCoverLetter: this.fileNameCoverLetter,
                docFileNameProposal: this.fileNameProposal,
                docContentType: this.fileExtension,
                modifyBy: this.storage.ParseToken().userId,
                modifyOn: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
              }
              
              this.projectService.savePIDetails(this.piDetails).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                //this.getDocumentData(); 
                this.getDocument();
                this.toastrService.success(message);
                this.appProjectPaymentDetailsService.refreshpaymentBar("reload");
              })
            }
          }
        }
        )
    }

  }

  viewDocument(doctype: string) {
    const param = {
      ModuleRefId: this.piDetailsdata.requestNo,
      DocType: doctype,
      ActivityId: ActivityEnum.ProposalAndPI
    };
    this.documentTypeService.getByDocType(param).subscribe((data: any) => {
      this.rowdata = data;
      this.selectedFileB64 = data.docContent;
      this.modalService.open(this.popupview, { size: 'xl' });
    })
  }

  reset() {
    this.clearpidetails()
  }

  clearpidetails() {
    this.pidetails.reset();
    for (let control in this.pidetails.controls) {
      this.pidetails.controls[control].setErrors(null);
    }
  }
  download(doctype: string) {
    const param = {
      ModuleRefId: this.piDetailsdata.requestNo,
      DocType: doctype,
      ActivityId: ActivityEnum.ProposalAndPI
    };
    this.documentTypeService.getByDocType(param).subscribe((data: any) => {
      this.rowdata = data;
      this.selectedFileB64 = data.docContent;
    })
    if (this.selectedFileB64 != null) {
      const linkSource = 'data:application/pdf;base64,' + this.selectedFileB64;
      const downloadLink = document.createElement('a');
      const fileName = 'PIDetails.pdf';
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }
  }

  getDocumentData() {
    
    this.appDocFilter = {
      moduleRefId: this.piDetailsdata.requestNo,
      docType: "",
      activityId: ActivityEnum.ProposalAndPI
    }
    this.documentTypeService.getByRequestId(this.appDocFilter).subscribe((data: any) => {
      this.rowdata = data;
      this.loader.isLoading = false;
    })
  }
  numberOnly(event): boolean {
    
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57  ) ) {
      return false;
    }
    if(charCode==46){
     return true;
    }
    return true;
  }

  handleFileInput(event: any, Mode: string) {
      
    this.ModeType = Mode;
    if (this.ModeType == "UploadPI") {
      this.fileToUpload = event.target.files[0];
      if(event.target.files[0].name.split('.').length>1){
        this.checkFileExtensionPI=true
        return
      }
      this.checkFileExtensionPI=false
    this.selecteFile = event.target.files[0] ;
    const fileNameWithExtension: string = this.selecteFile.name;
    const [fileName, fileExtension] = fileNameWithExtension.split('.');
    this.fileNameUploadPI=fileNameWithExtension;
    this.fileExtension=fileExtension;
    }
    if (this.ModeType == "Proposal") {
      if(event.target.files[0].name.split('.').length>1){
        this.checkFileExtensionProposal=true
        return
      }
      this.checkFileExtensionProposal=false
      this.fileToUpload = event.target.files[0];
      this.selecteFile = event.target.files[0] ;
      const fileNameWithExtension: string = this.selecteFile.name;
      const [fileName, fileExtension] = fileNameWithExtension.split('.');
      this.fileNameProposal=fileNameWithExtension;
      this.fileExtension=fileExtension;
    }
    if (this.ModeType == "CoverLetter") {
      if(event.target.files[0].name.split('.').length>1){
        this.checkFileExtensionCoverLetter=true
        return
      }
      this.checkFileExtensionCoverLetter=false
      this.fileToUpload = event.target.files[0];
      this.selecteFile = event.target.files[0] ;
      const fileNameWithExtension: string = this.selecteFile.name;
      const [fileName, fileExtension] = fileNameWithExtension.split('.');
      this.fileNameCoverLetter=fileNameWithExtension;
      this.fileExtension=fileExtension;
    }  
    this.filename = event.target.files[0].name;
    this.fileextension = event.target.files[0].type;
    var size = event.target.files[0].size;
    this.fileSizeValidation = size /(1024*1024) ;
    if (size / (1024*1024) > 10) {
      return
    }
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
    if (this.ModeType == "UploadPI") {
      this.fileContentPI = this.base64textString;
    }
    if (this.ModeType == "Proposal") {
      this.fileProposal = this.base64textString;
    }
    if (this.ModeType == "CoverLetter") {
      this.fileCover = this.base64textString;
    }
    return false;
  }
  getDocument() {
    
    this.appDocFilter = {
      moduleRefId: this.piDetailsdata.requestNo,
      docType: "",
      activityId: ActivityEnum.ProposalAndPI
    }
    this.documentTypeService.usergetByRequestId(this.appDocFilter).subscribe((data: any) => {
      this.rowdataMou = data;
      data.forEach(element => {
        var docType = element.docType;
        
        switch (docType) {
          case "05":
            this.isavailPI = true;
            this.piDocumentSubmitTime = this.rowdataMou.filter(x=>x.docType == DocTypeEnum.PI)[0].submit;
            this.pidetails.controls['uploadPi'].clearValidators();
            this.pidetails.controls['uploadPi'].updateValueAndValidity();
            break;
          case "06":
            this.isavailProposal = true;
            this.proposalDocumentSubmitTime = this.rowdataMou.filter(x=>x.docType == DocTypeEnum.Proposal)[0].submit;
            this.pidetails.controls['uploadProposal'].clearValidators();
            this.pidetails.controls['uploadProposal'].updateValueAndValidity();
            break;
          case "07":
            this.isavailCoverLetter = true;
            this.coverLetterSubmitTime = this.rowdataMou.filter(x=>x.docType == DocTypeEnum.CoverLetter)[0].submit;
            this.pidetails.controls['uploadCoverLetter'].clearValidators();
            this.pidetails.controls['uploadCoverLetter'].updateValueAndValidity();
            break;
        }
      }
      )
    })
  }

  viewPIDetailsDocument(doctype: string) {
    this.viewDocument(doctype);
  }
  viewProposalDocument(doctype: string) {
    this.viewDocument(doctype);
  }

  viewCoverLetterDocument(doctype: string) {
    this.viewDocument(doctype);
  }

  downloadPIDetailsDocument(doctype: string) {
    
    this.download(doctype);
  }

  downloadProposalDocument(doctype: string) {
    this.download(doctype);
  }

  downloadCoverLetterDocument(doctype: string) {
    this.download(doctype);
  }
}
