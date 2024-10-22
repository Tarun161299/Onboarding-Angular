import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-before-login',
  templateUrl: './before-login.component.html',
  styleUrls: ['./before-login.component.css']
})
export class BeforeLoginComponent implements OnInit {
  isLoading = false;
  constructor() { }

  ngOnInit(): void {
  }

}
