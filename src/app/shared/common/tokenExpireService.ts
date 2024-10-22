import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenExpireService {
    constructor(
        private router: Router,private toastrService: ToastrService,

    ) { }

    isTokenExpired() {
        const token =
            localStorage.getItem("token");        
        try {
            if ((JSON.parse(atob(token.split('.')[1])).exp) < Date.now() / 1000) {
                this.toastrService.error('Timeout');
                // tokenexp="";
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        }
        catch (error) {
            this.router.navigate(['/Unauthorize']);
        }
    }
}