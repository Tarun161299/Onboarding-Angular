import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';
import { MinistryDetail } from 'src/app/model/Ministry.model';
import { OnboardingRequestdata } from './model/OnBoardingRequest.model';
import { onboardingrequest } from "./model/on-boarding-request-list.model";
import { OnBoardingRequestDetailsView } from './model/OnBoardingRequestDetailsView';

@Injectable({

    providedIn: 'root'
    
  })

  export class ApiService{
    url:string="https://localhost:7146/api/AppOnboardingRequest/GetAll";
    urlMinistry:string="https://localhost:7146/api/Ministry/GetAll";
    urlOrganization:string="https://localhost:7146/api/OrganizationDetail/GetAll";
    urlOnBoard:string="https://localhost:7146/api/AppOnboardingRequest/SaveAppOnboardingRequestData";
    RequestIddataUrl:string="https://localhost:7146/api/AppOnboardingRequest/GetById?requestId=";
    constructor(private http: HttpClient)
    {

    }
  }