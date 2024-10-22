import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { EmployeeDetailsModel } from "src/app/shared/model/employeedetails.model";
import { EmployeeDetailsService } from "src/app/shared/services/employeedetails.service";
import { ToastrService } from "ngx-toastr";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { MdIdTypeService } from "src/app/shared/services/md-idtype.service";
import { MdEmpStatusService } from "src/app/shared/services/md-empstatus.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AppDocumentUploadDetailService } from "src/app/shared/services/appDocumentUploadedDetailService";
import { DatePipe } from "@angular/common";
import { EncyptionDecryption } from "src/app/shared/common/EncyptionDecryption";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivityEnum } from "src/app/shared/common/enums/activity.enums";
import { DocTypeEnum } from "src/app/shared/common/enums/docType.enums";
import { AppDocFilter } from "src/app/shared/model/appDocFilterModel";
import { ConfigurationApiSecureKey } from "src/app/shared/services/ConfigurationApiSecureKey.Services";
import { AppOnBoardingRequestService } from "src/app/shared/services/appOnBoardingRequest";
import { MdWorkOrderAgencyService } from "src/app/shared/services/md-workorderagency.service";
import { CommonFunctionServices } from "src/app/shared/common/commonFunction.services";
import { AdvanceSearchModel } from "src/app/shared/model/advance-search.model";
import { environment } from "src/environments/environment";

declare const $: any;

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css']
})
export class EmployeedetailsComponent implements OnInit {

  submitted: boolean = false;
  updatehdn: boolean = false;
  employeedetailsFrmGroup: FormGroup;
  advanceSearchFrmGroup: FormGroup;
  employeedetailsModel: EmployeeDetailsModel;
  searchemployeedetailsModel: AdvanceSearchModel;
  employeedetailsList: EmployeeDetailsModel[];
  mdidtypeList: any;
  mdempstatusList: any;
  mdWorkOrderAgencyList: any;
  divisionList = [
    { value: 'R', year: 'Registration' },
    { value: 'C', year: 'Counselling' },
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
  dataContentDocumentUpload: string;
  datacontentUploadPhoto: string;
  dataContentAddressProof: string;
  selectedFileB64: string;
  imageSource: any;
  getPhoto: AppDocFilter;
  getAddresProff: AppDocFilter;
  getIdDocument: AppDocFilter;
  encSecretKey: string;
  encsalt: string;
  myDate = new Date();
  selecteFile: any;
  fileExtensionid: any;
  fileExtensionimg: any;
  fileExtensionAdressProof: any;
  fileNameAdressProof: any;
  fileNameid: any;
  fileNameimg: any;
  ipAddress = '_._._._';
  fileExtensionsCountimg:boolean=false;
  fileExtensionsCountid:boolean=false;
  fileExtensionsCountAddressProof:boolean=false;
  constructor(private sanitizer: DomSanitizer,
    private router: Router,
    private datePipe: DatePipe,
    private appDocumentUploadDetailService: AppDocumentUploadDetailService,
    private modalService: NgbModal,
    private mdempstatusServices: MdEmpStatusService,
    private mdidtypeServices: MdIdTypeService,
    private formBuilder: FormBuilder,
    private loader: AfterLoginComponent,
    private confirmationDialogService: ConfirmationDialogService,
    private employeedetailsServices: EmployeeDetailsService,
    private toastrService: ToastrService,
    private configurationApiSecureKey: ConfigurationApiSecureKey,
    private user: AppOnBoardingRequestService,
    private mdWorkOrderAgencyService: MdWorkOrderAgencyService,
    private commonFunctionServices:CommonFunctionServices) {
    this.employeedetailsFrmGroup = this.formBuilder.group({
      empId: [],
      empCode: [],
      empName: ["", [Validators.required]],
      designation: ["", [Validators.required]],
      fName: ["", [Validators.required]],
      mName: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      address: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      mobileNumber: ["", [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      emailId: ["", [Validators.required, Validators.email,
      Validators.pattern(
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,5}$'     //Changes
      )]],
      id: ["", [Validators.required]],
      idNumber: ["", [Validators.required]],
      joinDate: ["", [Validators.required]],
      reportingOfficer: ["", [Validators.required]],
      remarks: ["", [Validators.required]],
      empStatus: ["", [Validators.required]],
      resignDate: [],
      division: ["", [Validators.required]],
      uploadFile: ["", [Validators.required]],
      uploadaddressProof: ["", [Validators.required]],
      uploadIdDocument: ["", [Validators.required]],
    });

    this.advanceSearchFrmGroup = this.formBuilder.group({
      searchempStatus: ["",],
      searchdivision: ["",],
      searchagency: ["",],
      searchworkorderTo:["",]
    });
  }
  
  @ViewChild('content') popupview !: ElementRef;
  @ViewChild('image') imageView !: ElementRef;
  @ViewChild('filterpopupview') filterpopup !: ElementRef;
  ngOnInit(): void {
    this.getEncryptionKey();
    this.getAll();
    this.mdIdGetAll();
    this.mdEmpStatusGetAll();
    this.mdworkOrderAgenctGetAll();
    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#employeedetailsGrid").DataTable({
      "order": []
    });
  }

