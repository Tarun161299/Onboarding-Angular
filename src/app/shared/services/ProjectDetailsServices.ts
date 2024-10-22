import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';
import { MinistryDetail } from 'src/app/model/Ministry.model';
import { AppOnBoardingRequestModel } from '../model/appOnBoardingRequestModel';
import { ApiEndPoints } from '../constants/apiEndpoints';
import { UserLoginInfo } from '../model/UserLoginInfomodel';
import { OnBoardingMail } from '../model/OnBoardingMailModel';
import { OnboardingRequestdata } from 'src/app/model/OnBoardingRequest.model';
import { destroyObjectProperties } from 'highcharts';
import { Responsedetailview } from '../model/Responsedetailview';
import { State } from '../model/stateModel';
import { ProjectCreation } from '../model/projectCreationModel';
import { PIDetails } from '../model/pIDetailsModel';
import { TokenExpireService } from '../common/tokenExpireService';

@Injectable()
export class ProjectDetailsServices {
    constructor(private http: HttpClient,private tokenExpire: TokenExpireService) {

    }
    saveAppProjecttDetails(projectDetails:ProjectCreation){
        
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.saveAppProjectdetails ,projectDetails);
    }
    getProjectList(): Observable<any[]> {
        
        localStorage.setItem('isauth', '1');
        return this.http.get<ProjectCreation[]>(ApiEndPoints.projectListGetAll);
    }
    getbyId(requestId:string){
        
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.GetProjectDetailsbyReqNo+requestId );
    }

    getbyProjectId(ProjectId:any){
        
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.GetProjectDetailsbyId+ProjectId.toString() );
    }
    saveProjectDetails(projectDetails:ProjectCreation){
        
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.saveProjectdetails ,projectDetails);
    }
    savePIDetails(pidetails:PIDetails){
        
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.savePIdetails,pidetails);
    }
    updateCreation(data:any){
       // UpdateProjectCreation
       
       localStorage.setItem('isauth', '1');
       return this.http.post<any>(ApiEndPoints.UpdateProjectCreation,data);
    }
    GetByRequestNo(Requestno:any){
        
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.GetByRequestNo+Requestno);
    }
}
