import { Component, OnInit } from '@angular/core';
import { MdDistrictService } from '../shared/services/md-district.service';
import { MdStateService } from '../shared/services/md-state.service';
import { ZmstInstituteTypeService } from '../shared/services/zmst-instituteType.service';
import { FormBuilder } from '@angular/forms';
import { AfterLoginComponent } from '../shared/after-login/after-login.component';
import { ConfirmationDialogService } from '../shared/services/confirmation-dialog.service';
import { ZmstInstituteService } from '../shared/services/zmst-institute.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EncyptionDecryption } from '../shared/common/EncyptionDecryption';
import { DatePipe } from '@angular/common';
import { ConfigurationApiSecureKey } from '../shared/services/ConfigurationApiSecureKey.Services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-zmst-institute-list',
  templateUrl: './zmst-institute-list.component.html',
  styleUrls: ['./zmst-institute-list.component.css']
})
export class ZmstInstituteListComponent implements OnInit {
  zmstinstituteList: any
  encSecretKey: string
  encsalt: string
  constructor(private datePipe: DatePipe,
    private router: Router,
    private configurationApiSecureKey: ConfigurationApiSecureKey,
    private mdDistrictService: MdDistrictService,
    private mdStateService: MdStateService,
    private zmstInstituteTypeService: ZmstInstituteTypeService,
    private formBuilder: FormBuilder,
    private loader: AfterLoginComponent,
    private confirmationDialogService: ConfirmationDialogService,
    private zmstinstituteServices: ZmstInstituteService,
    private toastrService: ToastrService) {

  }

  ngOnInit(): void {
    this.getEncryptionKey();
    this.loader.isLoading = true;
    this.getAll();
  }
  ngAfterViewInit(): void {
    $("#zmstinstituteGrid").DataTable({
      "order": []
    });
  }
  getAll() {
    this.zmstinstituteServices.getAll().subscribe((data: any) => {
      this.zmstinstituteList = data;
      this.loader.isLoading = false;
    })
  }
  delete(id: any) {
    this.confirmationDialogService.confirmPopUp("Do you really want to Delete ?")
      .then(confirmed => {
        if (confirmed == true) {
          {
            this.loader.isLoading = true;
            this.zmstinstituteServices.delete(id).subscribe((data: any) => {
              this.loader.isLoading = false;
              const message = data;
              this.toastrService.error(message);
              this.getAll();
            })
          }
        }
      })
  }
  addDetails() {
    let number = this.getRandomNumber()
    var a = EncyptionDecryption.Encrypt(0 + number, this.encSecretKey, this.encsalt);
    this.router.navigate(['/auth/addInstitute/' + a]);
  }
  edit(instCode: any) {
    let number = this.getRandomNumber()
    var instcd = EncyptionDecryption.Encrypt(instCode + number, this.encSecretKey, this.encsalt);
    this.router.navigate(['/auth/addInstitute/' + instcd]);
  }
  getRandomNumber() {
    const today = new Date();
    let date = this.datePipe.transform(today, 'YYMMddHHMMSSSSS');
    return date;
  }
  getEncryptionKey() {
   // this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.encSecretKey =environment.secretKey
      this.encsalt = environment.salt
   // })
  }
}