  get employeedetailsFrmControl() {
    return this.employeedetailsFrmGroup.controls;
  }

  get advanceSearchFrmControl() {
    return this.advanceSearchFrmGroup.controls;
  }

  reset() {
    this.clear();
     this.fileExtensionsCountimg=false 
     this.fileExtensionsCountid=false 
     this.fileExtensionsCountAddressProof=false
  }

  clear() {
    this.employeedetailsFrmGroup.reset();
    for (let control in this.employeedetailsFrmGroup.controls) {
      this.employeedetailsFrmGroup.controls[control].setErrors(null);
    }
  }
  // fileExtensionsCountimg:boolean=false;
  // fileExtensionsCountid:boolean=false;
  // fileExtensionsCountAddressProof:boolean=false;
  save() {
    this.submitted = true;
    if (this.employeedetailsFrmGroup.valid && this.fileUploadValidation == false && this.fileUploadValidationId == false && this.fileUploadValidationPhoto == false
&& this.fileExtensionsCountimg==false && this.fileExtensionsCountid==false && this.fileExtensionsCountAddressProof==false

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
        submitTime: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
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

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.employeedetailsServices.insert(employeedetailsModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.clear();
                this.toastrService.success("Data Saved Successfully");
              })
            }
          }
        })
    }
  }

  edit(data: any) {
    let number = this.getRandomNumber();
    let id = data.empCode.toString();
    let ID = EncyptionDecryption.Encrypt(id + number, this.encSecretKey, this.encsalt);
    this.router.navigate(['/auth/addEmployeeNew/' + ID]);
  }

  update() {
    this.submitted = true;
    if (this.employeedetailsFrmGroup.valid && this.fileExtensionsCountimg==false && this.fileExtensionsCountid==false && this.fileExtensionsCountAddressProof==false) {
      const employeedetailsModel = {
        empId: this.employeedetailsFrmGroup.get("empId").value,
        empCode: this.employeedetailsFrmGroup.get("empCode").value,
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
        submitTime: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
        ipaddress: this.ipAddress,
        uploadaddressProof: this.dataContentAddressProof,
        uploadIdDocument: this.dataContentDocumentUpload,
        uploadFile: this.datacontentUploadPhoto,
      }
      this.employeedetailsFrmGroup.controls['uploadFile'].setValidators(Validators.required);
      this.employeedetailsFrmGroup.controls['uploadFile'].updateValueAndValidity();
      this.employeedetailsFrmGroup.controls['uploadaddressProof'].setValidators(Validators.required);
      this.employeedetailsFrmGroup.controls['uploadaddressProof'].updateValueAndValidity();
      this.employeedetailsFrmGroup.controls['uploadIdDocument'].setValidators(Validators.required);
      this.employeedetailsFrmGroup.controls['uploadIdDocument'].updateValueAndValidity();
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.employeedetailsServices.update(employeedetailsModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                if (message != "Try Again") {
                  this.toastrService.success(message);
                }
                if (message == "Try Again") {
                  this.toastrService.error(message);
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
            this.employeedetailsServices.delete(id).subscribe((data: any) => {
              this.loader.isLoading = false;
              const message = data;
              this.toastrService.error(message);
              this.clear();
              this.getAll();
            })
          }
        }
      })
  }

  getAll() {
    this.employeedetailsServices.getAll().subscribe((data: any) => {      
      this.employeedetailsList = data;
      this.loader.isLoading = false;
    })
  }

  mdIdGetAll() {
    this.mdidtypeServices.getAll().subscribe((data: any) => {
      this.mdidtypeList = data;
      this.loader.isLoading = false;
    })
  }

  onSelectEmpStatus(event: any) {
  }

  mdEmpStatusGetAll() {
    this.mdempstatusServices.getAll().subscribe((data: any) => {
      this.mdempstatusList = data;
      this.loader.isLoading = false;
    })
  }

  mdworkOrderAgenctGetAll() {
    this.mdWorkOrderAgencyService.getAll().subscribe((data: any) => {
      this.mdWorkOrderAgencyList = data;
      this.loader.isLoading = false;
    })
  }

  onSelectDivision(event: any) {
  }

  handleFileInput(event: any, text: string, type: string) {
    if (type == "img") {
      this.selecteFile = event.target.files[0];
      const fileNameWithExtension: string = this.selecteFile.name;
      const [fileName, fileExtension] = fileNameWithExtension.split('.');
      this.fileNameimg = fileNameWithExtension;
      this.fileExtensionimg = fileExtension;
      this.filename = event.target.files[0].name;
  if( event.target.files[0].name.split('.').length>1){
      this.fileExtensionsCountimg=true;
      return
    }
    this.fileExtensionsCountimg=false;
    }
    if (type == "id") {
      this.selecteFile = event.target.files[0];
      const fileNameWithExtension: string = this.selecteFile.name;
      const [fileName, fileExtension] = fileNameWithExtension.split('.');
      this.fileNameid = fileNameWithExtension;
      this.fileExtensionid = fileExtension;
      if( event.target.files[0].name.split('.').length>1){
        this.fileExtensionsCountid=true;
        return
      }
      this.fileExtensionsCountid=false;
    }
    if (type == "AdressProof") {
      this.selecteFile = event.target.files[0];
      const fileNameWithExtension: string = this.selecteFile.name;
      const [fileName, fileExtension] = fileNameWithExtension.split('.');
      this.fileNameAdressProof = fileNameWithExtension;
      this.fileExtensionAdressProof = fileExtension;
      if( event.target.files[0].name.split('.').length>1){
        this.fileExtensionsCountAddressProof=true;
        return
      }
      this.fileExtensionsCountAddressProof=false;
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

  showPhoto(data: any) {
    this.getPhoto = {
      moduleRefId: data.empCode,
      docType: (DocTypeEnum.Photo).toString(),
      activityId: ActivityEnum.EmployeeDetails
    }
    this.loader.isLoading = true;
    this.appDocumentUploadDetailService.getByDocType(this.getPhoto).subscribe((data: any) => {
      if (data == null) {
        this.toastrService.error('Document not available')
        return;
      }
      this.selectedFileB64 = data.docContent;
      this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.selectedFileB64}`);
      this.modalService.open(this.imageView, { size: 'xl' });
      this.loader.isLoading = false;
    });
  }

  showAddressProof(data: any) {
    this.getAddresProff = {
      moduleRefId: data.empCode,
      docType: (DocTypeEnum.AddressProof).toString(),
      activityId: ActivityEnum.EmployeeDetails
    }
    this.loader.isLoading = true;
    this.appDocumentUploadDetailService.getByDocType(this.getAddresProff).subscribe((data: any) => {
      if (data == null) {
        this.toastrService.error('Document not available')
        this.loader.isLoading = false;
        return;
      }
      this.selectedFileB64 = data.docContent;
      this.modalService.open(this.popupview, { size: 'xl' });
      this.loader.isLoading = false;
    })
  }

  showIdDocument(data: any) {
    this.getIdDocument = {
      moduleRefId: data.empCode,
      docType: (DocTypeEnum.IdProof).toString(),
      activityId: ActivityEnum.EmployeeDetails
    }
    this.loader.isLoading = true;
    this.appDocumentUploadDetailService.getByDocType(this.getIdDocument).subscribe((data: any) => {
      if (data == null) {
        this.toastrService.error('Document not available')
        return;
      }
      this.selectedFileB64 = data.docContent;
      this.modalService.open(this.popupview, { size: 'xl' });
      this.loader.isLoading = false;
    })
  }

  viewDetails(data: any) {
    let number = this.getRandomNumber();
    let employeeId = EncyptionDecryption.Encrypt(data.empId + number, this.encSecretKey, this.encsalt)
    this.router.navigate(['/auth/employeeDetailView/' + employeeId]);
  }

  addDetails() {
    let number = this.getRandomNumber();
    let id = 0;
    let ID = EncyptionDecryption.Encrypt(id + number, this.encSecretKey, this.encsalt);
    this.router.navigate(['/auth/addEmployeeNew/' + ID]);
  }

  getRandomNumber() {
    const today = new Date();
    let date = this.datePipe.transform(today, 'YYMMddHHMMSSSSS');
    return date;
  }

  getEncryptionKey() {
 //   this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.encSecretKey = environment.secretKey
      this.encsalt = environment.salt
//    })
  }

  getIPAddress() {
    this.loader.isLoading = true;
    this.user.GetIP().subscribe((res: any) => {
      this.ipAddress = res;
      this.loader.isLoading = false;
    })
  }
  searchpupup(){
  
    this.modalService.open(this.filterpopup, { size: 'xl' });
  }
  advanceSearching(){
    
       this.searchemployeedetailsModel = {
        empStatus: this.advanceSearchFrmGroup.get("searchempStatus").value,
        division: this.advanceSearchFrmGroup.get("searchdivision").value,
        agencyName: this.advanceSearchFrmGroup.get("searchagency").value,
        workorderTo: new Date(this.advanceSearchFrmGroup.get("searchworkorderTo").value),
            }

            this.loader.isLoading = true;
            this.employeedetailsServices.getadvanceSearchingList(this.searchemployeedetailsModel).subscribe((data: any) => {
        
              this.employeedetailsList = data;
              this.commonFunctionServices.bindDataTable("employeedetailsGrid",0);
              this.loader.isLoading = false;
              this.advanceSearchClose();
  
  })
}
advanceSearchClose(){
const initialValues = {
  searchempStatus: "",
  searchdivision: "",
  searchagency: "",
  searchworkorderTo: ""
};
this.advanceSearchFrmGroup.reset(initialValues);
this.modalService.dismissAll(this.filterpopup);

}
}

