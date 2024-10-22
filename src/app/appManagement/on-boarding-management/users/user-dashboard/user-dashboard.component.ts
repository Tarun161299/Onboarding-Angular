import { Component, OnInit } from '@angular/core';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private loader: AfterLoginComponent) { }

  ngOnInit(): void {
    this.loader.isLoading=false;  
  }

}
