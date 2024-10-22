import { Component, OnInit } from '@angular/core';
import { ZmstProgramService } from '../shared/services/Zmst-Program';
import { CommonFunctionServices } from '../shared/common/commonFunction.services';
import { AfterLoginComponent } from '../shared/after-login/after-login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zmst-program-list',
  templateUrl: './zmst-program-list.component.html',
  styleUrls: ['./zmst-program-list.component.css']
})
export class ZmstProgramListComponent implements OnInit {
zmstProgramList:any=[]
  constructor(private router:Router,private commonFunctionServices: CommonFunctionServices,public zmstProgramService:ZmstProgramService,private loader:AfterLoginComponent) { }

  ngOnInit(): void {
    
    this.loader.isLoading=true;
    this.getAll();
  }



  getAll(){
    this.zmstProgramService.GetAll().subscribe((data:any)=>{
      this.zmstProgramList=data;
      
      this.commonFunctionServices.bindDataTable("programdetailsGrid",0)
     
      this.loaderTimeOut();
    })
  }
  btnAddNew(){
    this.router.navigate(['auth/ManageProgram']);
  }
  loaderTimeOut(){
		setTimeout(() => {
			this.loader.isLoading=false;
		  }, 1000);}

}
