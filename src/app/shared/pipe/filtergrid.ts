import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterData'
})
export class FilterGrid implements PipeTransform {

    
  transform(values: any[],user: any,flag:number): any[] {
    
   if(flag==0){
    return values
   }
   else{
      return values.filter(x=>(!x.currentStage || x.currentStage)==user);
   }//return values=rowdata.filter(x=>x.currentStage==user);
  

  }

}