import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import { ProjectCreation } from 'src/app/shared/model/projectCreationModel';
import { AppOnBoardingRequestService } from 'src/app/shared/services/appOnBoardingRequest';
import { ProjectDetailsServices } from 'src/app/shared/services/ProjectDetailsServices';
import { AgencyServices } from 'src/app/shared/services/agencyServices';
import { TokenLocalStorageService } from 'src/app/shared/tokenLocalStorage/tokenLocalStorageService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { MdYearServices } from 'src/app/shared/services/md-YearService';
import { MdYearEnum } from 'src/app/shared/common/enums/yearGroup.enums';
import { MdYearModel } from 'src/app/shared/model/md-YearModel';
import { ConfigurationApiSecureKey } from 'src/app/shared/services/ConfigurationApiSecureKey.Services';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-project-creation',
  templateUrl: './project-creation.component.html',
  styleUrls: ['./project-creation.component.css']
})
export class ProjectCreationComponent implements OnInit {
  rowData: any;
  Agencydata: any = [];
  agencyName: string;
  requestId: string;
  binarydata: string;
  registerForm: FormGroup;
  submitted: boolean = false;
  Agency: string;
  Services: string;
  ministry: string;
  Servicess: string = "";
  projectdetails: ProjectCreation;
  nameOfOrganisation: string;
  token: any;
  showservices: String[] = [];
  year: MdYearModel[] = [];
  selectedFileB64: any;
  projectId: string;
  todayDate: any;
  mode: string;
  date: any;
  submitHide: boolean = false;
  updateHide: boolean = true;
  ipAddress = '_._._._';
  decSecretKey: string
  decsalt: string

  constructor(private projectService: ProjectDetailsServices, private configurationApiSecureKey: ConfigurationApiSecureKey, private datePipe: DatePipe, private router: Router, private storage: TokenLocalStorageService, private modalService: NgbModal, private loader: AfterLoginComponent, private agencyUser: AgencyServices, private toastrService: ToastrService, private projectuser: ProjectDetailsServices, private users: AppOnBoardingRequestService, private formBuilder: FormBuilder, private route: ActivatedRoute, private mdYearService: MdYearServices,
    private user: AppOnBoardingRequestService) {
    this.registerForm = this.formBuilder.group({
      requestletterctrl: ['', [Validators.required]],
      daterqstletterctrl: ['', [Validators.required]],
      projectnamectrl: ['', [Validators.required]],
      projectyearCtrl: ['', [Validators.required]],
      AgencyControl: ['', [Validators.required]],
      //isWorkOrderRequired: ['', [Validators.required]]
    });
  }
  RADIO_LIST = [
    { id: false, name: 'No', value: 'No' },
    { id: true, name: 'Yes', value: 'Yes', checked: false },
  ];
  @ViewChild('content') popupview !: ElementRef;
  ngOnInit(): void {
    //this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey
      this.decsalt =environment.salt
      this.loader.isLoading = true;
      this.requestId = this.route.snapshot.params['Id'].toString();
      this.requestId = EncyptionDecryption.Decrypt(this.requestId, this.decSecretKey, this.decsalt);
      this.requestId = this.requestId.substring(0, this.requestId.length - 15)
      this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.projectId = "PC" + this.requestId.substring(2, this.requestId.length)
      this.mode = this.route.snapshot.params['Mode'].toString();
      this.getYear();
      this.loader.isLoading = true;
      this.agencyUser.getMdAgencyAll().subscribe((data: any) => {
        this.Agencydata = data;
        this.loader.isLoading = false;
      })

      this.users.getdatafromRequestList(this.requestId).subscribe(
        (data: any) => {

          this.rowData = data;
          let j = 0;
          for (let i = 0; i < data.services.length; i++) {
            if (data.services[i] != ',') {
              if (data.services[i] == "1") {
                this.showservices[j] = "Examination Services";
                j = j + 1;
              }
              if (data.services[i] == "2") {
                this.showservices[j] = "Counselling Services";
                j = j + 1;
              }
              if (data.services[i] == "3") {
                this.showservices[j] = "Result Services";
                j = j + 1;
              }
            }
          }
          for (let k = 0; k < this.showservices.length; k++) {
            if (k == this.showservices.length - 1) {
              this.Servicess = this.Servicess + this.showservices[k]
            }
            else {
              this.Servicess = this.Servicess + this.showservices[k] + ","
            }
          }
          this.loader.isLoading = false;
          this.binarydata = data.docContent
        }
      )
      if (this.mode == "Update") {
        this.loader.isLoading = true;
        this.projectService.getbyId(this.requestId).subscribe({
          next: (data: any) => {
            this.submitHide = true;
            this.updateHide = false;
            this.loader.isLoading = false;
            this.registerForm.patchValue({
              requestletterctrl: data[0].requestLetterNo,
              daterqstletterctrl: this.Changedatefmt(data[0].requestLetterDate),
              projectnamectrl: data[0].projectName,
              projectyearCtrl: data[0].projectYear,
              AgencyControl: data[0].agencyId,
             // isWorkOrderRequired: data[0].isWorkOrderRequired,
            })
          }, error: (err: any) => {
            this.toastrService.error(err)
            this.loader.isLoading = false;
          }
        })

      }
    //})
  }

