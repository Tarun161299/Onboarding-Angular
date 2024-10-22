export interface AppProjectPaymentDetailsModel {
    paymentId: Number;
    paymentParentRefId: String;
    amount: Number;
    uTRNo: String;
    paymentDate: Date;
    incomeTax: Number;
    gST: Number;
    tDS: Number;
    status: String;
    iPAddress: String;
    submitTime: Date;
}