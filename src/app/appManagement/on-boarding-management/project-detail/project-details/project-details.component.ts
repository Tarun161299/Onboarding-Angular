import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
import { ProjectCreation } from 'src/app/shared/model/projectCreationModel';
import { ProjectDetailsServices } from 'src/app/shared/services/ProjectDetailsServices';
import { AppOnBoardingRequestService } from 'src/app/shared/services/appOnBoardingRequest';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
import { TokenLocalStorageService } from 'src/app/shared/tokenLocalStorage/tokenLocalStorageService';
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  @Input() data: any;
  projectDetailsForm: FormGroup;
  projectdetails: ProjectCreation;
  submitted: boolean = false;
  rowData: any;
  requestId: string;
  myDate = new Date();
 ipAddress:string ;

  constructor(
    private formBuilder: FormBuilder,
    private confirmationDialogService: ConfirmationDialogService,
    private toastrService: ToastrService,
    private datePipe: DatePipe,
    private loader: AfterLoginComponent,
    private route: ActivatedRoute,
    private projectService: ProjectDetailsServices,
    private modalService: NgbModal,
    private storage: TokenLocalStorageService,
    private user: AppOnBoardingRequestService) {
    this.projectDetailsForm = this.formBuilder.group({
      requestId: [''],
      projectStatus: ['', [Validators.required]],
      eFileNumber: ['', [Validators.required]],
      prizmId: ['', [Validators.required]],
      remark: ['', Validators.compose([this.scriptValidator])],
    });
  }

  ngOnInit(): void {
    this.data;
    this.getProjectDetailsData(this.data);
  }


  getProjectDetailsData(data: any) {
    this.projectDetailsForm.patchValue({
      eFileNumber: data.efileNo,
      prizmId: data.prizmId,
      projectStatus: (data.status).trim(),
      remark: data.remarks
    });
    if ((data.status).trim() == "R") {
      this.projectDetailsFormControl.projectStatus.setValue('R');
    }
    else if((data.status).trim() == "C") {
      this.projectDetailsFormControl.projectStatus.setValue('C');
    }
    else{
      this.projectDetailsFormControl.projectStatus.setValue('');
    }
  }

  get projectDetailsFormControl() {
    return this.projectDetailsForm.controls;
  }

  saveProjectDetails() {
    this.submitted = true;
    if (this.projectDetailsForm.valid) {
      this.confirmationDialogService.confirmPopUp("Do you really want to Submit ?")
        .then(confirmed => {
          if (confirmed == true) {
            this.loader.isLoading = true;
            this.projectdetails = {
              id: 0,
              requestNo: this.data.requestNo,
              requestLetterNo: this.data.requestLetterNo,
              requestLetterDate: '2023-02-27T09:53:56.110Z',
              projectCode: this.data.projectCode,
              projectName: this.data.projectName,
              projectYear: this.data.projectYear,
              agencyId: 0,
              agencyName: "",
              efileNo: this.projectDetailsForm.get("eFileNumber").value,
              prizmId: this.projectDetailsForm.get("prizmId").value,
              status: this.projectDetailsForm.get("projectStatus").value.trim(),
              remarks: this.projectDetailsForm.get("remark").value,
              nicsiprojectCode: "",
              nicsipino: "",
              pidate: '2023-02-27T09:53:56.110Z',
              piamount: 0,
              submitTime: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
              ipaddress: this.ipAddress,
              submitBy: this.storage.ParseToken().userId,
              modifyBy: null,
              modifyOn: null,
              isActive: 'Y',
              isWorkOrderRequired: true,
              isRequestAvailable: "",
            }
            this.projectService.saveProjectDetails(this.projectdetails).subscribe(
              {
                next: (data: any) => {
                  const message = data;
                  this.loader.isLoading = false;
                  this.toastrService.success(message);
                },
                error: (err: any) => {
                  const error = err.message;
                  this.loader.isLoading = false;
                  this.toastrService.error(error);
                  return false;
                }
              })
          }
        }
        )
    }
  }

  getIPAddress() {
    this.loader.isLoading = true;
    this.user.GetIP().subscribe((res: any) => {
      this.ipAddress = res;
      this.loader.isLoading = false;
    })
  }

  scriptValidator = function (control: AbstractControl): ValidationErrors | null {
    let value: string = control.value || '';
    if (value) {
      const matches = (value.includes('<script>')) || (value.includes('</script>')) || (value.includes('<style>')) || (value.includes('</style>'));
      return !matches ? null : { invalid: true };
    } else {
      return null;
    }
  }
}
