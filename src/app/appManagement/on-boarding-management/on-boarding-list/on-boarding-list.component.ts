import { ApiService } from 'src/app/api.services';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle } from "ng-apexcharts";
import { AppOnBoardingRequestService } from 'src/app/shared/services/appOnBoardingRequest';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import { data } from 'jquery';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
import { ToastrService } from 'ngx-toastr';
import { TokenLocalStorageService } from 'src/app/shared/tokenLocalStorage/tokenLocalStorageService';
import { onboardingList } from 'src/app/shared/model/onboardinglListModel';
import { CommonFunctionServices } from 'src/app/shared/common/commonFunction.services';
import { SideBarService } from 'src/app/shared/services/sidebar-services';
import { ConfigurationApiSecureKey } from 'src/app/shared/services/ConfigurationApiSecureKey.Services';
import { OnBoardingMail } from 'src/app/shared/model/OnBoardingMailModel';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	title: ApexTitleSubtitle;
};
declare const $: any;

@Component({
	selector: 'app-on-boarding-list',
	templateUrl: './on-boarding-list.component.html',
	styleUrls: ['./on-boarding-list.component.css']
})
export class OnBoardingListComponent implements OnInit {
	btnReSend = true;
	stateshow: boolean = true;
	public rowdataOrg!: any[];
	rowdata: any;
	TotalRequest: number = 0;
	ApprovedRequest: number = 0;
	PendingRequest: number = 0;
	HoldRequest: number = 0;
	RejectRequest: number = 0;

	ApprovedDetails: number = 0;
	PendingDetails: number = 0;
	ReturnDetails: number = 0;
	RejectDetails: number = 0;
	EligibleDetails: number = 0;

	TotalRequesttitle: string = '';
	ApprovedRequesttitle: string = '';
	PendingRequesttitle: string = '';
	HoldRequesttitle: string = '';
	RejectRequesttitle: string = '';

	EligibleDetailstitle: string = '';
	ApprovedDetailstitle: string = '';
	PendingDetailstitle: string = '';
	ReturnDetailstitle: string = '';
	RejectDetailstitle: string = '';

	encryptedRequestNumber: string = '';
	responseViewBtn: boolean = false;
	Status: any[];
	showStatus: any[];
	TotalRequestprogress = '';
	ApprovedRequestprogress = '';
	PendingRequestprogress = '';
	HoldRequestprogress = '';
	RejectRequestprogress = '';
	token: any;
	datatable: any;
	approvedreq: any;
	temp: any;
	datatablePending: any;
	abc: any;
	flagfilter: number = 0;
	agency: string = "";
	services: string = "";
	ministry: string = "";
	NameofOrganization: string = "";
	mailingAddress: string = "";
	pinCode: string = "";
	headOfOrganization: string = "";
	designation: string = "";
	email: string = "";
	mobileNumber: string = "";
	coordinatorName: string = "";
	coordinatorDesignation: string = "";
	coordinatorEmail: string = "";
	coordinatorMobileNumber: string = "";
	fileUrl: any;
	binarydata: any;
	status: string = "";
	statusArray: any[];
	encSecretKey: string
	encsalt: string
	OnboardingeMail: OnBoardingMail[] = [];
	requestEncyptId: string = "";
	decSecretKey: string
	decsalt: string
	requestId: string = "";
	showservices: String[] = [];
	Services: string = "";
	state: string = "";
	Ministryshow: boolean = true;
	remark: string = "";
	requestDetailViewForm: FormGroup;
	disabletxtarea = false;
	onBoardingDetailsStatus: string = "";
	userDepartmentCoordinator: any[''];
	// showStatus: string = "";
	constructor(
		private commonFunctionServices: CommonFunctionServices,
		private storage: TokenLocalStorageService,
		private toastrService: ToastrService,
		private user: AppOnBoardingRequestService,
		private loader: AfterLoginComponent,
		private router: Router,
		private datePipe: DatePipe,
		private changeRef: ChangeDetectorRef,
		private sideNavbarservice: SideBarService,
		private users: AppOnBoardingRequestService,
		private configurationApiSecureKey: ConfigurationApiSecureKey

	) {

	}
	ngOnInit(): void {
		this.getEncryptionKey();
		this.token = this.storage.get('token');
	};

