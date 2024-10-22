import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeforeLoginComponent } from '../shared/before-login/before-login.component';
import { EncyptionDecryption } from '../shared/common/EncyptionDecryption';
import { TokenLocalStorageService } from '../shared/tokenLocalStorage/tokenLocalStorageService';
import { AppOnBoardingRequestService } from '../shared/services/appOnBoardingRequest';
import { AppOnBoardingDetailService } from '../shared/services/appOnBoardingDetail';
import { ConfigurationApiSecureKey } from '../shared/services/ConfigurationApiSecureKey.Services';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-response-detail-message',
  templateUrl: './response-detail-message.component.html',
  styleUrls: ['./response-detail-message.component.css']
})
export class ResponseDetailMessageComponent implements OnInit {
  requestId: any;
  requestEncyptId: any;
  requestNumber: any;
  user: any;
  User: string = "";
  contactdetail: any;
  decSecretKey: string;
  decsalt: string;
  constructor(private toaster:ToastrService,private storage: TokenLocalStorageService, private configurationApiSecureKey: ConfigurationApiSecureKey,
    private AppOnBoardingDetailServiceuser: AppOnBoardingDetailService, private route: ActivatedRoute, private loader: BeforeLoginComponent) { }
  ngOnInit(): void {

    
        this.decSecretKey =environment.secretKey// data[0].secretKey
        this.decsalt =environment.salt// data[0].salt
        this.loader.isLoading = false;
        this.user = this.storage.ParseToken().userId;
        this.route.queryParams.subscribe(params => {
          this.requestEncyptId = params.Id;
        }
        );
        //this.requestEncyptId = this.route.snapshot.params['Id'].toString();   
        this.requestNumber = EncyptionDecryption.Decrypt(this.requestEncyptId, this.decSecretKey, this.decsalt)
        this.requestId = this.requestNumber.substring(0, this.requestNumber.length - 15)
        this.AppOnBoardingDetailServiceuser.getdatafromRequestList(this.requestId).subscribe((data: any) => {
          this.contactdetail = data;
          this.User = this.contactdetail.coordinatorName;
          this.loader.isLoading = false;
        })
       // return false;
     
  }
}
