import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'ConversionIdentity',
})
export class ConversionIdentityPipe implements PipeTransform {
  mdSection: any;
  constructor() {
    
  }
  idType: string = '';
  sectionNumber: string[];


  transform(value: any,data:any, args?: any): any {
    
    this.idType = '';
    this.idType= data.filter(x=>x.id==value)[0].idType
      return this.idType;
    
  }
}
