export interface AppOnBoardingRequestModel{
    agencyTypeId:number;
    ministryId:number;
    ministryOther:string;
    organizationId:number;
    organizationOther:string;
    sessionYear:number;
    address:String;
    pincode:string;
    contactPerson:string;
    designation:string;
    services:string;
    email:string;
    mobileNo:string;
    ipAddress:string;
    //uploadData:any;
    fileName:string;
    fileExtension:string;
    modifiedDate:string;
    content:String;
    format:string;
    id:string;
    status:string;
    showStatus:string;
}