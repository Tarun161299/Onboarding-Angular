import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenLocalStorageService } from '../tokenLocalStorage/tokenLocalStorageService';
import { EncyptionDecryption } from './EncyptionDecryption';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';



@Injectable({ providedIn: 'root' })
export class IsLoggedIn implements CanActivate {
    constructor(
        private router: Router,
        private datePipe: DatePipe,
        private storage: TokenLocalStorageService
    ) { }
    encSecretKey:any;
    encsalt:any;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        debugger
        this.encSecretKey =environment.secretKey //data[0].secretKey
      this.encsalt = environment.salt 
      let number=this.getRandomNumber()
        if ((this.storage.ParseToken()==null?null:this.storage.ParseToken().allRoles) != null ) {           
             
            if (this.storage.ParseToken().RoleType == "USER") { //for USER
                this.router.navigate(['auth/ProjectActivity/' + EncyptionDecryption.Encrypt(this.storage.ParseToken().requestNo+number,this.encSecretKey,this.encsalt)]);
                return false;
            }
            else {
                this.router.navigate(['auth/pmudashboard']);
                return false;
            }
        }
        else {
            return true;
        }
    }

    getRandomNumber() {
        const today = new Date();
        let date = this.datePipe.transform(today, 'YYMMddHHMMSSSSS');
        return date;
      }
}