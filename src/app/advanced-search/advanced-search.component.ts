import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
import { SignUPDetailService } from 'src/app/shared/services/signUpDetail';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import * as CryptoJS from 'crypto-js';
import { UsermanagementModel } from 'src/app/shared/model/UsermanagementmodelModel';
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CommonFunctionServices } from 'src/app/shared/common/commonFunction.services';
import { UserManagementComponent } from 'src/app/user-management/AddUser/user-management.component';
import { Router, ActivatedRoute } from '@angular/router';
import { param } from 'jquery';



@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {
  //@ViewChild('grid1', { read: IgxGridComponent, static: true })
  //public grid1: IgxGridComponent;

  public data: any[];
  constructor() { }

  ngOnInit(): void {
   // this.data =  DATA;
  }

  public formatCurrency(val: string) {
    return '$' + parseInt(val, 10).toFixed(2);
}

}
