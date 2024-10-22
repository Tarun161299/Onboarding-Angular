import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstProjectsModel } from "src/app/shared/model/zmst-projects.model";
import { ZmstProjectsService } from "src/app/shared/services/zmst-projects.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { AgencyServices } from 'src/app/shared/services/agencyServices';
import { ZmstAgencyExamCouns } from 'src/app/shared/services/zmstAgencyExamCouns';
import { ServicesModel } from 'src/app/shared/model/serviceModel';
import { ZmstServiceTypeService } from 'src/app/shared/services/zmst-service-type.service';
import { CommonFunctionServices } from 'src/app/shared/common/commonFunction.services';
import { MdYearServices } from 'src/app/shared/services/md-YearService';
import { MdYearEnum } from 'src/app/shared/common/enums/yearGroup.enums';
import { MdYearModel } from 'src/app/shared/model/md-YearModel';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import { ConfigurationApiSecureKey } from 'src/app/shared/services/ConfigurationApiSecureKey.Services';
import { environment } from 'src/environments/environment';
declare const $: any;
@Component({
  selector: 'app-zmst-projects',
  templateUrl: './zmst-projects.component.html',
  styleUrls: ['./zmst-projects.component.css']
})

export class ZmstProjectsComponent implements OnInit {
  rowData: any;
  Agencydata: any = [];
  examcode: any[] = [];
  agencyid: string;
  servicesdata: ServicesModel[] = [];
  projectCycles: FormGroup;
  serviceid: string;
  projectName: string;
  examcodeID: string;
  academicYear: any;
  date: any;
  agencyName: string;
  zmstprojectsFrmGroup: FormGroup;
  zmstprojectsModel: ZmstProjectsModel;
  zmstprojectsList: ZmstProjectsModel[];
  examCodeEdit: any = [];
  check: any;
  Years: MdYearModel[];
  projectId: string = "";
  encSecretKey: string;
  encsalt: string;
  agencyId: string;
  constructor(private commonFunctionServices: CommonFunctionServices, private configurationApiSecureKey: ConfigurationApiSecureKey, private datePipe: DatePipe, private router: Router, private formBuilder: FormBuilder, private loader: AfterLoginComponent, private ZmstAgencyExamCoun: ZmstAgencyExamCouns, private zmstServiceTypeService: ZmstServiceTypeService, private confirmationDialogService: ConfirmationDialogService, private zmstprojectsServices: ZmstProjectsService, private agencyUser: AgencyServices, private toastrService: ToastrService, private mdYearService: MdYearServices) {
    this.zmstprojectsFrmGroup = this.formBuilder.group({
      agencyId: ["", [Validators.required]],
      examCounsid: ["", [Validators.required]],
      academicYear: ["", [Validators.required]],
      serviceType: ["", [Validators.required]],
      attempt: ["", [Validators.required]],
      projectId: ["", [Validators.required]],
      projectName: ["", [Validators.required]],
      description: ["",],
      requestLetter: ["",],
      createdDate: ["",],
      createdBy: ["",],
      modifiedDate: ["",],
      modifiedBy: ["",],
      isLive: ["", [Validators.required]],
      pInitiated: ["", [Validators.required]],
    });
  }
  ngOnInit(): void {
   // this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.encSecretKey = environment.secretKey
      this.encsalt = environment.salt
      this.loader.isLoading = true;
      this.zmstprojectsFrmControl.examCounsid.setValue(0);
      this.zmstprojectsFrmControl.isLive.setValue(0);
      this.zmstprojectsFrmControl.pInitiated.setValue(0);
      this.zmstprojectsFrmControl.academicYear.setValue(0);
      this.zmstprojectsFrmGroup.controls['projectId'].disable();
      this.getAll();
      this.getOnboardingRequestYear();
      this.agencyUser.getAll().subscribe((data: any) => {
        this.Agencydata = data;
      })
      this.zmstServiceTypeService.getAll().subscribe((data: any) => {
        this.servicesdata = data;
      });
   // })
  }
  get zmstprojectsFrmControl() {
    return this.zmstprojectsFrmGroup.controls;
  }
  getRandomNumber() {
    const today = new Date();
    let date = this.datePipe.transform(today, 'YYMMddHHMMSSSSS');
    return date;
  }
  edit(data: any) {
    this.loader.isLoading = true;
    let number = this.getRandomNumber();
    this.projectId = EncyptionDecryption.Encrypt(data.projectId + number, this.encSecretKey, this.encsalt);
    this.agencyId = EncyptionDecryption.Encrypt(data.agencyId + number, this.encSecretKey, this.encsalt);
    this.loader.isLoading = false;
    this.router.navigate(['/auth/ProjectCycleCreation/' + this.projectId + '/' + this.agencyId]);
  }
  delete(id: any) {
    this.confirmationDialogService.confirmPopUp("Do you really want to Delete ?")
      .then(confirmed => {
        if (confirmed == true) {
          {
            this.loader.isLoading = true;
            this.zmstprojectsServices.delete(id.toString()).subscribe((data: any) => {
              this.loader.isLoading = false;
              const message = data;
              this.toastrService.error(message);
              this.getAll();
            })
          }
        }
      })
  }
  getAll() {
    this.zmstprojectsServices.getAll().subscribe((data: any) => {
      this.zmstprojectsList = data;
      this.commonFunctionServices.bindDataTable("zmstprojectsGrid", 0);
      this.loaderTimeOut();
    })
  }
  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 2000);
  }
  btnAddNew() {
    this.router.navigate(['auth/ProjectCycleCreation/CycleCreation/Addnew']);
  }
  getOnboardingRequestYear() {
    this.loader.isLoading = true;
    this.mdYearService
      .getById(MdYearEnum.Onboarding_Project).subscribe({
        next: (res) => {
          this.Years = res;
        }, error: (err: any) => {
          this.toastrService.error(err);
        }
      });
  }
}
