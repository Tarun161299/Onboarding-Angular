import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.css']
})
export class HeaderLoginComponent implements OnInit {
  currentRoute: string;

  constructor(
       public route:Router,
    ) { }

  ngOnInit(): void {
    localStorage.clear();
    this.currentRoute=this.route.url
  }
  
}
