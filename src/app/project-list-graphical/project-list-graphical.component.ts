import { Component, OnInit } from '@angular/core';
import { ConfigurationApiSecureKey } from '../shared/services/ConfigurationApiSecureKey.Services';
import { AfterLoginComponent } from '../shared/after-login/after-login.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProjectDetailsServices } from '../shared/services/ProjectDetailsServices';

import { Chart, registerables } from 'node_modules/chart.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusCount } from '../shared/model/graphicalStatus';
import { statusActivityModel } from '../shared/model/StatusActivitymodel';
Chart.register(...registerables);
@Component({
  selector: 'app-project-list-graphical',
  templateUrl: './project-list-graphical.component.html',
  styleUrls: ['./project-list-graphical.component.css']
})
export class ProjectListGraphicalComponent implements OnInit {
  listData: any;
  zmstAppSummary: FormGroup;
  YearRecord: any = [];
  statusActivityModel:statusActivityModel[]=[];
  strsRecord: any = [];
  mouRecord: any = [];
  UATRecord: any = []
  PiRecord: any = []
  PaymentRecord: any = []
  UCRecord: any = []
  SignOffRecord: any = []
  strs: any;
  strsObject: any;
  strsValues: any;
  mouObject: any;
  mouValues: any;
  UATObject: any;
  UATValue: any;
  PiRecordo: any;
  PiRecordV: any;
  PaymentRecordO: any;
  PaymentRecordV: any;
  UCRecordO: any;
  UCRecordV: any;
  SignOffRecordO: any;
  SignOffRecordV: any;
  runningObject:any;
  runningValue:any;
  myChart:any=[];

  listArr=[{id:"mouStatus",name:"MOU"},{id:"PI",name:"Provisional & Invoice"},{id:"payment",name:"Payment"},{id:"UC",name:"Utilization Certificate"},{id:"Signoff",name:"Sign-Off"},{id:"Strs",name:"StRS"},{id:"UAT",name:"UAT"},{id:"runStaus",name:"Project Status"}]  //,{id:"heading",name:"TechnicalDouments"}
  event:Event;
  constructor(private configurationApiSecureKey: ConfigurationApiSecureKey,
    private loader: AfterLoginComponent,
    private datePipe: DatePipe,
    private router: Router,
    private formBuilder: FormBuilder,
    private projectuser: ProjectDetailsServices) { }

  ngOnInit(): void {
    this.loader.isLoading = false
    this.zmstAppSummary = this.formBuilder.group({
      ApplicationYear: ['', [Validators.required]],
    })
    //this.event.target.eventListeners("NA");
    this.ProjectList("NA")
  }



  ProjectList(mode:any) {
    debugger
    
    this.statusActivityModel=[]
    this.projectuser.getProjectList().subscribe(data => {
      if (data.length > 0) {
        debugger
        this.YearRecord = Array.from(new Set(data.map(x => x.projectYear))).sort((a, b) => b - a);
        this.listData =(mode=="NA") ?data.filter(x=>x.projectYear== this.YearRecord[0]):data.filter(x=>x.projectYear== Number (this.zmstAppSummary.controls.ApplicationYear.value))
        
        if(mode!="NA"){
          for(let i=0;i<this.myChart.length;i++){
            this.myChart[i].destroy()
          }
        }
        if(mode=="NA"){
          this.zmstAppSummary.controls.ApplicationYear.setValue(this.YearRecord[0]);
        }
        this.mouObject = Object.keys(this.transformStatusArray(this.listData.map(x => x.mouStatus)));
        this.mouValues = Object.values(this.transformStatusArray(this.listData.map(x => x.mouStatus)));
        this.addToList( this.mouObject,this.mouValues,'mouStatus');
        this.PiRecordo = Object.keys(this.transformStatusArray(this.listData.map(x => x.piStatus)));
        this.PiRecordV = Object.values(this.transformStatusArray(this.listData.map(x => x.piStatus)));
        this.addToList( this.PiRecordo,this.PiRecordV,'PI');
        this.PaymentRecordO = Object.keys(this.transformStatusArray(this.listData.map(x => x.payment)));
        this.PaymentRecordV = Object.values(this.transformStatusArray(this.listData.map(x => x.payment)));
        this.addToList( this.PaymentRecordO,this.PaymentRecordV,'payment');
        this.UCRecordO = Object.keys(this.transformStatusArray(this.listData.map(x => x.ucStatus)));
        this.UCRecordV = Object.values(this.transformStatusArray(this.listData.map(x => x.ucStatus)));
        this.addToList( this.UCRecordO,this.UCRecordV,'UC');
        this.SignOffRecordO = Object.keys(this.transformStatusArray(this.listData.map(x => x.signOffAndDataHandover)));
        this.SignOffRecordV = Object.values(this.transformStatusArray(this.listData.map(x => x.signOffAndDataHandover)));
        this.addToList( this.SignOffRecordO,this.SignOffRecordV,'Signoff');
        this.strsObject = Object.keys(this.transformStatusArray(this.listData.map(x => x.strs)));
        this.strsValues = Object.values(this.transformStatusArray(this.listData.map(x => x.strs)));
        this.addToList( this.strsObject,this.strsValues,'Strs');   
        this.UATObject = Object.keys(this.transformStatusArray(this.listData.map(x => x.uat)));
        this.UATValue = Object.values(this.transformStatusArray(this.listData.map(x => x.uat)));
        this.addToList( this.UATObject,this.UATValue,'UAT');
        debugger
        this.runningObject=Object.keys(this.transformStatusArray(this.listData.map(x => x.status)));
        this.runningValue = Object.values(this.transformStatusArray(this.listData.map(x => x.status)));
        this.addToList(this.replaceString(this.runningObject) ,this.runningValue,'runStaus');
        
        
        
        

        for(let i=0;i<this.statusActivityModel.length;i++){
        var chart= new Chart(this.statusActivityModel[i].id,
            {
              type: 'pie',
              data: {
                labels:  this.statusActivityModel[i].object,
                datasets: [{ label: '# of Cycles', data:this.statusActivityModel[i].values, borderWidth: 0.25 }]
              },
              options: { scales: { y: { beginAtZero: true } } }
            });

            this.myChart.push(chart);
          //    this.myChart.update();
        }
        this.loader.isLoading = false;
       }
    })
  }
  transformStatusArray(statusArray: string[]): StatusCount {
    return statusArray.reduce((acc: any, status: string) => {
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
  }

  addToList(object:any,value:any,id:string){
    let statusActivityModel12={
      id:id,
      object:object,
      values:value
   }
this.statusActivityModel.push(statusActivityModel12)
  }
  replaceString(data:any){
 let newArray = data.map(item => {
      if (item === 'R ') return 'Running';
      if (item === 'C ') return 'Close';
      return item;
    });
    return newArray

  }
}
