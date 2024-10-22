
import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { AppProjectPaymentDetailsModel } from "src/app/shared/model/app-project-payment-details.model";
import { AppProjectPaymentDetailsService } from "src/app/shared/services/app-project-payment-details.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { EncyptionDecryption } from "src/app/shared/common/EncyptionDecryption";
import { ActivatedRoute } from "@angular/router";
import { dateFormat } from "highcharts";
import { DatePipe, getLocaleDateFormat } from "@angular/common";
import { AppOnBoardingRequestService } from "src/app/shared/services/appOnBoardingRequest";
import { AppDocFilter } from "src/app/shared/model/appDocFilterModel";
import { DocumentTypeService } from "src/app/shared/services/documentTypeService";
import { ActivityEnum } from "src/app/shared/common/enums/activity.enums";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProjectDetailsServices } from "src/app/shared/services/ProjectDetailsServices";

declare const $: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @Input() Payment: any;

  submitted: boolean = false;
  updatehdn: boolean = false;
  updte:boolean=false;
  cancel: boolean = false;
  isApproved: boolean = false;
  isVerified:boolean=false;
  requestId: string;
  appprojectpaymentdetailsFrmGroup: FormGroup;
  appprojectpaymentdetailsModel: AppProjectPaymentDetailsModel;
  appprojectpaymentdetailsList: any[] = [];
  nicProjectCode:any;
  nicPInumber:any;
  dateOfPi:any;
  piAmount:any;
  date: any;
  isavailPI: boolean = false;
  isavailProposal:  boolean = false;
  isavailCoverLetter:  boolean = false;
  Proposal: number = 0;
  CoverLetter: number = 0;
  appDocFilter: AppDocFilter;
  rowdataMou:any;
  selectedFileB64:string;
  rowdata:any;
  checkData:boolean=false;
  @ViewChild('content') popupview !: ElementRef;
  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private loader: AfterLoginComponent,
    private confirmationDialogService: ConfirmationDialogService,
    private appprojectpaymentdetailsServices: AppProjectPaymentDetailsService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private ipservice: AppOnBoardingRequestService,
    private documentTypeService: DocumentTypeService,
     private modalService: NgbModal,
     private appProjectPaymentDetailsService:AppProjectPaymentDetailsService,
     private projectService: ProjectDetailsServices,
  ) {
    this.appprojectpaymentdetailsFrmGroup = this.formBuilder.group({
      paymentId: [""],
      paymentParentRefId: [""],
      amount: ["", [Validators.required]],
      uTRNo: [""],
      paymentDate: ["", [Validators.required]],
      incomeTax: [""],
      gST: [""],
      tDS: [""],
      status: ["",],
      iPAddress: ["",],
      submitTime: ["",],
    });
  }

  ngOnInit(): void {    
    this.requestId = this.Payment.requestNo;  
    if (this.Payment.length != 0) {
      this.checkData = true;
    }  
    this.getByPaymentParentRefId();
    this.getPiDetailsData(this.Payment);
    this.getDocument()
    this.reloadPayment()
  }

  reloadPayment(){
    this.appProjectPaymentDetailsService.getRefreshPaymentBar().subscribe((data:any)=>{
        this.requestId = this.Payment.requestNo;  
        if (this.Payment.length != 0) {
          this.checkData = true;
        }  
      this.onSubmitPidetails();
      })
  }

  ngAfterViewInit(): void {
    $("#appprojectpaymentdetailsGrid").DataTable({
      "order": []
    });
  }
  get appprojectpaymentdetailsFrmControl() {
    return this.appprojectpaymentdetailsFrmGroup.controls;
  }

  clear() {
    this.appprojectpaymentdetailsFrmGroup.reset();
    this.submitted = false;
    this.updatehdn = false;
  }
 

  save() {
    this.submitted = true;
    if (this.appprojectpaymentdetailsFrmGroup.valid) {
      const save = {
        paymentId: 0,
        paymentParentRefId: this.requestId,
        amount: Number(this.appprojectpaymentdetailsFrmGroup.get("amount").value),
        uTRNo: this.appprojectpaymentdetailsFrmGroup.get("uTRNo").value,
        paymentDate: this.appprojectpaymentdetailsFrmGroup.get("paymentDate").value,
        incomeTax: Number(this.appprojectpaymentdetailsFrmGroup.get("incomeTax").value),
        gST: Number(this.appprojectpaymentdetailsFrmGroup.get("gST").value),
        tDS: Number(this.appprojectpaymentdetailsFrmGroup.get("tDS").value),
        status: 'PN',
        iPAddress:'',
        submitTime: new Date(),
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.appprojectpaymentdetailsServices.insert(save).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getByPaymentParentRefId();
                this.clear();
                this.toastrService.success("Data Saved Successfully");
              })
            }
          }
        })
    }
  }
  edit(data: any) {
    this.updatehdn = true;
    this.appprojectpaymentdetailsFrmGroup.patchValue({
      paymentId: data.paymentId,
      paymentParentRefId: data.paymentParentRefId,
      amount: data.amount,
      uTRNo: data.utrNo,
      paymentDate: this.datePipe.transform(data.paymentDate, 'yyyy-MM-dd'),
      incomeTax: data.incomeTax,
      gST: data.gst,
      tDS: data.tds,
      status: data.status,
      iPAddress: data.ipAddress,
      submitTime: data.submitTime,
    },
    )
  }
  appProjectPaymentDetailsModel:AppProjectPaymentDetailsModel;
  update() {
    this.submitted = true;
    if (this.appprojectpaymentdetailsFrmGroup.valid) {
      
     this.appProjectPaymentDetailsModel= {
        paymentId: this.appprojectpaymentdetailsFrmGroup.get("paymentId").value,
        paymentParentRefId: this.requestId,
        amount: this.appprojectpaymentdetailsFrmGroup.get("amount").value,
        uTRNo: this.appprojectpaymentdetailsFrmGroup.get("uTRNo").value,
        paymentDate: this.appprojectpaymentdetailsFrmGroup.get("paymentDate").value,
        incomeTax: this.appprojectpaymentdetailsFrmGroup.get("incomeTax").value,
        gST: this.appprojectpaymentdetailsFrmGroup.get("gST").value,
        tDS: this.appprojectpaymentdetailsFrmGroup.get("tDS").value,
        status: this.appprojectpaymentdetailsFrmGroup.get("status").value,
        iPAddress: this.appprojectpaymentdetailsFrmGroup.get("iPAddress").value,
        submitTime: this.appprojectpaymentdetailsFrmGroup.get("submitTime").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              
              this.loader.isLoading = true;
              this.appprojectpaymentdetailsServices.update(this.appProjectPaymentDetailsModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getByPaymentParentRefId();
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
              })
            }
          }
        })
    }
  }
  getPiDetailsData(rowData: any) {
     this.nicProjectCode= rowData.projectCode,
     this.nicPInumber=rowData.nicsipino,
     this.dateOfPi=this.Changedateformat(rowData.pidate),
     this.piAmount= rowData.piamount
  }
  onSubmitPidetails(){
    this.projectService.getbyProjectId(this.Payment.id).subscribe((data: any) => {
      this.Payment = data;
      this.getByPaymentParentRefId();
      this.loader.isLoading = false;
      this.getPiDetailsData(this.Payment);
      this.getDocument()
    })
  }
  Changedateformat(datein: string) {
    this.date = this.datePipe.transform(datein, 'yyyy-MM-dd');
    return this.date;
  }

  getDocument() {
    this.appDocFilter = {
      moduleRefId: this.Payment.requestNo,
      docType: "",
      activityId: "104"
    }
    
    this.documentTypeService.usergetByRequestId(this.appDocFilter).subscribe((data: any) => {
      this.rowdataMou = data;
      data.forEach(element => {
        var docType = element.docType;
        switch (docType) {
          case "05":
            this.isavailPI = true;
            break;
          case "06":
            this.isavailProposal = true;
            break;
          case "07":
            this.isavailCoverLetter = true;
            break;
        }
      }
      )
      return
    })
  }
  viewDocument(doctype: string) {
    const param = {
      ModuleRefId: this.Payment.requestNo,
      DocType: doctype,
      ActivityId: ActivityEnum.ProposalAndPI
    };
    this.documentTypeService.getByDocType(param).subscribe((data: any) => {
      this.rowdata = data;
      this.selectedFileB64 = data.docContent;
      this.modalService.open(this.popupview, { size: 'xl' });
    })
  }
  getByPaymentParentRefId() {
    this.appprojectpaymentdetailsServices.getByPaymentParentRefId(this.requestId).subscribe((data: any) => {
      
      this.appprojectpaymentdetailsFrmGroup.patchValue({
        paymentId: data.paymentId,  
        paymentParentRefId: data.paymentParentRefId,
        amount: data.amount,
        uTRNo: data.utrNo,
        paymentDate: this.datePipe.transform(data.paymentDate, 'yyyy-MM-dd'),
        incomeTax: data.incomeTax,
        gST: data.gst,
        tDS: data.tds,
        status: data.status,
        iPAddress: data.ipAddress,
        submitTime: data.submitTime,
      },
      )
      if (data.status == "CP") {
        this.isApproved = false;   
      }
    })
    this.isApproved=true;
  }

  approved() {

    this.submitted = true;
    if (this.appprojectpaymentdetailsFrmGroup.valid) {
      const appprojectpaymentdetailsModel = {
        paymentId: (this.appprojectpaymentdetailsFrmGroup.get("paymentId").value=='')?0:Number(this.appprojectpaymentdetailsFrmGroup.get("paymentId").value),
        paymentParentRefId: this.appprojectpaymentdetailsFrmGroup.get("paymentParentRefId").value,
        amount: this.appprojectpaymentdetailsFrmGroup.get("amount").value,
        uTRNo: this.appprojectpaymentdetailsFrmGroup.get("uTRNo").value,
        paymentDate:new Date(this.appprojectpaymentdetailsFrmGroup.get("paymentDate").value),
        incomeTax: this.appprojectpaymentdetailsFrmGroup.get("incomeTax").value,
        gST: this.appprojectpaymentdetailsFrmGroup.get("gST").value,
        tDS: this.appprojectpaymentdetailsFrmGroup.get("tDS").value,
        status: "CP",
        iPAddress: this.appprojectpaymentdetailsFrmGroup.get("iPAddress").value,
        submitTime: new Date(),
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to  Verified the Payment?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.appprojectpaymentdetailsServices.updateStatus(appprojectpaymentdetailsModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getByPaymentParentRefId();
                this.updatehdn = false;
                this.clear();
                if (message != "Try Again") {
                  if (message > 0) {
                    this.toastrService.success("Payment Verified Successfully");
                    this.isVerified=true;
                    this.updatehdn=true;
                    this.updte=false;
                    this.cancel=true;
                  }
                }
                if (message == "Try Again") {
                  this.toastrService.error("Error Occured");
                }
              })
            }
          }
        })
    }
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
  download(doctype: string) {
    
    const param = {
      ModuleRefId: this.Payment.requestNo,
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
      const fileName = 'Payment.pdf';
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }
  }
}