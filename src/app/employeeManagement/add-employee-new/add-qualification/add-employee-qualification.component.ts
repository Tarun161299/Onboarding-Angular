import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { qualificationDetailsModel } from 'src/app/shared/model/qualificationdetails.model';
import { QualificationDetailsService } from 'src/app/shared/services/qualificationdetails.service';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
import { MdExamService } from 'src/app/shared/services/mdExamService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDocumentUploadDetailService } from 'src/app/shared/services/appDocumentUploadedDetailService';
import { AppDocActivity } from 'src/app/shared/model/appDocActivityModel';
import { EmployeeDetailsService } from 'src/app/shared/services/employeedetails.service';
import { ActivityEnum } from 'src/app/shared/common/enums/activity.enums';
import { DocTypeEnum } from 'src/app/shared/common/enums/docType.enums';

@Component({
  selector: 'app-add-employee-qualification',
  templateUrl: './add-employee-qualification.component.html',
  styleUrls: ['./add-employee-qualification.component.css']
})
export class AddEmployeeQualificationComponent implements OnInit {
  @Input() qualDetails: any;
  qualSubmit: boolean = false;
  qualificationdetails: boolean = false;
  qualificationdetailsFrmGroup: FormGroup;
  qualificationdetailsModel: qualificationDetailsModel;
  base64textString: string;
  fileUploadValidation: boolean = false;
  modifiedDate: any;
  fileToUpload: any;
  filename: string;
  fileextension: any;
  pdfSrc: string;
  dataContentDocumentUpload: string;
  datacontentUploadPhoto: string;
  dataContentAddressProof: string;
  employeCode: any;
  examData: any = [];
  certificate: boolean = false;
  selectedFileB64: any;
  showQualiDoc: any;
  updatehdn: boolean = false;
  submitted: boolean = false;
  qulifiBtn: boolean = true;
  appDoc: AppDocActivity;
  docData: any;
  qualificationdetailsList: qualificationDetailsModel[] = [];
  submithdn: boolean = true;
  selecteFile:any;
  fileExtension:any;
  fileName:any;
  fileExtensionsCount:boolean=false;
  constructor(private employeeDetailsService: EmployeeDetailsService, private appDocumentUploadDetailService: AppDocumentUploadDetailService, private modalService: NgbModal, private mdExamUser: MdExamService, private loader: AfterLoginComponent, private toastrService: ToastrService, private confirmationDialogService: ConfirmationDialogService, private qualificationdetailsServices: QualificationDetailsService, private formBuilder: FormBuilder) {
    this.qualificationdetailsFrmGroup = this.formBuilder.group({
      qualificationDetailsId: [],
      empCode: [""],
      uploadCertificate: ["", [Validators.required]],
      examPassed: ["", [Validators.required]],
      boardUniv: ["", [Validators.required]],
      passYear: ["", [Validators.required]],
      division: ["", [Validators.required]],
    });
  }
  @ViewChild('content') popupview !: ElementRef;
  ngOnInit(): void {
    this.getAllExam();
    this.qualificationdetailsFrmControl.division.setValue(0);
    if (this.qualDetails != "0") {
      this.qulificationById(this.qualDetails);
      this.qulifiBtn = false;
    }
    this.getAllExam();
  }
  get qualificationdetailsFrmControl() {
    return this.qualificationdetailsFrmGroup.controls;
  }
  handleFileInputQualification(event: any) {

    this.selecteFile = event.target.files[0] ;
    const fileNameWithExtension: string = this.selecteFile.name;
    const [fileName, fileExtension] = fileNameWithExtension.split('.');
    this.fileName=fileNameWithExtension;
    this.fileExtension=fileExtension;
    //this.filename = event.target.files[0].name;
    if(event.target.files[0].name.split('.').length>1){
        this.fileExtensionsCount=true;
        return
      }
      this.fileExtensionsCount=false;
    this.fileToUpload = event.target.files[0];
    this.filename = event.target.files[0].name;
    this.fileextension = event.target.files[0].type;
    var size = event.target.files[0].size;
    this.modifiedDate = event.target.files[0].lastModified;
    if (this.fileextension != 'application/pdf') {
      this.fileUploadValidation = true;

    } else {
      this.fileUploadValidation = false;
      let $img: any = document.querySelector('#Uploadfile');
      var reader = new FileReader();
      var readerbuffer = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(event.target.files[0]);
      readerbuffer.readAsArrayBuffer($img.files[0]);
    }
  }
  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    return false;
  }
  saveQulification() {
    
    this.qualSubmit = true;
    if (this.qualificationdetailsFrmGroup.valid && this.fileExtensionsCount==false) {
      const qualificationdetailsModel = {
        qualificationDetailsId: 0,
        empCode: this.qualDetails.toString(),
        examPassed: this.qualificationdetailsFrmGroup.get("examPassed").value,
        boardUniv: this.qualificationdetailsFrmGroup.get("boardUniv").value,
        passYear: this.qualificationdetailsFrmGroup.get("passYear").value,
        division: this.qualificationdetailsFrmGroup.get("division").value,
        docType: (DocTypeEnum.qulificationDocType).toString(),
        documents: this.base64textString,
        docFileName: this.fileName,
        docContentType: this.fileExtension,

      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.qualificationdetailsServices.insert(qualificationdetailsModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.qualSubmit = false
                this.toastrService.success("Data Saved Successfully");
                this.qulificationById(this.qualDetails);
                this.qualificationdetailsFrmGroup.reset()
              })
            }
          }
        })
    }
  }

  getAllExam() {
    this.mdExamUser.getAll().subscribe((data: any) => {
      this.examData = data;
    })
  }

  viewQualDoc() {
    this.selectedFileB64 = this.showQualiDoc;
    this.loader.isLoading = false;
    this.modalService.open(this.popupview, { size: 'xl' });
  }

  updateQulification() {
    this.submitted = true;

    if (this.qualificationdetailsFrmGroup.valid && this.fileExtensionsCount==false) {

      const qualificationdetailsModel = {
        qualificationDetailsId: this.qualificationdetailsFrmGroup.get("qualificationDetailsId").value,
        empCode: this.qualificationdetailsFrmGroup.get("empCode").value,
        examPassed: this.qualificationdetailsFrmGroup.get("examPassed").value,
        boardUniv: this.qualificationdetailsFrmGroup.get("boardUniv").value,
        passYear: this.qualificationdetailsFrmGroup.get("passYear").value,
        division: this.qualificationdetailsFrmGroup.get("division").value,
        documents: this.base64textString,
        docType: (DocTypeEnum.qulificationDocType).toString(),
        docFileName: this.fileName,
        docContentType: this.fileExtension,
      }
      this.qualificationdetailsFrmGroup.controls['uploadCertificate'].setValidators(Validators.required);
      this.qualificationdetailsFrmGroup.controls['uploadCertificate'].updateValueAndValidity();
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.qualificationdetailsServices.update(qualificationdetailsModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.updatehdn = false;
                this.qulificationById(this.qualDetails);
                this.qualSubmit = false
                this.qualificationdetailsFrmGroup.reset()
                this.toastrService.success(message);
              })
            }
          }
        })
    }
  }

  viewDocument(data: any) {
    this.loader.isLoading = true;
    this.appDoc = { activityId: ActivityEnum.EmployeeQualificationDetails, id: data.qualificationDetailsId.toString(), }
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

  editQualification(data: any) {
    this.base64textString = "";
    this.updatehdn = true;
    this.submithdn = false;
    this.qualificationdetailsFrmGroup.controls['uploadCertificate'].clearValidators();
    this.qualificationdetailsFrmGroup.controls['uploadCertificate'].updateValueAndValidity();
    this.qualificationdetailsFrmGroup.patchValue({
      qualificationDetailsId: data.qualificationDetailsId,
      empCode: data.empCode,
      examPassed: data.examPassed,
      boardUniv: data.boardUniv,
      passYear: data.passYear,
      division: data.division,
    });
    this.appDoc = { activityId: ActivityEnum.EmployeeQualificationDetails, id: data.qualificationDetailsId.toString() }
    this.onEditQualDoc(this.appDoc);

  }
  onEditQualDoc(data: any) {
    this.appDocumentUploadDetailService.getDocumentByRequestId(data).subscribe((data: any) => {
      this.showQualiDoc = data.docContent;
     // this.updatehdn = false;
      this.certificate = true;
    })
  }

  qulificationById(empCode: string) {
    this.employeeDetailsService.examCode(empCode).subscribe((data): any => {
      this.base64textString = "";
      this.qualificationdetailsList = data;
      this.qualificationdetailsFrmGroup.controls['uploadCertificate'].clearValidators();
      this.qualificationdetailsFrmGroup.controls['uploadCertificate'].updateValueAndValidity();
      this.qualificationdetailsFrmGroup.patchValue({
        qualificationDetailsId: data.qualificationDetailsId,
        empCode: data.empCode,
        examPassed: data.examPassed,
        boardUniv: data.boardUniv,
        passYear: data.passYear,
        division: data.division,
      })
    });
  }
}
