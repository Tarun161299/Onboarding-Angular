import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { qualificationDetailsModel } from "src/app/shared/model/qualificationdetails.model";
import { ToastrService } from "ngx-toastr";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { QualificationDetailsService } from "src/app/shared/services/qualificationdetails.service";
import { MdExamService } from "src/app/shared/services/mdExamService";
import { AppDocActivity } from "src/app/shared/model/appDocActivityModel";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AppDocumentUploadDetailService } from "src/app/shared/services/appDocumentUploadedDetailService";
import { EmployeeDetailsService } from "src/app/shared/services/employeedetails.service";
import { CommonFunctionServices } from "src/app/shared/common/commonFunction.services";
import { ActivityEnum } from "src/app/shared/common/enums/activity.enums";
import { AppDocFilter } from "src/app/shared/model/appDocFilterModel";
import { DocTypeEnum } from "src/app/shared/common/enums/docType.enums";

declare const $: any;

@Component({
  selector: 'app-add-employee-qualifications',
  templateUrl: './add-employee-qualifications.component.html',
  styleUrls: ['./add-employee-qualifications.component.css']
})
export class AddEmployeeQualificationsComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  qualificationdetailsFrmGroup: FormGroup;
  qualificationdetailsModel: qualificationDetailsModel;
  qualificationdetailsList: qualificationDetailsModel[];
  employeCode: string = "EM1001"
  examData: any = [];
  fileToUpload: any;
  filename: any;
  fileextension: any;
  modifiedDate: any;
  fileUploadValidation: any;
  rowData: any;
  projectId: string;
  pdfSrc: any;
  docData: any;
  base64textString: any;
  datacontent: any = "";
  data: any = "";
  appDoc: AppDocActivity;
  selectedFileB64: string;
  showViewDoc: boolean = true;
  qualId: string;
  empCodeData: any;
  empCode: string;
  appDocGrid:AppDocActivity
  selecteFile:any;
  fileExtension:any;
  fileName:any;
  fileExtensionsCount:boolean=false;
  constructor(private commonFunctionServices: CommonFunctionServices, private employeeDetailsService: EmployeeDetailsService, private modalService: NgbModal, private appDocumentUploadDetailService: AppDocumentUploadDetailService, private mdExamUser: MdExamService, private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private qualificationdetailsServices: QualificationDetailsService, private toastrService: ToastrService) {
    this.qualificationdetailsFrmGroup = this.formBuilder.group({
      empCode: ["", [Validators.required,Validators.min(0)]],
      uploadCertificate: ["", [Validators.required]],
      examPassed: ["", [Validators.required,Validators.min(0)]],
      boardUniv: ["", [Validators.required]],
      passYear: ["", [Validators.required]],
      division: ["", [Validators.required,Validators.min(0)]],
    });
  }
  @ViewChild('content') popupview !: ElementRef;
  ngOnInit(): void {
    this.getAll();
    this.getAllExam();
    this.getAllEmpCode();
    this.clear();
    this.loader.isLoading = false;
    this.qualificationdetailsFrmControl.division.setValue(0);
  }

  ngAfterViewInit(): void {
    $("#qualificationdetailsGrid").DataTable();
  }

  get qualificationdetailsFrmControl() {
    return this.qualificationdetailsFrmGroup.controls;
  }

  reset() {
    this.clear()
  }

  clear() {
    this.qualificationdetailsFrmGroup.reset();
    this.qualificationdetailsFrmControl.division.setValue(0);
    this.getAllEmpCode();
    this.getAllExam();
    this.submitted = false;
    this.updatehdn = false;
  }
  getAllEmpCode() {
    this.employeeDetailsService.getAll().subscribe((data: any) => {
      this.empCodeData = data
    })
  }

  save() {
    this.submitted = true;
    if (this.qualificationdetailsFrmGroup.valid &&  this.fileExtensionsCount==false) {
      const qualificationdetailsModel = {
        qualificationDetailsId: 0,
        empCode: this.qualificationdetailsFrmGroup.get("empCode").value,
        examPassed: this.qualificationdetailsFrmGroup.get("examPassed").value,
        boardUniv: this.qualificationdetailsFrmGroup.get("boardUniv").value,
        passYear: this.qualificationdetailsFrmGroup.get("passYear").value,
        division: this.qualificationdetailsFrmGroup.get("division").value,
        docFileName: this.fileName,
        docContentType: this.fileExtension,
        documents: this.base64textString,
        docType: (DocTypeEnum.qulificationDocType).toString(),
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.qualificationdetailsServices.insert(qualificationdetailsModel).subscribe({
                next: (data: any) => {
                  if (data > 0) {
                    this.toastrService.success("Data Saved Successfully");
                    this.commonFunctionServices.bindDataTable("qualificationdetailsGrid", 0);
                    this.getAll();
                    this.clear();
                  }
                }, error: (err: any) => {
                  this.commonFunctionServices.bindDataTable("qualificationdetailsGrid", 0);
                  this.loader.isLoading = false;
                  this.toastrService.error(err);
                  this.getAll();
                }
              })
            }
          }
        })
    }
  }

  edit(data: any) {

    this.base64textString = "";
    this.updatehdn = true;
    this.showViewDoc = false;
    this.qualificationdetailsFrmGroup.controls['uploadCertificate'].clearValidators();
    this.qualificationdetailsFrmGroup.controls['uploadCertificate'].updateValueAndValidity();
    this.qualId=data.qualificationDetailsId;
    this.qualificationdetailsFrmGroup.patchValue({
      qualificationDetailsId: data.qualificationDetailsId,
      empCode: data.empCode,
      examPassed: data.examPassed,
      boardUniv: data.boardUniv,
      passYear: data.passYear,
      division: data.division,
    })
  }
  handleFileInput(event: any) {
    this.selecteFile = event.target.files[0] ;
    const fileNameWithExtension: string = this.selecteFile.name;
    const [fileName, fileExtension] = fileNameWithExtension.split('.');
    this.fileName=fileNameWithExtension;
    this.fileExtension=fileExtension;
   // this.filename = event.target.files[0].name;
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
    this.data = this.datacontent;
    return false;
  }

  update() {
    this.submitted = true;
    
    if (this.qualificationdetailsFrmGroup.valid &&  this.fileExtensionsCount==false) {
      const qualificationdetailsModel = {
        qualificationDetailsId: this.qualId,//this.qualificationdetailsFrmGroup.get("qualificationDetailsId").value,
        empCode: this.qualificationdetailsFrmGroup.get("empCode").value,
        examPassed: this.qualificationdetailsFrmGroup.get("examPassed").value,
        boardUniv: this.qualificationdetailsFrmGroup.get("boardUniv").value,
        passYear: this.qualificationdetailsFrmGroup.get("passYear").value,
        division: this.qualificationdetailsFrmGroup.get("division").value
      }
      this.qualificationdetailsFrmGroup.controls['uploadCertificate'].setValidators(Validators.required);
      this.qualificationdetailsFrmGroup.controls['uploadCertificate'].updateValueAndValidity();
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.qualificationdetailsServices.update(qualificationdetailsModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.getAll();
                  this.updatehdn = false;
                  this.clear();
                  if (message != "Try Again") {
                    if (message > 0) {
                      this.toastrService.success("Update Successfully");
                    }
                  }
                  if (message == "Try Again") {
                    this.toastrService.error("Error Occured");
                  }
                }, error: (err: any) => {
                  this.commonFunctionServices.bindDataTable("qualificationdetailsGrid", 0);
                  this.getAll();
                  this.loader.isLoading = false;
                  this.toastrService.error(err);
                }
              })
            }
          }
        })
    }
  }

  delete(id: any) {
    this.confirmationDialogService.confirmPopUp("Do you really want to Delete ?")
      .then(confirmed => {
        if (confirmed == true) {
          {
            this.loader.isLoading = true;
            this.qualificationdetailsServices.delete(id).subscribe((data: any) => {
              const message = data;
              this.toastrService.error(message);
              this.clear();
              this.getAll();
              this.submitted = false;
              this.updatehdn = false;
            })
          }
        }
      })
  }
  viewDocument(data: any) {
    
    this.loader.isLoading = true;
    this.appDocGrid = {
      activityId: ActivityEnum.EmployeeQualificationDetails,
      id: data.qualificationDetailsId.toString(),
    }
    this.getDocumentbyProjectId(this.appDocGrid);
  }

  getAll() {
    this.qualificationdetailsServices.getAll().subscribe((data: any) => {
      this.qualificationdetailsList = data;
      this.loaderTimeOut();
    })
  }
  getAllExam() {
    this.mdExamUser.getAll().subscribe((data: any) => {
      this.examData = data;
    })
  }

  getDocumentbyProjectId(data: any) {
    this.appDocumentUploadDetailService.getDocumentByRequestId(data).subscribe((data: any) => {
      this.docData = data;
      this.selectedFileB64 = data.docContent;
      this.loader.isLoading = false;
      this.modalService.open(this.popupview, { size: 'xl' });
    })
  }
  ViewClick() {
    
    this.appDoc = {
      activityId: ActivityEnum.EmployeeQualificationDetails,
      id:this.qualId.toString()
    }
    this.appDocumentUploadDetailService.getDocumentByRequestId(this.appDoc).subscribe((data: any) => {
      this.docData = data;
      this.selectedFileB64 = data.docContent;
      this.modalService.open(this.popupview, { size: 'xl' });
    })
  }
  cancel() {
    this.qualificationdetailsFrmGroup.controls['uploadCertificate'].setValidators(Validators.required);
    this.qualificationdetailsFrmGroup.controls['uploadCertificate'].updateValueAndValidity();
    this.clear();
    this.getAll();
    this.showViewDoc = true;
  }
  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 1000);
  }

  byEmpCode(event: any) {
    //this.loader.isLoading = true;
    this.empCode = event.target.value;
    this.getQualificationByEmpCode(this.empCode)
  }

  getQualificationByEmpCode(empCode: string) {
    this.qualificationdetailsServices.getById(empCode).subscribe((data: any) => {
      this.loader.isLoading = false;
      this.qualificationdetailsList = data;
    })
  }
}