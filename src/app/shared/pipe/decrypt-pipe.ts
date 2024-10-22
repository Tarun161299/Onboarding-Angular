import { Pipe, PipeTransform } from '@angular/core';
import { EncyptionDecryption } from '../common/EncyptionDecryption';
import { ConfigurationApiSecureKey } from '../services/ConfigurationApiSecureKey.Services';

@Pipe({
  name: 'decryptStr',
})
export class DecryptStringPipe implements PipeTransform {
  decSecretKey: string;
  decsalt: string;
  decryptedValue:string;
  constructor(private configurationApiSecureKey: ConfigurationApiSecureKey){
    
  };
  transform(value: any,decSecretKey:any, decsalt:any,args?: any) {
    
      if(value!= undefined && value != null ) {
        this.decryptedValue = EncyptionDecryption.Decrypt(value,decSecretKey,decsalt);
        return this.decryptedValue;
      }       
      else return '';
  }
 
}
  