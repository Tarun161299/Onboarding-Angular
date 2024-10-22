export interface ZmstProjectsModel {
	agencyId: Number;
	agencyName: string;
	examCounsid: String;
	academicYear: Number;
	serviceType: Number;
	attempt: Number;
	projectId: Number;
	projectName: String;
	description: String;
	//requestLetter: CUSTOM;
	requestLetter:string;
	createdDate: String;
	createdBy: String;
	modifiedDate: String;
	modifiedBy: String;
	isLive: String;
	pinitiated: String;
}