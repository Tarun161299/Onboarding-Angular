
import { Component, OnInit } from "@angular/core";
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
import { DatePipe } from "@angular/common";
import { ConfigurationApiSecureKey } from "src/app/shared/services/ConfigurationApiSecureKey.Services";
import { MdStatusEnum } from "src/app/shared/common/enums/MdStatus.enums";
import { AppOnBoardingRequestService } from "src/app/shared/services/appOnBoardingRequest";
import { ProjectDetailsServices } from "src/app/shared/services/ProjectDetailsServices";
import { environment } from "src/environments/environment";

declare const $: any;

@Component({
  selector: "app-app-project-payment-details",
  templateUrl: "./app-project-payment-details.component.html",
  styleUrls: ["./app-project-payment-details.component.css"]
})
export class AppProjectPaymentDetailsComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  requestId: string;
  decSecretKey: string;
  decsalt: string;
  rowData: any;
  appprojectpaymentdetailsFrmGroup: FormGroup;
  appprojectpaymentdetailsModel: AppProjectPaymentDetailsModel;
  appprojectpaymentdetailsList: any[] = [];
  ipAddress = '_._._._';
  myDate = new Date();

  constructor(private datePipe: DatePipe, private formBuilder: FormBuilder, private projectService: ProjectDetailsServices, private configurationApiSecureKey: ConfigurationApiSecureKey, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private appprojectpaymentdetailsServices: AppProjectPaymentDetailsService, private toastrService: ToastrService, private route: ActivatedRoute,
    private user: AppOnBoardingRequestService) {
    this.appprojectpaymentdetailsFrmGroup = this.formBuilder.group({
      paymentId: ["", []],
      paymentParentRefId: ["", []],
      amount: ["", [Validators.required, Validators.required]],
      uTRNo: ["", [Validators.required, Validators.required]],
      paymentDate: ["", [Validators.required, Validators.required]],
      incomeTax: ["", [Validators.required, Validators.required]],
      gST: ["", [Validators.required, Validators.required]],
      tDS: ["", [Validators.required, Validators.required]],
      status: ["",],
      iPAddress: ["",],
      submitTime: ["",],
    });
  }

  ngOnInit(): void {
    //this.getDecryptionKey();

    //this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {

      this.decSecretKey = environment.secretKey
      this.decsalt = environment.salt

      this.requestId = this.route.snapshot.params['id'].toString();
      this.requestId = EncyptionDecryption.Decrypt(this.requestId, this.decSecretKey, this.decsalt);
      this.requestId = this.requestId.substring(0, this.requestId.length - 15);
      this.getByPaymentParent();
      this.getProjectServiceDetails();
      this.loader.isLoading = false;
   // })
  }

  getDecryptionKey() {
   // this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {

      this.decSecretKey = environment.secretKey
      this.decsalt = environment.salt
   // })
  }
  ngAfterViewInit(): void {
    $("#appprojectpaymentdetailsGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
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
        paymentParentRefId: this.requestId,
        paymentId: 0,
        amount: Number(this.appprojectpaymentdetailsFrmGroup.get("amount").value),
        uTRNo: this.appprojectpaymentdetailsFrmGroup.get("uTRNo").value,
        paymentDate: this.appprojectpaymentdetailsFrmGroup.get("paymentDate").value,
        incomeTax: Number(this.appprojectpaymentdetailsFrmGroup.get("incomeTax").value),
        gST: Number(this.appprojectpaymentdetailsFrmGroup.get("gST").value),
        tDS: Number(this.appprojectpaymentdetailsFrmGroup.get("tDS").value),
        status: MdStatusEnum.Pending,
        iPAddress: this.ipAddress,
        submitTime: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),

        /* AuditColumns If any */
        //created_by: "",
        //created_date: "2023-02-27T09:53:56.110Z",
        //modified_by: "",
        //modified_date: "2023-02-27T09:53:56.110Z"
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.appprojectpaymentdetailsServices.insert(save).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getByPaymentParent();
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

  update() {
    this.submitted = true;
    if (this.appprojectpaymentdetailsFrmGroup.valid) {
      const appprojectpaymentdetailsModel = {
        paymentId: this.appprojectpaymentdetailsFrmGroup.get("paymentId").value,
        paymentParentRefId: this.appprojectpaymentdetailsFrmGroup.get("paymentParentRefId").value,
        amount: this.appprojectpaymentdetailsFrmGroup.get("amount").value,
        uTRNo: this.appprojectpaymentdetailsFrmGroup.get("uTRNo").value,
        paymentDate: this.appprojectpaymentdetailsFrmGroup.get("paymentDate").value,
        incomeTax: this.appprojectpaymentdetailsFrmGroup.get("incomeTax").value,
        gST: this.appprojectpaymentdetailsFrmGroup.get("gST").value,
        tDS: this.appprojectpaymentdetailsFrmGroup.get("tDS").value,
        status: this.appprojectpaymentdetailsFrmGroup.get("status").value,
        iPAddress: this.appprojectpaymentdetailsFrmGroup.get("iPAddress").value,
        submitTime: this.appprojectpaymentdetailsFrmGroup.get("submitTime").value,

        /* AuditColumns If any */
        //created_by: "",
        //created_date: "2023-02-27T09:53:56.110Z",
        //modified_by: "",
        //modified_date: "2023-02-27T09:53:56.110Z"
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.appprojectpaymentdetailsServices.update(appprojectpaymentdetailsModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getByPaymentParent();
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

  delete(id: any) {
    this.confirmationDialogService.confirmPopUp("Do you really want to Delete ?")
      .then(confirmed => {
        if (confirmed == true) {
          {
            this.loader.isLoading = true;
            this.appprojectpaymentdetailsServices.delete(id).subscribe((data: any) => {
              this.loader.isLoading = false;
              const message = data;
              this.toastrService.error(message);
              this.clear();
              this.getByPaymentParent();
            })
          }
        }
      })
  }

  getByPaymentParent() {
    this.appprojectpaymentdetailsServices.getByPaymentParentRefId(this.requestId).subscribe((data: any) => {

      if (data == null || data == "") {
        return;
      }
      this.appprojectpaymentdetailsList = data;
      this.loader.isLoading = false;
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
    })
  }

  getIPAddress() {
    this.loader.isLoading = true;
    this.user.GetIP().subscribe((res: any) => {
      this.ipAddress = res;
      this.loader.isLoading = false;
    })
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
}