import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
import { EncyptionDecryption } from 'src/app/shared/common/EncyptionDecryption';
import { MdMainModuleService } from 'src/app/shared/services/mdMainModuleServices';
import { SideBarService } from 'src/app/shared/services/sidebar-services';
import { TokenLocalStorageService } from 'src/app/shared/tokenLocalStorage/tokenLocalStorageService';

@Component({
  selector: 'app-pmu-dashboard',
  templateUrl: './pmu-dashboard.component.html',
  styleUrls: ['./pmu-dashboard.component.css']
})
export class PmuDashboardComponent implements OnInit {
  mainModuleList: any;
  constructor(private loader: AfterLoginComponent, 
    private sideNavbarservice: SideBarService, 
    private storage:TokenLocalStorageService,
    private mdMainModuleService: MdMainModuleService, 
    private router: Router) { }

  ngOnInit(): void {
    
    var userid =this.storage.ParseToken().userId// atob(localStorage.getItem('userID'));
    this.mdMainModuleService.GetByUserId(userid).subscribe((data: any) => {
      this.mainModuleList = data
    })
    this.loader.isLoading = false;
  }

  onClickOnboardig(data: any) {
    debugger
    this.sideNavbarservice.refreshNavBar(data.mainModuleId);
    localStorage.setItem('mainModule', data.mainModuleId)
    this.router.navigate([data.path]);
  }
}
