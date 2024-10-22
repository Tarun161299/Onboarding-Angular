import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndPoints } from '../constants/apiEndpoints';
import { ZmstProject } from '../model/zmstProjectModel';
import { TokenExpireService } from '../common/tokenExpireService';
import { TokenLocalStorageService } from '../tokenLocalStorage/tokenLocalStorageService';



@Injectable({

    providedIn: 'root'

})

export class ZmstProjectServices{
    constructor(private storage:TokenLocalStorageService,private http: HttpClient,private tokenExpire: TokenExpireService) {

    }
    Save(zmstProject:ZmstProject): Observable<any[]> {
        
        const headers = {"Accept":"text/plain","Content-Type":"application/json","responseType":"text",'Authorization':`Bearer ${this.storage.get('token')}`} 
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.ZmstProjects_Insert,zmstProject, {headers:headers});
    }
    GetbyId(id:string){
        
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.ZmstProjectGetbyid+id);
    }
    update(zmstProject:ZmstProject):Observable<any[]> {
        
        const headers = {"Accept":"text/plain","Content-Type":"application/json","responseType":"text",'Authorization':`Bearer ${this.storage.get('token')}`} 
        localStorage.setItem('isauth', '1');
        return this.http.post<any>(ApiEndPoints.ZmstProjectUpdate,zmstProject);
    }
    delete(projectid:number):Observable<any[]> {
        
        const headers = {"Accept":"text/plain","Content-Type":"application/json","responseType":"text",'Authorization':`Bearer ${this.storage.get('token')}`} 
        localStorage.setItem('isauth', '1');       
        return this.http.post<any>(ApiEndPoints.ZmstProjectDelete+projectid.toString(), {headers:headers});
    }
    getAll(){
        
        localStorage.setItem('isauth', '1');
        return this.http.get<any>(ApiEndPoints.ZmstProjectsGetAll);
    }
}
