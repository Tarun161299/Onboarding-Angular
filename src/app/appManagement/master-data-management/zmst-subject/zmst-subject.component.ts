import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
import { ZmstSubjectModel } from 'src/app/shared/model/md-zmstSubject.model';
import { MDZmstSubjectService } from 'src/app/shared/services/md-zmstSubject.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
import { TokenLocalStorageService } from 'src/app/shared/tokenLocalStorage/tokenLocalStorageService';
import { CommonFunctionServices } from 'src/app/shared/common/commonFunction.services';
import { ZmstQualificationModel } from 'src/app/shared/model/zmst-qualification.model';
import { ZmstQualificationService } from 'src/app/shared/services/zmst-qualification.service';

declare const $: any;
@Component({
  selector: 'app-zmst-subject',
  templateUrl: './zmst-subject.component.html',
  styleUrls: ['./zmst-subject.component.css']
})
export class ZmstSubjectComponent implements OnInit {

  submitted: boolean = false;
  updatehdn: boolean = false;
  mdzmstSubjectFrmGroup: FormGroup;
  mdZmstSubjectModel:ZmstSubjectModel;
  zmstSubjectModelList: any;
  stateList: any;
  token: any;
  qualificationList: ZmstQualificationModel[];
  qualificationListtemp:any[];
  qualificationid:string;
  constructor(
    private commonFunctionServices: CommonFunctionServices,
    private formBuilder: FormBuilder,
    private loader: AfterLoginComponent,
    private mDZmstSubjectService: MDZmstSubjectService,
    private toastrService: ToastrService,
    private confirmationDialogService: ConfirmationDialogService,
    private storage: TokenLocalStorageService,
    private qualificationServices: ZmstQualificationService
  ) {
    this.mdzmstSubjectFrmGroup = this.formBuilder.group({
      qualificationId: ["", [Validators.required]],
      subjectId: ["", [Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern('^(0|[1-9][0-9]*)$')]],
      alternateNames: ['', Validators.compose([Validators.required, this.scriptValidator])],
      subjectName: ['', Validators.compose([Validators.required, this.scriptValidator])],

    });
  }

  ngOnInit(): void {
    this.token = this.storage.get('token');
    this.getAll();    
    this.getQualificationList();
  }
  get mdSubjectFrmControl() {
    return this.mdzmstSubjectFrmGroup.controls;
  }
  ngAfterViewInit(): void {

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

  save() {
    this.submitted = true;
    if (this.mdzmstSubjectFrmGroup.valid) {
      const mdZmstSubjectModel =
      {
        qualificationId: this.mdzmstSubjectFrmGroup.get('qualificationId').value,
        subjectId: this.mdzmstSubjectFrmGroup.get('subjectId').value,
        subjectName: this.mdzmstSubjectFrmGroup.get('subjectName').value,
        alternateNames: this.mdzmstSubjectFrmGroup.get('alternateNames').value,
        questionName:'',
        created_by: '',
        created_date: new Date(),
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.mDZmstSubjectService.insert(mdZmstSubjectModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.commonFunctionServices.bindDataTable("tblsubject", 0);
                  this.loader.isLoading = false;
                  this.getAll();
                  this.clear();
                  this.getQualificationList();
                  this.toastrService.success("Data Saved Successfully");
                },
                error: (err: any) => {
                  const message = err.message;
                  this.loader.isLoading = false;
                  this.getAll();
                  this.clear();
                  this.getQualificationList();
                  this.toastrService.error("Already exists");
                }
              })

            }
          }
        })
    }
  }
  reset() {
    this.clear();
  }
  clear() {
    this.mdzmstSubjectFrmGroup.reset();
    this.mdzmstSubjectFrmGroup.controls['qualificationId'].enable();
    this.mdzmstSubjectFrmGroup.controls['subjectId'].enable();
    this.getQualificationList();
    this.submitted = false;
    this.updatehdn = false;
  }


  update() {
    this.submitted = true;
    if (this.mdzmstSubjectFrmGroup.valid) {
      const mdZmstSubjectModel=
      {
        qualificationId: this.mdzmstSubjectFrmGroup.get('qualificationId').value,
        subjectId: this.mdzmstSubjectFrmGroup.get('subjectId').value,
        subjectName: this.mdzmstSubjectFrmGroup.get('subjectName').value,
        alternateNames: this.mdzmstSubjectFrmGroup.get('alternateNames').value,
        questionName:'',
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.mDZmstSubjectService.update(mdZmstSubjectModel).subscribe((data: any) => {
                const message = data;
                this.commonFunctionServices.bindDataTable("tblsubject", 0);
                this.loader.isLoading = false;
                this.getAll();
                this.getQualificationList();
                this.clear();
                this.mdzmstSubjectFrmGroup.controls['qualificationId'].enable();
                this.mdzmstSubjectFrmGroup.controls['subjectId'].enable();
                this.toastrService.success(message);
              })
            }
          }
        })
    }
  }

  delete(subjectId: any) {
    this.confirmationDialogService.confirmPopUp("Do you really want to Delete ?")
      .then(confirmed => {
        if (confirmed == true) {
          {

            /*Start Delete District*/
            this.mDZmstSubjectService.delete(subjectId).subscribe((data: any) => {
              const message = data;
              this.commonFunctionServices.bindDataTable("tblsubject", 0);
              this.toastrService.success(message);
              this.getAll();
              this.clear();
              this.getQualificationList();
            });
            /*End*/
          }
        }
      })
  }

  getAll() {
    this.mDZmstSubjectService.getAll().subscribe((data: any) => {
      this.qualificationListtemp = data;
      this.zmstSubjectModelList = data;
      this.commonFunctionServices.bindDataTable("tblsubject", 0);
      this.loaderTimeOut();
    });
  }

  edit(data: any) {
    
    this.updatehdn = true;
    this.mdzmstSubjectFrmGroup.controls['qualificationId'].disable();
    this.mdzmstSubjectFrmGroup.controls['subjectId'].disable();
    this.mdzmstSubjectFrmGroup.patchValue({
      qualificationId: data.qualificationId,
      subjectId: data.subjectId,
      subjectName: data.subjectName,
      alternateNames: data.alternateNames,
    },
    )
  }
  getQualificationList() {
    
    this.qualificationServices.getAll().subscribe((data: any) => {
      this.qualificationList = data;
      this.loader.isLoading = false;
    });
  }

  byqual(event:any)
  {
    this.zmstSubjectModelList=this.qualificationListtemp.filter(x=>x.qualificationId==(this.mdzmstSubjectFrmGroup.get("qualificationId").value=="" ? x.qualificationId :this.mdzmstSubjectFrmGroup.get("qualificationId").value))
    this.commonFunctionServices.bindDataTable("zmstSubjectModelList",0);
    this.qualificationid=event;
  }
  loaderTimeOut(){
		setTimeout(() => {
			this.loader.isLoading=false;
		  }, 2000);
	}
}


