
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";

import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { WorkOrderDetailsModel } from "src/app/shared/model/workorderDetailsModel";
import { WorkOrderDetailsService } from "src/app/shared/services/workOrderDetailsService ";
import { ProjectDetailsServices } from "src/app/shared/services/ProjectDetailsServices";
import { AppDocumentUploadDetailService } from "src/app/shared/services/appDocumentUploadedDetailService";
import { AppDocActivity } from "src/app/shared/model/appDocActivityModel";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MdWorkOrderAgencyService } from "src/app/shared/services/md-workorderagency.service";
import { CommonFunctionServices } from "src/app/shared/common/commonFunction.services";
import { DatePipe } from "@angular/common";
import { ActivityEnum } from "../shared/common/enums/activity.enums";
import { DocTypeEnum } from "../shared/common/enums/docType.enums";

declare const $: any;

@Component({
  selector: 'app-work-order-details',
  templateUrl: './work-order-details.component.html',
  styleUrls: ['./work-order-details.component.css']
})

export class WorkOrderDetailsComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  workorderdetailsFrmGroup: FormGroup;
  workorderdetailsModel: WorkOrderDetailsModel;
  workorderdetailsList: WorkOrderDetailsModel[] = [];
  fileToUpload: any;
  filename: any;
  fileextension: any;
  modifiedDate: any;
  fileUploadValidation: any;
  rowData: any;
  projectId: string;
  pdfSrc: any;
  docData: any;
  dataDocument: any;
  base64textString: any;
  datacontent: any = "";
  data: any = "";
  appDoc: AppDocActivity;
  selectedFileB64: string = "";
  agencyData: any;
  date: any;
  noOfMonth: string = "";
  testData: any;
  ONE_DAY = 1000 * 60 * 60 * 24;
  workOrderId: number;
  document:any;
  selecteFile:any;
  fileExtension:any;
  fileName:any;
  fileExtensionsCount:boolean=false;
  constructor(private datePipe: DatePipe, private commonFunctionServices: CommonFunctionServices, private mdWorkOrderAgencyService: MdWorkOrderAgencyService, private modalService: NgbModal, private appDocumentUploadDetailService: AppDocumentUploadDetailService, private projectuser: ProjectDetailsServices, private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private workorderdetailsServices: WorkOrderDetailsService, private toastrService: ToastrService) {
    this.workorderdetailsFrmGroup = this.formBuilder.group({
      workorderId: [""],
      workorderNo: ["", [Validators.required]],
      issueDate: ["", [Validators.required]],
      agencyName: ["", [Validators.required]],
      resourceCategory: ["", [Validators.required,Validators.pattern("^[A-Za-z. ]+$"), Validators.maxLength(100)]],
      //resourceNo: ["", [Validators.required],Validators.pattern("^[0-9][0-9]{3}$")],
      resourceNo: ["", [Validators.required, Validators.pattern('^([0-9][0-9]*)|([0]+)$')]],
      noofMonths: ["" , [Validators.required, Validators.pattern("^(0?[1-9]|1[012])$")]],
      workorderFrom: ["", [Validators.required]],
      workorderTo: ["", [Validators.required]],
      docName: [""],
      document: ["", [Validators.required]],
      ddlWorkOrder: [""],
    });
  }
