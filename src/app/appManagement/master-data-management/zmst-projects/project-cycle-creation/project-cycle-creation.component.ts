import { Component, Input, OnInit } from '@angular/core';
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
import { ConfigurationApiSecureKey } from 'src/app/shared/services/ConfigurationApiSecureKey.Services';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
declare const $: any;
@Component({
  selector: 'app-project-cycle-creation',
  templateUrl: './project-cycle-creation.component.html',
  styleUrls: ['./project-cycle-creation.component.css']
})

export class ProjectCycleCreationComponent implements OnInit {

  submitted: boolean = false;
  updatehdn: boolean = false;
  rowData: any;
  Agencydata: any = [];
  examcode: any[] = [];
  agencyid: string;
  servicesdata: ServicesModel[] = [];
  serviceid: string;
  projectName: string;
  examcodeID: string;
  academicYear: any;
  date: any;
  agencyName: string;
  cycleCreationFrmGroup: FormGroup;
  zmstprojectsModel: ZmstProjectsModel;
  zmstprojectsList: ZmstProjectsModel[];
  examCodeEdit: any = [];
  check: any;
  Years: MdYearModel[];
  decSecretKey: string;
  decsalt: string;
  projectId: any;
  agencyId: string;
  constructor(private commonFunctionServices: CommonFunctionServices,
    private configurationApiSecureKey: ConfigurationApiSecureKey,
    private formBuilder: FormBuilder,
    private loader: AfterLoginComponent,
    private ZmstAgencyExamCoun: ZmstAgencyExamCouns,
    private zmstServiceTypeService: ZmstServiceTypeService,
    private confirmationDialogService: ConfirmationDialogService,
    private zmstprojectsServices: ZmstProjectsService,
    private agencyUser: AgencyServices,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private mdYearService: MdYearServices) {
    this.cycleCreationFrmGroup = this.formBuilder.group({
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
    this.getOnboardingRequestYear();
    //this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey
      this.decsalt = environment.salt
      this.loader.isLoading = true;
      this.projectId = this.route.snapshot.params['Id'].toString();
      this.agencyId = this.route.snapshot.params['agencyId'].toString();
      this.projectId = EncyptionDecryption.Decrypt(this.projectId, this.decSecretKey, this.decsalt);
      this.projectId = this.projectId.substring(0, this.projectId.length - 15);
      this.agencyId = EncyptionDecryption.Decrypt(this.agencyId, this.decSecretKey, this.decsalt);
      this.agencyId = this.agencyId.substring(0, this.agencyId.length - 15);
      this.getByProjectId();
    //})
    this.cycleCreationFrmControl.examCounsid.setValue(0);
    this.cycleCreationFrmControl.isLive.setValue(0);
    this.cycleCreationFrmControl.pInitiated.setValue(0);
    this.cycleCreationFrmControl.academicYear.setValue(0);
    this.agencyUser.getAll().subscribe((data: any) => {
      this.Agencydata = data;
    })
    this.zmstServiceTypeService.getAll().subscribe((data: any) => {
      this.servicesdata = data;
    });
  }
  ngAfterViewInit(): void {

  }


  get cycleCreationFrmControl() {
    return this.cycleCreationFrmGroup.controls;
  } 
  reset() {
    this.clear()
  }
  clear() {
    this.cycleCreationFrmGroup.reset();
    this.cycleCreationFrmControl.examCounsid.setValue(0);
    this.cycleCreationFrmControl.isLive.setValue(0);
    this.cycleCreationFrmControl.pInitiated.setValue(0);
    this.cycleCreationFrmControl.academicYear.setValue(0);
    this.agencyUser.getAll().subscribe((data: any) => {
      this.Agencydata = data;
    })
    this.zmstServiceTypeService.getAll().subscribe((data: any) => {
      this.servicesdata = data;
    });
    this.cycleCreationFrmGroup.controls['agencyId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }
  getOnboardingRequestYear() {
    this.loader.isLoading = true;
    this.mdYearService
      .getById(MdYearEnum.Onboarding_Project).subscribe({
        next: (res) => {
          this.Years = res;
          this.loader.isLoading = false;
        }, error: (err: any) => {
          this.toastrService.error(err);
          this.loader.isLoading = false;
        }
      });
  }
  save() {
    this.submitted = true;
    if (this.cycleCreationFrmGroup.valid) {
      const zmstprojectsModel = {
        agencyId: this.cycleCreationFrmGroup.get("agencyId").value,
        examCounsid: this.cycleCreationFrmGroup.get("examCounsid").value,
        academicYear: this.cycleCreationFrmGroup.get("academicYear").value,
        serviceType: this.cycleCreationFrmGroup.get("serviceType").value,
        attempt: this.cycleCreationFrmGroup.get("attempt").value,
        projectId: this.cycleCreationFrmGroup.get("projectId").value,
        projectName: this.cycleCreationFrmGroup.get("projectName").value,
        description: this.cycleCreationFrmGroup.get("description").value,
        requestLetter: this.cycleCreationFrmGroup.get("requestLetter").value,
        created_date: this.cycleCreationFrmGroup.get("createdDate").value,
        created_by: this.cycleCreationFrmGroup.get("createdBy").value,
        modified_date: this.cycleCreationFrmGroup.get("modifiedDate").value,
        modified_by: this.cycleCreationFrmGroup.get("modifiedBy").value,
        isLive: this.cycleCreationFrmGroup.get("isLive").value,
        pInitiated: this.cycleCreationFrmGroup.get("pInitiated").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstprojectsServices.insert(zmstprojectsModel).subscribe((data: any) => {
                const message = data;
                this.getAll();
                this.clear();
                if (message == "Project Cycle Stored Successfully") {
                  this.toastrService.success(message);
                }
                if (message == "Project Cycle Already Exist") {
                  this.toastrService.error(message);
                }
                if (message == "Try Again") {
                  this.toastrService.error(message);
                }
                this.redirectToPage();
              })
            }
          }
        })
    }
  }

  edit(data: any) {
    
    this.examcode = [];
    this.ZmstAgencyExamCoun.bindZmstAgencyExamCouns(data.agencyId).subscribe((record: any) => {
      this.examcode = record;
      this.updatehdn = true;
      this.examcodeID = data.examCounsid;
      this.agencyid = data.agencyId;
      this.cycleCreationFrmGroup.controls['agencyId'].disable();
      this.cycleCreationFrmGroup.controls['projectId'].disable();
      this.cycleCreationFrmGroup.patchValue({
        agencyId: data.agencyId,
        examCounsid: data.examCounsid,
        academicYear: data.academicYear,
        serviceType: data.serviceType,
        attempt: data.attempt,
        projectId: data.projectId,
        projectName: data.projectName,
        description: data.description,
        requestLetter: data.requestLetter,
        createdDate: data.createdDate,
        createdBy: data.createdBy,
        modifiedDate: data.modifiedDate,
        modifiedBy: data.modifiedBy,
        isLive: data.isLive,
        pInitiated: data.pinitiated,
      },
      )
    }
    )
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
  update() {
    if (this.cycleCreationFrmGroup.valid) {
      const zmstprojectsModel = {
        agencyId: this.cycleCreationFrmGroup.get("agencyId").value,
        examCounsid: this.cycleCreationFrmGroup.get("examCounsid").value,
        academicYear: this.cycleCreationFrmGroup.get("academicYear").value,
        serviceType: this.cycleCreationFrmGroup.get("serviceType").value,
        attempt: this.cycleCreationFrmGroup.get("attempt").value,
        projectId: this.cycleCreationFrmGroup.get("projectId").value,
        projectName: this.cycleCreationFrmGroup.get("projectName").value,
        description: this.cycleCreationFrmGroup.get("description").value,
        requestLetter: this.cycleCreationFrmGroup.get("requestLetter").value,
        createdDate: this.cycleCreationFrmGroup.get("createdDate").value,
        createdBy: this.cycleCreationFrmGroup.get("createdBy").value,
        modifiedDate: this.cycleCreationFrmGroup.get("modifiedDate").value,
        modifiedBy: this.cycleCreationFrmGroup.get("modifiedBy").value,
        isLive: this.cycleCreationFrmGroup.get("isLive").value,
        pInitiated: this.cycleCreationFrmGroup.get("pInitiated").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstprojectsServices.update(zmstprojectsModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.cycleCreationFrmGroup.controls['agencyId'].enable();
                this.toastrService.success(message);
                this.redirectToPage();
              })
            }
          }
        })
    }
  }
 
  getAll() {
    this.zmstprojectsServices.getAll().subscribe((data: any) => {
      this.zmstprojectsList = data;
      this.commonFunctionServices.bindDataTable("zmstprojectsGrid", 0);
      this.loaderTimeOut();
    })
  }
  getByProjectId() {
    const zmstprojectsModel = {
      projectId: this.projectId,
      agencyId: this.agencyId,
    }
    this.zmstprojectsServices.getByAgencyId(zmstprojectsModel).subscribe((data: any) => {
      //this.zmstprojectsList = data;
      // this.edit(this.zmstprojectsList)
      this.examcode = [];
      this.ZmstAgencyExamCoun.bindZmstAgencyExamCouns(data.agencyId).subscribe((record: any) => {
        this.examcode = record;
        this.updatehdn = true;
        this.examcodeID = data.examCounsid;
        this.agencyid = data.agencyId;
        this.cycleCreationFrmGroup.controls['agencyId'].disable();
        this.cycleCreationFrmGroup.patchValue({
          agencyId: data.agencyId,
          examCounsid: data.examCounsid,
          academicYear: data.academicYear,
          serviceType: data.serviceType,
          attempt: data.attempt,
          projectId: data.projectId,
          projectName: data.projectName,
          description: data.description,
          requestLetter: data.requestLetter,
          createdDate: data.createdDate,
          createdBy: data.createdBy,
          modifiedDate: data.modifiedDate,
          modifiedBy: data.modifiedBy,
          isLive: data.isLive,
          pInitiated: data.pinitiated,
        },
        )
      }
      )
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      this.commonFunctionServices.bindDataTable("zmstprojectsGrid", 0);
      this.loaderTimeOut();
    })

  }
  onSelectAgency(event: any) {

    this.ZmstAgencyExamCoun.bindZmstAgencyExamCouns(event.target.value).subscribe((data: any) => {
      this.examcode = data;
    })
  }
  generateCycleId() {
    this.cycleCreationFrmGroup.patchValue({
      projectId: (this.agencyid.toString() + this.examcodeID.toString() + this.cycleCreationFrmGroup.get("academicYear").value.toString() + this.cycleCreationFrmGroup.get('serviceType').value + this.cycleCreationFrmGroup.get('attempt').value.toString()).toString(),
    });
  }
  onselectExamcode(event: any) {

    this.examcodeID = event.target.value;
    this.projectName = this.examcode.filter((item => Number(item.examCounsId) === Number(event.target.value)))[0].description;
    this.agencyid = this.examcode.filter((item => Number(item.examCounsId) === Number(event.target.value)))[0].agencyId;
    this.cycleCreationFrmGroup.patchValue({
      projectName: this.projectName,
    });
    if (this.cycleCreationFrmGroup.get('serviceType').value != "" && this.cycleCreationFrmGroup.get('academicYear').value != "" && this.cycleCreationFrmGroup.get('attempt').value != "") {
      this.generateCycleId()
    }
    else {
      return
    }
  }
  onselectservices(event: any) {
    if (this.cycleCreationFrmGroup.get('serviceType').value == "Examination Management") {
      this.serviceid = "1"
    }
    if (this.cycleCreationFrmGroup.get('serviceType').value == "E-Counselling and Admission") {
      this.serviceid = "2"
    }
    if (this.examcodeID.toString() != "" && this.cycleCreationFrmGroup.get('academicYear').value != "" && this.cycleCreationFrmGroup.get('attempt').value != "") {
      this.generateCycleId()
    }
    else {
      return
    }
  }
  onattemptchange(event: any) {

    if (this.examcodeID.toString() != "" && this.cycleCreationFrmGroup.get('serviceType').value != "" && this.cycleCreationFrmGroup.get('academicYear').value != "") {
      this.generateCycleId();
    }
    else {
      return
    }
  }
  OnselectAcademics() {
    if (this.examcodeID.toString() != "" && this.cycleCreationFrmGroup.get('serviceType').value != "" && this.cycleCreationFrmGroup.get('attempt').value != "") {
      this.generateCycleId();
    }
    else {
      return
    }
  }
  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 1000);
  }
  redirectToPage() {
    this.router.navigate(['/auth/Projects']);
  }
}
