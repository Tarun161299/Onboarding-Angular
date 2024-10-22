import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BeforeLoginComponent } from 'src/app/shared/before-login/before-login.component';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import { ConfigurationApiSecureKey } from 'src/app/shared/services/ConfigurationApiSecureKey.Services';
import { AppOnBoardingRequestService } from 'src/app/shared/services/appOnBoardingRequest';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-on-boarding-view-status',
  templateUrl: './on-boarding-view-status.component.html',
  styleUrls: ['./on-boarding-view-status.component.css']
})
export class OnBoardingViewStatusComponent implements OnInit {
  requestIdrequest: string;
  statusrequest: string;
  remarkrequest: string;
  requestIdDetails: string;
  Cordmail: string;
  Cordname: string;
  statusDetails: string;
  showStatus: string;
  showStatusdetail: string;
  sendemail: string;
  remarkDetails: string;
  token: any;
  decSecretKey: string;
  decsalt: string;
  constructor(private route: ActivatedRoute,private configurationApiSecureKey: ConfigurationApiSecureKey,
    private toastrService: ToastrService, private user: AppOnBoardingRequestService, private loader: BeforeLoginComponent) { }

  ngOnInit(): void {
    this.getDecryptionKey();
  }
  getDecryptionKey() {
   // this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey
      this.decsalt = environment.salt
      this.loader.isLoading = true;
      const requestno = this.route.snapshot.params['Id'].toString();
      this.user.getStatus(requestno).subscribe((data: any) => {
        this.requestIdrequest = data.statusRequest[0].requestNo;
        this.statusrequest = data.statusRequest[0].status.trim();
        this.remarkrequest = data.statusRequest[0].remarks;
        this.sendemail = data.statusRequest[0].email;
        this.requestIdDetails = data.statusDetail[0].requestNo;
        this.statusDetails = data.statusDetail[0].status;
        this.remarkDetails = data.statusDetail[0].remarks;
  
        this.Cordmail = data.statusDetail[0].cordEmail;
        this.Cordname = data.statusDetail[0].cordName;
        if (this.statusrequest == 'RP' || this.statusrequest == null) {
          this.showStatus = "Pending";
        }
        if (this.statusrequest == 'RH') {
          this.showStatus = "Hold";
        }
        if (this.statusrequest == 'RR') {
          this.showStatus = "Reject";
        }
        if (this.statusrequest == 'RA') {
          this.showStatus = "Approved";
        }
        if (this.statusDetails == 'DP') {
          this.showStatusdetail = "Pending";
        }
        if (this.statusDetails == 'DT') {
          this.showStatusdetail = "Return";
        }
        if (this.statusDetails == 'DR') {
          this.showStatusdetail = "Reject";
        }
        if (this.statusDetails == 'DD') {
          this.showStatusdetail = "Draft";
        }
        if (this.statusDetails == 'NA' || this.statusDetails == '') {
          this.showStatusdetail = "NA"
        }
        const Email = EncyptionDecryption.Decrypt(this.sendemail,this.decSecretKey,this.decsalt);
        const Cordmail = EncyptionDecryption.Decrypt(this.Cordmail,this.decSecretKey,this.decsalt);
        this.user.sendStatusEmail(Email, this.requestIdrequest, this.showStatus, this.showStatusdetail, Cordmail, this.Cordname).subscribe(
          (data: any) => {
            ;
            this.loader.isLoading = false;
            this.toastrService.success('Status has been sent to your registered Email-ID')
          }
        );
        this.loader.isLoading = false;
      })
   // })
  }
}
