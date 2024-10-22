import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AfterLoginComponent } from '../after-login/after-login.component';



@Injectable({ providedIn: 'root' })
export class ErrorMessageService {
    constructor(
       private toastrService: ToastrService

    ) { }

    showError(error:Number){
        if(error==409){
            this.toastrService.error("Already Exist");

        }
        if(error==500){
            this.toastrService.error("Server Error");

        }
       

    }
}