//Validators.pattern('^[6-9][0-9]{9}$') //Validators.pattern('^([0-9][0-9]*)|([0]+)$'
  @ViewChild('content') popupview !: ElementRef;
  ngOnInit(): void {
    this.projectListGetAll();

    this.getAll();
    this.getWorkOrderAgency();
    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#workorderdetailsGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  projectListGetAll() {
    this.projectuser.getProjectList().subscribe(data => {
      if (data.length > 0) {

        this.rowData = data;
        this.testData = data;
        this.loader.isLoading = false;
      }
    })
  }

  get workorderdetailsFrmControl() {
    return this.workorderdetailsFrmGroup.controls;
  }
  reset() {
    this.workorderdetailsFrmGroup.controls['document'].setValidators(Validators.required);
    this.workorderdetailsFrmGroup.controls['document'].updateValueAndValidity();
    this.clear()
  }
  clear() {
    this.workorderdetailsFrmGroup.reset();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;

    if (this.workorderdetailsFrmGroup.valid && this.fileExtensionsCount==false) {
      this.noOfMonth = this.noOfMonths_between(new Date(this.workorderdetailsFrmGroup.get("workorderFrom").value).getTime(), new Date(this.workorderdetailsFrmGroup.get("workorderTo").value).getTime()).toString()
      const workorderdetailsModel = {
        workorderId: 0,
        workorderNo: this.workorderdetailsFrmGroup.get("workorderNo").value,
        projectCode: "-1",
        issueDate: this.workorderdetailsFrmGroup.get("issueDate").value,
        agencyName: this.workorderdetailsFrmGroup.get("agencyName").value,
        resourceCategory: this.workorderdetailsFrmGroup.get("resourceCategory").value,
        resourceNo: this.workorderdetailsFrmGroup.get("resourceNo").value,
        noofMonths: this.workorderdetailsFrmGroup.get("noofMonths").value,
        //noofMonths: this.noOfMonth
        workorderFrom: this.workorderdetailsFrmGroup.get("workorderFrom").value,
        workorderTo: this.workorderdetailsFrmGroup.get("workorderTo").value,
        docName: "",
        docType: (DocTypeEnum.workOrderDocType).toString(),
        document: this.datacontent,
        docFileName: this.fileName,
        docContentType: this.fileExtension,
        
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.workorderdetailsServices.insert(workorderdetailsModel).subscribe((data: any) => {
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
  changeformatddmmyy(date: string) {
    var stringDate1 = date;
    var splitDate1 = stringDate1.split('-');
    var year1 = splitDate1[2];
    var month1 = splitDate1[1];
    var day1 = splitDate1[0];
    var converteddate = year1 + "/" + month1 + "/" + day1;
    return converteddate;
  }
  handleFileInput(event: any) {
    this.selecteFile = event.target.files[0] ;
    const fileNameWithExtension: string = this.selecteFile.name;
    const [fileName, fileExtension] = fileNameWithExtension.split('.');
    this.fileName=fileNameWithExtension;
    this.fileExtension=fileExtension;

    this.fileToUpload = event.target.files[0];
    this.filename = event.target.files[0].name;
    this.fileextension = event.target.files[0].type;
    var size = event.target.files[0].size;
    this.modifiedDate = event.target.files[0].lastModified;
    if(event.target.files[0].name.split('.').length>1){
      this.fileExtensionsCount=true;
      return
    }
 this.fileExtensionsCount=false;
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

  edit(data: any) {
    this.workorderdetailsFrmGroup.controls['document'].clearValidators();
    this.workorderdetailsFrmGroup.controls['document'].updateValueAndValidity();
    this.getDocumentByWorkOrderId(data.workorderId)
    this.workOrderId = data.workorderId,
      this.updatehdn = true;
      this.dataDocument = true;
      this.projectId = "-1";
      this.workorderdetailsFrmGroup.patchValue({
      ddlWorkOrder: data.projectCode,
      workorderNo: data.workorderNo,
      projectCode: data.projectCode,
      issueDate: this.Changedatefmt(data.issueDate),
      agencyName: data.agencyName,
      resourceCategory: data.resourceCategory,
      resourceNo: data.resourceNo,
      noofMonths: data.noofMonths,
      workorderFrom: this.Changedatefmt(data.workorderFrom),
      workorderTo: this.Changedatefmt(data.workorderTo),
      docName: "",
      document: data.document,
    },
    )
    
  }

  getDocumentByWorkOrderId(workorderId) {
    this.loader.isLoading=true;
    this.appDoc = {
      activityId: ActivityEnum.WorkOrderDetails,
      id: workorderId.toString(),
    }
    this.workorderdetailsServices.getByRequestId(this.appDoc).subscribe((data: any) => {
      this.document = data;
      this.loader.isLoading=false;
    })
  }

  update() {
    this.submitted = true;
    if (this.workorderdetailsFrmGroup.valid && this.fileExtensionsCount==false) {
      const workorderdetailsModel = {
        workorderId: this.workOrderId,
        workorderNo: this.workorderdetailsFrmGroup.get("workorderNo").value,
        projectCode: "-1",
        issueDate: this.workorderdetailsFrmGroup.get("issueDate").value,
        agencyName: this.workorderdetailsFrmGroup.get("agencyName").value,
        resourceCategory: this.workorderdetailsFrmGroup.get("resourceCategory").value,
        resourceNo: this.workorderdetailsFrmGroup.get("resourceNo").value,
        noofMonths: this.workorderdetailsFrmGroup.get("noofMonths").value,
        workorderFrom: this.workorderdetailsFrmGroup.get("workorderFrom").value,
        workorderTo: this.workorderdetailsFrmGroup.get("workorderTo").value,
        docName: "",
        document: this.datacontent,

      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.workorderdetailsServices.update(workorderdetailsModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.getAll();
                  this.updatehdn = false;
                  this.clear();
                  if (message == "Data Update Successfully") {
                    this.toastrService.success(message);
                  }
                  else {
                    this.toastrService.error(message);
                  }
                }, error: (err: any) => {
                  this.toastrService.error(err);
                }
              })
            }
          }
        })
    }
  }

  deleteData(id: any) {
    this.confirmationDialogService.confirmPopUp("Do you really want to Delete ?")
      .then(confirmed => {
        if (confirmed == true) {
          {
            this.loader.isLoading = true;
            this.workorderdetailsServices.delete(id).subscribe((data: any) => {
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
    this.workorderdetailsServices.getAll().subscribe((data: any) => {
      this.workorderdetailsList = data;
      this.commonFunctionServices.bindDataTable("workorderdetailsGrid", 0);
      this.loader.isLoading = false;
    })
  }

  Changedatefmt(datein: string) {
    this.date = this.datePipe.transform(datein, 'yyyy-MM-dd');
    return this.date;
  }

  onSelectWorkorder(event: any) {

    this.loader.isLoading = true;
    this.projectId = event.target.value;
    this.getWorkOrderByProjectCode(this.projectId)

  }
  getDocumentbyProjectId(data: any) {
    this.appDocumentUploadDetailService.getDocumentByRequestId(data).subscribe((data: any) => {
      this.docData = data;
      this.selectedFileB64 = data.docContent;
      this.modalService.open(this.popupview, { size: 'xl' });
    })
  }

  viewPdf(data: any) {
    this.appDoc = {
      activityId: ActivityEnum.WorkOrderDetails,
      id: data.workorderId.toString(),
    }
    this.getDocumentbyProjectId(this.appDoc);
  }

  getWorkOrderAgency() {
    this.mdWorkOrderAgencyService.getAll().subscribe((data: any) => {
      this.agencyData = data;
    })

  }

  getWorkOrderByProjectCode(projectCode: string) {

    this.workorderdetailsServices.getByProjectCode(projectCode).subscribe((data: any) => {
      this.workorderdetailsList = data;
      this.commonFunctionServices.bindDataTable("workorderdetailsGrid", 0);
      this.loader.isLoading = false;
    })

  }
  noOfMonths_between(date1, date2) {
    const differenceMs = Math.abs(date1 - date2);
    return Math.round(differenceMs / (this.ONE_DAY * 30));
  }

  getWorkOrderDocument(){
    this.selectedFileB64 = this.document.docContent;
    this.modalService.open(this.popupview, { size: 'xl' });
  }

}