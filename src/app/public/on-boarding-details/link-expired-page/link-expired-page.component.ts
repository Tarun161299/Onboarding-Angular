import { BeforeLoginComponent } from 'src/app/shared/before-login/before-login.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-link-expired-page',
  templateUrl: './link-expired-page.component.html',
  styleUrls: ['./link-expired-page.component.css']
})
export class LinkExpiredPageComponent implements OnInit {

  constructor(private loader: BeforeLoginComponent) { }

  ngOnInit(): void {
    this.loader.isLoading = false;
  }

}
