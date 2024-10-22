import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { WorkOrderDetailsComponent } from '../../workorder-management/work-order-details.component';
import { ZmstAgencyvirtualdirectorymappingComponent } from '../../zmst-agencyvirtualdirectorymapping/zmst-agencyvirtualdirectorymapping.component';
import { ZmstInstituteAgencyComponent } from '../../zmst-institute-agency/zmst-institute-agency.component';
import { ZmstInstituteListComponent } from '../../zmst-institute-list/zmst-institute-list.component';
import { ZmstInstituteTypeComponent } from '../../zmst-institute-type/zmst-institute-type.component';
import { ZmstInstituteComponent } from '../../zmst-institute/zmst-institute.component';
import { ZmstProgramListComponent } from '../../zmst-program-list/zmst-program-list.component';
import { ZmstSeatGroupComponent } from '../../appManagement/master-data-management/zmst-seat-group/zmst-seat-group.component';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
import { ZmstExperienceTypeComponent } from '../../appManagement/master-data-management/zmst-experience-type.component/zmst-experience-type.component';
import { ZmstSeatTypeComponent } from '../../appManagement/master-data-management/zmst-seat-type/zmst-seat-type.component';
import { ZmstSeatSubCategoryComponent } from '../../appManagement/master-data-management/zmst-seat-sub-category/zmst-seat-sub-category.component';
import { MdDistrictComponent } from 'src/app/appManagement/master-data-management/md-district/md-district.component';
import { ExamManagementServicesComponent } from 'src/app/exam-management-services/exam-management-services.component';
import { ChangePasswordComponent } from 'src/app/appManagement/master-data-management/change-password/change-password.component';
import { PmuDashboardComponent } from 'src/app/appManagement/on-boarding-management/pmu-dashboard/pmu-dashboard.component';
import { UserMOUComponent } from 'src/app/appManagement/on-boarding-management/users/user-mou/user-mou.component';
import { UserDashboardComponent } from 'src/app/appManagement/on-boarding-management/users/user-dashboard/user-dashboard.component';
import { UserManagementComponent } from 'src/app/user-management/AddUser/user-management.component';
import { ViewUserListComponent } from 'src/app/user-management/view-user-list/view-user-list.component';
import { RoleModuleComponent } from     'src/app/roleManagement/role-module/role-module.component';
import { UserRoleComponent } from 'src/app/roleManagement/user-role/user-role.component';
import { AppProjectPaymentDetailsComponent } from 'src/app/appManagement/on-boarding-management/users/app-project-payment-details/app-project-payment-details.component';
import { AppProjectActivityComponent } from 'src/app/appManagement/on-boarding-management/app-project-activity-component/app-project-activity.component';
import { ProposalInvoiceComponent } from 'src/app/appManagement/on-boarding-management/users/proposal-invoice/proposal-invoice.component';
import { UcComponent } from 'src/app/appManagement/on-boarding-management/project-detail/uc/uc.component';
import { SignOffComponent } from 'src/app/appManagement/on-boarding-management/project-detail/sign-off/sign-off.component';
import { PaymentComponent } from 'src/app/appManagement/on-boarding-management/project-detail/payment/payment.component';
import { UtilizationCertificateComponent } from 'src/app/appManagement/on-boarding-management/users/utilization-certificate/utilization-certificate.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CounsellingAdmissionSystemSummaryComponent } from 'src/app/counselling-services/counselling-admission-system-summary.component';
import { ExamRegistrationSummaryComponent } from 'src/app/examination-services/exam-registration-summary.component';
import { ProjectExpenditureComponent } from 'src/app/appManagement/on-boarding-management/project-detail/project-expenditure/project-expenditure.component';
import { BoardUserListComponent } from 'src/app/user-management/board-user-list/board-user-list.component';
import { SignOffAdminComponent } from 'src/app/appManagement/on-boarding-management/users/sign-off-admin/sign-off-admin.component';
import { ProjectCycleCreationComponent } from 'src/app/appManagement/master-data-management/zmst-projects/project-cycle-creation/project-cycle-creation.component';
import { MdAgencyComponent } from 'src/app/appManagement/master-data-management/md-agency/md-agency.component';
import { MasterPageHomeComponent } from 'src/app/master-page-home/master-page-home.component';
import { CounsellingServiceHomeComponent } from 'src/app/counselling-service-home/counselling-service-home.component';
import { ExamGraphViewComponent } from 'src/app/exam-graph-view/exam-graph-view.component';
import { ProjectListGraphicalComponent } from 'src/app/project-list-graphical/project-list-graphical.component';
const route: Routes = [
    { path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'onboardinglist', component: OnBoardingListComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },//
    { path: 'responseDetailView/:Id', component: ResponsedetailviewComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'requestDetailsView/:Id', component: RequestDetailsViewComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'projectCreation/:Mode/:Id', component: ProjectCreationComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'projectlist', component: ProjectListComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'projectdetail/:Id', component: ProjectDetailComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'userdocuments/:Id/:docID', component: UserDocumentsComponent, canActivate: [AuthGuard], data: { roles: ['USER'] }, },
    { path: 'district', component: MdDistrictComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'country', component: ZmstCountryComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'validation', component: ValidationTestComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'organization', component: MdOrganizationComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'smsemailtemplate', component: MdSmsEmailTemplateComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'state', component: MdStateComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'ministry', component: MdMinistryComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'manageApplication', component: ApplicationEntryComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'CounsellingCalendar', component: CounsellingCalendraComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'applicationSchedule', component: ApplicationScheduleComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'daywiseRegistration', component: DaywiseRegistrationComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'getScheduleReport', component: ScheduleReportComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'manageAgency', component: ManageAgencyComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'workorderDetails', component: WorkOrderDetailsComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'addEmployee', component: EmployeedetailsComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'addEmployeeNew/:Id', component: AddEmployeeNewComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'addEmployeeQual', component: AddEmployeeQualificationsComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'addEmployeeWorkOrder', component: AddEmployeeWorkOrderComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, }, 
    { path: 'ZmstWillingness', component: ZmstWillingnessComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN','MDM'] }, },
    { path: 'ZmstSubject', component: ZmstSubjectComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN','MDM'] }, },
    { path: 'ZmstQuota', component: ZmstQuotaComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN','MDM'] }, },
    { path: 'ZmstRankType', component: ZmstRankTypeComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'ZmstReligion', component: ZmstReligionComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'ResidentialEligibility', component: ZmstResidentialEligibilityComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'SeatCategory', component: ZmstSeatCategoryComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'SeatGender', component: ZmstSeatGenderComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'SpecialExamPaper', component: ZmstSpecialExamPaperComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'Stream', component: ZmstStreamComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'Subcategory', component: ZmstSubcategoryComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'employeeDetailView/:Id', component: EmployeeDetailViewComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'SubCategoryPriority', component: ZmstSubCategoryPriorityComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'Symbol', component: ZmstSymbolComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'TypeofDisability', component: ZmstTypeofDisabilityComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'Branch', component: ZmstBranchComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'Category', component: ZmstCategoryComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'CourseApplied', component: ZmstCourseAppliedComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'CourseAppliedLevel', component: ZmstCourseAppliedLevelComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'DocumentType', component: ZmstDocumentTypeComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'FeeType', component: ZmstFeeTypeComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'Gender', component: ZmstGenderComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'IdentityType', component: ZmstIdentityTypeComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'MinimumQualification', component: ZmstMinimumQualificationComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'Nationality', component: ZmstNationalityComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'PassingStatus', component: ZmstPassingStatusComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'Projects', component: ZmstProjectsComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'Qualification', component: ZmstQualificationComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'QualifyingCourse', component: ZmstQualifyingCourseComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'QualifyingExam', component: ZmstQualifyingExamComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'QualifyingExamBoard', component: ZmstQualifyingExamBoardComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'QualifyingExamLearningMode', component: ZmstQualifyingExamLearningModeComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'QualifyingExamResultMode', component: ZmstQualifyingExamResultModeComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'QualifyingExamStream', component: ZmstQualifyingExamStreamComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'QuesPaper', component: ZmstQuesPaperComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'QuestionPaperMedium', component: ZmstQuestionPaperMediumComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'Agency', component: ZmstAgencyComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'AgencyExamCouns', component: ZmstAgencyExamCounsComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'ManageProgram', component: ManageProgramComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'ZmstTrade', component: ZmstTradeComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'zmstProgramList', component: ZmstProgramListComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'addInstitute/:Id', component: ZmstInstituteComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'InstituteStatistics', component: InstituteStatisticsComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'addInstituteList', component: ZmstInstituteListComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'addInstituteType', component: ZmstInstituteTypeComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'instituteAgencyMapping', component: ZmstInstituteAgencyComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'instituteStreamMapping', component: ZmstInstituteStreamComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'agencyVirtualDirectoryMapping', component: ZmstAgencyvirtualdirectorymappingComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'ZmstActivity', component: ZmstActivityComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'ZmstApplicantType', component: ZmstApplicantTypeComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'ZmstSubCategoryPriority', component: ZmstSubCategoryPriorityComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN','MDM'] }, },
    { path: 'ZmstServiceType', component: ZmstServiceTypeComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN','MDM'] }, },
    { path: 'ZmstQualifyingExamFrom', component: ZmstQualifyingExamFromComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN','MDM'] }, },
    { path: 'zmstProgramList', component: ZmstProgramListComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'zmstExamType', component: ZmstExamTypeComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'ZmstSeatGroup', component: ZmstSeatGroupComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'ZmstSeatSubCategory', component: ZmstSeatSubCategoryComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'ZmstSeatType', component: ZmstSeatTypeComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'ZmstExperienceType', component: ZmstExperienceTypeComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'pmudashboard', component: PmuDashboardComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN','MDM'] }, },  
    { path: 'userdashboard', component: UserDashboardComponent, canActivate: [AuthGuard], data: { roles: ['USER'] }, },  
    { path: 'usermou/:id', component: UserMOUComponent, canActivate: [AuthGuard], data: { roles: ['USER'] }, }, 
    { path: 'PaymentProjectDetails/:id', component: AppProjectPaymentDetailsComponent, canActivate: [AuthGuard], data: { roles: ['USER'] }, },  
    { path: 'ProjectActivity/:id', component: AppProjectActivityComponent, canActivate: [AuthGuard], data: { roles: ['USER'] }, },  
    { path: 'ProposalInvoice/:id', component: ProposalInvoiceComponent, canActivate: [AuthGuard], data: { roles: ['USER'] }, },
   // { path: 'SignOff/:id', component: SignOffComponent, canActivate: [AuthGuard], data: { roles: ['USER'] }, },
    { path: 'SignOff/:id', component: SignOffAdminComponent, canActivate: [AuthGuard], data: { roles: ['USER'] }, },
    { path: 'UserManagement', component: ViewUserListComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'Payment/:id', component: PaymentComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'Adduser/:id',component:UserManagementComponent},
    { path: 'RoleManagement', component: RoleModuleComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] },},
    { path: 'UserRoleManagement', component: UserRoleComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'Uc/:id', component: UtilizationCertificateComponent, canActivate: [AuthGuard], data: { roles: ['USER'] }, },   
    { path: 'UserProfile/:id', component: UserProfileComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'CounsAddSummary', component: CounsellingAdmissionSystemSummaryComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'ExamRegistrationSummary', component: ExamRegistrationSummaryComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'ProjectExpenditureComponent/:id', component: ProjectExpenditureComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'BoardUserManagement', component: BoardUserListComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN','ADMIN'] }, },   
    { path: 'ProjectCycleCreation/:Id/:agencyId', component: ProjectCycleCreationComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },   
    { path: 'MdAgency', component: MdAgencyComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },   
    { path: 'masterPageHome', component: CounsellingServiceHomeComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },   //
    { path: 'CounsellingServiceHomeComponent', component: MasterPageHomeComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'examGraphicalView', component: ExamGraphViewComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    { path: 'projectListGraphicalComponent', component: ProjectListGraphicalComponent, canActivate: [AuthGuard], data: { roles: ['PMUADMIN'] }, },
    
    { path: '**', component: PageNotFoundComponent },  
     
];
@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: [RouterModule]
})
export class AfterLoginRoutingModule { }  