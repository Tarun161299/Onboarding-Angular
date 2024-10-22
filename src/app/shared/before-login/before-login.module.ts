import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { BeforeLoginComponent } from "./before-login.component";
import { BeforeLoginRouting } from "./before-login-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "src/app/public/login/login.component";
import { InternalServerErrorComponent } from "src/app/internal-server-error/internal-server-error.component";
import { UnauthorizedAccessComponent } from "src/app/unauthorized-access/unauthorized-access.component";
import { ConfirmpasswordComponent } from "src/app/confirmpassword/confirmpassword.component";
import { ForgotPasswordComponent } from "src/app/public/forgot-password/forgot-password.component";
import { LinkExpiredPageComponent } from "src/app/public/on-boarding-details/link-expired-page/link-expired-page.component";
import { OnBoardingDetailsComponent } from "src/app/public/on-boarding-details/on-boarding-details.component";
import { OnBoardingRequestComponent } from "src/app/public/on-boarding-request/on-boarding-request.component";
import { OnBoardingStatusComponent } from "src/app/public/on-boarding-status/on-boarding-status.component";
import { OnBoardingViewStatusComponent } from "src/app/public/on-boarding-view-status/on-boarding-view-status.component";
import { RegistrationComponent } from "src/app/public/registration/registration.component";
import { RequestnoMessageComponent } from "src/app/requestno-message/requestno-message.component";
import { ResponseDetailMessageComponent } from "src/app/response-detail-message/response-detail-message.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgSelectModule } from "@ng-select/ng-select";
import { DataTablesModule } from "angular-datatables";
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { ChartModule } from "angular-highcharts";
import { HighchartsChartModule } from "highcharts-angular";
import { NgApexchartsModule } from "ng-apexcharts";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { NgxSmartModalModule } from "ngx-smart-modal";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { FooterLoginComponent } from "./footer-login/footer-login.component";
import { RouterModule } from "@angular/router";
import { SharedModuleModule } from "src/app/shared-module/shared-module.module";
import { AppOnBoardingRequestService } from "../services/appOnBoardingRequest";
import { TokenExpireService } from "../common/tokenExpireService";
import { TokenLocalStorageService } from "../tokenLocalStorage/tokenLocalStorageService";
import { HeaderLoginComponent } from "./header-login/header-login.component";
import { CaptchaService } from "../services/captcha.service";
import { LocalStorageService } from "../otp-localStorage/localStorageServices";
import { ZmstServiceTypeService } from "../services/zmst-service-type.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HeaderInterceptor } from "../common/HeaderInterceptor";
import { ConfirmationDialogService } from "../services/confirmation-dialog.service";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        BeforeLoginComponent,
        LoginComponent,
        RegistrationComponent,
        ForgotPasswordComponent,
        OnBoardingRequestComponent,
        OnBoardingStatusComponent,
        OnBoardingDetailsComponent,
        RequestnoMessageComponent,
        OnBoardingViewStatusComponent,
        LinkExpiredPageComponent,
        ResponseDetailMessageComponent,
        ConfirmpasswordComponent,
        UnauthorizedAccessComponent,
        InternalServerErrorComponent,
        HeaderLoginComponent,
        FooterLoginComponent,

    ],
    imports: [
        SharedModuleModule,
        AngularEditorModule,
        CommonModule,
        BeforeLoginRouting,
        AngularEditorModule,
        NgApexchartsModule,
        ChartModule,
        HighchartsChartModule,
        NgxSmartModalModule.forRoot(),
        PdfViewerModule,
        FormsModule,
        ReactiveFormsModule,
        HighchartsChartModule,
        RouterModule,
        PerfectScrollbarModule,
        ToastrModule.forRoot({
            timeOut: 2000,
            closeButton: true,
            progressBar: true,
        }),
        NgbModule,
        NgMultiSelectDropDownModule.forRoot(),
        NgxExtendedPdfViewerModule,
        DataTablesModule,
        NgSelectModule,

    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HeaderInterceptor,
            multi: true
        },
        AppOnBoardingRequestService,
        TokenLocalStorageService,
        TokenExpireService,
        ToastrService,
        BeforeLoginComponent,
        CaptchaService,
        DatePipe,
        ZmstServiceTypeService,
        LocalStorageService,
        ConfirmationDialogService
    ],
    bootstrap: [BeforeLoginComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class BeforeLoginModule { };