  Changedatefmt(datein: string) {
    this.date = this.datePipe.transform(datein, 'yyyy-MM-dd');
    return this.date;
  }

  onchange(data: any) {
  }
  onSelectAgency(event: any) {
    
    this.agencyName = this.Agencydata.filter((item => item.agencyId === Number(event.target.value)))[0].agencyName;
  }
  onIconClickDownload() {
    if (this.binarydata != null) {
      const linkSource = 'data:application/pdf;base64,' + this.binarydata;
      const downloadLink = document.createElement('a');
      const fileName = 'OnboardProjectCreation.pdf';
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      
      this.loader.isLoading = true;
      this.projectdetails = {
        id: 0,
        requestNo: this.requestId,
        requestLetterNo: this.registerForm.get("requestletterctrl").value,
        requestLetterDate: this.registerForm.get("daterqstletterctrl").value,
        projectCode: "",
        projectName: this.registerForm.get("projectnamectrl").value,
        projectYear: this.registerForm.get("projectyearCtrl").value,
        agencyId: Number(this.registerForm.get("AgencyControl").value),
        agencyName: this.agencyName,
        efileNo: "",
        prizmId: "",
        status: "",
        remarks: "",
        nicsiprojectCode: "",
        nicsipino: "",
        pidate: '2023-02-27T09:53:56.110Z',
        piamount: 0,
        submitTime: this.date,
        ipaddress: this.ipAddress,
        submitBy: this.storage.ParseToken().userId,//this.storage.get('userID'),
        modifyBy:this.storage.ParseToken().userId,
        modifyOn: this.date,
        isActive: 'Y',
        isWorkOrderRequired:null, //this.registerForm.get("isWorkOrderRequired").value,
        isRequestAvailable: ""
      }
      this.projectuser.saveAppProjecttDetails(this.projectdetails).subscribe(
        {
          next: (data: any) => {

            const message = data;
            this.loader.isLoading = false;
            if (message == 'Data Stored Successfully') {
              this.toastrService.success(message);
            }
            else if (message == 'Already Exists') {
              this.toastrService.error(message);
            }
            else {
              this.toastrService.error(message);
            }
            this.router.navigate(['/auth/projectlist']);
          },
          error: (err: any) => {
            const error = err.message;
            this.loader.isLoading = false;
            this.toastrService.error(error);
            return false;
          }
        }
      )
    }
  }
  get registerFormControl() {
    return this.registerForm.controls;
  }

  viewDocument() {
    this.selectedFileB64 = this.binarydata;
    this.modalService.open(this.popupview, { size: 'xl' });
  }