	OnBoardingRequestList() {
		this.loader.isLoading = true;
		this.user.getOnboardingRequestList()
			.subscribe({
				next: data => {
					this.rowdata = data;
					this.rowdataOrg = data;
					this.commonFunctionServices.bindDataTable("exampleDD", 0);
					this.loader.isLoading = false;
					this.loaderTimeOut();
				}, error: (err: any) => {
				}
			})
	}

	statuCount() {
		this.user.AppOnBoardingStstusCount()
			.subscribe({
				next: (data: any) => {
					if (data) {
						//Count
						this.TotalRequest = data.statusDetail[0].totalRequest;
						this.ApprovedRequest = data.statusDetail[0].approvedRequest;
						this.PendingRequest = data.statusDetail[0].pendingRequest;
						this.HoldRequest = data.statusDetail[0].holdRequest;
						this.RejectRequest = data.statusDetail[0].rejectRequest;
						this.ApprovedDetails = data.statusDetail[0].approvedDetails;
						this.PendingDetails = data.statusDetail[0].pendingDetails;
						this.ReturnDetails = data.statusDetail[0].returnDetails;
						this.RejectDetails = data.statusDetail[0].rejectDetails;
						this.EligibleDetails = data.statusDetail[0].eligileDetails;

						//Title
						this.TotalRequesttitle = "Total";
						this.ApprovedRequesttitle = "Approved";
						this.PendingRequesttitle = "Pending";
						this.HoldRequesttitle = "Hold";
						this.RejectRequesttitle = "Rejected";
						this.EligibleDetailstitle = "Total";
						this.ApprovedDetailstitle = "Approved";
						this.PendingDetailstitle = "Pending";
						this.ReturnDetailstitle = "Return";
						this.RejectDetailstitle = "Rejected";

						//Progressbar
						this.TotalRequestprogress = 100 + '%';
						this.ApprovedRequestprogress = 100 / this.TotalRequest * this.ApprovedRequest + '%';
						this.PendingRequestprogress = 100 / this.TotalRequest * this.PendingRequest + '%';
						this.HoldRequestprogress = 100 / this.TotalRequest * this.HoldRequest + '%';
						this.RejectRequestprogress = 100 / this.TotalRequest * this.RejectRequest + '%';
					}
				},
				error: (err: any) => {
				}
			})

	}
	viewDetails(rowdata: any) {
		let number = this.getRandomNumber();
		let requestId = EncyptionDecryption.Encrypt(rowdata.requestNo + number, this.encSecretKey, this.encsalt)
		this.router.navigate(['/auth/requestDetailsView/' + requestId]);
	}

	viewProjectCreation(rowdata: any) {
		let number = this.getRandomNumber();
		let requestId = EncyptionDecryption.Encrypt(rowdata.requestNo + number, this.encSecretKey, this.encsalt)
		this.router.navigate(['/auth/projectCreation/Save/' + requestId]);
	}

	viewResponseDetails(rowdata: any) {
		let number = this.getRandomNumber();
		let requestId = EncyptionDecryption.Encrypt(rowdata.requestNo + number, this.encSecretKey, this.encsalt)
		this.router.navigate(['/auth/responseDetailView/' + requestId]);
	}

	getRandomNumber() {
		const today = new Date();
		let date = this.datePipe.transform(today, 'YYMMddHHMMSSSSS');
		return date;
	}

	getFilteredData() {
		this.OnBoardingRequestList();
	}


	ngAfterViewInit(): void {
	}

	totalRequest() {
		this.OnBoardingRequestList();
	}

	filterStatus(status: any) {
		this.user.getOnboardingRequestListByStatus(status)
			.subscribe({
				next: data => {

					if (data.length > 0) {
						this.rowdata = data;
						this.commonFunctionServices.bindDataTable("exampleDD", 0);
						this.loaderTimeOut();
					}
				}, error: (err: any) => {
				}
			})
	}

