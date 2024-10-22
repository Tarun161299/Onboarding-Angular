import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
import { EmployeeDetailsModel } from 'src/app/shared/model/employeedetails.model';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
import { EmployeeDetailsService } from 'src/app/shared/services/employeedetails.service';
import { MdEmpStatusService } from 'src/app/shared/services/md-empstatus.service';
import { MdIdTypeService } from 'src/app/shared/services/md-idtype.service';
import { AppDocActivity } from "src/app/shared/model/appDocActivityModel";
import { MdExamService } from 'src/app/shared/services/mdExamService';
import { QualificationDetailsService } from 'src/app/shared/services/qualificationdetails.service';
import { AppDocumentUploadDetailService } from 'src/app/shared/services/appDocumentUploadedDetailService';
import { qualificationDetailsModel } from 'src/app/shared/model/qualificationdetails.model';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import { DomSanitizer } from '@angular/platform-browser';
import { DateFormat } from 'src/app/shared/pipe/datefromat-pipe';
import { DatePipe } from '@angular/common';
import { ConfigurationApiSecureKey } from 'src/app/shared/services/ConfigurationApiSecureKey.Services';
import { AppOnBoardingRequestService } from 'src/app/shared/services/appOnBoardingRequest';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-employee-new',
  templateUrl: './add-employee-new.component.html',
  styleUrls: ['./add-employee-new.component.css']
})
export class AddEmployeeNewComponent implements OnInit {
  submitted: boolean = false;
  qualSubmit: boolean = false;
  submitbtn: boolean = true;
  editbtn: boolean = true;
  employeResign: boolean;
  employeStatus: boolean = false;
  updatebtn: boolean = false;
  qulifiBtn: boolean = true;
  qualificationdetails: boolean = false;
  examData: any = [];
  showViewDoc: boolean = true;
  empCodeData: any;
  employeedetailsFrmGroup: FormGroup;
  qualificationdetailsFrmGroup: FormGroup;
  employeedetailsModel: EmployeeDetailsModel;
  employeedetailsList: EmployeeDetailsModel[];
  qualificationdetailsModel: qualificationDetailsModel;
  modifiedDate: any;
  projectId: string;
  mdidtypeList: any;
  mdempstatusList: any;
  appDoc: AppDocActivity;
  docData: any;
  divisionList = [
    { value: 'R', year: 'Registration' },
    { value: 'C', year: 'Counselling' }
  ];
  fileUploadValidation: boolean = false;
  fileUploadValidationPhoto: boolean = false;
  fileUploadValidationId: boolean = false;
  fileToUpload: any;
  filename: string;
  fileextension: any;
  modifieddate: any;
  base64textString: string;
  pdfSrc: string;
  dataContentDocumentUpload: string = "";
  datacontentUploadPhoto: string = "";
  dataContentAddressProof: string = "";
  selectedFileB64: string;
  employeCode: any;
  imageSource: any;
  employeeCode: string;
  hiduploadIdDocument: boolean = false;
  hideuploadFile: boolean = false;
  hideuploadaddressProof: boolean = false;
  hiduploadIdDocumentI: boolean = true;
  hideuploadFileP: boolean = true;
  hideuploadaddressProofA: boolean = true;
  showQualiDoc: string = "";
  employeeCodeData: any = [];
  decSecretKey: string;
  decsalt: string;
  workOrderComponent: boolean = false;