  onUpdate() {
    this.submitted = true;
    this.loader.isLoading = true;
    this.agencyName = this.Agencydata.filter((item => item.agencyId === Number(this.registerForm.get("AgencyControl").value)))[0].agencyName;
    if (this.registerForm.valid) {
      this.loader.isLoading = true;
      this.projectdetails = {
        id: 0,
        requestNo: this.requestId,
        requestLetterNo: this.registerForm.get("requestletterctrl").value,
        requestLetterDate: this.registerForm.get("daterqstletterctrl").value,
        projectCode: "",
        projectName: this.registerForm.get("projectnamectrl").value,
        projectYear: this.registerForm.get("projectyearCtrl").value,
        agencyId: Number(this.registerForm.get("AgencyControl").value),
        agencyName: this.agencyName,
        efileNo: "",
        prizmId: "",
        status: "",
        remarks: "",
        nicsiprojectCode: "",
        nicsipino: "",
        pidate: '2023-02-27T09:53:56.110Z',
        piamount: 0,
        submitTime: this.date,
        ipaddress: this.ipAddress,
        submitBy:this.storage.ParseToken().userId,
        modifyBy: this.storage.ParseToken().userId,
        modifyOn: this.date,
        isActive: 'Y',
        isWorkOrderRequired:null,// this.registerForm.get("isWorkOrderRequired").value,
        isRequestAvailable: ""
      }
      this.projectuser.updateCreation(this.projectdetails).subscribe({
        next: (data: any) => {
          const message = data;
          this.loader.isLoading = false;
          if (message == 'Data Update Successfully') {
            this.toastrService.success(message);
          }
          else if (message == 'Already Exists') {
            this.toastrService.error(message);
          }
          else {
            this.toastrService.error(message);
          }
          this.router.navigate(['/auth/onboardinglist']);
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
  getDecryptionKey() {
    //this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey
      this.decsalt = environment.salt
      this.loader.isLoading = true;
      this.requestId = this.route.snapshot.params['Id'].toString();
      this.requestId = EncyptionDecryption.Decrypt(this.requestId, this.decSecretKey, this.decsalt);
      this.requestId = this.requestId.substring(0, this.requestId.length - 15)
      this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.projectId = "PC" + this.requestId.substring(2, this.requestId.length)
      this.mode = this.route.snapshot.params['Mode'].toString();
      this.getYear();
      this.agencyUser.getAll().subscribe((data: any) => {
        this.Agencydata = data;

      })

      this.users.getdatafromRequestList(this.requestId).subscribe(
        (data: any) => {

          this.rowData = data;
          let j = 0;
          for (let i = 0; i < data.services.length; i++) {
            if (data.services[i] != ',') {
              if (data.services[i] == "1") {
                this.showservices[j] = "Examination Services";
                j = j + 1;
              }
              if (data.services[i] == "2") {
                this.showservices[j] = "Counselling Services";
                j = j + 1;
              }
              if (data.services[i] == "3") {
                this.showservices[j] = "Result Services";
                j = j + 1;
              }
            }
          }
          for (let k = 0; k < this.showservices.length; k++) {
            if (k == this.showservices.length - 1) {
              this.Servicess = this.Servicess + this.showservices[k]
            }
            else {
              this.Servicess = this.Servicess + this.showservices[k] + ","
            }
          }
          this.loader.isLoading = false;
          this.binarydata = data.docContent
        }
      )
      if (this.mode == "Update") {
        this.loader.isLoading = true;
        this.projectService.getbyId(this.requestId).subscribe({
          next: (data: any) => {
            this.submitHide = true;
            this.updateHide = false;
            this.loader.isLoading = false;
            this.registerForm.patchValue({
              requestletterctrl: data[0].requestLetterNo,
              daterqstletterctrl: this.Changedatefmt(data[0].requestLetterDate),
              projectnamectrl: data[0].projectName,
              projectyearCtrl: data[0].projectYear,
              AgencyControl: data[0].agencyId,
             // isWorkOrderRequired: data[0].isWorkOrderRequired,
            })
          }, error: (err: any) => {
            this.toastrService.error(err)
            this.loader.isLoading = false;
          }
        })
      }
    //})
  }
  getIPAddress() {
    this.loader.isLoading = true;
    this.user.GetIP().subscribe((res: any) => {
      this.ipAddress = res;
      this.loader.isLoading = false;
    })
  }
  getYear() {
    this.loader.isLoading = true;
    this.mdYearService.getById(MdYearEnum.Onboarding_Project).subscribe({
        next: (res) => {
          this.year = res;
        }, error: (err: any) => {
          this.toastrService.error(err);
        }
      });
  }
}
