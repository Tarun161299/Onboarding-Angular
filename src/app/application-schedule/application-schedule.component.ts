import { Component, OnInit } from '@angular/core';
import { AppSchedule } from '../shared/services/applicationSchedule';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AfterLoginComponent } from '../shared/after-login/after-login.component';
import { CommonFunctionServices } from '../shared/common/commonFunction.services';
declare const $: any;
@Component({
  selector: 'app-application-schedule',
  templateUrl: './application-schedule.component.html',
  styleUrls: ['./application-schedule.component.css']
})

export class ApplicationScheduleComponent implements OnInit {
Activities:any;
ActivityBetweendates: FormGroup;
rowdata:any=[];
submitted:boolean=false;
activityId:string;

public listData!: any[];
  constructor(private commonFunctionServices: CommonFunctionServices,private loader:AfterLoginComponent, private formBuilder: FormBuilder,private AppScheduleuser: AppSchedule) { }

  ngOnInit(): void {
    this.ActivityBetweendates = this.formBuilder.group({
      StartDate: ['', [Validators.required]],
      Enddate: ['', [Validators.required]],
      Activity: ['', [Validators.required]]
    });
    this.loader.isLoading=true;
    this.getAllActivity();
  }
  ngAfterViewInit(): void {
		
		$('#applicationSchedule').DataTable({
			//dom: 'Bfrtip',
			buttons: ['copy', 'excel', 'csv', 'pdf', 'print'],
      "order": []
		});
	}
  getActivityId(event:any){
    this.activityId = event.target.value;
  }
  save(){
    this.submitted=true;
    if(this.ActivityBetweendates.invalid){
      return;
    }
    this.loader.isLoading=true;
    const activityModel={
      startdate: (this.changeformatddmmyy(this.ActivityBetweendates.get('StartDate').value)).toString(),
      enddate: (this.changeformatddmmyy(this.ActivityBetweendates.get('Enddate').value)).toString(),
      mode: "Not Calendar",
      activityId: this.activityId,
    }
    this.AppScheduleuser.getbyActivityId(activityModel).subscribe((data:any)=>{
      if(data.length>0)
      {
        this.rowdata=data;
        this.commonFunctionServices.bindDataTable("applicationSchedule",0);
        this.loaderTimeOut();
      }
      else
      {
        this.loaderTimeOut();
      }
   })
  }
  
loaderTimeOut(){
  setTimeout(() => {
    this.loader.isLoading=false;
    }, 300);
  }
  
cancel(){

}
btnUpdate(){

}
get ActivityBetweendatescontrol() {
  return this.ActivityBetweendates.controls;
}
getAllActivity(){
this.AppScheduleuser.getActivities().subscribe((data:any)=>{
this.Activities=data;
this.loader.isLoading=false;
})
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
}
