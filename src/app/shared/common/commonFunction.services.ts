import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()

export class CommonFunctionServices {
    constructor(private router: Router) {

    }

  bindDataTable(gridName: any,col:number) 
  {
    
    var datatable = $('#' + gridName).DataTable();
    
    if(col==0){
      datatable.destroy();
      setTimeout(() => {
        $('#' + gridName).DataTable();
      }, 1000);
      
    }
    
    else
    {
      datatable.destroy();
      setTimeout(() => {
        $('#' + gridName).DataTable({
          "order": [[col,'desc']],
        });
      }, 300);
      
    }
    
  }

  bindemptyDataTable(gridName: any,gridname2:any,col:number){
    var datatable1 = $('#' + gridName,'#'+gridname2).DataTable();
    
    if(col==0){
      datatable1.destroy();
      setTimeout(() => {
        $('#' + gridName).DataTable();
      }, 1000);
      
    }
    
    else
    {
      datatable1.destroy();
      setTimeout(() => {
        $('#' + gridName).DataTable({
          "order": [[col,'desc']],
        });
      }, 300);
      
    }
  }
}