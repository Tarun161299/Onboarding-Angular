import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthGuard } from '../common/auth.gaurd';
import { MdMinistryComponent } from '../../appManagement/master-data-management/md-ministry/md-ministry.component';
import { MdOrganizationComponent } from '../../appManagement/master-data-management/md-organization/md-organization.component';
import { MdSmsEmailTemplateComponent } from '../../appManagement/master-data-management/md-sms-email-template/md-sms-email-template.component';
import { MdStateComponent } from '../../appManagement/master-data-management/md-state/md-state.component';
import { ValidationTestComponent } from '../../appManagement/master-data-management/validation-test/validation-test.component';
import { ZmstActivityComponent } from '../../appManagement/master-data-management/zmst-activity/zmst-activity.component';
import { ZmstAgencyExamCounsComponent } from '../../appManagement/master-data-management/zmst-agency-exam-couns/zmst-agency-exam-couns.component';
import { ZmstAgencyComponent } from '../../appManagement/master-data-management/zmst-agency/zmst-agency.component';
import { ZmstApplicantTypeComponent } from '../../appManagement/master-data-management/zmst-applicant-type/zmst-applicant-type.component';
import { ZmstBranchComponent } from '../../appManagement/master-data-management/zmst-branch/zmst-branch.component';
import { ZmstCategoryComponent } from '../../appManagement/master-data-management/zmst-category/zmst-category.component';
import { ZmstCountryComponent } from '../../appManagement/master-data-management/zmst-country/zmst-country.component';
import { ZmstCourseAppliedLevelComponent } from '../../appManagement/master-data-management/zmst-course-applied-level/zmst-course-applied-level.component';
import { ZmstCourseAppliedComponent } from '../../appManagement/master-data-management/zmst-course-applied/zmst-course-applied.component';
import { ZmstDocumentTypeComponent } from '../../appManagement/master-data-management/zmst-document-type/zmst-document-type.component';
import { ZmstExamTypeComponent } from '../../appManagement/master-data-management/zmst-exam-type/zmst-exam-type.component';
import { ZmstFeeTypeComponent } from '../../appManagement/master-data-management/zmst-fee-type/zmst-fee-type.component';
import { ZmstGenderComponent } from '../../appManagement/master-data-management/zmst-gender/zmst-gender.component';
import { ZmstIdentityTypeComponent } from '../../appManagement/master-data-management/zmst-identity-type/zmst-identity-type.component';
import { ZmstMinimumQualificationComponent } from '../../appManagement/master-data-management/zmst-minimum-qualification/zmst-minimum-qualification.component';
import { ZmstNationalityComponent } from '../../appManagement/master-data-management/zmst-nationality/zmst-nationality.component';
import { ZmstPassingStatusComponent } from '../../appManagement/master-data-management/zmst-passing-status/zmst-passing-status.component';
import { ZmstProjectsComponent } from '../../appManagement/master-data-management/zmst-projects/zmst-projects.component';
import { ZmstQualificationComponent } from '../../appManagement/master-data-management/zmst-qualification/zmst-qualification.component';
import { ZmstQualifyingCourseComponent } from '../../appManagement/master-data-management/zmst-qualifying-course/zmst-qualifying-course.component';
import { ZmstQualifyingExamBoardComponent } from '../../appManagement/master-data-management/zmst-qualifying-exam-board/zmst-qualifying-exam-board.component';
import { ZmstQualifyingExamFromComponent } from '../../appManagement/master-data-management/zmst-qualifying-exam-from/zmst-qualifying-exam-from.component';
import { ZmstQualifyingExamLearningModeComponent } from '../../appManagement/master-data-management/zmst-qualifying-exam-learning-mode/zmst-qualifying-exam-learning-mode.component';
import { ZmstQualifyingExamResultModeComponent } from '../../appManagement/master-data-management/zmst-qualifying-exam-result-mode/zmst-qualifying-exam-result-mode.component';
import { ZmstQualifyingExamStreamComponent } from '../../appManagement/master-data-management/zmst-qualifying-exam-stream/zmst-qualifying-exam-stream.component';
import { ZmstQualifyingExamComponent } from '../../appManagement/master-data-management/zmst-qualifying-exam/zmst-qualifying-exam.component';
import { ZmstQuesPaperComponent } from '../../appManagement/master-data-management/zmst-ques-paper/zmst-ques-paper.component';
import { ZmstQuestionPaperMediumComponent } from '../../appManagement/master-data-management/zmst-question-paper-medium/zmst-question-paper-medium.component';
import { ZmstQuotaComponent } from '../../appManagement/master-data-management/zmst-quota/zmst-quota.component';
import { ZmstRankTypeComponent } from '../../appManagement/master-data-management/zmst-ranktype/zmst-ranktype.component';
import { ZmstReligionComponent } from '../../appManagement/master-data-management/zmst-religion/zmst-religion.component';
import { ZmstResidentialEligibilityComponent } from '../../appManagement/master-data-management/zmst-residentialeligibility/zmst-residentialeligibility.component';
import { ZmstSeatCategoryComponent } from '../../appManagement/master-data-management/zmst-seatcategory/zmst-seatcategory.component';
import { ZmstSeatGenderComponent } from '../../appManagement/master-data-management/zmst-seatgender/zmst-seatgender.component';
import { ZmstServiceTypeComponent } from '../../appManagement/master-data-management/zmst-service-type/zmst-service-type.component';
import { ZmstSpecialExamPaperComponent } from '../../appManagement/master-data-management/zmst-specialexampaper/zmst-specialexampaper.component';
import { ZmstStreamComponent } from '../../appManagement/master-data-management/zmst-stream/zmst-stream.component';
import { ZmstSubcategoryComponent } from '../../appManagement/master-data-management/zmst-subcategory/zmst-subcategory.component';
import { ZmstSubCategoryPriorityComponent } from '../../appManagement/master-data-management/zmst-subcategorypriority/zmst-subcategorypriority.component';
import { ZmstSubjectComponent } from '../../appManagement/master-data-management/zmst-subject/zmst-subject.component';
import { ZmstSymbolComponent } from '../../appManagement/master-data-management/zmst-symbol/zmst-symbol.component';
import { ZmstTradeComponent } from '../../appManagement/master-data-management/zmst-trade/zmst-trade.component';
import { ZmstTypeofDisabilityComponent } from '../../appManagement/master-data-management/zmst-typeofdisability/zmst-typeofdisability.component';
import { ZmstWillingnessComponent } from '../../appManagement/master-data-management/zmst-willingness/zmst-willingness.component';
import { OnBoardingListComponent } from '../../appManagement/on-boarding-management/on-boarding-list/on-boarding-list.component';
import { ProjectCreationComponent } from '../../appManagement/on-boarding-management/project-creation/project-creation.component';
import { ProjectDetailComponent } from '../../appManagement/on-boarding-management/project-detail/project-detail.component';
import { ProjectListComponent } from '../../appManagement/on-boarding-management/project-list/project-list.component';
import { UserDocumentsComponent } from '../../appManagement/on-boarding-management/users/user-documents/user-documents.component';
import { DocumentsComponent } from '../../appManagement/on-boarding-management/project-detail/documents/documents.component';
import { ApplicationEntryComponent } from '../../application-entry/application-entry.component';
import { ApplicationScheduleComponent } from '../../application-schedule/application-schedule.component';
import { CounsellingCalendraComponent } from '../../counselling-calendra/counselling-calendra.component';
import { DaywiseRegistrationComponent } from '../../daywise-registration/daywise-registration.component';
import { EmployeeDetailViewComponent } from '../../employee-detail-view/employee-detail-view.component';
import { AddEmployeeNewComponent } from '../../employeeManagement/add-employee-new/add-employee-new.component';
import { EmployeedetailsComponent } from '../../employeeManagement/addEmployee/add-employee/employeedetails.component';
import { AddEmployeeQualificationsComponent } from '../../employeeManagement/addEmployee/addEmployeeQualifications/add-employee-qualifications.component';
import { AddEmployeeWorkOrderComponent } from '../../employeeManagement/addEmployee/addEmployeeWorkOrder/add-employee-work-order.component';
import { InstituteStatisticsComponent } from '../../institute-statistics/institute-statistics.component';
import { ManageAgencyComponent } from '../../manage-agency/manage-agency.component';
import { ZmstInstituteStreamComponent } from '../../manage-institute-stream/manage-institute-stream.component';
import { ManageProgramComponent } from '../../manage-program/manage-program.component';
import { RequestDetailsViewComponent } from '../../request-details-view/request-details-view.component';
import { ResponsedetailviewComponent } from '../../responsedetailview/responsedetailview.component';
import { ScheduleReportComponent } from '../../schedule-report/schedule-report.component';
import { AfterLoginComponent } from './after-login.component';
import { WorkOrderDetailsComponent } from '../../workorder-management/work-order-details.component';
import { ZmstAgencyvirtualdirectorymappingComponent } from '../../zmst-agencyvirtualdirectorymapping/zmst-agencyvirtualdirectorymapping.component';
import { ZmstInstituteAgencyComponent } from '../../zmst-institute-agency/zmst-institute-agency.component';
import { ZmstInstituteListComponent } from '../../zmst-institute-list/zmst-institute-list.component';
import { ZmstInstituteTypeComponent } from '../../zmst-institute-type/zmst-institute-type.component';
import { ZmstInstituteComponent } from '../../zmst-institute/zmst-institute.component';
import { ZmstProgramListComponent } from '../../zmst-program-list/zmst-program-list.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartModule } from 'angular-highcharts';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HeaderInterceptor } from '../common/HeaderInterceptor';
import { ErrorHandlerService } from '../common/errorHandlerService';
import { LocalStorageService } from '../otp-localStorage/localStorageServices';
import { DecryptStringPipe } from '../pipe/decrypt-pipe';
import { ConfirmationDialogService } from '../services/confirmation-dialog.service';
import { EncyptionDecryption } from '../common/EncyptionDecryption';
import { RouterModule } from '@angular/router';
import { DateFormat } from '../pipe/datefromat-pipe';
import { ConversionPipe } from '../pipe/conversion-pipe';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FinancialDetailsComponent } from '../../appManagement/on-boarding-management/project-detail/financial-details/financial-details.component';
import { PIDetailsComponent } from '../../appManagement/on-boarding-management/project-detail/pi-details/pi-details.component';
import { ProjectCyclesComponent } from '../../appManagement/on-boarding-management/project-detail/project-cycles/project-cycles.component';
import { ProjectDetailsComponent } from '../../appManagement/on-boarding-management/project-detail/project-details/project-details.component';
import { ConversionIdentityPipe } from '../pipe/conversionIdentity-pipe';
import { AddEmployeeQualificationComponent } from '../../employeeManagement/add-employee-new/add-qualification/add-employee-qualification.component';
import { AddWorkOrderComponent } from '../../employeeManagement/add-employee-new/workorder-mapping-management/add-work-order.component';
import { ExamTypePipe } from '../pipe/exam-Type-pipe';
import { ExamplePdfViewerComponent } from '../../example-pdf-viewer/example-pdf-viewer.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { SharedModuleModule } from '../../shared-module/shared-module.module';
import { AfterLoginRoutingModule } from './after-login-routing.module';
import { CommonFunctionServices } from '../common/commonFunction.services';
import { AppOnBoardingRequestService } from '../services/appOnBoardingRequest';
import { TokenLocalStorageService } from '../tokenLocalStorage/tokenLocalStorageService';
import { TokenExpireService } from '../common/tokenExpireService';
import { ZmstExperienceTypeComponent } from '../../appManagement/master-data-management/zmst-experience-type.component/zmst-experience-type.component';
import { ZmstSeatGroupComponent } from '../../appManagement/master-data-management/zmst-seat-group/zmst-seat-group.component';
import { ZmstSeatSubCategoryComponent } from '../../appManagement/master-data-management/zmst-seat-sub-category/zmst-seat-sub-category.component';
import { ZmstSeatTypeComponent } from '../../appManagement/master-data-management/zmst-seat-type/zmst-seat-type.component';
import { ZmstProjectServices } from '../services/ZmstProjectServices';
import { ProjectDetailsServices } from '../services/ProjectDetailsServices';
import { AppDocumentUploadDetailService } from '../services/appDocumentUploadedDetailService';
import { DocumentTypeService } from '../services/documentTypeService';
import { MdDistrictComponent } from 'src/app/appManagement/master-data-management/md-district/md-district.component';
import { ExamManagementServicesComponent } from 'src/app/exam-management-services/exam-management-services.component';
import { CaptchaService } from '../services/captcha.service';
import { ChangePasswordComponent } from 'src/app/appManagement/master-data-management/change-password/change-password.component';
import { MdMainModuleService } from '../services/mdMainModuleServices';
import { MouDetailsComponent } from 'src/app/appManagement/on-boarding-management/project-detail/mou-details/mou-details.component';
import { PmuDashboardComponent } from 'src/app/appManagement/on-boarding-management/pmu-dashboard/pmu-dashboard.component';
import { UserDashboardComponent } from 'src/app/appManagement/on-boarding-management/users/user-dashboard/user-dashboard.component';
import { UserMOUComponent } from 'src/app/appManagement/on-boarding-management/users/user-mou/user-mou.component';
import { UserManagementComponent } from 'src/app/user-management/AddUser/user-management.component';
import { ViewUserListComponent } from 'src/app/user-management/view-user-list/view-user-list.component';
import { usermanagementservice } from '../services/usermanagementservice.Service';

