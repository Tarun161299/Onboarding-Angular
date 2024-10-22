import { Component, OnInit } from '@angular/core';
import { BeforeLoginComponent } from '../shared/before-login/before-login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internal-server-error',
  templateUrl: './internal-server-error.component.html',
  styleUrls: ['./internal-server-error.component.css']
})
export class InternalServerErrorComponent implements OnInit {

  constructor(private loader: BeforeLoginComponent,private route:Router) { }
  
  ngOnInit(): void {
    localStorage.clear();
    this.loader.isLoading=false;    
  }
  cngPssClick(){
    localStorage.clear();
    this.route.navigate(['/login']);
    } 
}



 