import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { distinct } from 'rxjs';
import { EncyptionDecryption } from '../../common/EncyptionDecryption';
import { AppDocumentUploadDetailService } from '../../services/appDocumentUploadedDetailService';
import { DocumentTypeService } from '../../services/documentTypeService';
import { ProjectDetailsServices } from '../../services/ProjectDetailsServices';
import { SideBarService } from '../../services/sidebar-services';
import { TokenLocalStorageService } from '../../tokenLocalStorage/tokenLocalStorageService';
import { AfterLoginComponent } from '../after-login.component';
import { ConfigurationApiSecureKey } from '../../services/ConfigurationApiSecureKey.Services';
import { NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';

declare const $: any;

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css'],
})
export class SideNavbarComponent implements OnInit {
  href: any;
  menuListArray: any = [];
  parentmenuListArray: any = [];
  parentmenuListArrayafterfilter: any = [];
  submenuListArray: any = [];
  submenuListArrayafterfilter: any = [];
  submenu: any;
  userRoleID: any;
  userAccesss: any;
  requestNo: any;
  assign_module: any = [];
  encryptedRequestNo: any;
  rowData: any;
  token: any;
  userdocumentpath: string;
  menudata: any;
  uploadbyUser: any;
  uploadNA: string = "NA";
  uploadbyadmin: any; userMenu: boolean = false;
  uploadbyUserdistinct: any[] = [];
  uploadbyadmindistinct: any[] = [];
  userId: string = "";
  dashboardUser: string;
  encSecretKey: string;
  encsalt: string;
  constructor(
    private sidebarUser: SideBarService,
    private usermenu: AppDocumentUploadDetailService,
    private router: Router,
    private documentTypeService: DocumentTypeService,
    private projectService: ProjectDetailsServices,
    private storage: TokenLocalStorageService,
    private datePipe: DatePipe,
    private configurationApiSecureKey: ConfigurationApiSecureKey,
    private zone: NgZone
  ) {
  }
  ngAfterViewInit() {
    
    setTimeout(() => {
      $('#menu').metisMenu({});
      $(() => {
        for (
          var i = window.location,
          o = $('.metismenu li a')
            .filter(() => {
              return this.href == i;
            })
            .addClass('text-danger')
            .parent()
            .addClass('mm-active');
          ;
        ) {
          if (!o.is('li')) break;
          o = o.parent('').addClass('mm-show').parent('').addClass('mm-active');
        }
      });
    }, 300);
  }



