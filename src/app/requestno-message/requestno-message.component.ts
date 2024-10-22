import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeforeLoginComponent } from '../shared/before-login/before-login.component';
import { EncyptionDecryption } from '../shared/common/EncyptionDecryption';
import { AppOnBoardingDetailService } from '../shared/services/appOnBoardingDetail';
import { AppOnBoardingRequestService } from '../shared/services/appOnBoardingRequest';
import { ConfigurationApiSecureKey } from '../shared/services/ConfigurationApiSecureKey.Services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-requestno-message',
  templateUrl: './requestno-message.component.html',
  styleUrls: ['./requestno-message.component.css']
})
export class RequestnoMessageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private loader: BeforeLoginComponent, private configurationApiSecureKey: ConfigurationApiSecureKey,
    private AppOnBoardingDetailServiceuser: AppOnBoardingDetailService, private AppOnBoardingRequestServiceuser: AppOnBoardingRequestService) { }
  requestID: string = "";
  requestEncyptId: string = "";
  requestNo: string = "";
  services: string = "";
  showservices: string[] = [];
  Services: string = "";
  User: string = "";
  decSecretKey: string;
  decsalt: string;
  contactdetail: any;
  ngOnInit(): void {
    
    
    this.getDecryptionKey();
    
  }
  getDecryptionKey() {
    //this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {

      this.decSecretKey =environment.secretKey// data[0].secretKey
      this.decsalt =environment.salt //data[0].salt

      this.loader.isLoading = true;
      this.route.queryParams.subscribe(params => {
        this.requestEncyptId = params.Id;
      }
      );
      this.requestID = EncyptionDecryption.Decrypt(this.requestEncyptId, this.decSecretKey, this.decsalt)
      this.requestNo = this.requestID.substring(0, this.requestID.length - 15)
      this.AppOnBoardingDetailServiceuser.getdatafromRequestList(this.requestNo).subscribe((data: any) => {
        this.contactdetail = data;
        this.User = this.contactdetail.coordinatorName;

        this.services = data.services;
        let j = 0;
        for (let i = 0; i < data.services.length; i++) {
          if (data.services[i] != ',') {
            if (data.services[i] == '1') {
              this.showservices[j] = 'Examination Services';
              j = j + 1;
            }
            if (data.services[i] == '2') {
              this.showservices[j] = 'E-Counselling Services';
              j = j + 1;
            }
            if (data.services[i] == '3') {
              this.showservices[j] = 'Result Servicest';
              j = j + 1;
            }
          }
        }
        for (let k = 0; k < this.showservices.length; k++) {
          if (k == this.showservices.length - 1) {
            this.Services = this.Services + this.showservices[k];
          } else {
            this.Services = this.Services + this.showservices[k] + ',';
          }
        }
        this.loader.isLoading = false;
      })
        ;
   // })
  }
  
}
