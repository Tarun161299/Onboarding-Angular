import { Component, OnInit } from '@angular/core';
import { BeforeLoginComponent } from 'src/app/shared/before-login/before-login.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private loader: BeforeLoginComponent,private route:Router) { }

  ngOnInit(): void {
    localStorage.clear();
    this.loader.isLoading=false;
  }
  gohome(){
    this.route.navigate(['/login']);
  }
}
