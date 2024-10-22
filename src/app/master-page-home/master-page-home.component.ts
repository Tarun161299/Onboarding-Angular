import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Chart,registerables} from 'node_modules/chart.js';
import { ApplicationSummaryService } from '../shared/services/applicationSummary.Service';
import { AfterLoginComponent } from '../shared/after-login/after-login.component';
Chart.register(...registerables);
@Component({
  selector: 'app-master-page-home',
  templateUrl: './master-page-home.component.html',
  styleUrls: ['./master-page-home.component.css']
})
export class MasterPageHomeComponent implements OnInit {
  appSummary:any;
  newArrayRegistration:any=[];
  counselling:any=[]
  constructor(
    private toastrService: ToastrService,
    private applicationSummaryService: ApplicationSummaryService,
    private loader: AfterLoginComponent,
  ) { }

  ngOnInit(): void {
    this.GetCounsellingServices()
    //this.RenderChart();
  }
  RenderChart(){
    const ctx = document.getElementById('myChart'); new Chart('barchart',
       { type: 'bar', 
        data: { labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl'],
         datasets: [{ label: '# of Votes', data: [12, 19, 3, 5, 2, 3,100], borderWidth: 0.25 }] },
          options: { scales: { y: { beginAtZero: true } } } });
  }

//   RenderChart(){
//   const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
//   const data = [12, 19, 3, 5, 2, 3];

//   // Calculate the cumulative percentage
//   const total = data.reduce((sum, value) => sum + value, 0);
//   let cumulative = 0;
//   const cumulativeData = data.map(value => {
//     cumulative += value;
//     return (cumulative / total) * 100;
//   });

//   new Chart('barchart', {
//     type: 'bar',
//     data: {
//       labels: labels,
//       datasets: [{
//         label: '# of Votes',
//         data: data,
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//         yAxisID: 'y-axis-1'
//       },
//       {
//         label: 'Cumulative %',
//         data: cumulativeData,
//         type: 'line',
//         backgroundColor: 'rgba(153, 102, 255, 0.2)',
//         borderColor: 'rgba(153, 102, 255, 1)',
//         borderWidth: 1,
//         fill: false,
//         yAxisID: 'y-axis-2'
//       }]
//     },
//     options: {
      
//       responsive: true,
//       plugins: {
//         legend: {
//           position: 'top',
//         },
//         tooltip: {
//           mode: 'index',
//           intersect: false,
//         }
//       },
//       interaction: {
//         mode: 'nearest',
//         axis: 'x',
//         intersect: false
//       }
//     }
//   });
// };
tempdata:any=[]
totalRegisteredCandidates:any=[]
totalChoiceFilling:any=[]
totalParticipatinginst:any=[]
totalSeat:any=[]
GetCounsellingServices() {
    
  this.applicationSummaryService.GetByCounsAppType().subscribe({next:(data: any) => {
    debugger
    this.appSummary = data;
    this.counselling=data.map(el=>el.appTitle)

this.newArrayRegistration=data.map(el=>(el.couns==null)?0:el.couns.elg)
 this.totalRegisteredCandidates=data.map(el=>(el.couns==null)?0:el.couns.reg)
this.totalChoiceFilling=data.map(el=>(el.couns==null)?0:el.couns.tch)
this.totalParticipatinginst=data.map(el=>(el.couns==null)?0:el.couns.pis)
this.totalSeat=data.map(el=>(el.couns==null)?0:el.couns.tst)
  const ctx = document.getElementById('myChart'); 
  new Chart('barchart',
    { type: 'bar', 
     data: { labels: this.counselling,//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl'],
      datasets: [{ label: '# of Candidates', data: this.newArrayRegistration, borderWidth: 0.25 }] },//[12, 19, 3, 5, 2, 3,100]
       options: { scales: { y: { beginAtZero: true } } } });
       new Chart('registcandidate',
        { type: 'bar', 
         data: { labels: this.counselling,//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl'],
          datasets: [{ label: '# of Candidates', data: this.totalRegisteredCandidates, borderWidth: 0.25 }] },//[12, 19, 3, 5, 2, 3,100]
           options: { scales: { y: { beginAtZero: true } } } });
           new Chart('Choice_Filling',
            { type: 'bar', 
             data: { labels: this.counselling,//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl'],
              datasets: [{ label: '# of Choices', data: this.totalChoiceFilling, borderWidth: 0.25 }] },//[12, 19, 3, 5, 2, 3,100]
               options: { scales: { y: { beginAtZero: true } } } });
               new Chart('partInst',
                { type: 'bar', 
                 data: { labels: this.counselling,//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl'],
                  datasets: [{ label: '# of Institutes', data: this.totalParticipatinginst, borderWidth: 0.25 }] },//[12, 19, 3, 5, 2, 3,100]
                   options: { scales: { y: { beginAtZero: true } } } });
                   new Chart('totalseat',
                    { type: 'bar', 
                     data: { labels: this.counselling,//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl','jkl'],
                      datasets: [{ label: '# of Seats', data: this.totalSeat, borderWidth: 0.25 }] },//[12, 19, 3, 5, 2, 3,100]
                       options: { scales: { y: { beginAtZero: true } } } });
   // this.commonFunctionServices.bindDataTable("applicationSummary", 0);
    //this.loaderTimeOut();

  },error:(err:any)=>{
   
   // this.commonFunctionServices.bindDataTable("applicationSummary", 0);
   // this.loader.isLoading = false;
    this.toastrService.error(err);
  }})
}
}