  selecteFile: any;
  fileExtensionid: any;
  fileExtensionimg: any;
  fileExtensionAdressProof: any;
  fileNameAdressProof: any;
  fileNameid: any;
  fileNameimg: any;
CheckExtensionImg:boolean=false;
CheckExtensionid:boolean=false;
CheckExtensionAdressProof:boolean=false;
  ipAddress = '_._._._';
  constructor(private datepipe: DatePipe, private sanitizer: DomSanitizer, private configurationApiSecureKey: ConfigurationApiSecureKey,
    private toastrService: ToastrService, private mdExamUser: MdExamService, private router: Router, private route: ActivatedRoute,
    private appDocumentUploadDetailService: AppDocumentUploadDetailService, private qualificationdetailsServices: QualificationDetailsService,
    private employeeDetailsService: EmployeeDetailsService, private confirmationDialogService: ConfirmationDialogService,
    private mdempstatusServices: MdEmpStatusService, private mdidtypeServices: MdIdTypeService, private employeedetailsServices: EmployeeDetailsService,
    private loader: AfterLoginComponent, private modalService: NgbModal, private formBuilder: FormBuilder, private user: AppOnBoardingRequestService) {
    this.employeedetailsFrmGroup = this.formBuilder.group({
      empId: [],
      empCode: [],
      empName: ["", [Validators.required, Validators.pattern("^[A-Za-z. ]+$"), Validators.maxLength(100)]],
      designation: ["", [Validators.required, Validators.pattern("^[A-Za-z. ]+$"), Validators.maxLength(100)]],
      fName: ["", [Validators.required, Validators.pattern("^[A-Za-z. ]+$"), Validators.maxLength(100)]],
      mName: ["", [Validators.required, Validators.pattern("^[A-Za-z. ]+$"), Validators.maxLength(100)]],
      dob: ["", [Validators.required]],
      address: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      mobileNumber: ["", [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      emailId: ["", [Validators.required, Validators.email,
      Validators.pattern(
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,5}$'
      )]],
      id: ["", [Validators.required]],
      idNumber: ["", [Validators.required]],
      joinDate: ["", [Validators.required]],
      reportingOfficer: ["", [Validators.required, Validators.pattern("^[A-Za-z. ]+$"), Validators.maxLength(100)]],
      remarks: ["", [Validators.required]],
      empStatus: ["", [Validators.required]],
      resignDate: [""],
      division: ["", [Validators.required]],
      uploadFile: ["", [Validators.required]],
      uploadaddressProof: ["", [Validators.required]],
      uploadIdDocument: ["", [Validators.required]],
    });
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

  @ViewChild('image') imageView !: ElementRef;
  ngOnInit(): void {
   // this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey
      this.decsalt = environment.salt
      this.employeeCode = this.route.snapshot.params['Id'].toString();
      this.employeeCode = EncyptionDecryption.Decrypt(this.employeeCode, this.decSecretKey, this.decsalt);
      this.employeeCode = this.employeeCode.substring(0, this.employeeCode.length - 15);
      this.getEmployeeCode();
      if (this.employeeCode != "0") {
        this.getEmployeeDetails(this.employeeCode);
        this.qualificationdetails = true;
        this.workOrderComponent = true;
        this.qulifiBtn = false;
      }
      this.mdIdGetAll();
      this.getAllExam();
      this.mdEmpStatusGetAll();
      this.loader.isLoading = false;
      this.submitbtn = true;
      this.editbtn = false;
      this.updatebtn = false
  //  })
  }
  get employeedetailsFrmControl() {
    return this.employeedetailsFrmGroup.controls;
  }
  getDecryptionKey() {
    //this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {

      this.decSecretKey = environment.secretKey
      this.decsalt = environment.salt
      this.employeeCode = this.route.snapshot.params['Id'].toString();
      this.employeeCode = EncyptionDecryption.Decrypt(this.employeeCode, this.decSecretKey, this.decsalt);
      this.employeeCode = this.employeeCode.substring(0, this.employeeCode.length - 15);
      this.getEmployeeCode();
      if (this.employeeCode != "0") {
        this.getEmployeeDetails(this.employeeCode);
        this.qualificationdetails = true;
        this.workOrderComponent = true;
        this.qulifiBtn = false;
      }
   // })
    this.mdIdGetAll();
    this.getAllExam();
    this.mdEmpStatusGetAll();
    this.loader.isLoading = false;
    this.submitbtn = true;
    this.editbtn = false;
    this.updatebtn = false
  }
  save() {
   
    this.submitted = true;
    if (this.employeedetailsFrmGroup.valid && this.fileUploadValidation == false && this.fileUploadValidationId == false && this.fileUploadValidationPhoto == false
      && this.CheckExtensionImg==false && this.CheckExtensionid==false && this.CheckExtensionAdressProof==false
    ) {
      const employeedetailsModel = {
        empId: 0,
        empCode: "",
        empName: this.employeedetailsFrmGroup.get("empName").value,
        designation: this.employeedetailsFrmGroup.get("designation").value,
        fName: this.employeedetailsFrmGroup.get("fName").value,
        mName: this.employeedetailsFrmGroup.get("mName").value,
        dob: this.employeedetailsFrmGroup.get("dob").value,
        address: this.employeedetailsFrmGroup.get("address").value,
        phoneNumber: this.employeedetailsFrmGroup.get("phoneNumber").value,
        mobileNumber: this.employeedetailsFrmGroup.get("mobileNumber").value,
        emailId: this.employeedetailsFrmGroup.get("emailId").value,
        id: this.employeedetailsFrmGroup.get("id").value,
        idNumber: this.employeedetailsFrmGroup.get("idNumber").value,
        joinDate: this.employeedetailsFrmGroup.get("joinDate").value,
        reportingOfficer: this.employeedetailsFrmGroup.get("reportingOfficer").value,
        remarks: this.employeedetailsFrmGroup.get("remarks").value,
        empStatus: this.employeedetailsFrmGroup.get("empStatus").value,
        resignDate: this.employeedetailsFrmGroup.get("resignDate").value,
        division: this.employeedetailsFrmGroup.get("division").value,
        submitTime: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
        ipaddress: this.ipAddress,
        uploadaddressProof: this.dataContentAddressProof,
        uploadIdDocument: this.dataContentDocumentUpload,
        uploadFile: this.datacontentUploadPhoto,

        docFileNameImg: this.fileNameimg,
        docFileNameId: this.fileNameid,
        docFileNameAddressProof: this.fileNameAdressProof,

        docTypeContentId: this.fileExtensionid,
        docTypeContentImg: this.fileExtensionimg,
        docTypeContentAddressProof: this.fileExtensionAdressProof,
      }
      this.employeedetailsFrmGroup.disable();
      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.employeedetailsServices.insert(employeedetailsModel).subscribe((data: any) => {
                this.loader.isLoading = false;
                this.employeeCode = data;
                this.getEmployeeCode();
                this.toastrService.success("Data Saved Successfully");
                this.qualificationdetails = true;
                this.workOrderComponent = true;
                this.editbtn = true;
                this.submitbtn = false;
                this.updatebtn = false;
                this.getAllExam();
              })
            }
          }
        })
    }
  }
  onselectEmpStatus(event: any) {

    if (event.target.value == "02") {
      this.employeResign = true
      this.employeedetailsFrmGroup.controls['resignDate'].setValidators([Validators.required]);
      this.employeedetailsFrmGroup.controls['resignDate'].updateValueAndValidity();
    }
    else {
      this.employeedetailsFrmGroup.controls['resignDate'].setValue('');
      this.employeResign = false;
      this.employeedetailsFrmGroup.controls['resignDate'].clearValidators();
      this.employeedetailsFrmGroup.controls['resignDate'].updateValueAndValidity();
    }
  }
  handleFileInput(event: any, text: string, type: string) {
    
    if (type == "img") {
      this.selecteFile = event.target.files[0];
      const fileNameWithExtension: string = this.selecteFile.name;
      const [fileName, fileExtension] = fileNameWithExtension.split('.');
      this.fileNameimg = fileNameWithExtension;
      this.fileExtensionimg = fileExtension;
if(event.target.files[0].name.split('.').length>1){
    this.CheckExtensionImg=true;
    return
  }
  this.CheckExtensionImg=false;
    }
    if (type == "id") {
      this.selecteFile = event.target.files[0];
      const fileNameWithExtension: string = this.selecteFile.name;
      const [fileName, fileExtension] = fileNameWithExtension.split('.');
      this.fileNameid = fileNameWithExtension;
      this.fileExtensionid = fileExtension;
      if(event.target.files[0].name.split('.').length>1){
        this.CheckExtensionid=true;
        return
      }
      this.CheckExtensionid=false;
    }
    if (type == "AdressProof") {
      this.selecteFile = event.target.files[0];
      const fileNameWithExtension: string = this.selecteFile.name;
      const [fileName, fileExtension] = fileNameWithExtension.split('.');
      this.fileNameAdressProof = fileNameWithExtension;
      this.fileExtensionAdressProof = fileExtension;
      if(event.target.files[0].name.split('.').length>1){
        this.CheckExtensionAdressProof=true;
        return
      }
      this.CheckExtensionAdressProof=false;
    }

    if (type == "img") {
      this.fileUploadValidationPhoto = true;
    }
    if (type == "id") {
      this.fileUploadValidationId = true;
    }
    if (type == "AdressProof") {
      this.fileUploadValidation = true;
    }
    if (event.target.files.length == 0 && type == 'img') {
      this.datacontentUploadPhoto = ""
    }
    if (event.target.files.length == 0 && type == 'AdressProof') {
      this.dataContentAddressProof = ""
    }
    if (event.target.files.length == 0 && type == 'id') {
      this.dataContentDocumentUpload = ""
    }
    this.fileToUpload = event.target.files[0];
    this.filename = event.target.files[0].name;
    this.fileextension = event.target.files[0].type;
    var size = event.target.files[0].size;
    this.modifieddate = event.target.files[0].lastModified;
    const fileType = event.type;
    if (type == "img") {
      if (this.fileextension == 'image/jpeg' ||
        this.fileextension == 'image/JPG' ||
        this.fileextension == 'image/png') {
        this.fileUploadValidationPhoto = false;
      }
      else {
        this.toastrService.error('Please Upload JPG/JPEG file only');
      }
    }
    if (type == "id") {
      if (this.fileextension == 'application/pdf') {
        this.fileUploadValidationId = false;

      }
      else {
        this.toastrService.error('Please Upload Pdf file only');
      }
    }
    if (type == "AdressProof") {
      if (this.fileextension == 'application/pdf') {
        this.fileUploadValidation = false;

      }
      else {
        this.toastrService.error('Please Upload Pdf file only');
      }
    }
    let $img: any = document.querySelector('#Uploadfile');
    var message = text;
    var reader = new FileReader();
    var readerbuffer = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this, message);
    readerbuffer.onload = this._handleReaderLoaded2.bind(this);
    reader.readAsBinaryString(event.target.files[0]);
    readerbuffer.readAsArrayBuffer($img.files[0]);
  }

  _handleReaderLoaded2(readerEvt: any) {
    let $img: any = document.querySelector('#Uploadfile');
    this.pdfSrc = readerEvt.target.result;
  }
  _handleReaderLoaded(message: any, readerEvt: any) {

    var binaryString = readerEvt.target.result;
    var message;
    if (message == "addressProof") {
      this.base64textString = btoa(binaryString);
      this.dataContentAddressProof = this.base64textString;
    }
    if (message == "uploadPhoto") {
      this.base64textString = btoa(binaryString);
      this.datacontentUploadPhoto = this.base64textString;
    }
    if (message == "docId") {
      this.base64textString = btoa(binaryString);
      this.dataContentDocumentUpload = this.base64textString;
    }

    return false;
  }
  mdIdGetAll() {
    this.mdidtypeServices.getAll().subscribe((data: any) => {
      this.mdidtypeList = data;
      this.loader.isLoading = false;
    })
  }

  mdEmpStatusGetAll() {
    this.mdempstatusServices.getAll().subscribe((data: any) => {
      this.mdempstatusList = data;
      this.loader.isLoading = false;
    })
  }