	filterData(status: any) {

		this.loader.isLoading = true;
		if (status == "RA" || status == "RP" || status == "RH" || status == "RR") {
			this.rowdata = this.rowdataOrg.filter(z => z.showStatus === status);
			this.commonFunctionServices.bindDataTable("exampleDD", 0);
			this.loaderTimeOut();
		}
		else if (status == "DA" || status == "DD" || status == "DP" || status == "DR" || status == "DT") {
			this.rowdata = this.rowdataOrg.filter(z => z.status === status);
			this.commonFunctionServices.bindDataTable("exampleDD", 0);
			this.loaderTimeOut();
		}
	}

	ApproveRequest() {
		this.filterData("RA");
	}

	btnPendingRequest() {
		this.filterData("RP");
	}

	btnOnHoldRequest() {
		this.filterData("RH");
	}

	btnRejectRequest() {
		this.filterData("RR");
	}

	btnTotalDetails() {
		this.loader.isLoading = true;
		this.user.getOnboardingRequestList()
			.subscribe({
				next: data => {

					if (data.length > 0) {

						this.rowdata = data.filter(x => x.status == "DA" || x.status == "DT" || x.status == "DR" || x.status == "DP");
						this.commonFunctionServices.bindDataTable("exampleDD", 0);
						this.loaderTimeOut();
					}
					else {
						this.loaderTimeOut();
					}
				}, error: (err: any) => {
				}
			})

	}

	btnDetailApproved() {
		this.filterData("DA");
	}

	btnDetailPending() {
		this.filterData("DP");
	}

	btnDetailReturn() {
		this.filterData("DT");
	}

	btnDetailReject() {
		this.filterData("DR");
	}
	loaderTimeOut() {
		setTimeout(() => {
			this.loader.isLoading = false;
		}, 1000);
	}
	getEncryptionKey() {
		//this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
			this.encSecretKey = environment.secretKey;
			this.encsalt = environment.salt;
			this.decSecretKey= environment.secretKey;
			this.decsalt=environment.salt;
			this.OnBoardingRequestList();
			this.statuCount();
			this.reQuestDetailsView();
		//})
	}
	onReSend(rowdata: any) {
		
		//#region Decryption
		this.changeRef.detectChanges();
		this.loader.isLoading = true;
		// this.requestEncyptId = rowdata.requestNo.toString();
		// this.requestId = EncyptionDecryption.Decrypt(this.requestEncyptId, this.decSecretKey, this.decsalt)
		
		let number = this.getRandomNumber(); 
		this.requestEncyptId = EncyptionDecryption.Encrypt(rowdata.requestNo + number, this.encSecretKey, this.encsalt)
		this.requestId = rowdata.requestNo.toString();//EncyptionDecryption.Decrypt(this.requestEncyptId, this.decSecretKey, this.decsalt)
		//this.requestId = this.requestId.substring(0, this.requestId.length - 15)
		this.token = this.storage.get('token');
		//this.pdfData();
		this.getByRequestId(rowdata.requestNo);

		//#endregion Decryption
		
	}

