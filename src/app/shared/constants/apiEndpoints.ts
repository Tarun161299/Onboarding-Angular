import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const ApiEndPoints = {
  onBoardingRequestGetAll: environment.apiURL + 'AppOnboardingRequest/GetAll',
  onBoardingRequestGetAllByStatus: environment.apiURL + 'AppOnboardingRequest/GetAllByStatus?Status=',
  onBoardingRequestSave: environment.apiURL + 'AppOnboardingRequest/Insert',
  UserInfoVerify: environment.apiURL + 'AppOnboardingAdminLogin/USP_OnboardingAdminLogin',
  userInfoVerifyEis:environment.apiURL + 'AppOnboardingAdminLogin/USP_OnboardingAdminLoginEis',
  RefreshToken: environment.apiURL + 'AppOnboardingAdminLogin/RefreshToken',
  SaveOnboardDetails: environment.apiURL + 'AppOnboardingDetails/Insert',
  UpdateOnboardDetails: environment.apiURL + 'AppOnboardingDetails/ChangeStatus',
  dataOFDetailPage: environment.apiURL + 'AppOnboardingRequest/GetById?requestId=',
  dataOfContactDetailPage: environment.apiURL + 'AppContactPersonDetail/GetByRequestId?requestId=',
  onBoardingMail: environment.apiURL + 'AppOnboardingResponse/InsertUseProcedure',


  mdMinistryList: environment.apiURL + 'Ministry/GetAll',
  organizationList: environment.apiURL + 'MdOrganization/GetAll',
  organizationListByStateId: environment.apiURL + 'MdOrganization/GetByStateId?stateId=',
  SaveOnboardingRequest: environment.apiURL + 'AppOnboardingRequest/Insert',
  SaveSignUpDetail: environment.apiURL + 'AppOnboardingAdminLogin/SaveSignUp',
  OTPverification: environment.apiURL + 'AppOnboardingRequest/OTP',



  requestLinkDetails: environment.apiURL + 'AppOnboardingRequest/GetOnBoardingRequestLink?requestId=',

  checkUserIdAvailibility: environment.apiURL + 'AppOnboardingAdminLogin/CheckUserIDAvailibility?userID=',
  GetStatus: environment.apiURL + 'AppOnboardingRequest/GetStatusById?RequestId=',
  sendRequestStatusEmail: environment.apiURL + 'Email?email=',
  projectListGetAll: environment.apiURL + 'AppProjectDetails/GetAll',
  saveAppProjectdetails: environment.apiURL + 'AppProjectDetails/Insert',
  GetProjectDetailsbyReqNo: environment.apiURL + 'AppProjectDetails/GetById?id=',
  GetProjectDetailsbyId: environment.apiURL + 'AppProjectDetails/GetByProjectId?id=',
  GetByRequestNo: environment.apiURL + 'AppProjectDetails/GetByRequestNo?Requestno=',
  saveProjectdetails: environment.apiURL + 'AppProjectDetails/SaveProjectDetails',
  //region Md_Agency
  GetAllAgency: environment.apiURL + 'Agency/GetAll',
  MdAgency_Delete: environment.apiURL + "Agency/Delete?AgencyId=",
  MdAgency_Insert: environment.apiURL + "Agency/Import?AgencyId=",
  //regionend Md_Agency
  ZmstServiceType: environment.apiURL + 'ZmstServiceType/GetAll',
  ZmstServiceType_ByRequestNo: environment.apiURL + 'ZmstServiceType/GetByRequestNo?requestNo=',


  DocumentByRequestId: environment.apiURL + 'AppDocumentUploadedDetail/GetDocumentByRequestId',
  DocumentByDocType: environment.apiURL + 'AppDocumentUploadedDetail/GetDocumentByDocType',

  deleteByDocumentId: environment.apiURL + 'AppDocumentUploadedDetail/DeleteByDocumentId?id=',

  //Region Md Document Type
  GetAllDocumentType: environment.apiURL + 'MdDocumentType/GetAll',
  GetDocumentTypeByRoleId: environment.apiURL + 'MdDocumentType/GetByRole?Role=',
  //Regionend Md Document Type 


  ZmstProject: environment.apiURL + 'ZmstProject/GetAll',
  savePIdetails: environment.apiURL + 'AppProjectDetails/SavePIDetails',
  UpdateProjectCreation: environment.apiURL + 'AppProjectDetails/UpdateCreation',
 
  ZmstProjectSave: environment.apiURL + 'ZmstProjects/Save',
  ZmstProjectGetbyid: environment.apiURL + 'ZmstProjects/GetByid?projectid=',
  ZmstProjectsGetAll: environment.apiURL + 'ZmstProjects/GetAll',
  MdProjectFinancialComponentGetAll: environment.apiURL + 'MdProjectFinancialComponent/GetAll',

  AppProjectCostSave: environment.apiURL + 'AppProjectsCost/Insert',
  AppProjectCostGetById: environment.apiURL + 'AppProjectsCost/GetById?ProjectId=',
  AppProjectCostDelete: environment.apiURL + 'AppProjectsCost/Delete',
  AppProjectCostUpdate: environment.apiURL + 'AppProjectsCost/Update',
  saveDocuments: environment.apiURL + 'AppDocumentUploadedDetail/Insert',

  Saveprofilephoto: environment.apiURL + 'AppDocumentUploadedDetail/Saveprofilephoto',

  GetDocumentByRequestId: environment.apiURL + 'AppDocumentUploadedDetail/GetByRequestId',
  GetByProjectDetailId: environment.apiURL + 'AppDocumentUploadedDetail/GetByProjectDetailId?id=',
  GetUserDocumentByRequestId: environment.apiURL + 'AppDocumentUploadedDetail/GetByRequestId?appDocFilter=',
  SaveDocumetAndUpdateStatus: environment.apiURL + 'AppDocumentUploadedDetail/InsertAndUpdateActivityStatus',

  ZmstProjectUpdate: environment.apiURL + 'ZmstProjects/Update',
  getModuleListByUserId: environment.apiURL + 'MDModule/GetByUserId?userId=',

  ZmstProjectDelete: environment.apiURL + 'ZmstProjects/Delete?projectid=',
  userDetail: environment.apiURL + 'AppOnboardingAdminLogin/GetByUserId?userId=',
  //# Change Password start
  changePassword_Insert: environment.apiURL + 'AppOnboardingAdminLogin/UpdatePasswordByUaserid?confirmPassword=',
  // Change Password start

  //#region ( Md_District)
  District: environment.apiURL + 'MdDistrict/GetListByStateId?StateId=',
  MdDistrict_GetAll: environment.apiURL + 'MdDistrict/GetAll',
  //MdDistrict_GetById: environment.apiURL + 'MdDistrict/GetById',
  MdDistrict_Insert: environment.apiURL + 'MdDistrict/Insert',
  MdDistrict_Update: environment.apiURL + 'MdDistrict/Update',
  MdDistrict_Delete: environment.apiURL + 'MdDistrict/Delete?Id=',
  //#endregion( Md_District)


  //#region MD_Organization
  MdOrganization_Insert: environment.apiURL + 'MdOrganization/Insert',
  MdOrganization_Update: environment.apiURL + 'MdOrganization/Update',
  MdOrganization_Delete: environment.apiURL + 'MdOrganization/Delete?OrganizationId=',
  MdOrganization_GetAll: environment.apiURL + 'MdOrganization/GetAll',
  MdOrganization_GetById: environment.apiURL + 'MdOrganization/GetById',
  //#regionend MD_Organization
  UserMenu: environment.apiURL + 'AppDocumentUploadedDetail/UserMenuByRequestId?requestId=',
  DocumentById: environment.apiURL + "AppDocumentUploadedDetail/GetById?Id=",
  ModuleRefId: environment.apiURL + "AppDocumentUploadedDetail/ModuleRefId",
  //#region Zmst_Country
  ZmstCountry_Insert: environment.apiURL + 'ZmstCountry/Insert',
  ZmstCountry_Update: environment.apiURL + 'ZmstCountry/Update',
  ZmstCountry_Delete: environment.apiURL + 'ZmstCountry/Delete?Code=',
    ZmstCountry_GetAll: environment.apiURL + 'ZmstCountry/GetAll',
  ZmstCountry_GetById: environment.apiURL + 'ZmstCountry/GetById',
  //#endregion Zmst_Country

  //#region ValidationTest
  ValidationTest_Insert: environment.apiURL + 'ValidationTest/Insert',
  ValidationTest_Update: environment.apiURL + 'ValidationTest/Update',
  ValidationTest_Delete: environment.apiURL + 'ValidationTest/Delete?id=',
  ValidationTest_GetAll: environment.apiURL + 'ValidationTest/GetAll',
  ValidationTest_GetById: environment.apiURL + 'ValidationTest/GetById',
  //#endregion ValidationTest

  //#region MD_SmsEmailTemplate
  MdSmsEmailTemplate_Insert: environment.apiURL + 'MdSmsEmailTemplate/Insert',
  MdSmsEmailTemplate_Update: environment.apiURL + 'MdSmsEmailTemplate/Update',
  MdSmsEmailTemplate_Delete: environment.apiURL + 'MdSmsEmailTemplate/Delete?TemplateId=',
  MdSmsEmailTemplate_GetAll: environment.apiURL + 'MdSmsEmailTemplate/GetAll',
  MdSmsEmailTemplate_GetById: environment.apiURL + 'MdSmsEmailTemplate/GetById',
  //#endregion MD_SmsEmailTemplate

  //#region (StatusCount)
  AppOnBoardingStstusCount: environment.apiURL + 'AppOnboardingRequest/GetStatusCount',
  //#endregion(StatusCount)
  //#region MD_State
  MdState_Insert: environment.apiURL + "MdState/Insert",
  MdState_Update: environment.apiURL + "MdState/Update?Id=",
  MdState_Delete: environment.apiURL + "MdState/Delete?Id=",
  MdState_GetAll: environment.apiURL + "MdState/GetAll",
  MdState_GetById: environment.apiURL + "MdState/GetById?Id=",
  //#regionend MD_State

  //Region State Controller
  State: environment.apiURL + 'State/GetAll',
  //Regionend State Controller

  Emailverification: environment.apiURL + 'AppOnboardingAdminLogin/SendForgotPasswordMail?requestId=',
  EmailResendverification: environment.apiURL + 'AppOnboardingAdminLogin/SendPasswordMail',
  ResetPassword: environment.apiURL + 'AppOnboardingAdminLogin/UpdatePassword',
  GetSalt: environment.apiURL + 'AppOnboardingAdminLogin/GetSalt',
  GetCaptcha: environment.apiURL + 'AppOnboardingAdminLogin/GetCaptcha',
  logout: environment.apiURL + 'AppOnboardingAdminLogin/LogOut',
  GetIP: environment.apiURL + 'AppOnboardingAdminLogin/GetIP',

  //#region ApplicationSummary
  ApplicationSummary_GetAll: environment.apiURL + 'ApplicationSummary/GetAll',
  ApplicationSummary_Delete: environment.apiURL + 'ApplicationSummary/Delete?Id=',
  ApplicationSummaryInsert: environment.apiURL + 'ApplicationSummary/Insert',
  ApplicationSummary_Update: environment.apiURL + 'ApplicationSummary/Update',
  ApplicationSummary_UpdateAll: environment.apiURL + 'ApplicationSummary/UpdateAll',

  ApplicationSummary_GetAllRegistrationList: environment.apiURL + 'ApplicationSummary/GetAllRegistrationList',
  ApplicationSummary_UpdateExamManagement: environment.apiURL + 'ApplicationSummary/UpdateExamManagementService',
  ApplicationSummary_UpdateAllExamManagement: environment.apiURL + 'ApplicationSummary/UpdateAllExamManagementService',
  ApplicationSumary_GetByCounsAppType: environment.apiURL + 'ApplicationSummary/GetAppSummaryByCouns',
  ApplicationSumary_GetByRegistAppType: environment.apiURL + 'ApplicationSummary/GetAppSummaryByRegst',
  //#regionend ApplicationSummary

  //#region ApplicationSchedule
  AppScheduleGetAll: environment.apiURL + 'ApplicationSchedule/GetAll',
  AppActivities: environment.apiURL + 'ApplicationSchedule/GetAllActivity',
  GetByActivityId: environment.apiURL + 'ApplicationSchedule/GetByActivityId',
  //#regionend ApplicationSchedule



  GetDaywiseRegistrationBetweenDates: environment.apiURL + 'DaywiseRegistration/GetAll',


  //#regionend DayWise Registration
  getSchedule:
    environment.apiURL + 'ApplicationSchedule/GetByProjectId',

  //#region ZMST_Agency
  ZmstAgency_Insert: environment.apiURL + "ZmstAgency/Insert",
  ZmstAgency_Update: environment.apiURL + "ZmstAgency/Update",
  ZmstAgency_Delete: environment.apiURL + "ZmstAgency/Delete?AgencyId=",
  ZmstAgency_GetAll: environment.apiURL + "ZmstAgency/GetAll",
  ZmstAgency_GetById: environment.apiURL + "ZmstAgency/GetById?AgencyId=",
  //#regionend ZMST_Agency,

  //#region Zmst_AgencyExamCouns
  ZmstAgencyExamCoun: environment.apiURL + 'ZmstAgencyExamCouns/Getbyid?agencyid=',
  ZmstAgencyExamCouns_Insert: environment.apiURL + "ZmstAgencyExamCouns/Insert",
  ZmstAgencyExamCouns_Update: environment.apiURL + "ZmstAgencyExamCouns/Update",
  ZmstAgencyExamCouns_Delete: environment.apiURL + "ZmstAgencyExamCouns/Delete?AgencyId=",
  ZmstAgencyExamCouns_GetAll: environment.apiURL + "ZmstAgencyExamCouns/GetAll",
  ZmstAgencyExamCouns_GetById: environment.apiURL + "ZmstAgencyExamCouns/GetById?AgencyId=",

  //#regionend Zmst_AgencyExamCouns

  //#region WorkOrderDetails
  WorkOrderDetails_Insert: environment.apiURL + "WorkOrderDetails/Insert",
  WorkOrderDetails_Update: environment.apiURL + "WorkOrderDetails/Update",
  WorkOrderDetails_Delete: environment.apiURL + "WorkOrderDetails/Delete?WorkorderId=",
  WorkOrderDetails_GetAll: environment.apiURL + "WorkOrderDetails/GetAll",

  WorkOrderDetails_GetactiveworkOrderAll: environment.apiURL + "WorkOrderDetails/GetactiveworkOrderAll",


  WorkOrderDetails_GetById: environment.apiURL + "WorkOrderDetails/GetById?WorkorderId=",
  WorkOrderDetails_GetByProjectCode: environment.apiURL + "WorkOrderDetails/GetByProjectCode?projectCode=",
  WorkOrderDetails_GetByRequestId: environment.apiURL + "AppDocumentUploadedDetail/GetDocumentByRequestId",

  //#regionend WorkOrderDetails

  //#region MD_WorkOrderAgency
  MdWorkOrderAgency_Insert: environment.apiURL + "MdWorkOrderAgency/Insert",
  MdWorkOrderAgency_Update: environment.apiURL + "MdWorkOrderAgency/Update",
  MdWorkOrderAgency_Delete: environment.apiURL + "MdWorkOrderAgency/Delete?Id=",
  MdWorkOrderAgency_GetAll: environment.apiURL + "MdWorkOrderAgency/GetAll",
  MdWorkOrderAgency_GetById: environment.apiURL + "MdWorkOrderAgency/GetById?Id=",
  //#regionend MD_WorkOrderAgency

  //#region EmployeeDetails
  EmployeeDetails_Insert: environment.apiURL + "EmployeeDetails/Insert",
  EmployeeDetails_Update: environment.apiURL + "EmployeeDetails/Update",
  EmployeeDetails_Delete: environment.apiURL + "EmployeeDetails/Delete?EmpId=",
  EmployeeDetails_GetAll: environment.apiURL + "EmployeeDetails/GetAll",
  EmployeeDetails_GetAllEmployee: environment.apiURL + "EmployeeDetails/GetAllEmpDetails",
  EmployeeDetails_GetById: environment.apiURL + "EmployeeDetails/GetById?EmpId=",
  EmployeeDetails_ExamByCode: environment.apiURL + "EmployeeDetails/GetById?examCode=",
  EmployeeDetails_GetByEmpCode: environment.apiURL + "EmployeeDetails/GetByEmployeeCode?EmpCode=",
  EmployeeDetails_AdvanceSearchGetAll: environment.apiURL + "EmployeeDetails/AdvanceSearch",
  //#regionend EmployeeDetails
  //#region employeeWorkOrder
  employeeWorkOrder_Insert: environment.apiURL + "employeeWorkOrder/Insert",
  employeeWorkOrder_Update: environment.apiURL + "EmployeeWorkOrder/Update",
  employeeWorkOrder_Delete: environment.apiURL + "employeeWorkOrder/Delete",
  employeeWorkOrder_GetAll: environment.apiURL + "employeeWorkOrder/GetAll",
  employeeWorkOrder_GetById: environment.apiURL + "employeeWorkOrder/GetById?EmpCode=",
  employeeWorkOrder_GetByEmpCode: environment.apiURL + "employeeWorkOrder/GetByEmpCode?EmpCode=",
  //#regionend employeeWorkOrder

  //#region qualificationDetails
  qualificationDetails_Insert: environment.apiURL + "qualificationDetails/Insert",
  qualificationDetails_Update: environment.apiURL + "qualificationDetails/Update",
  qualificationDetails_Delete: environment.apiURL + "qualificationDetails/Delete?QualificationDetailsId=",
  qualificationDetails_GetAll: environment.apiURL + "qualificationDetails/GetAll",
  qualificationDetails_GetById: environment.apiURL + "QualificationDetails/GetById?examCode=",
  //#regionend qualificationDetails
  ESSOService_GetById: environment.apiURL + "ExtEndPoint/GetById?id=",
  ESSOService_Logout: environment.apiURL + "ExtEndPoint/Logout",
  //#region MD_IdType
  MdIdType_Insert: environment.apiURL + "MdIdType/Insert",
  MdIdType_Update: environment.apiURL + "MdIdType/Update",
  MdIdType_Delete: environment.apiURL + "MdIdType/Delete?Id=",
  MdIdType_GetAll: environment.apiURL + "MdIdType/GetAll",
  MdIdType_GetById: environment.apiURL + "MdIdType/GetById?Id=",
  //#regionend MD_IdType

  //#region MD_EmpStatus
  MdEmpStatus_Insert: environment.apiURL + "MdEmpStatus/Insert",
  MdEmpStatus_Update: environment.apiURL + "MdEmpStatus/Update",
  MdEmpStatus_Delete: environment.apiURL + "MdEmpStatus/Delete?Id=",
  MdEmpStatus_GetAll: environment.apiURL + "MdEmpStatus/GetAll",
  MdEmpStatus_GetById: environment.apiURL + "MdEmpStatus/GetById?Id=",
  //#regionend MD_EmpStatus

  //#region MD_Exam
  MD_Exam: environment.apiURL + 'MdExam/GetAll',
  //#regionend MD_Exam

  //#region MdExamType
  GetAllExamType: environment.apiURL + 'MdExamType/GetAll',
  //#regionend MdExamType

  //#region willingness
  ZmstWillingness_GetAll: environment.apiURL + 'ZmstWillingness/GetAll',
  ZmstWillingness_Insert: environment.apiURL + 'ZmstWillingness/Insert',
  ZmstWillingness_Update: environment.apiURL + 'ZmstWillingness/Update',
  ZmstWillingness_Delete: environment.apiURL + 'ZmstWillingness/Delete?Id=',
  //#regionend willingness

  //#region ZmstSubject
  ZmstSubject_GetAll: environment.apiURL + 'ZmstSubject/GetAll',
  ZmstSubject_Insert: environment.apiURL + 'ZmstSubject/Insert',
  ZmstSubject_Update: environment.apiURL + 'ZmstSubject/Update',
  ZmstSubject_Delete: environment.apiURL + 'ZmstSubject/Delete?Id=',
  //#regionend  ZmstSubject

  //#region ZmstQuota
  ZmstQuota_GetAll: environment.apiURL + 'ZmstQuota/GetAll',
  ZmstQuota_Insert: environment.apiURL + 'ZmstQuota/Insert',
  ZmstQuota_Update: environment.apiURL + 'ZmstQuota/Update',
  ZmstQuota_Delete: environment.apiURL + 'ZmstQuota/Delete?QuotaId=',
  //#regionend  ZmstQuota

  //#region ZmstRankType
  ZmstRankType_GetAll: environment.apiURL + 'ZmstRankType/GetAll',
  ZmstRankType_Insert: environment.apiURL + 'ZmstRankType/Insert',
  ZmstRankType_Update: environment.apiURL + 'ZmstRankType/Update',
  ZmstRankType_Delete: environment.apiURL + 'ZmstRankType/Delete?Id=',
  //#regionend  ZmstRankType

  //#region ZmstRiligion
  ZmstRiligion_GetAll: environment.apiURL + 'ZmstReligion/GetAll',
  ZmstRiligion_Insert: environment.apiURL + 'ZmstReligion/Insert',
  ZmstRiligion_Update: environment.apiURL + 'ZmstReligion/Update',
  ZmstRiligion_Delete: environment.apiURL + 'ZmstReligion/Delete?ReligionId=',
  //#regionend  ZmstRiligion

  //#region ZmstResidentialEligibility
  ZmstResidentialEligibility_GetAll: environment.apiURL + 'ZmstResidentialEligibility/GetAll',
  ZmstResidentialEligibility_Insert: environment.apiURL + 'ZmstResidentialEligibility/Insert',
  ZmstResidentialEligibility_Update: environment.apiURL + 'ZmstResidentialEligibility/Update',
  ZmstResidentialEligibility_Delete: environment.apiURL + 'ZmstResidentialEligibility/Delete?residentialeligibilityid=',
  //#regionend ZmstResidentialEligibility

  //#region  ZmstSeatCategory
  ZmstSeatCategory_GetAll: environment.apiURL + 'ZmstSeatCategory/GetAll',
  ZmstSeatCategory_Insert: environment.apiURL + 'ZmstSeatCategory/Insert',
  ZmstSeatCategory_Update: environment.apiURL + 'ZmstSeatCategory/Update',
  ZmstSeatCategory_Delete: environment.apiURL + 'ZmstSeatCategory/Delete?seatcategoryid=',
  //#regionend  ZmstSeatCategory

  //#region ZmstSeatGender
  ZmstSeatGender_GetAll: environment.apiURL + 'ZmstSeatGender/GetAll',
  ZmstSeatGender_Insert: environment.apiURL + 'ZmstSeatGender/Insert',
  ZmstSeatGender_Update: environment.apiURL + 'ZmstSeatGender/Update',
  ZmstSeatGender_Delete: environment.apiURL + 'ZmstSeatGender/Delete?seatgenderid=',
  //#regionend ZmstSeatGender

  //#region ZmstSpecialExamPaper
  ZmstSpecialExamPaper_GetAll: environment.apiURL + 'ZmstSpecialExamPaper/GetAll',
  ZmstSpecialExamPaper_Insert: environment.apiURL + 'ZmstSpecialExamPaper/Insert',
  ZmstSpecialExamPaper_Update: environment.apiURL + 'ZmstSpecialExamPaper/Update',
  ZmstSpecialExamPaper_Delete: environment.apiURL + 'ZmstSpecialExamPaper/Delete?Id=',
  //#regionend ZmstSpecialExamPaper

  //#region ZmstStream
  ZmstStream_GetAll: environment.apiURL + 'ZmstStream/GetAll',
  ZmstStream_Insert: environment.apiURL + 'ZmstStream/Insert',
  ZmstStream_Update: environment.apiURL + 'ZmstStream/Update',
  ZmstStream_Delete: environment.apiURL + 'ZmstStream/Delete?StreamId=',
  ZmstStream_ByInstCd: environment.apiURL + 'ZmstStream/GetlistByInstcd?instcd=',
  //#regionend ZmstStream

  //#region ZmstSubCategory
  ZmstSubCategory_GetAll: environment.apiURL + 'ZmstSubCategory/GetAll',
  ZmstSubCategory_Insert: environment.apiURL + 'ZmstSubCategory/Insert',
  ZmstSubCategory_Update: environment.apiURL + 'ZmstSubCategory/Update',
  ZmstSubCategory_Delete: environment.apiURL + 'ZmstSubCategory/Delete?subcategoryid=',
  //#regionend ZmstSubCategory

  //#region ZmstSymbol
  ZmstSymbol_GetAll: environment.apiURL + 'ZmstSymbol/GetAll',
  ZmstSymbol_Insert: environment.apiURL + 'ZmstSymbol/Insert',
  ZmstSymbol_Update: environment.apiURL + 'ZmstSymbol/Update',
  ZmstSymbol_Delete: environment.apiURL + 'ZmstSymbol/Delete?SymbolId=',
  //#regionend ZmstSymbol

  //#region ZmstTypeofDisability
  ZmstTypeofDisability_GetAll: environment.apiURL + 'ZmstTypeofDisability/GetAll',
  ZmstTypeofDisability_Insert: environment.apiURL + 'ZmstTypeofDisability/Insert',
  ZmstTypeofDisability_Update: environment.apiURL + 'ZmstTypeofDisability/Update',
  ZmstTypeofDisability_Delete: environment.apiURL + 'ZmstTypeofDisability/Delete?Id=',
  //#regionend ZmstTypeofDisability

  //#region Zmst_Branch
  ZmstBranch_Insert: environment.apiURL + "ZmstBranch/Insert",
  ZmstBranch_Update: environment.apiURL + "ZmstBranch/Update",
  ZmstBranch_Delete: environment.apiURL + "ZmstBranch/Delete?BrCd=",
  ZmstBranch_GetAll: environment.apiURL + "ZmstBranch/GetAll",
  ZmstBranch_GetById: environment.apiURL + "ZmstBranch/GetById?BrCd=",
  //#regionend Zmst_Branch

  //#region ZMst_Category
  ZmstCategory_Insert: environment.apiURL + "ZmstCategory/Insert",
  ZmstCategory_Update: environment.apiURL + "ZmstCategory/Update",
  ZmstCategory_Delete: environment.apiURL + "ZmstCategory/Delete?CategoryId=",
  ZmstCategory_GetAll: environment.apiURL + "ZmstCategory/GetAll",
  ZmstCategory_GetById: environment.apiURL + "ZmstCategory/GetById?CategoryId=",
  //#regionend ZMst_Category

  //#region ZMst_CourseApplied
  ZmstCourseApplied_Insert: environment.apiURL + "ZmstCourseApplied/Insert",
  ZmstCourseApplied_Update: environment.apiURL + "ZmstCourseApplied/Update",
  ZmstCourseApplied_Delete: environment.apiURL + "ZmstCourseApplied/Delete?CourseId=",
  ZmstCourseApplied_GetAll: environment.apiURL + "ZmstCourseApplied/GetAll",
  ZmstCourseApplied_GetById: environment.apiURL + "ZmstCourseApplied/GetById?CourseId=",
  //#regionend ZMst_CourseApplied

  //#region Zmst_CourseAppliedLevel
  ZmstCourseAppliedLevel_Insert: environment.apiURL + "ZmstCourseAppliedLevel/Insert",
  ZmstCourseAppliedLevel_Update: environment.apiURL + "ZmstCourseAppliedLevel/Update",
  ZmstCourseAppliedLevel_Delete: environment.apiURL + "ZmstCourseAppliedLevel/Delete?CourseLevelId=",
  ZmstCourseAppliedLevel_GetAll: environment.apiURL + "ZmstCourseAppliedLevel/GetAll",
  ZmstCourseAppliedLevel_GetById: environment.apiURL + "ZmstCourseAppliedLevel/GetById?CourseLevelId=",
  //#regionend Zmst_CourseAppliedLevel

  //#region Zmst_DocumentType
  ZmstDocumentType_Insert: environment.apiURL + "ZmstDocumentType/Insert",
  ZmstDocumentType_Update: environment.apiURL + "ZmstDocumentType/Update",
  ZmstDocumentType_Delete: environment.apiURL + "ZmstDocumentType/Delete?DocumentTypeId=",
  ZmstDocumentType_GetAll: environment.apiURL + "ZmstDocumentType/GetAll",
  ZmstDocumentType_GetById: environment.apiURL + "ZmstDocumentType/GetById?DocumentTypeId=",
  //#regionend Zmst_DocumentType

  //#region Zmst_FeeType
  ZmstFeeType_Insert: environment.apiURL + "ZmstFeeType/Insert",
  ZmstFeeType_Update: environment.apiURL + "ZmstFeeType/Update",
  ZmstFeeType_Delete: environment.apiURL + "ZmstFeeType/Delete?ActivityId=",
  ZmstFeeType_GetAll: environment.apiURL + "ZmstFeeType/GetAll",
  ZmstFeeType_GetById: environment.apiURL + "ZmstFeeType/GetById?ActivityId=",
  //#regionend Zmst_FeeType

  //#region Zmst_Gender
  ZmstGender_Insert: environment.apiURL + "ZmstGender/Insert",
  ZmstGender_Update: environment.apiURL + "ZmstGender/Update",
  ZmstGender_Delete: environment.apiURL + "ZmstGender/Delete?GenderId=",
  ZmstGender_GetAll: environment.apiURL + "ZmstGender/GetAll",
  ZmstGender_GetById: environment.apiURL + "ZmstGender/GetById?GenderId=",
  //#regionend Zmst_Gender

  //#region Zmst_IdentityType
  ZmstIdentityType_Insert: environment.apiURL + "ZmstIdentityType/Insert",
  ZmstIdentityType_Update: environment.apiURL + "ZmstIdentityType/Update",
  ZmstIdentityType_Delete: environment.apiURL + "ZmstIdentityType/Delete?IdentityTypeId=",
  ZmstIdentityType_GetAll: environment.apiURL + "ZmstIdentityType/GetAll",
  ZmstIdentityType_GetById: environment.apiURL + "ZmstIdentityType/GetById?IdentityTypeId=",
  //#regionend Zmst_IdentityType

  //#region Zmst_MinimumQualification
  ZmstMinimumQualification_Insert: environment.apiURL + "ZmstMinimumQualification/Insert",
  ZmstMinimumQualification_Update: environment.apiURL + "ZmstMinimumQualification/Update",
  ZmstMinimumQualification_Delete: environment.apiURL + "ZmstMinimumQualification/Delete?MinimumQualId=",
  ZmstMinimumQualification_GetAll: environment.apiURL + "ZmstMinimumQualification/GetAll",
  ZmstMinimumQualification_GetById: environment.apiURL + "ZmstMinimumQualification/GetById?MinimumQualId=",
  //#regionend Zmst_MinimumQualification

  //#region Zmst_Nationality
  ZmstNationality_Insert: environment.apiURL + "ZmstNationality/Insert",
  ZmstNationality_Update: environment.apiURL + "ZmstNationality/Update",
  ZmstNationality_Delete: environment.apiURL + "ZmstNationality/Delete?NationalityId=",
  ZmstNationality_GetAll: environment.apiURL + "ZmstNationality/GetAll",
  ZmstNationality_GetById: environment.apiURL + "ZmstNationality/GetById?NationalityId=",
  //#regionend Zmst_Nationality

  //#region Zmst_PassingStatus
  ZmstPassingStatus_Insert: environment.apiURL + "ZmstPassingStatus/Insert",
  ZmstPassingStatus_Update: environment.apiURL + "ZmstPassingStatus/Update",
  ZmstPassingStatus_Delete: environment.apiURL + "ZmstPassingStatus/Delete?PassingStatusId=",
  ZmstPassingStatus_GetAll: environment.apiURL + "ZmstPassingStatus/GetAll",
  ZmstPassingStatus_GetById: environment.apiURL + "ZmstPassingStatus/GetById?PassingStatusId=",
  //#regionend Zmst_PassingStatus

  //#region Zmst_Projects
  ZmstProjects_Insert: environment.apiURL + "ZmstProjects/Insert",
  ZmstProjects_Update: environment.apiURL + "ZmstProjects/Update",
  ZmstProjects_Delete: environment.apiURL + "ZmstProjects/Delete?projectid=",
  ZmstProjects_GetAll: environment.apiURL + "ZmstProjects/GetAll",
  ZmstProjects_GetById: environment.apiURL + "ZmstProjects/GetById?projectid=",
  ZmstProjects_GetByAgencyId: environment.apiURL + "ZmstProjects/GetByAgencyId",
  //#regionend Zmst_Projects

  //#region Zmst_Qualification
  ZmstQualification_Insert: environment.apiURL + "ZmstQualification/Insert",
  ZmstQualification_Update: environment.apiURL + "ZmstQualification/Update",
  ZmstQualification_Delete: environment.apiURL + "ZmstQualification/Delete?QualificationId=",
  ZmstQualification_GetAll: environment.apiURL + "ZmstQualification/GetAll",
  ZmstQualification_GetById: environment.apiURL + "ZmstQualification/GetById?QualificationId=",
  //#regionend Zmst_Qualification

  //#region ZMst_QualifyingCourse
  ZmstQualifyingCourse_Insert: environment.apiURL + "ZmstQualifyingCourse/Insert",
  ZmstQualifyingCourse_Update: environment.apiURL + "ZmstQualifyingCourse/Update",
  ZmstQualifyingCourse_Delete: environment.apiURL + "ZmstQualifyingCourse/Delete?QualificationCourseId=",
  ZmstQualifyingCourse_GetAll: environment.apiURL + "ZmstQualifyingCourse/GetAll",
  ZmstQualifyingCourse_GetById: environment.apiURL + "ZmstQualifyingCourse/GetById?QualificationCourseId=",
  //#regionend ZMst_QualifyingCourse

  //#region ZMst_QualifyingExam
  ZmstQualifyingExam_Insert: environment.apiURL + "ZmstQualifyingExam/Insert",
  ZmstQualifyingExam_Update: environment.apiURL + "ZmstQualifyingExam/Update",
  ZmstQualifyingExam_Delete: environment.apiURL + "ZmstQualifyingExam/Delete?QualifyingExamId=",
  ZmstQualifyingExam_GetAll: environment.apiURL + "ZmstQualifyingExam/GetAll",
  ZmstQualifyingExam_GetById: environment.apiURL + "ZmstQualifyingExam/GetById?QualifyingExamId=",
  //#regionend ZMst_QualifyingExam

  //#region Zmst_QualifyingExamBoard
  ZmstQualifyingExamBoard_Insert: environment.apiURL + "ZmstQualifyingExamBoard/Insert",
  ZmstQualifyingExamBoard_Update: environment.apiURL + "ZmstQualifyingExamBoard/Update",
  ZmstQualifyingExamBoard_Delete: environment.apiURL + "ZmstQualifyingExamBoard/Delete?Id=",
  ZmstQualifyingExamBoard_GetAll: environment.apiURL + "ZmstQualifyingExamBoard/GetAll",
  ZmstQualifyingExamBoard_GetById: environment.apiURL + "ZmstQualifyingExamBoard/GetById?Id=",
  //#regionend Zmst_QualifyingExamBoard

  //#region Zmst_QualifyingExamFrom
  ZmstQualifyingExamFrom_Insert: environment.apiURL + "ZmstQualifyingExamFrom/Insert",
  ZmstQualifyingExamFrom_Update: environment.apiURL + "ZmstQualifyingExamFrom/Update",
  ZmstQualifyingExamFrom_Delete: environment.apiURL + "ZmstQualifyingExamFrom/Delete?QualExamFromId=",
  ZmstQualifyingExamFrom_GetAll: environment.apiURL + "ZmstQualifyingExamFrom/GetAll",
  ZmstQualifyingExamFrom_GetById: environment.apiURL + "ZmstQualifyingExamFrom/GetById?QualExamFromId=",
  //#regionend Zmst_QualifyingExamFrom

  //#region Zmst_QualifyingExamLearningMode
  ZmstQualifyingExamLearningMode_Insert: environment.apiURL + "ZmstQualifyingExamLearningMode/Insert",
  ZmstQualifyingExamLearningMode_Update: environment.apiURL + "ZmstQualifyingExamLearningMode/Update",
  ZmstQualifyingExamLearningMode_Delete: environment.apiURL + "ZmstQualifyingExamLearningMode/Delete?Id=",
  ZmstQualifyingExamLearningMode_GetAll: environment.apiURL + "ZmstQualifyingExamLearningMode/GetAll",
  ZmstQualifyingExamLearningMode_GetById: environment.apiURL + "ZmstQualifyingExamLearningMode/GetById?Id=",
  //#regionend Zmst_QualifyingExamLearningMode

  //#region Zmst_QualifyingExamResultMode
  ZmstQualifyingExamResultMode_Insert: environment.apiURL + "ZmstQualifyingExamResultMode/Insert",
  ZmstQualifyingExamResultMode_Update: environment.apiURL + "ZmstQualifyingExamResultMode/Update",
  ZmstQualifyingExamResultMode_Delete: environment.apiURL + "ZmstQualifyingExamResultMode/Delete?Id=",
  ZmstQualifyingExamResultMode_GetAll: environment.apiURL + "ZmstQualifyingExamResultMode/GetAll",
  ZmstQualifyingExamResultMode_GetById: environment.apiURL + "ZmstQualifyingExamResultMode/GetById?Id=",
  //#regionend Zmst_QualifyingExamResultMode

  //#region Zmst_QualifyingExamStream
  ZmstQualifyingExamStream_Insert: environment.apiURL + "ZmstQualifyingExamStream/Insert",
  ZmstQualifyingExamStream_Update: environment.apiURL + "ZmstQualifyingExamStream/Update",
  ZmstQualifyingExamStream_Delete: environment.apiURL + "ZmstQualifyingExamStream/Delete?QualStreamId=",
  ZmstQualifyingExamStream_GetAll: environment.apiURL + "ZmstQualifyingExamStream/GetAll",
  ZmstQualifyingExamStream_GetById: environment.apiURL + "ZmstQualifyingExamStream/GetById?QualStreamId=",
  //#regionend Zmst_QualifyingExamStream

  //#region ZMst_QuesPaper
  ZmstQuesPaper_Insert: environment.apiURL + "ZmstQuesPaper/Insert",
  ZmstQuesPaper_Update: environment.apiURL + "ZmstQuesPaper/Update",
  ZmstQuesPaper_Delete: environment.apiURL + "ZmstQuesPaper/Delete?PaperId=",
  ZmstQuesPaper_GetAll: environment.apiURL + "ZmstQuesPaper/GetAll",
  ZmstQuesPaper_GetById: environment.apiURL + "ZmstQuesPaper/GetById?PaperId=",
  //#regionend ZMst_QuesPaper

  //#region ZMst_QuestionPaperMedium
  ZmstQuestionPaperMedium_Insert: environment.apiURL + "ZmstQuestionPaperMedium/Insert",
  ZmstQuestionPaperMedium_Update: environment.apiURL + "ZmstQuestionPaperMedium/Update",
  ZmstQuestionPaperMedium_Delete: environment.apiURL + "ZmstQuestionPaperMedium/Delete?MediumId=",
  ZmstQuestionPaperMedium_GetAll: environment.apiURL + "ZmstQuestionPaperMedium/GetAll",
  ZmstQuestionPaperMedium_GetById: environment.apiURL + "ZmstQuestionPaperMedium/GetById?MediumId=",
  //#regionend ZMst_QuestionPaperMedium

  ZmstProgram: environment.apiURL + "ZmstProgram/Insert",
  ZmstProgram_DownLoad: environment.apiURL + 'ZmstProgram/Download',
  ZmstProgram_GetAll: environment.apiURL + 'ZmstProgram/GetAll',

  //#region Zmst_Institute
  ZmstInstitute_Insert: environment.apiURL + "ZmstInstitute/Insert",
  ZmstInstitute_Update: environment.apiURL + "ZmstInstitute/Update",
  ZmstInstitute_Delete: environment.apiURL + "ZmstInstitute/Delete?InstCd=",
  ZmstInstitute_GetAll: environment.apiURL + "ZmstInstitute/GetAll",
  ZmstInstitute_GetById: environment.apiURL + "ZmstInstitute/GetById?InstCd=",
  ZmstInstituet_GetListByIds: environment.apiURL + "ZmstInstitute/GetAllByIds",
  ZmstInstitute_GetType: environment.apiURL + "ZmstInstitute/GetInstituteStaticse?Type=",
  ZmstInstitute_GetAllCountData: environment.apiURL + "ZmstInstitute/GetAllCountData",
  //#regionend Zmst_Institute

  //#region Zmst_InstituteType
  ZmstInstituteType_Insert: environment.apiURL + "ZmstInstituteType/Insert",
  ZmstInstituteType_Update: environment.apiURL + "ZmstInstituteType/Update",
  ZmstInstituteType_Delete: environment.apiURL + "ZmstInstituteType/Delete?InstituteTypeId=",
  ZmstInstituteType_GetAll: environment.apiURL + "ZmstInstituteType/GetAll",
  ZmstInstituteType_GetById: environment.apiURL + "ZmstInstituteType/GetById?InstituteTypeId=",
  ZmstInstitute_GetMaxInstituteCode: environment.apiURL + 'ZmstInstitute/GetMaxInstituteCode',
  //#regionend Zmst_InstituteType

  //#region Zmst_Trade (By Gagan)
  ZmstTrade_Insert: environment.apiURL + "ZmstTrade/Insert",
  ZmstTrade_Update: environment.apiURL + "ZmstTrade/Update",
  ZmstTrade_Delete: environment.apiURL + "ZmstTrade/Delete?Id=",
  ZmstTrade_GetAll: environment.apiURL + "ZmstTrade/GetAll",
  ZmstTrade_GetById: environment.apiURL + "ZmstTrade/GetById?Id=",
  //#regionend Zmst_Trade

  //#region Zmst_InstituteAgency
  ZmstInstituteAgency_Insert: environment.apiURL + "ZmstInstituteAgency/Insert",
  ZmstInstituteAgency_Update: environment.apiURL + "ZmstInstituteAgency/Update",
  ZmstInstituteAgency_Delete: environment.apiURL + "ZmstInstituteAgency/Delete?InstCd=",
  ZmstInstituteAgency_GetAll: environment.apiURL + "ZmstInstituteAgency/GetAll",
  ZmstInstituteAgency_GetById: environment.apiURL + "ZmstInstituteAgency/GetById?InstCd=",
  //#regionend Zmst_InstituteAgency

  //#region Zmst_InstituteStream
  ZmstInstituteStream_Insert: environment.apiURL + "ZmstInstituteStream/Insert?instcode=",
  ZmstInstituteStream_Update: environment.apiURL + "ZmstInstituteStream/Update",
  ZmstInstituteStream_Delete: environment.apiURL + "ZmstInstituteStream/Delete?InstCd=",
  ZmstInstituteStream_GetAll: environment.apiURL + "ZmstInstituteStream/GetAll",
  ZmstInstituteStream_GetById: environment.apiURL + "ZmstInstituteStream/GetById?InstCd=",
  //#regionend Zmst_InstituteStream

  //#region Zmst_AgencyVirtualDirectoryMapping
  ZmstAgencyVirtualDirectoryMapping_Insert: environment.apiURL + "ZmstAgencyVirtualDirectoryMapping/Insert",
  ZmstAgencyVirtualDirectoryMapping_Update: environment.apiURL + "ZmstAgencyVirtualDirectoryMapping/Update",
  ZmstAgencyVirtualDirectoryMapping_Delete: environment.apiURL + "ZmstAgencyVirtualDirectoryMapping/Delete?AgencyId=",
  ZmstAgencyVirtualDirectoryMapping_GetAll: environment.apiURL + "ZmstAgencyVirtualDirectoryMapping/GetAll",
  ZmstAgencyVirtualDirectoryMapping_GetById: environment.apiURL + "ZmstAgencyVirtualDirectoryMapping/GetById?AgencyId=",
  //#regionend Zmst_AgencyVirtualDirectoryMapping



  //#region ZMst_Activity (By Gagan)
  ZmstActivity_Insert: environment.apiURL + "ZmstActivity/Insert",
  ZmstActivity_Update: environment.apiURL + "ZmstActivity/Update",
  ZmstActivity_Delete: environment.apiURL + "ZmstActivity/Delete?ActivityId=",
  ZmstActivity_GetAll: environment.apiURL + "ZmstActivity/GetAll",
  ZmstActivity_GetById: environment.apiURL + "ZmstActivity/GetById?ActivityId=",
  //#regionend ZMst_Activity

  //#region ZMst_ApplicantType (By Gagan)
  ZmstApplicantType_Insert: environment.apiURL + "ZmstApplicantType/Insert",
  ZmstApplicantType_Update: environment.apiURL + "ZmstApplicantType/Update",
  ZmstApplicantType_Delete: environment.apiURL + "ZmstApplicantType/Delete?ID=",
  ZmstApplicantType_GetAll: environment.apiURL + "ZmstApplicantType/GetAll",
  ZmstApplicantType_GetById: environment.apiURL + "ZmstApplicantType/GetById?ID=",
  //#regionend ZMst_ApplicantType


  //#region Zmst_SubCategoryPriority (By Gagan)
  ZmstSubCategoryPriority_Insert: environment.apiURL + "ZmstSubCategoryPriority/Insert",
  ZmstSubCategoryPriority_Update: environment.apiURL + "ZmstSubCategoryPriority/Update",
  ZmstSubCategoryPriority_Delete: environment.apiURL + "ZmstSubCategoryPriority/Delete?SubCategoryPriorityId=",
  ZmstSubCategoryPriority_GetAll: environment.apiURL + "ZmstSubCategoryPriority/GetAll",
  ZmstSubCategoryPriority_GetById: environment.apiURL + "ZmstSubCategoryPriority/GetById?SubCategoryPriorityId=",
  //#regionend Zmst_SubCategoryPriority

  //#region Zmst_ServiceType (By Gagan)
  ZmstServiceType_Insert: environment.apiURL + "ZmstServiceType/Insert",
  ZmstServiceType_Update: environment.apiURL + "ZmstServiceType/Update",
  ZmstServiceType_Delete: environment.apiURL + "ZmstServiceType/Delete?ServiceTypeId=",
  ZmstServiceType_GetAll: environment.apiURL + "ZmstServiceType/GetAll",
  ZmstServiceType_GetById: environment.apiURL + "ZmstServiceType/GetById?ServiceTypeId=",
  //#regionend Zmst_ServiceType

  //#region Zmst_ExamType (By Gagan)
  ZmstExamType_Insert: environment.apiURL + "ZmstExamType/Insert",
  ZmstExamType_Update: environment.apiURL + "ZmstExamType/Update",
  ZmstExamType_Delete: environment.apiURL + "ZmstExamType/Delete?Id=",
  ZmstExamType_GetAll: environment.apiURL + "ZmstExamType/GetAll",
  ZmstExamType_GetById: environment.apiURL + "ZmstExamType/GetById?Id=",
  //#regionend Zmst_ExamType

  //#region CGConfigurationControleTest
  CGConfigurationControleTest_Insert: environment.apiURL + "CGConfigurationControleTest/Insert",
  CGConfigurationControleTest_Update: environment.apiURL + "CGConfigurationControleTest/Update",
  CGConfigurationControleTest_Delete: environment.apiURL + "CGConfigurationControleTest/Delete?Id=",
  CGConfigurationControleTest_GetAll: environment.apiURL + "CGConfigurationControleTest/GetAll",
  CGConfigurationControleTest_GetById: environment.apiURL + "CGConfigurationControleTest/GetById?Id=",
  //#regionend CGConfigurationControleTest

  //#region MD_Ministry
  MdMinistry_Insert: environment.apiURL + "Ministry/Insert",
  MdMinistry_Update: environment.apiURL + "Ministry/Update",
  MdMinistry_Delete: environment.apiURL + "Ministry/Delete?ministrytId=",
  MdMinistry_GetAll: environment.apiURL + "Ministry/GetAll",
  MdMinistry_GetById: environment.apiURL + "Ministry/GetById?ministrytId=",
  //#regionend MD_Ministry

  //#region Captcha
  GetCaptchaImage: environment.apiURL + "Captcha/GetCaptchaImage",
  Check_Captcha: environment.apiURL + "Captcha/CheckCaptcha?input=",
  //#regionend Captcha

  //#region Zmst_SeatGroup
  ZmstSeatGroup_Insert: environment.apiURL + "ZmstSeatGroup/Insert",
  ZmstSeatGroup_Update: environment.apiURL + "ZmstSeatGroup/Update",
  ZmstSeatGroup_Delete: environment.apiURL + "ZmstSeatGroup/Delete?Id=",
  ZmstSeatGroup_GetAll: environment.apiURL + "ZmstSeatGroup/GetAll",
  ZmstSeatGroup_GetById: environment.apiURL + "ZmstSeatGroup/GetById?Id=",
  //#regionend Zmst_SeatGroup

  //#region Zmst_SeatSubCategory
  ZmstSeatSubCategory_Insert: environment.apiURL + "ZmstSeatSubCategory/Insert",
  ZmstSeatSubCategory_Update: environment.apiURL + "ZmstSeatSubCategory/Update",
  ZmstSeatSubCategory_Delete: environment.apiURL + "ZmstSeatSubCategory/Delete?SeatSubCategoryId=",
  ZmstSeatSubCategory_GetAll: environment.apiURL + "ZmstSeatSubCategory/GetAll",
  ZmstSeatSubCategory_GetById: environment.apiURL + "ZmstSeatSubCategory/GetById?SeatSubCategoryId=",
  //#regionend Zmst_SeatSubCategory

  //#region Zmst_SeatType
  ZmstSeatType_Insert: environment.apiURL + "ZmstSeatType/Insert",
  ZmstSeatType_Update: environment.apiURL + "ZmstSeatType/Update",
  ZmstSeatType_Delete: environment.apiURL + "ZmstSeatType/Delete?Id=",
  ZmstSeatType_GetAll: environment.apiURL + "ZmstSeatType/GetAll",
  ZmstSeatType_GetById: environment.apiURL + "ZmstSeatType/GetById?Id=",
  //#regionend Zmst_SeatType

  //#region Zmst_ExperienceType
  ZmstExperienceType_Insert: environment.apiURL + "ZmstExperienceType/Insert",
  ZmstExperienceType_Update: environment.apiURL + "ZmstExperienceType/Update",
  ZmstExperienceType_Delete: environment.apiURL + "ZmstExperienceType/Delete?Id=",
  ZmstExperienceType_GetAll: environment.apiURL + "ZmstExperienceType/GetAll",
  ZmstExperienceType_GetById: environment.apiURL + "ZmstExperienceType/GetById?Id=",
  //#regionend Zmst_ExperienceType

  Md_MainModule_GetById: environment.apiURL + "MdMainModule/GetById?MainModuleId=",

  //#region UserManagement
  UserManagementInsert: environment.apiURL + 'AppOnboardingAdminLogin/SaveUserDetails',
  UserManagementUpdate: environment.apiURL + 'AppOnboardingAdminLogin/Update?Id=',
  UserManagementDelete: environment.apiURL + 'AppOnboardingAdminLogin/Delete?Id=',
  UserManagementGetAll: environment.apiURL + 'AppOnboardingAdminLogin/GetAll',
  BoardUserManagementGetAll: environment.apiURL + 'AppOnboardingAdminLogin/BoardUserGetAll',
  UserManagementDocumentByDocType: environment.apiURL + 'AppOnboardingAdminLogin/GetDocument?Id=',
  GetBoarduserdetail: environment.apiURL + 'AppOnboardingAdminLogin/GetBoardUserdetail?Id=',
  ZmstAuthenticationMode: environment.apiURL + 'ZmstAuthenticationMode/GetAll',
  ZmstSecurityQuestion: environment.apiURL + 'ZmstSecurityQuestion/GetAll',
  CheckUserId: environment.apiURL + 'AppOnboardingAdminLogin/checkExistUserId?id=',
  //#region UserManagement

  //#region App_ProjectPaymentDetails
  AppProjectPaymentDetails_Insert: environment.apiURL + "AppProjectPaymentDetails/Insert",
  AppProjectPaymentDetails_Update: environment.apiURL + "AppProjectPaymentDetails/Update",
  AppProjectPaymentDetails_Delete: environment.apiURL + "AppProjectPaymentDetails/Delete?PaymentId=",
  AppProjectPaymentDetails_GetAll: environment.apiURL + "AppProjectPaymentDetails/GetAll",
  AppProjectPaymentDetails_GetById: environment.apiURL + "AppProjectPaymentDetails/GetById?PaymentId=",
  AppProjectPaymentDetails_PaymentParentRefId: environment.apiURL + "AppProjectPaymentDetails/GetByPaymentId?PaymentParentRefId=",
  AppProjectPaymentDetails_UpdateStatus: environment.apiURL + "AppProjectPaymentDetails/UpdateStatus",
  //#regionend App_ProjectPaymentDetails

  //#region App_ProjectActivity
  AppProjectActivity_Insert: environment.apiURL + "AppProjectActivity/Insert",
  AppProjectActivity_Update: environment.apiURL + "AppProjectActivity/Update",
  AppProjectActivity_Delete: environment.apiURL + "AppProjectActivity/Delete?Id=",
  AppProjectActivity_GetAll: environment.apiURL + "AppProjectActivity/GetAll",
  AppProjectActivity_GetById: environment.apiURL + "AppProjectActivity/GetById",
  AppProjectActivity_GetByParentRefId: environment.apiURL + "AppProjectActivity/GetByParentRefId?ParentRefId=",


  App_DocumnetUploadedDetailsHistorySave: environment.apiURL + "App_DocumentUploadedDetailHistory/Insert",
  AllMasterData:environment.apiURL+"AllMasterDetails/GetCount",

  AppRoleModulePermission_Insert: environment.apiURL + "AppRoleModulePermission/Insert?roleid=",
  AppRoleModulePermission_Update: environment.apiURL + "AppRoleModulePermission/Update",
  AppRoleModulePermission_Delete: environment.apiURL + "AppRoleModulePermission/Delete?RoleId=",
  AppRoleModulePermission_GetAll: environment.apiURL + "AppRoleModulePermission/GetAll",
  AppRoleModulePermission_GetById: environment.apiURL + "AppRoleModulePermission/GetById?RoleId=",

  AppUserRoleMapping_Insert: environment.apiURL + "AppUserRoleMapping/Insert?Userroleid=",
  AppUserRoleMapping_Update: environment.apiURL + "AppUserRoleMapping/Update",
  AppUserRoleMapping_Delete: environment.apiURL + "AppUserRoleMapping/Delete?UserID=",
  AppUserRoleMapping_GetById: environment.apiURL + "AppUserRoleMapping/GetById?UserID=",


  BindUserRole: environment.apiURL + 'AppLoginDetails/GetAllPmuUsers',

  //#region MdRole
  BindRole: environment.apiURL + 'MdRole/GetAll',
  //#regionend MdRole

  //#configurationEnvironment
  configEnv_byId: environment.apiURL + 'ConfigurationEnvironment/GetById?ApplicationId=',
  //#configurationEnvironment

  //#region MdYear
  MdYear_Insert: environment.apiURL + "MdYear/Insert",
  MdYear_Update: environment.apiURL + "MdYear/Update",
  MdYear_Delete: environment.apiURL + "MdYear/Delete?Id=",
  MdYear_GetAll: environment.apiURL + "MdYear/GetAll",
  MdYear_GetById: environment.apiURL + "MdYear/GetByGroupId?yearGroup=",
  //#regionend MdYear
  //#region ProjectExpenditure
  AppProjectExpenditureSave: environment.apiURL + 'AppProjectExpenditure/Insert',
  AppProjectExpenditureGetById: environment.apiURL + 'AppProjectExpenditure/GetById?ProjectId=',
  AppProjectExpenditureDelete: environment.apiURL + 'AppProjectExpenditure/Delete',
  AppProjectExpenditureUpdate: environment.apiURL + 'AppProjectExpenditure/Update',
  //#region ProjectExpenditure

  //#Encryption Key
  ConfigurationApiSecureKey_GetAll: environment.apiURL + 'ConfigurationAPISecureKey/GetAll'
};
