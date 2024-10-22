import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesModel } from 'src/app/shared/model/serviceModel';
import { ZmstAgencyExamCouns } from 'src/app/shared/services/zmstAgencyExamCouns';
import { TokenLocalStorageService } from 'src/app/shared/tokenLocalStorage/tokenLocalStorageService';
import { ActivatedRoute } from '@angular/router';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
import { ZmstProjectServices } from 'src/app/shared/services/ZmstProjectServices';
import { AgencyServices } from 'src/app/shared/services/agencyServices';
import { ZmstServiceTypeService } from 'src/app/shared/services/zmst-service-type.service';

@Component({
  selector: 'app-project-cycles',
  templateUrl: './project-cycles.component.html',
  styleUrls: ['./project-cycles.component.css']
})
export class ProjectCyclesComponent implements OnInit {
  @Input() projectCyclesdata: any;
  projectCycles: FormGroup;
  serviceid: string;
  examcodeID: string;
  projectname: string;
  examcode: any[] = [];
  projectYear: string = "";
  agencyid: string;
  agencyID: number;
  servicesdata: ServicesModel[] = [];
  todayDate: any;
  projectList: any[];
  submittedCycle: boolean = false;
  zmstProject: any;
  myDate = new Date();
  updateCycleHidden: boolean = true;
  submitcyclehdn: boolean = false;
  Agencydata: any = [];
  Agency: string;
  editExamcode: string;
  projectDetailsId: any;
  constructor(private agencyUser: AgencyServices, private zmstProjectServices: ZmstProjectServices, private confirmationDialogService: ConfirmationDialogService, private formBuilder: FormBuilder, private ZmstAgencyExamCoun: ZmstAgencyExamCouns, private zmstServiceTypeService: ZmstServiceTypeService, private storage: TokenLocalStorageService,
    private toastrService: ToastrService, private datePipe: DatePipe, private loader: AfterLoginComponent, private route: ActivatedRoute) {
    this.projectCycles = this.formBuilder.group({
      Services: ['', [Validators.required]],
      Attempt: ['', [Validators.required]],
      ExamCode: ['', [Validators.required]],
      projectName: ['', [Validators.required]],
      cycleid: ['', [Validators.required]],
      projectInitiated: [''],
      isLive: ['']
    })
  }

  ngOnInit(): void {

    this.projectCycles.controls['cycleid'].disable();
    this.projectDetailsId = this.projectCyclesdata.id;
    this.getExamCode();
    this.gridData();
    this.GetAllProjects(this.projectDetailsId);
    this.getAgency(this.projectCyclesdata.agencyId);
    this.projectYear = (this.projectCyclesdata.projectYear == '23') ? (this.projectYear = '2022-2023') : (this.projectCyclesdata.projectYear == '24') ? (this.projectYear = '2023-2024') : (this.projectCyclesdata.projectYear == '25') ? (this.projectYear = '2024-2025') : (this.projectCyclesdata.projectYear == '26') ? (this.projectYear = '2025-2026') : this.projectCyclesdata.projectYear;

  }

  onselectservices() {
    if (this.projectCycles.get('Services').value == "Examination Management") {
      this.serviceid = "1"
    }
    if (this.projectCycles.get('Services').value == "E-Counselling and Admission") {
      this.serviceid = "2"
    }
    if (this.projectCycles.get('ExamCode').value == "") {
      return;
    }
    else {
      this.generateCycleId();
    }
  }

  onselectExamcode(event: any) {
    this.examcodeID = event.target.value;
    this.projectname = this.examcode.filter((item => Number(item.examCounsId) === Number(event.target.value)))[0].description;
    this.agencyID = this.examcode.filter((item => Number(item.examCounsId) === Number(event.target.value)))[0].agencyId;
    this.projectCycles.patchValue({
      projectName: this.projectname,
    });
    this.projectYear = (this.projectCyclesdata.projectYear);
    if (this.projectCycles.get('Services').value == "") {
      return;
    }
    else {
      this.generateCycleId()
    }
  }

  generateCycleId() {    
    this.projectCycles.patchValue({
      cycleid: (this.agencyID.toString() + this.examcodeID + this.projectYear + this.projectCycles.get('Services').value + this.projectCycles.get('Attempt').value.toString()).toString(),
    });
  }


  getExamCode() {
    this.ZmstAgencyExamCoun.bindZmstAgencyExamCouns(this.projectCyclesdata.agencyId).subscribe((data: any) => {
      this.examcode = data;
    })
  }

  get projectCycleControls() {
    return this.projectCycles.controls;
  }