import { RoleModuleComponent } from 'src/app/roleManagement/role-module/role-module.component';
import { AppRoleModulePermissionService } from '../services/app-role-module-permission.service';
import { UserRoleComponent } from 'src/app/roleManagement/user-role/user-role.component';
import { AppUserRoleMappingService } from '../services/app-user-role-mapping.service';
import { AppDocumentUploadDetailHistoryService } from '../services/app-Document-Uploaded.Details.History';
import { AppProjectActivityComponent } from 'src/app/appManagement/on-boarding-management/app-project-activity-component/app-project-activity.component';
import { AppProjectPaymentDetailsComponent } from 'src/app/appManagement/on-boarding-management/users/app-project-payment-details/app-project-payment-details.component';
import { ProposalInvoiceComponent } from 'src/app/appManagement/on-boarding-management/users/proposal-invoice/proposal-invoice.component';
import { SignOffComponent } from 'src/app/appManagement/on-boarding-management/project-detail/sign-off/sign-off.component';
import { UcComponent } from 'src/app/appManagement/on-boarding-management/project-detail/uc/uc.component';
import { PaymentComponent } from 'src/app/appManagement/on-boarding-management/project-detail/payment/payment.component';

import { UtilizationCertificateComponent } from 'src/app/appManagement/on-boarding-management/users/utilization-certificate/utilization-certificate.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ExamRegistrationSummaryComponent } from 'src/app/examination-services/exam-registration-summary.component';
import { ProjectExpenditureComponent } from 'src/app/appManagement/on-boarding-management/project-detail/project-expenditure/project-expenditure.component';
import { CounsellingAdmissionSystemSummaryComponent } from 'src/app/counselling-services/counselling-admission-system-summary.component';
import { AdvancedSearchComponent } from 'src/app/advanced-search/advanced-search.component';
import { BoardUserListComponent } from 'src/app/user-management/board-user-list/board-user-list.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { SignOffAdminComponent } from 'src/app/appManagement/on-boarding-management/users/sign-off-admin/sign-off-admin.component';
import { ProjectCycleCreationComponent } from 'src/app/appManagement/master-data-management/zmst-projects/project-cycle-creation/project-cycle-creation.component';
import { MdAgencyComponent } from 'src/app/appManagement/master-data-management/md-agency/md-agency.component';
import { MasterPageHomeComponent } from 'src/app/master-page-home/master-page-home.component';
import { CounsellingServiceHomeComponent } from 'src/app/counselling-service-home/counselling-service-home.component';
import { ExamGraphViewComponent } from 'src/app/exam-graph-view/exam-graph-view.component';
import { ProjectListGraphicalComponent } from 'src/app/project-list-graphical/project-list-graphical.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    PmuDashboardComponent,
    DateFormat,
    ConversionIdentityPipe,
    FinancialDetailsComponent,
    ConversionPipe,
    DecryptStringPipe,
    OnBoardingListComponent,
    MdDistrictComponent,
    MdMinistryComponent,
    ZmstProgramListComponent,
    ZmstInstituteComponent,
    ZmstInstituteTypeComponent,
    ZmstInstituteListComponent,
    ZmstInstituteAgencyComponent,
    ZmstAgencyvirtualdirectorymappingComponent,
    WorkOrderDetailsComponent,
    AfterLoginComponent,
    ScheduleReportComponent,
    AddEmployeeQualificationComponent,
    ResponsedetailviewComponent,
    RequestDetailsViewComponent,
    AddWorkOrderComponent,
    ManageProgramComponent,
    ZmstInstituteStreamComponent,
    ManageAgencyComponent,
    InstituteStatisticsComponent,
    AddEmployeeWorkOrderComponent,
    AddEmployeeQualificationsComponent,
    EmployeedetailsComponent,
    AddEmployeeNewComponent,
    ExamTypePipe,
    EmployeeDetailViewComponent,
    DaywiseRegistrationComponent,
    CounsellingCalendraComponent,
    ApplicationScheduleComponent,
    ApplicationEntryComponent,
    UserDocumentsComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    ProjectCreationComponent,
    ZmstWillingnessComponent,
    ZmstTypeofDisabilityComponent,
    ZmstTradeComponent,
    ZmstSymbolComponent,
    ZmstSubjectComponent,
    MdOrganizationComponent,
    MdSmsEmailTemplateComponent,
    MdStateComponent,
    ZmstActivityComponent,
    ZmstAgencyExamCounsComponent,
    ZmstAgencyComponent,
    ZmstApplicantTypeComponent,
    ZmstBranchComponent,
    ZmstCategoryComponent,
    ZmstCountryComponent,
    ZmstCourseAppliedLevelComponent,
    ZmstCourseAppliedComponent,
    ZmstDocumentTypeComponent,
    ZmstExamTypeComponent,
    ZmstFeeTypeComponent,
    ZmstGenderComponent,
    ZmstIdentityTypeComponent,
    ZmstMinimumQualificationComponent,
    ZmstNationalityComponent,
    ZmstPassingStatusComponent,
    ZmstProjectsComponent,
    ZmstQualificationComponent,
    ZmstQualifyingCourseComponent,
    ZmstQualifyingExamBoardComponent,
    ZmstQualifyingExamFromComponent,
    ZmstQualifyingExamLearningModeComponent,
    ZmstQualifyingExamResultModeComponent,
    ZmstQualifyingExamStreamComponent,
    ZmstQualifyingExamComponent,
    ZmstQuesPaperComponent,
    ZmstQuestionPaperMediumComponent,
    ZmstQuotaComponent,
    ZmstRankTypeComponent,
    ZmstReligionComponent,
    ZmstResidentialEligibilityComponent,
    ZmstSeatCategoryComponent,
    ZmstSeatGenderComponent,
    ZmstServiceTypeComponent,
    ZmstSpecialExamPaperComponent,
    ZmstStreamComponent,
    ZmstSubcategoryComponent,
    DocumentsComponent,
    ValidationTestComponent,
    ZmstSubCategoryPriorityComponent,
    HeaderComponent,
    FooterComponent,
    PIDetailsComponent,
    ProjectCyclesComponent,
    ProjectDetailsComponent,
    ExamplePdfViewerComponent,
    SideNavbarComponent,
    ZmstExperienceTypeComponent,
    ZmstSeatGroupComponent,
    ZmstSeatSubCategoryComponent,
    ZmstSeatTypeComponent,
    ExamManagementServicesComponent,
    ChangePasswordComponent,
    UserManagementComponent,
    ViewUserListComponent,
    RoleModuleComponent,
    UserRoleComponent  ,
    MouDetailsComponent,
    UserMOUComponent, 
    UserDashboardComponent,
    AppProjectPaymentDetailsComponent,
    AppProjectActivityComponent,
    ProposalInvoiceComponent,
    UcComponent,
    SignOffComponent,
    PaymentComponent,    
    SignOffAdminComponent,
    UtilizationCertificateComponent,
    UserProfileComponent,
    ExamRegistrationSummaryComponent,
    ProjectExpenditureComponent,
    CounsellingAdmissionSystemSummaryComponent,
    AdvancedSearchComponent,
    BoardUserListComponent,
    ProjectCycleCreationComponent,
    MdAgencyComponent,
    MasterPageHomeComponent,
    CounsellingServiceHomeComponent,
    ExamGraphViewComponent,
    ProjectListGraphicalComponent,
  ],
  imports: [
    AngularEditorModule,
    AfterLoginRoutingModule,
    SharedModuleModule,
    //NgxDocViewerModule,
    CommonModule,
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
    ToastrModule.forRoot({
      timeOut: 2000,
      closeButton: true,
      progressBar: true,
    }),
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxExtendedPdfViewerModule,
    DataTablesModule,
    NgSelectModule
    
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
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    },
    AuthGuard,
    DatePipe,
    NgxSmartModalService,
    AppDocumentUploadDetailHistoryService,
    LocalStorageService,
    DecryptStringPipe,
    CommonFunctionServices,
    ConfirmationDialogService,
    EncyptionDecryption,
    TokenExpireService,
    TokenLocalStorageService,
    ToastrService,
    AppOnBoardingRequestService,
    AfterLoginComponent,
    ZmstProjectServices,
    DocumentTypeService,
    ProjectDetailsServices,
    CaptchaService,
    MdMainModuleService,
    usermanagementservice,
    AppRoleModulePermissionService,
    AppUserRoleMappingService 
   
  ],
  bootstrap: [AfterLoginComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AfterLoginModule { }
