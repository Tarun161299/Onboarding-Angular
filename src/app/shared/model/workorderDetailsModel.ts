export interface WorkOrderDetailsModel 
		{
		workorderId:Number;
			workorderNo:String;
			projectCode:String;
			issueDate:Date;
			agencyName:String;
			resourceCategory:String;
			resourceNo:String;
			noofMonths:String;
			workorderFrom:Date;
			workorderTo:Date;
			docName:String;
			document:String;
			docFileName: string;
            docContentType: string;
			docType:string
}