import { Component, OnInit } from '@angular/core';
import { BeforeLoginComponent } from '../shared/before-login/before-login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized-access',
  templateUrl: './unauthorized-access.component.html',
  styleUrls: ['./unauthorized-access.component.css']
})
export class UnauthorizedAccessComponent implements OnInit {

  constructor(private loader: BeforeLoginComponent,private route:Router) { }

  ngOnInit(): void {
    localStorage.clear();
    this.loader.isLoading=false;
    
  }
  gohome(){
    this.route.navigate(['/login']);
  }

}