//   CheckExtensionImg:boolean=false;
// CheckExtensionid:boolean=false;
// CheckExtensionAdressProof:boolean=false;

  update() {
    this.submitted = true;
    if (this.employeedetailsFrmGroup.valid && this.CheckExtensionImg==false && this.CheckExtensionid==false && this.CheckExtensionAdressProof==false) {
      const employeedetailsModel = {
        empId: 0,
        empCode: this.employeeCode.toString(),
        empName: this.employeedetailsFrmGroup.get("empName").value,
        designation: this.employeedetailsFrmGroup.get("designation").value,
        fName: this.employeedetailsFrmGroup.get("fName").value,
        mName: this.employeedetailsFrmGroup.get("mName").value,
        dob: this.employeedetailsFrmGroup.get("dob").value,
        address: this.employeedetailsFrmGroup.get("address").value,
        phoneNumber: this.employeedetailsFrmGroup.get("phoneNumber").value,
        mobileNumber: this.employeedetailsFrmGroup.get("mobileNumber").value,
        emailId: this.employeedetailsFrmGroup.get("emailId").value,
        id: this.employeedetailsFrmGroup.get("id").value,
        idNumber: this.employeedetailsFrmGroup.get("idNumber").value,
        joinDate: this.employeedetailsFrmGroup.get("joinDate").value,
        reportingOfficer: this.employeedetailsFrmGroup.get("reportingOfficer").value,
        remarks: this.employeedetailsFrmGroup.get("remarks").value,
        empStatus: this.employeedetailsFrmGroup.get("empStatus").value,
        resignDate: this.employeedetailsFrmGroup.get("resignDate").value,
        division: this.employeedetailsFrmGroup.get("division").value,
        submitTime: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
        ipaddress: this.ipAddress,
        uploadaddressProof: this.dataContentAddressProof,
        uploadIdDocument: this.dataContentDocumentUpload,
        uploadFile: this.datacontentUploadPhoto,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.employeedetailsServices.update(employeedetailsModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.loader.isLoading = false;
                  if (message != "Try Again") {
                    if (message > 0) {
                      this.toastrService.success("Update Successfully");
                    }
                  }
                  if (message == "Try Again") {
                    this.toastrService.error("Error Occured");
                  }
                }, error: (err: any) => {
                  this.loader.isLoading = false;
                  this.toastrService.error(err);
                },
              })
            }
          }
        })
    }
  }
  reset() {
    this.clear()
  }
  clear() {
    this.employeedetailsFrmGroup.reset();
    for (let control in this.employeedetailsFrmGroup.controls) {
      this.employeedetailsFrmGroup.controls[control].setErrors(null);
    }
  }

  getAllExam() {
    this.mdExamUser.getAll().subscribe((data: any) => {
      this.examData = data;
      this.getAllEmpCode();
    })
  }

  getAllEmpCode() {
    this.employeeDetailsService.getAll().subscribe((data: any) => {
      this.empCodeData = data;
    })
  }

  get qualificationdetailsFrmControl() {
    return this.qualificationdetailsFrmGroup.controls;
  }

  getEmployeeDetails(empCode: string) {
    this.employeeDetailsService.getEmployeeDataByEmployeeCode(empCode).subscribe((data): any => {
      this.employeedetailsFrmGroup.disable();
      this.employeStatus = true;
      this.employeResign = true;
      this.empCodeData = data;
      this.dataContentAddressProof = data.uploadaddressProof;
      this.datacontentUploadPhoto = data.uploadFile;
      this.dataContentDocumentUpload = data.uploadIdDocument;
      this.employeedetailsFrmGroup.controls['uploadFile'].clearValidators();
      this.employeedetailsFrmGroup.controls['uploadFile'].updateValueAndValidity();
      this.employeedetailsFrmGroup.controls['uploadaddressProof'].clearValidators();
      this.employeedetailsFrmGroup.controls['uploadaddressProof'].updateValueAndValidity();
      this.employeedetailsFrmGroup.controls['uploadIdDocument'].clearValidators();
      this.employeedetailsFrmGroup.controls['uploadIdDocument'].updateValueAndValidity();
      this.submitbtn = false;
      this.editbtn = true;
      this.updatebtn = false;
      this.hiduploadIdDocument = true;
      this.hideuploadFile = true;
      this.hideuploadaddressProof = true;
      if (data.empStatus == "01") {
        this.employeResign = false;
        this.employeedetailsFrmGroup.controls['resignDate'].setValue('');
        this.employeedetailsFrmGroup.controls['resignDate'].clearValidators();
        this.employeedetailsFrmGroup.controls['resignDate'].updateValueAndValidity();
      }
      var a = this.datepipe.transform(new Date("31/12/2022").getTime(), 'yyyy-MM-dd')
      this.employeedetailsFrmGroup.patchValue({
        empId: data.empId,
        empCode: data.empCode,
        empName: data.empName,
        designation: data.designation,
        fName: data.fName,
        mName: data.mName,
        dob: this.datepipe.transform(new Date(data.dob).getTime(), 'yyyy-MM-dd'),
        address: data.address,
        phoneNumber: data.phoneNumber,
        mobileNumber: data.mobileNumber,
        emailId: data.emailId,
        id: data.id,
        idNumber: data.idNumber,
        joinDate: this.datepipe.transform(new Date(data.joinDate).getTime(), 'yyyy-MM-dd'),
        reportingOfficer: data.reportingOfficer,
        remarks: data.remarks,
        empStatus: data.empStatus,
        resignDate: data.resignDate,
        division: data.division,
        submitTime: data.submitTime,
        ipaddress: data.ipaddress,
        uploadaddressProof: data.uploadaddressProof,
        uploadIdDocument: data.uploadIdDocument,
        uploadFile: data.uploadFile,
      },
      )
    });

  }
  edit() {
    this.submitbtn = false;
    this.editbtn = false;
    this.updatebtn = true;
    this.hiduploadIdDocument = false;
    this.hideuploadFile = false;
    this.hideuploadaddressProof = false;
    this.employeedetailsFrmGroup.enable();
    this.employeedetailsFrmGroup.controls['uploadFile'].clearValidators();
    this.employeedetailsFrmGroup.controls['uploadFile'].updateValueAndValidity();
    this.employeedetailsFrmGroup.controls['uploadaddressProof'].clearValidators();
    this.employeedetailsFrmGroup.controls['uploadaddressProof'].updateValueAndValidity();
    this.employeedetailsFrmGroup.controls['uploadIdDocument'].clearValidators();
    this.employeedetailsFrmGroup.controls['uploadIdDocument'].updateValueAndValidity();
  }

  getDocumentbyAddress(mode: any) {

    if (mode == 'img') {
      this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.datacontentUploadPhoto}`);//this.datacontentUploadPhoto;
      this.loader.isLoading = false;
      this.modalService.open(this.imageView, { size: 'xl' });
    }
    if (mode == 'address') {
      this.selectedFileB64 = this.dataContentAddressProof;
      this.loader.isLoading = false;
      this.modalService.open(this.popupview, { size: 'xl' });
    }
    if (mode == 'idProof') {
      this.selectedFileB64 = this.dataContentDocumentUpload;
      this.loader.isLoading = false;
      this.modalService.open(this.popupview, { size: 'xl' });
    }
  }
  getEmployeeCode() {
    this.employeeCodeData = this.employeeCode
  }
  getIPAddress() {
    this.loader.isLoading = true;
    this.user.GetIP().subscribe((res: any) => {
      this.ipAddress = res;
      this.loader.isLoading = false;
    })
  }

}