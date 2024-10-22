import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MonthYear } from '../shared/model/monthyear';
import { AppSchedule } from '../shared/services/applicationSchedule';
import { AfterLoginComponent } from '../shared/after-login/after-login.component';

@Component({
  selector: 'app-counselling-calendra',
  templateUrl: './counselling-calendra.component.html',
  styleUrls: ['./counselling-calendra.component.css']
})
export class CounsellingCalendraComponent implements OnInit {
  CounsellingCalendar: FormGroup;
  //private formBuilder: FormBuilder;
  submitted: boolean = false;
  filterdates: any = [];
  monthyear1: MonthYear;
  dataSchedule: any = [];
  scheduleShow: any;
  converteddate: string;
  monthyear: any = [];
  countcolspan: number = 1;
  widthcol: any;
  span1: number = 0;
  span2: number = 0;
  span3: number = 0;
  mode: string;
  ONE_DAY = 1000 * 60 * 60 * 24;
  monthNames: any = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  constructor(private loader: AfterLoginComponent, private formBuilder: FormBuilder, private toastrService: ToastrService, private AppScheduleuser: AppSchedule) { }

  ngOnInit(): void {
    this.CounsellingCalendar = this.formBuilder.group({
      StartDate: ['', [Validators.required]],
      Enddate: ['', [Validators.required]]
    });
  }

  submit() {
    this.submitted = true;
    if (this.CounsellingCalendar.invalid) {
      return;
    }
    this.loader.isLoading=true;
    this.mode="Calendar";
    const startEnddate={
      startdate:(this.changeformatddmmyy(this.CounsellingCalendar.get('StartDate').value)).toString(),
      enddate:(this.changeformatddmmyy(this.CounsellingCalendar.get('Enddate').value)).toString(),
      mode:this.mode,
      activityId: "NULL",
    }
    this.dataSchedule = [];
    const startDate = new Date(this.CounsellingCalendar.get('StartDate').value);
    const EndDate = new Date(this.CounsellingCalendar.get('Enddate').value);
    const days = this.days_between(startDate.getTime(), EndDate.getTime());
    if (days > 31) {
      this.toastrService.error("Maximum 31 days of data are allowed at a time")
      this.loader.isLoading = false;
      return;
    }
    this.AppScheduleuser.getAll(startEnddate).subscribe((data: any) => {
      this.dataSchedule = data;
      this.loader.isLoading = false;
    })
    this.scheduleShow = [];
    this.showdatesbetween();
    this.filtermonthyear();
    this.scheduleShow = (this.dataSchedule.filter(x => ((new Date(this.changedateFormat(x.sdate.substring(0, 10)))).getTime()) > startDate.getTime() && (new Date(this.changedateFormat(x.cDate.substring(0, 10)))).getTime() < EndDate.getTime()))
  }
  days_between(date1, date2) {
    const differenceMs = Math.abs(date1 - date2);
    return Math.round(differenceMs / this.ONE_DAY);
  }
  get CounsCalendar() {
    return this.CounsellingCalendar.controls;
  }
  showdatesbetween() {
    let a = new Date(this.CounsellingCalendar.get('StartDate').value).getTime();
    let b = new Date(this.CounsellingCalendar.get('Enddate').value).getTime();
    let daysCount = this.days_between(a, b)
    
    let dates: any = [];
    const monthdateyearfirst = {
      date: new Date(a).getDate(),
      month: this.monthNames[(new Date(a).getMonth())],
      year: new Date(a).getFullYear()
    }
    dates[0] = monthdateyearfirst;
    for (let i = 0; i < daysCount; i++) {
      a = a + this.ONE_DAY;
      const monthdateyear = {
        date: new Date(a).getDate(),
        month: this.monthNames[(new Date(a).getMonth())],
        year: new Date(a).getFullYear()
      }
      dates[i] = monthdateyear;
    }
    this.filterdates = dates;
    this.widthcol = (100 / dates.length).toString() + '%';
  }
  filtermonthyear() {
    this.monthyear = [];
    this.countcolspan = 1;
    this.monthyear1 = {
      month: this.filterdates[0].month,
      year: this.filterdates[0].year,
      lengthcol: 1
    }
    this.monthyear[0] = this.monthyear1;
    let length = 1;
    let j = 1;
    for (let i = 1; i < this.filterdates.length; i++) {
      if (this.monthyear[j - 1].month != this.filterdates[i].month || this.monthyear[j - 1].year != this.filterdates[i].year) {
        this.monthyear1 = {
          month: this.filterdates[i].month,
          year: this.filterdates[i].year,
          lengthcol: 1
        }
        this.monthyear[j] = this.monthyear1;
        j = j + 1;
        this.countcolspan = 0;
      }
      else {
        this.countcolspan = this.countcolspan + 1;
        this.monthyear[j - 1].lengthcol = this.monthyear[j - 1].lengthcol + 1
        this.countcolspan = this.countcolspan + 1;
      }
    }
  }
  changedateFormat(date: string) {
    var stringDate1 = date;
    var splitDate1 = stringDate1.split('/');
    var year1 = splitDate1[2];
    var month1 = splitDate1[1];
    var day1 = splitDate1[0];
    var converteddate = month1 + "/" + day1 + "/" + year1;
    return converteddate;
  }
  changeformatddmmyy(date: string) {
    var stringDate1 = date;
    var splitDate1 = stringDate1.split('-');
    var year1 = splitDate1[2];
    var month1 = splitDate1[1];
    var day1 = splitDate1[0];
    var converteddate = year1 + "/" + month1 + "/" + day1;
    return converteddate;
  }
  datewiseshift(data: any) {
    let obj: Object;
    const startDate = (new Date(this.CounsellingCalendar.get('StartDate').value)).getTime();
    const dist = (new Date(this.changedateFormat(data.sdate.substring(0, 10)))).getTime();
    const startfrom = Math.abs(startDate - dist)
    this.span1 = (Math.floor(Math.abs(Number(startfrom / this.ONE_DAY))));
    return this.span1;
  }
  shiftaccorddate(data: any) {
    let obj: Object;
    const start = new Date(this.changedateFormat(data.sdate.substring(0, 10))).getTime();
    const end = new Date(this.changedateFormat(data.cDate.substring(0, 10))).getTime();
    const colspan = Math.abs(start - end);
    var tdays = (Number(colspan / this.ONE_DAY) + 1);
    if ((this.span1 + tdays) > 31) {
      this.span2 = 31 - this.span1;
    }
    return Math.floor(Number(tdays));
  }
  afterDate(data: any) {
    const startDate = (new Date(this.CounsellingCalendar.get('StartDate').value)).getTime();
    const enddate = (new Date(this.CounsellingCalendar.get('Enddate').value)).getTime();
    const noofdays = Number(Math.abs(startDate - enddate) / this.ONE_DAY) - (this.shiftaccorddate(data) + this.datewiseshift(data));
    return Math.floor(Math.abs(noofdays));
  }
}
