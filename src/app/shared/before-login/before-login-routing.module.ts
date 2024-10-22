import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BeforeLoginComponent } from "./before-login.component";
import { ForgotPasswordComponent } from "src/app/public/forgot-password/forgot-password.component";
import { RegistrationComponent } from "src/app/public/registration/registration.component";
import { LoginComponent } from "src/app/public/login/login.component";
import { IsLoggedIn } from "../common/isLoggedIn.Services";
import { OnBoardingRequestComponent } from "src/app/public/on-boarding-request/on-boarding-request.component";
import { OnBoardingStatusComponent } from "src/app/public/on-boarding-status/on-boarding-status.component";
import { OnBoardingDetailsComponent } from "src/app/public/on-boarding-details/on-boarding-details.component";
import { RequestnoMessageComponent } from "src/app/requestno-message/requestno-message.component";
import { OnBoardingViewStatusComponent } from "src/app/public/on-boarding-view-status/on-boarding-view-status.component";
import { LinkExpiredPageComponent } from "src/app/public/on-boarding-details/link-expired-page/link-expired-page.component";
import { ResponseDetailMessageComponent } from "src/app/response-detail-message/response-detail-message.component";
import { ConfirmpasswordComponent } from "src/app/confirmpassword/confirmpassword.component";
import { UnauthorizedAccessComponent } from "src/app/unauthorized-access/unauthorized-access.component";
import { InternalServerErrorComponent } from "src/app/internal-server-error/internal-server-error.component";
import { PageNotFoundComponent } from "src/app/page-not-found/page-not-found.component";
import { EncryptionComponent } from "src/app/public/encryption/encryption/encryption.component";
import { EssoLoginComponent } from "src/app/esso-login/esso-login.component";

const routes: Routes = [
  //{ path: '', component:LoginComponent, pathMatch: 'full' },
  { path: '', component: LoginComponent, pathMatch: 'full', canActivate: [IsLoggedIn]  },
  { path: 'login', component: LoginComponent, canActivate: [IsLoggedIn] },
  { path: 'registration/:Id', component: RegistrationComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'onboardingrequest', component: OnBoardingRequestComponent },
  { path: 'onboardingstatus', component: OnBoardingStatusComponent },
  { path: 'onboardingdetails/:Id', component: OnBoardingDetailsComponent },
  { path: 'requestNoMessage', component: RequestnoMessageComponent },
  { path: 'onboardingviewstatus/:Id', component: OnBoardingViewStatusComponent },
  { path: 'requestlinkexpired', component: LinkExpiredPageComponent },
  { path: 'responseDetailMessage', component: ResponseDetailMessageComponent, },
  { path: 'confirmPassword/:Id', component: ConfirmpasswordComponent, },
  { path: 'Unauthorize', component: UnauthorizedAccessComponent },
  { path: 'InternalServerError', component: InternalServerErrorComponent },
  { path: 'essoresponse/:id', component: EssoLoginComponent },
  { path: 'enc', component: EncryptionComponent },
  
  //{ path: '**', component: PageNotFoundComponent }  
 
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class BeforeLoginRouting { };