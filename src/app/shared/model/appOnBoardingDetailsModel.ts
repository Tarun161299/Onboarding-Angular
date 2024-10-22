export interface AppOnBoardingDetails {

    requestNo: string;
    website: string;
    yearOfFirstTimeAffilitionSession: string;
    examLastSessionConductedIn: string;
    examLastSessionTechSupportBy: string;
    examLastSessionDescription: string;
    counsLastSessionConductedIn: string;
    counsLastSessionTechSupportBy: string;
    counsLastSessionDescription: string;
    examExpectedApplicant: Number;
    examCourseList: string;
    examTotalCourse: Number;
    examTentativeScheduleStart: string;
    examTentativeScheduleEnd: string;
    examDissimilarityOfSchedule: boolean;
    counsExpectedApplicant: Number;
    counsExpectedSeat: Number;
    counsCourseList: string;
    counsTotalCourse: Number;
    counsExpectedRound: Number;
    counsExpectedSpotRound: Number;
    counsExpectedParticipatingInstitute: Number;
    counsTentativeScheduleStart: string;
    counsTentativeScheduleEnd: string;
    counsDissimilarityOfSchedule: boolean;
    submitTime: string;
    ipaddress: string;
    status: string;
    remarks: string;
    isActive: string;
    mode: string;
    attachFilecontent:string;
    hodMail:string;
    coordinatorMail:string;

}