	pdfData() {
		this.users.getdatafromRequestList(this.requestId).subscribe(
			data => {
				this.binarydata = data.docContent;
			}
		);
	}
	//getByRequestId0
	getByRequestId(requestID:any) {

		this.users.getdatafromRequestList(requestID).subscribe(
			data => {
				this.requestId = data.requestNo;
		
				
				
				this.services = this.Services;
				this.agency = data.agencyType;
				
				this.NameofOrganization = data.oranizationName;
				this.mailingAddress = data.address;
				this.pinCode = data.pinCode;
				this.headOfOrganization = data.contactPerson;
				this.designation = data.designation;
				this.email = EncyptionDecryption.Decrypt(data.email, this.decSecretKey, this.decsalt);
				this.mobileNumber = EncyptionDecryption.Decrypt(data.mobileNo, this.decSecretKey, this.decsalt);
				this.coordinatorName = data.coordinatorName;
				this.coordinatorDesignation = data.coordinatorDesignation;
				this.coordinatorEmail = EncyptionDecryption.Decrypt(data.coordinatorEmail, this.decSecretKey, this.decsalt);
				this.coordinatorMobileNumber = EncyptionDecryption.Decrypt(data.coordinatorPhone, this.decSecretKey, this.decsalt);
				this.statusArray = data.mdStatusList;
				this.status = data.status;
				this.remark = data.remarks;
				this.onBoardingDetailsStatus=data.onBoardingDetailsStatus;
				
				if (this.status == 'RP' || this.status == null) {
					//this.showStatus = "Pending";
				}
				if (this.status == 'RH') {
					//this.showStatus = "Hold";
				}
				if (this.status == 'RR') {
					this.btnReSend = false;
					this.disabletxtarea = true;
					// this.showStatus = "Reject";
				}
				if (this.status == 'RA') {
					this.btnReSend = false;
					//this.showStatus = "Approved";
					this.disabletxtarea = true;
				}
				if (data.onBoardingDetailsStatus === 'DP') {
					this.responseViewBtn = true;
				}
				else {
					this.responseViewBtn = false;
				}
				if (this.disabletxtarea == true) {
					//this.requestDetailViewForm.controls['remarks'].disable();
				}
				this.loader.isLoading = true;
		this.OnboardingeMail[0] = {
			encryptedRequestNumber: this.requestEncyptId,
			requestNo:requestID,
			agency: this.agency,
			services: this.services,
			ministry: this.ministry,
			nameofOrganization: this.NameofOrganization,
			completeMailingAddress: this.mailingAddress,
			pinCode: this.pinCode,
			cordinatorName: this.coordinatorName,
			cordMail: this.email,
			headofOrganization: this.headOfOrganization,
			designation: this.designation,
			email: EncyptionDecryption.Encrypt(this.email, this.encSecretKey, this.encsalt),
			mobileNo: EncyptionDecryption.Encrypt(this.mobileNumber, this.encSecretKey, this.encsalt),
			mailingEmail: this.coordinatorEmail,
			status: this.status,
			remarks: data.remarks,//(<HTMLInputElement>document.getElementById("remarks")).value.toString(),
			userId: this.storage.ParseToken().userId,//this.storage.get('userID1'),
			cordMobileNo: btoa(this.coordinatorMobileNumber).toString(),
		}
		this.users.OnBoardingMailApi(this.OnboardingeMail[0]).subscribe(
			{
				next: (response: any) => {

					const message = response;
					this.loader.isLoading = false;
					this.toastrService.success(message);

					return false;
				},
				error: (e) => {
					const error = e.message;
					this.loader.isLoading = false;
					this.toastrService.error(error);
					return false;
				}
			}
		);

				//this.loader.isLoading = false;
			}
		);

	}