  gridData() {
    this.zmstServiceTypeService.getByRequestNo(this.projectCyclesdata.requestNo).subscribe((data: any) => {
      this.servicesdata = data;
      this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

      this.projectCycles.patchValue({
        Attempt: "1",
      });


    });
  }
  clearProjectCyclesFormGroup() {
    for (let control in this.projectCycles.controls) {
      this.projectCycles.controls[control].setErrors(null);
    }
  }
  projectCycleSubmit() {
    this.submittedCycle = true;
    if (this.projectCycles.valid) {
      this.confirmationDialogService.confirmPopUp("Do you really want to Add ?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstProject = {
                agencyId: Number(this.agencyID),
                examCounsid: this.examcodeID,
                academicYear: Number(this.projectCyclesdata.projectYear),
                serviceType: Number(this.projectCycles.get('Services').value),
                attempt: Number(this.projectCycles.get('Attempt').value),
                projectId: Number(this.projectCycles.get('cycleid').value),
                projectName: this.projectCycles.get('projectName').value.toString(),
                description: "",
                requestLetter: "",
                createdDate: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
                createdBy: this.storage.ParseToken().userId,
                modifiedDate: null,
                modifiedBy: null,
                isLive: this.projectCycles.get('isLive').value.toString(),
                pinitiated: this.projectCycles.get('projectInitiated').value.toString(),
              }
              this.zmstProjectServices.Save(this.zmstProject).subscribe({next:(data: any) => {
                
                const message = data;
                this.projectCycles.patchValue({
                  Services: "",
                  ExamCode: "",
                  projectName: ""
                });
                this.clearProjectCyclesFormGroup();
                this.loader.isLoading = false;
                if (message == "Project Cycle Stored Successfully") {
                  this.toastrService.success(message);
                }
                if (message == "Project Cycle Already Exist") {
                  this.toastrService.error(message);
                }
                if (message == "Try Again") {
                  this.toastrService.error(message);
                }
                this.GetAllProjects(this.projectDetailsId);
              },error:(err:any)=>{
                this.loader.isLoading = false;
                  this.toastrService.error(err.status);
               
              }})
            }
          }
        }
        )
    }
  }

  GetAllProjects(id: string) {
    this.zmstProjectServices.GetbyId(id).subscribe((data: any) => {
      this.projectList = data;
    })
  }

  deleteCycle(list: any) {
    this.confirmationDialogService.confirmPopUp("Do you really want to Delete ?")
      .then(confirmed => {
        if (confirmed == true) {
          {
              this.loader.isLoading = true;
              this.zmstProjectServices.delete(list.projectId).subscribe((data: any) => {
              this.loader.isLoading = false;
              const message = data;
              this.toastrService.error(message);
              this.GetAllProjects(this.projectDetailsId);
            })
          }
        }
      })
  }

  editcycle(list: any) {
    this.editExamcode = this.examcode.filter(x => x.examCounsId == list.examCounsid && x.agencyId == list.agencyId)[0].examCounsId;
    this.projectCycles.patchValue({
      projectName: list.projectName,
      cycleid: list.projectId,
      projectInitiated: list.pinitiated,
      isLive: list.isLive,
      ExamCode: this.editExamcode,
      Services: list.serviceType,
      Attempt: list.attempt
      
      
    })

    this.projectCycles.controls['cycleid'].disable();
    this.projectCycles.controls['ExamCode'].disable();
    this.projectCycles.controls['Services'].disable();
    this.projectCycles.controls['Attempt'].disable();
    this.updateCycleHidden = false;
    this.submitcyclehdn = true;
  }
  projectCycleupdate() {
    this.submittedCycle = true;
    if (this.projectCycles.valid) {
      this.confirmationDialogService.confirmPopUp("Do you really want to Update ?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstProject = {
                agencyId: Number(this.agencyID),
                examCounsid: this.examcodeID,
                academicYear: Number(this.projectCyclesdata.projectYear),
                serviceType: Number(this.projectCycles.get('Services').value),
                attempt: Number(this.projectCycles.get('Attempt').value),
                projectId: Number(this.projectCycles.get('cycleid').value),
                projectName: this.projectCycles.get('projectName').value.toString(),
                description: "",
                requestLetter: "",
                createdDate: null,
                createdBy: null,
                modifiedDate: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
                modifiedBy: this.storage.ParseToken().userId,
                isLive: this.projectCycles.get('isLive').value.toString(),
                pinitiated: this.projectCycles.get('projectInitiated').value.toString(),
              }

              this.zmstProjectServices.update(this.zmstProject).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.updateCycleHidden = true;
                this.submitcyclehdn = false;
                this.projectCycles.controls['ExamCode'].enable();
                this.projectCycles.controls['Services'].enable();
                this.projectCycles.controls['Attempt'].enable();
                this.toastrService.success(message);

                this.GetAllProjects(this.projectDetailsId);
              })
            }
          }
        }
        )
    }
  }
  onattemptchange(event: any) {
    if (this.projectCycles.get('ExamCode').value == "" || this.projectCycles.get('Services').value == "") {
      return;
    }
    else {
      this.generateCycleId();
    }
  }

  getAgency(id: number) {
    this.agencyUser.getAll().subscribe((data: any) => {
      this.Agencydata = data;
      this.Agency = this.Agencydata.filter((item => item.agencyId === id))[0].agencyName;
    });
  }
}
