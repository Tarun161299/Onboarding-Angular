import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'Conversion',
})
export class ConversionPipe implements PipeTransform {
  mdSection: any;
  constructor() {
    
  }
  descriptionSection: string = '';
  sectionNumber: string[];


  transform(value: any,data:any, args?: any): any {
    
    this.descriptionSection = '';
    this.descriptionSection= data.filter(x=>x.projectCode==value)[0].projectName
      return this.descriptionSection;
    
  }
}