	reQuestDetailsView() {

		this.users.getdatafromRequestList(this.requestId).subscribe(
			data => {
				this.requestId = data.requestNo;
				let j = 0;
				for (let i = 0; i < data.services.length; i++) {
					if (data.services[i] != ',') {
						if (data.services[i] == "1") {
							this.showservices[j] = "Examination Services";
							j = j + 1;
						}
						if (data.services[i] == "2") {
							this.showservices[j] = "Counselling Services";
							j = j + 1;
						}
						if (data.services[i] == "3") {
							this.showservices[j] = "Result Servicest";
							j = j + 1;
						}
					}
				}
				for (let k = 0; k < this.showservices.length; k++) {
					if (k == this.showservices.length - 1) {
						this.Services = this.Services + this.showservices[k]
					}
					else {
						this.Services = this.Services + this.showservices[k] + ","
					}
				}
				this.services = this.Services;
				this.agency = data.agencyType;
				if (this.agency.indexOf('State') !== -1) {
					this.stateshow = false;
					this.state = data.state;
				}
				if (this.agency.indexOf('Central') !== -1) {
					this.Ministryshow = false;
					this.ministry = data.ministryName;
				}
				this.NameofOrganization = data.oranizationName;
				this.mailingAddress = data.address;
				this.pinCode = data.pinCode;
				this.headOfOrganization = data.contactPerson;
				this.designation = data.designation;
				this.email = EncyptionDecryption.Decrypt(data.email, this.decSecretKey, this.decsalt);
				this.mobileNumber = EncyptionDecryption.Decrypt(data.mobileNo, this.decSecretKey, this.decsalt);
				this.coordinatorName = data.coordinatorName;
				this.coordinatorDesignation = data.coordinatorDesignation;
				this.coordinatorEmail = EncyptionDecryption.Decrypt(data.coordinatorEmail, this.decSecretKey, this.decsalt);
				this.coordinatorMobileNumber = EncyptionDecryption.Decrypt(data.coordinatorPhone, this.decSecretKey, this.decsalt);
				this.statusArray = data.mdStatusList;
				this.status = data.status;
				this.remark = data.remarks;
				this.onBoardingDetailsStatus=data.onBoardingDetailsStatus;
				this.requestDetailViewForm.patchValue({
					remarks: this.remark
				})
				if (this.status == 'RP' || this.status == null) {
					//this.showStatus = "Pending";
				}
				if (this.status == 'RH') {
					//this.showStatus = "Hold";
				}
				if (this.status == 'RR') {
					this.btnReSend = false;
					this.disabletxtarea = true;
					// this.showStatus = "Reject";
				}
				if (this.status == 'RA') {
					this.btnReSend = false;
					//this.showStatus = "Approved";
					this.disabletxtarea = true;
				}
				if (data.onBoardingDetailsStatus === 'DP') {
					this.responseViewBtn = true;
				}
				else {
					this.responseViewBtn = false;
				}
				if (this.disabletxtarea == true) {
					this.requestDetailViewForm.controls['remarks'].disable();
				}
				this.loader.isLoading = false;
			}
		);

	}
	//#region Details Link Send
	resendRegistation(requestId:any) {

		this.users.getdatafromRequestList(requestId).subscribe(
			(data:any) => {
				
				this.requestId = data.requestNo;
				let j = 0;
				
				this.services = this.Services;
				this.agency = data.agencyType;
				this.NameofOrganization = data.oranizationName;
				this.mailingAddress = data.address;
				this.pinCode = data.pinCode;
				this.headOfOrganization = data.contactPerson;
				this.designation = data.designation;
				this.email = EncyptionDecryption.Decrypt(data.email, this.decSecretKey, this.decsalt);
				this.mobileNumber = EncyptionDecryption.Decrypt(data.mobileNo, this.decSecretKey, this.decsalt);
				this.coordinatorName = data.coordinatorName;
				this.coordinatorDesignation = data.coordinatorDesignation;
				this.coordinatorEmail = EncyptionDecryption.Decrypt(data.coordinatorEmail, this.decSecretKey, this.decsalt);
				this.coordinatorMobileNumber = EncyptionDecryption.Decrypt(data.coordinatorPhone, this.decSecretKey, this.decsalt);
				this.statusArray = data.mdStatusList;
				this.status = data.status;
				this.remark = data.remarks;
				this.onBoardingDetailsStatus=data.onBoardingDetailsStatus;
				
				this.loader.isLoading = true;

				let number = this.getRandomNumber();
				let requestEncryptId = EncyptionDecryption.Encrypt(requestId + number, this.encSecretKey, this.encsalt);
				//this.loader.isLoading = false;
				
				const params = {
					
					encryptedRequestNumber: requestEncryptId,
					requestNo: requestId,
					status: data.onBoardingDetailsStatus.trim(),
					remarks: "",
					email: this.coordinatorEmail,
					cordName: this.coordinatorName,
					cordNumber: btoa(this.coordinatorMobileNumber).toString(),
					activity: "ResendRegistrationLink"
				}
				this.user.UpdateOnboardDetails(params).subscribe(
					{
						next: (response: any) => {
							this.loader.isLoading = false;
							let message = response;
							if (message == 'Try Again') {
								this.toastrService.error(message);
							}
							else {
								this.toastrService.success(message);
								this.router.navigate(['/auth/onboardinglist']);
							}
							return false;
						},
						error: (e) => {
							this.loader.isLoading = false;
							const error = e.message;
							this.toastrService.error(error);
							return false;
						}
					}
				);
			}
		);

	}
	//#region Details Link Send
	onDetailsReSend(rowdata: any) {
		
	

		this.resendRegistation(rowdata.requestNo)
		//this.onBoardingDetailsStatus == 'DA' || this.onBoardingDetailsStatus == 'DT' || this.onBoardingDetailsStatus == 'DR'
		
		
	}
	//#endregion
}