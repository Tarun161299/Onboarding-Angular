import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonFunctionServices } from '../shared/common/commonFunction.services';
import { AfterLoginComponent } from '../shared/after-login/after-login.component';
import { ConfirmationDialogService } from '../shared/services/confirmation-dialog.service';
import { ZmstInstituteTypeService } from '../shared/services/zmst-instituteType.service';
import { ToastrService } from 'ngx-toastr';
import { ZmstInstituteService } from '../shared/services/zmst-institute.service';
import { AgencyServices } from '../shared/services/agencyServices';
import { ZmstInstituteAgencyModel } from '../shared/model/zmst-instituteagency.model';
import { ZmstInstituteAgencyService } from '../shared/services/zmst-instituteAgency.service';

@Component({
  selector: 'app-zmst-institute-agency',
  templateUrl: './zmst-institute-agency.component.html',
  styleUrls: ['./zmst-institute-agency.component.css']
})
export class ZmstInstituteAgencyComponent implements OnInit {

  zmstinstituteList: any;
  agencyData: any;
  submitted: boolean = false;

  updatehdn: boolean = false;
  zmstinstituteagencyFrmGroup: FormGroup;
  zmstinstituteagencyModel: ZmstInstituteAgencyModel;
  zmstinstituteagencyList: any;
  constructor(private formBuilder: FormBuilder, private agencyServices: AgencyServices, private commonFunctionServices: CommonFunctionServices, private zmstinstituteagencyServices: ZmstInstituteAgencyService, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstinstitutetypeServices: ZmstInstituteTypeService, private toastrService: ToastrService, public zmstinstituteServices: ZmstInstituteService) {
    this.zmstinstituteagencyFrmGroup = this.formBuilder.group({
      instCd: ["", [Validators.required]],
      agencyId: ["", [Validators.required]],
    });
  }


  ngOnInit(): void {
    this.loader.isLoading=true;
    this.getAllInstitutes();


    
  }
  // get zmstinstitutetypeFrmControl() {
  //   return this.zmstinstitutetypeFrmGroup.controls;
  // }
  getAllInstitutes() {
    this.zmstinstituteServices.getAll().subscribe((data: any) => {
      this.zmstinstituteList = data;
      this.getAllAgencies();

    })
  }
  getAllAgencies() {
    this.agencyServices.getAll().subscribe((data: any) => {
      this.agencyData = data
      this.getAll();
    })
  }
  get zmstinstituteagencyFrmControl() {
    return this.zmstinstituteagencyFrmGroup.controls;
  }

  clear() {
    this.zmstinstituteagencyFrmGroup.reset();
    for (let control in this.zmstinstituteagencyFrmGroup.controls) {
      this.zmstinstituteagencyFrmGroup.controls[control].setErrors(null);
    }
  }

  save() {
    this.submitted = true;

    if (this.zmstinstituteagencyFrmGroup.valid) {
      const zmstinstituteagencyModel = {
        instCd: this.zmstinstituteagencyFrmGroup.get("instCd").value,
        agencyId: this.zmstinstituteagencyFrmGroup.get("agencyId").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstinstituteagencyServices.insert(zmstinstituteagencyModel).subscribe({next:(data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.clear();
                this.toastrService.success("Data Saved Successfully");
              },
              error:(err:any)=>{
                this.loader.isLoading = false;
                this.getAll();
                this.clear();
                this.toastrService.error("Already Exist");
              }})
            }
          }
        })
    }
  }

  edit(data: any) {
    this.updatehdn = true;
    this.zmstinstituteagencyFrmGroup.patchValue({
      instCd: data.instCd,
      agencyId: data.agencyId,

    },
    )
  }
  onSelectAgency(data: any) {

  }
  onSelectInst(data: any) {

  }
  update() {
    this.submitted = true;
    if (this.zmstinstituteagencyFrmGroup.valid) {
      const zmstinstituteagencyModel = {
        instCd: this.zmstinstituteagencyFrmGroup.get("instCd").value,
        agencyId: this.zmstinstituteagencyFrmGroup.get("agencyId").value,

      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstinstituteagencyServices.update(zmstinstituteagencyModel).subscribe((data: any) => {
                const message = data;
                //this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.toastrService.success(message);
              })
            }
          }
        })
    }
  }

  delete(id: any) {
    this.confirmationDialogService.confirmPopUp("Do you really want to Delete ?")
      .then(confirmed => {
        if (confirmed == true) {
          {
            this.loader.isLoading = true;
            this.zmstinstituteagencyServices.delete(id).subscribe((data: any) => {
             // this.loader.isLoading = false;
              const message = data;
              this.toastrService.error(message);
              this.clear();
              this.getAll();
            })
          }
        }
      })
  }

  getAll() {
    this.zmstinstituteagencyServices.getAll().subscribe((data: any) => {
      this.zmstinstituteagencyList = data;
      this.commonFunctionServices.bindDataTable('zmstinstituteagencyGrid', 0)
      this.loaderTimeOut();
    })
  }
  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 1000);
  }
}
