import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppOnBoardingRequestService } from '../services/appOnBoardingRequest';
import { TokenLocalStorageService } from '../tokenLocalStorage/tokenLocalStorageService';

@Injectable({
  providedIn: 'root'
})

export class ErrorHandlerService implements ErrorHandler{
    logout:any
    constructor(private router: Router,
        private users: AppOnBoardingRequestService,
        private storage:TokenLocalStorageService
        )
    {

    }
    
    handleError(error: any): void {
        
        if(error instanceof HttpErrorResponse)
        {
            
            // if(error.status == 404)
            // {
            //     this.router.navigate(['/Unauthorize']);
            // }
            // if(error.error.includes("This request is unauthorized")|| error.status == 401){
                
            //     this.router.navigate(['/Unauthorize']);
            // }
            
            if(error.status==401 || error.error.includes("This request is unauthorized"))

            { 
               this.logout = {
                userId: btoa(this.storage.ParseToken().userId),
                refreshToken: localStorage.getItem('refreshToken'),
                token: localStorage.getItem('token')
              }
                this.users.logout(this.logout).subscribe((res: any) => {
                //this.toastrService.success(res);
                this.users.setRemoveTimer();
                localStorage.clear();
                this.router.navigate(['/login']);
              })
               // localStorage.clear();

                
                  //  this.router.navigate(['/InternalServerError']);
                  // this.toastrService.error("Testinggggggggg");
                 //alert(error.message);
                }
        };
    }
    
}
