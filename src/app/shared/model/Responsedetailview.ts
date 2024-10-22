export interface Responsedetailview{
    requestNo: string;
    ministryName:string;
    agencyType:string;
    docContent:string;
    oranizationName:string;
    designation:string;
    website: string;

    services: string;

    yearOfFirstTimeAffiliation: number;

    ministryId: string;

    previousAgency: string;

    description: string;

    examExpectedApplicant: number;

    examinationList: string;

    examTentativeScheduleStart: string;

    examTentativeScheduleEnd: string;

    counsExpectedApplicant: number;

    counsExpectedSeat: number;

    counsStreamList: string;

    counsExpectedRound: number;

    counsExpectedSpotRound: number;

    counsExpectedParticipatingInstitute: number;

    counsTentativeScheduleStart: string;

    counsTentativeScheduleEnd: string;

    counsDissimilarityOfSchedule: boolean;

    submitTime:string;

    ipaddress:string;
    status:string;
    isActive:string;
    onBoardingDetailsStatus:string;
    agencyTypeId:string;
    sessionYear:string;
    ministryOther:string;
    organizationId:string;
    organizationOther:string;
    address:string;
    pinCode:string;
    contactPerson:string;
    email:string;
    mobileNo:string;
    remarks:string;

    //public string Status { get; set; }

    //public string Remarks { get; set; }

    //isActive: string;
}