import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { AfterLoginComponent } from '../shared/after-login/after-login.component';
import { DayWiseRegistrationService } from '../shared/services/daywiseRegistration.service';
import { CommonFunctionServices } from '../shared/common/commonFunction.services';
declare const $: any;
@Component({
  selector: 'app-daywise-registration',
  templateUrl: './daywise-registration.component.html',
  styleUrls: ['./daywise-registration.component.css']
})
export class DaywiseRegistrationComponent implements OnInit {
  DaywiseRegistration: FormGroup;
  public listData!: any[];
  rowdata:any=[];
  submitted:boolean=false;
  totalRegistered:number;
  constructor(
    private formBuilder: FormBuilder,
    private loader:AfterLoginComponent,
    private dayWiseRegistrationService : DayWiseRegistrationService,
    private commonFunctionServices: CommonFunctionServices) { }
  
  ngOnInit(): void {
    this.DaywiseRegistration = this.formBuilder.group({
      StartDate: ['', [Validators.required]],
      Enddate: ['', [Validators.required]],
    });
  }
  ngAfterViewInit(): void {
		
		$('#applicationSchedule').DataTable({
			//dom: 'Bfrtip',
			buttons: ['copy', 'excel', 'csv', 'pdf', 'print'],
      "order": []
		});
	}
  get DaywiseRegistrationFormControl() {
    return this.DaywiseRegistration.controls;
  }
  save(){

    this.submitted=true;
    if(this.DaywiseRegistration.invalid){
      return;
    }
    this.loader.isLoading=true;
    const daywiseRegistrationModel={
      startdate: (this.changeformatddmmyy(this.DaywiseRegistration.get('StartDate').value)).toString(),
      enddate: (this.changeformatddmmyy(this.DaywiseRegistration.get('Enddate').value)).toString(),     
    }
    this.dayWiseRegistrationService.getDaywiseRegistrationBetweenDates(daywiseRegistrationModel).subscribe((data:any)=>{
      
      if(data.length>0)
      {
        this.rowdata=data;
        this.commonFunctionServices.bindDataTable("applicationSchedule",0);
        this.totalRegistered=0;
        for(let i=0;i<this.rowdata.length;i++){
          for(let j=0;j<this.rowdata[i].jSummary.length;j++)
          {
            this.totalRegistered=this.totalRegistered+(Number(this.rowdata[i].jSummary[j].totalRegistered));
          }
        }
        this.loader.isLoading=false;
        this.loaderTimeOut();
      }
      else
      {   
        this.loaderTimeOut();
      }
   })

  }
  cancel()
  {

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
  loaderTimeOut(){
    setTimeout(() => {
      this.loader.isLoading=false;
      }, 300);
    }
}