  ngOnInit(): void {
    debugger
    if (this.storage.get('token') == null || this.storage.get('token') == undefined ||  this.storage.ParseToken().userId == "") {
      this.router.navigate(['/Unauthorize']);
    }
    this.userRoleID = JSON.parse(this.storage.ParseToken().allRoles);
    if (this.userRoleID.filter(x => x.RoleId=='USER').length > 0) {
      this.userRoleID = 'USER';
      this.requestNo =  this.storage.ParseToken().requestNo;
      let number = this.getRandomNumber();
    //  this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
        this.encSecretKey =environment.secretKey// data[0].secretKey
        this.encsalt =environment.salt// data[0].salt
        this.encryptedRequestNo = EncyptionDecryption.Encrypt(this.requestNo + number, this.encSecretKey, this.encsalt);
        this.dashboardUser = "/auth/ProjectActivity/" + this.encryptedRequestNo;
        this.usermenu.getUserMenu(this.requestNo).subscribe((data: any) => {
          this.menudata = data;
          this.uploadbyUser = this.menudata.filter(x => x.createdby ==  this.storage.ParseToken().userId)
          this.uploadbyUserdistinct = this.methoddistinctbyColname(this.uploadbyUser);
          this.uploadbyadmin = this.menudata.filter(x => x.createdby !=  this.storage.ParseToken().userId)
          this.uploadbyadmindistinct = this.methoddistinctbyColname(this.uploadbyadmin);
         // this.ngAfterViewInit();
          return false;
        })
     // })
    }




    this.assign_module = JSON.parse(this.storage.ParseToken().module_assigned)//get('module_assigned'));
    this.userdocumentpath = "auth/userdocuments/"

    this.sidebarUser.uplopadDataEvt.subscribe({
      next: (data: any) => {
        debugger
        this.menudata = data;
        this.uploadbyUser = this.menudata.filter(x => x.createdby ==  this.storage.ParseToken().userId)
        this.uploadbyUserdistinct = this.methoddistinctbyColname(this.uploadbyUser);
        this.uploadbyadmin = this.menudata.filter(x => x.createdby !=  this.storage.ParseToken().userId)
        this.uploadbyadmindistinct = this.methoddistinctbyColname(this.uploadbyadmin);
        this.reloadSidenavbar();
      }, error: (err: any) => {
        debugger
      }
    })
    if (localStorage.getItem('mainModule') != null) {
      
      this.menuList(localStorage.getItem('mainModule'));
    }
    this.sidebarUser.getRefreshData().subscribe((data: any) => {
      debugger
      this.menuList(data);
      //this.reloadSidenavbar();
     // this.ngAfterViewInit();
    })

  }
  private initializeMetisMenu():void{
    $('#menu').metisMenu({});
    $(() => {
      for (
        var i = window.location,
        o = $('.metismenu li a')
          .filter(() => {
            return this.href == i;
          })
          .addClass('text-danger')
          .parent()
          .addClass('mm-active');
        ;
      ) {
        if (!o.is('li')) break;
        o = o.parent('').addClass('mm-show').parent('').addClass('mm-active');
      }
    });
  }
  reloadSidenavbar() {
    this.zone.run(()=>{
      setTimeout(() => {
        $('#menu').metisMenu({});
        $(() => {
          for (
            var i = window.location,
            o = $('.metismenu li a')
              .filter(() => {
                return this.href == i;
              })
              .addClass('text-danger')
              .parent()
              .addClass('mm-active');
            ;
          ) {
            if (!o.is('li')) break;
            o = o.parent('').addClass('mm-show').parent('').addClass('mm-active');
          }
        });
      }, 1500);
    })
    
  }
  menuList(moduleid: any) {
    this.userId =  this.storage.ParseToken().userId;
    this.sidebarUser.SideBarDataList(this.userId).subscribe({
      next: (data: any) => {
        if (data) {
          debugger
          this.parentmenuListArray = data.parentModuleList;
          this.submenuListArray = data.subModuleList;
          this.getAllDocument();
          
          if (!this.userRoleID.includes('USER')) {
            
            this.parentmenuListArray = data.parentModuleList.filter(
              (x) => x.mainModule == moduleid
            );
            this.submenuListArray = data.subModuleList.filter(
              (x) => x.mainModule == moduleid
            );
            //this.reloadSidenavbar()
          }
          
          if (this.userRoleID.includes('USER')) {
            this.userMenu = true;
            this.refreshSidebAr()
            this.parentmenuListArray = data.parentModuleList.filter(
              (x) => (x.moduleId == 'M006' || x.moduleId == 'M010')
            );
            this.refreshSidebAr()
            this.submenuListArray = data.subModuleList;
            this.refreshSidebAr()
          }
          this.refreshSidebAr()
         // this.reloadSidenavbar()
        }
      },
      error: (err: any) => {
      }
    });
  }
  getRandomNumber() {
    const today = new Date();
    let date = this.datePipe.transform(today, 'YYMMddHHMMSSSSS');
    return date;
  }
refreshSidebAr(){
  this.zone.runOutsideAngular(() => {
    setTimeout(() => {
      this.initializeMetisMenu();
    }, 300);
  });
}
  getAllDocument() {
    this.documentTypeService.getAll().subscribe((data: any) => {
      this.reloadSidenavbar()
      this.rowData = data;
    })

  }
  Redirect(id: string) {
    this.router.navigate([this.userdocumentpath + this.encryptedRequestNo + '/' + id]);
  }

  RedirectMou() {
    this.router.navigate(["auth/usermou/" + this.encryptedRequestNo]);
  }

  RedirectPropsalInvoice() {

    this.router.navigate(["auth/ProposalInvoice/" + this.encryptedRequestNo]);
  }
  RedirectPayment() {
    this.router.navigate(["auth/PaymentProjectDetails/" + this.encryptedRequestNo]);
  }
  RedirectSignOff() {
    this.router.navigate(["auth/SignOff/" + this.encryptedRequestNo]);
  }
  RedirectUtilizationCertificate() {
    this.router.navigate(["auth/Uc/" + this.encryptedRequestNo]);
  }

  methoddistinctbyColname(list: any[]) {
    let count = 0;
    var start = false;
    var tempdata: any[] = [];
    for (let j = 0; j < list.length; j++) {
      for (let k = 0; k < tempdata.length; k++) {
        if (list[j].docType == tempdata[k].docType) {
          start = true;
        }
      }
      count++;
      if (count == 1 && start == false) {
        tempdata.push(list[j]);
      }
      start = false;
      count = 0;
    }
    
    return tempdata;
  }
  onclickPmuDashBord() {
    this.parentmenuListArray = [];
    this.submenuListArray = [];
    this.router.navigate(['/auth/pmudashboard'])
  }

  getEncryptionKey() {
 //   this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.encSecretKey = environment.secretKey//data[0].secretKey
      this.encsalt = environment.salt //data[0].salt
  //  })
  }
}
