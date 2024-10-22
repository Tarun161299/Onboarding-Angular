import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import { AppOnBoardingRequestService } from 'src/app/shared/services/appOnBoardingRequest';
import { ConfigurationApiSecureKey } from 'src/app/shared/services/ConfigurationApiSecureKey.Services';
import { ProjectDetailsServices } from 'src/app/shared/services/ProjectDetailsServices';
import { TokenLocalStorageService } from 'src/app/shared/tokenLocalStorage/tokenLocalStorageService';
import { environment } from 'src/environments/environment';

declare const $: any;

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  public listData!: any[];
  token: any;
  requestId: string = "";
  encSecretKey: string;
  encsalt: string;
  constructor(private configurationApiSecureKey: ConfigurationApiSecureKey, private loader: AfterLoginComponent, private datePipe: DatePipe, private router: Router, private projectuser: ProjectDetailsServices) { }

  ngOnInit(): void {
    this.loader.isLoading = true;
    this.getEncryptionKey()
    this.ProjectList();
  }

  ngAfterViewInit(): void {
    $('#example').DataTable({
      //dom: 'Bfrtip',
      buttons: ['copy', 'excel', 'csv', 'pdf', 'print'],
      "order": []
    });
  }

  ProjectList() {
    this.projectuser.getProjectList().subscribe(data => {
      if (data.length > 0) {
        debugger
        this.listData = data
        
        this.loader.isLoading = false;
      }
    })
  }

  viewDetails(rowdata: any) {    
    this.loader.isLoading = true;
    let number = this.getRandomNumber();
    let projectId = EncyptionDecryption.Encrypt(rowdata.id + number, this.encSecretKey, this.encsalt)
    this.loader.isLoading = false;
    this.router.navigate(['/auth/projectdetail/' + projectId]);
  }

  getRandomNumber() {
    const today = new Date();
    let date = this.datePipe.transform(today, 'YYMMddHHMMSSSSS');
    return date;
  }

  edit(requestNo: string) {
    this.loader.isLoading = true;
    let number = this.getRandomNumber();
    this.requestId = EncyptionDecryption.Encrypt(requestNo + number, this.encSecretKey, this.encsalt);
    this.loader.isLoading = false;
    this.router.navigate(['/auth/projectCreation/Update/' + this.requestId]);
  }

  getEncryptionKey() {
    //this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.encSecretKey = environment.secretKey
      this.encsalt = environment.salt
   // })
  }
}
