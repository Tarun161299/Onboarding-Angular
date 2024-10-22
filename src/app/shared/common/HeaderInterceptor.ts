import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
//import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { TokenLocalStorageService } from '../tokenLocalStorage/tokenLocalStorageService';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private storage:TokenLocalStorageService, private router: Router,private toastrService: ToastrService,) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger
    if(localStorage.getItem('isauth')=='0'){
      
      request = request.clone({
        setHeaders: {
   
          Accept: "text/plain",
          responseType:"text",
          apikey:environment.apikey
          //grant_type=refresh_token&refresh_token=tGzv3JOkF0XG5Qx2TlKWIA
         // Authorization: `Bearer "asdfasdfdsadfasdf"`
        }
       
     });
      return next.handle(request);
    }

     else if(localStorage.getItem('isauth')=='1'){
      debugger
      const token =
            localStorage.getItem("token");     
            var a =(JSON.parse(atob(token.split('.')[1])).exp);
            var b =(Date.now() / 1000)
      //  if ((JSON.parse(atob(token.split('.')[1])).exp) < Date.now() / 1000) {
      //   
      //   
      //           //this.toastrService.error('Timeout');
      //           // tokenexp="";
      //            localStorage.clear();
      //            //this.router.navigate(['/login']);
      //            window.location.href = '/login';
      //       }
      if(request.url.indexOf('AppOnboardingAdminLogin/RefreshToken')==-1){
        
        // const a=new Date();
 
         localStorage.setItem('time',(new Date()).toString());
       }
        request = request.clone({
           setHeaders: {
             Accept: "text/plain",
             responseType:"text",
             Authorization: `Bearer ${this.storage.get('token')}`,
             RefreshToken:this.storage.get('refreshToken'),
             apikey:environment.apikey
             
           }
          
        });
        
        return next.handle(request);
      
      
    }
    
    else{
      return next.handle(request);
      
    }
      
  }
}