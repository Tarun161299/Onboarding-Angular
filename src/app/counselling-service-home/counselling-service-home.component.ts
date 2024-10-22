import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { AllMasterServices } from '../shared/services/allMasterServices';
Chart.register(...registerables);
@Component({
  selector: 'app-counselling-service-home',
  templateUrl: './counselling-service-home.component.html',
  styleUrls: ['./counselling-service-home.component.css']
})
export class CounsellingServiceHomeComponent implements OnInit {

  constructor(private  allMasterServices:AllMasterServices) { }
dataDict:any;
  ngOnInit(): void {
    this.allMasterServices.GetAllTablesCount().subscribe((data:any)=>{
      debugger

      this.dataDict=Object.keys(data)
      .filter(key => data[key] > 0)
      .reduce((result, key) => {
        result[key] = data[key];
        return result;
      }, {} as { [key: string]: number });
      
      new Chart("masterData",
        {
          type: 'bar',
          data: {
            labels:  Object.keys(this.dataDict),
            datasets: [{ label: '# of Records', data:Object.values(this.dataDict), borderWidth: 0.25 }]
          },
          options: { scales: { y: { beginAtZero: true } } }
        });
    })
 
  }

}
