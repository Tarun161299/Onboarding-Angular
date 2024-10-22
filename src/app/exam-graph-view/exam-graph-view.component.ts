import { Component, OnInit } from '@angular/core';
import {Chart,registerables} from 'node_modules/chart.js';
import { ApplicationSummaryService } from '../shared/services/applicationSummary.Service';
import { AfterLoginComponent } from '../shared/after-login/after-login.component';
import { ToastrService } from 'ngx-toastr';
import { TokenLocalStorageService } from '../shared/tokenLocalStorage/tokenLocalStorageService';
import { CommonFunctionServices } from '../shared/common/commonFunction.services';
Chart.register(...registerables);
@Component({
  selector: 'app-exam-graph-view',
  templateUrl: './exam-graph-view.component.html',
  styleUrls: ['./exam-graph-view.component.css']
})
export class ExamGraphViewComponent implements OnInit {
  appSummary:any=[]
  constructor(
    private commonFunctionServices: CommonFunctionServices,
    private storage: TokenLocalStorageService,
    private toastrService: ToastrService,
    private applicationSummaryService: ApplicationSummaryService,
    private loader: AfterLoginComponent,
  ) { }

  ngOnInit(): void {
    this.loader.isLoading=false;
    this.GetRegistrationServices();
  }
  counselling:any=[]
  newArrayRegistration:any=[]
  totalChoiceFilling:any=[]
  totalRegisteredCandidates:any=[]
  GetRegistrationServices() {
    this.applicationSummaryService.GetByRegistAppType().subscribe((data: any) => {
debugger
      this.appSummary = data;
      this.counselling=data.map(el=>el.appTitle)

      this.newArrayRegistration=data.map(el=>(el.regis==null)?0:el.regis.afs)
       this.totalRegisteredCandidates=data.map(el=>(el.regis==null)?0:el.regis.imu)
      this.totalChoiceFilling=data.map(el=>(el.regis==null)?0:el.regis.afp)
    
        //const ctx = document.getElementById('myChart'); 
        new Chart('Registration',
          { type: 'bar', 
           data: { labels: this.counselling,//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl'],
            datasets: [{ label: '# of Registration', data: this.newArrayRegistration, borderWidth: 0.25 }] },//[12, 19, 3, 5, 2, 3,100]
             options: { scales: { y: { beginAtZero: true } } } });
             new Chart('Image_Upload',
              { type: 'bar', 
               data: { labels: this.counselling,//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl'],
                datasets: [{ label: '# of Image Upload', data: this.totalRegisteredCandidates, borderWidth: 0.25 }] },//[12, 19, 3, 5, 2, 3,100]
                 options: { scales: { y: { beginAtZero: true } } } });
                 new Chart('Fee_Transaction',
                  { type: 'bar', 
                   data: { labels: this.counselling,//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl'],
                    datasets: [{ label: '# of Fee Transaction', data: this.totalChoiceFilling, borderWidth: 0.25 }] },//[12, 19, 3, 5, 2, 3,100]
                     options: { scales: { y: { beginAtZero: true } } } });
                   
      //this.commonFunctionServices.bindDataTable("applicationSummary", 0);
      //this.loaderTimeOut();
    })
  }
}
