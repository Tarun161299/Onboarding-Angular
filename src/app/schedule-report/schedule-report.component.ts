import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppSchedule } from '../shared/services/applicationSchedule';
import { ZmstProjectServices } from '../shared/services/ZmstProjectServices';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CommonFunctionServices } from '../shared/common/commonFunction.services';
import { AfterLoginComponent } from '../shared/after-login/after-login.component';
import { ToasterComponent } from '../shared/custom-component/toaster/toaster.component';
import { ToastrService } from 'ngx-toastr';

declare const $: any;

@Component({
  selector: 'app-schedule-report',
  templateUrl: './schedule-report.component.html',
  styleUrls: ['./schedule-report.component.css']
})
export class ScheduleReportComponent implements OnInit {
  Activities: any;
  zmstProject: any;
  ActivityBetweendates: FormGroup;
  rowdata: any;
  dtOptions: DataTables.Settings = {};
  columns: string[];
  submitted: boolean = false;
  dropdownSettings: IDropdownSettings = {};
  multiSelect: any[] = [];
  jsondata: any;

  constructor(private loader: AfterLoginComponent, private commonFunctionServices: CommonFunctionServices, private formBuilder: FormBuilder, private AppScheduleuser: AppSchedule, private zmstprojectuser: ZmstProjectServices, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.ActivityBetweendates = this.formBuilder.group({
      cycle: ['', [Validators.required]],

    });

    this.zmstprojectuser.getAll().subscribe((data: any) => {
      this.zmstProject = data;
    })
    this.dropdownSettings = {
      idField: 'projectId',
      textField: 'projectName',
      enableCheckAll: true,
      noDataAvailablePlaceholderText: "There is no item availabale to show"
    };

  }
  ngAfterViewInit(): void {
  }
  save() {
    this.submitted = true;
    if (this.ActivityBetweendates.invalid) {
      return;
    }

    this.loader.isLoading = true
    if (this.multiSelect.length == this.zmstProject.length) {
      const multiselect = [{
        projectId: 0,
        projectName: ""

      }]

      this.AppScheduleuser.getSchedules(multiselect).subscribe({
        next: (data: any) => {
          this.jsondata = "[" + data.replace("\/", "/") + "]";
          this.rowdata = JSON.parse(this.jsondata);
          this.columns = Object.keys(this.rowdata[0]);
          this.loader.isLoading = false;
          this.commonFunctionServices.bindDataTable("scheduleReport", 1);
          this.loaderTimeOut();
        }

      })
    }
    else if (this.multiSelect.length < this.zmstProject.length) {
      (this.multiSelect);
      this.AppScheduleuser.getSchedules(this.multiSelect).subscribe({
        next: (data: any) => {

          this.jsondata = "[" + data.replace("\/", "/") + "]";
          this.rowdata = JSON.parse(this.jsondata);
          (this.rowdata)
          this.columns = Object.keys(this.rowdata[0]);
          this.loader.isLoading = false;
          this.commonFunctionServices.bindDataTable("scheduleReport", 0);

          this.loaderTimeOut();
        }, error: (err: any) => {
          this.loader.isLoading = false;
          this.toaster.error(err.message);
        }
      })
    }

  }
  cancel() {
  }
  get ActivityBetweendatescontrol() {
    return this.ActivityBetweendates.controls;
  }

  onItemSelect(item: any) {
    this.multiSelect = [...this.multiSelect, item];
  }
  onSelectAll(item: any) {
  }
  onItemDeSelect(item: any) {
    this.multiSelect = this.multiSelect.filter((user) => user.projectId !== item.projectId);
  }
  onUnSelectAll() {
    this.multiSelect = null;
  }
  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 300);
  }
}
