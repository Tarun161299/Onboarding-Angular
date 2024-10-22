

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstInstituteTypeModel } from "src/app/shared/model/zmst-institutetype.model";
//import { ZmstInstituteTypeService } from "src/app/shared/services/zmst-institutetype.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { ZmstInstituteTypeService } from "../shared/services/zmst-instituteType.service";
import { CommonFunctionServices } from "../shared/common/commonFunction.services";

declare const $: any;

@Component({
  selector: 'app-zmst-institute-type',
  templateUrl: './zmst-institute-type.component.html',
  styleUrls: ['./zmst-institute-type.component.css']
})
export class ZmstInstituteTypeComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstinstitutetypeFrmGroup: FormGroup;
  zmstinstitutetypeModel: ZmstInstituteTypeModel;
  zmstinstitutetypeList: ZmstInstituteTypeModel[];


  constructor(private formBuilder: FormBuilder, private commonFunctionServices: CommonFunctionServices, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstinstitutetypeServices: ZmstInstituteTypeService, private toastrService: ToastrService) {
    this.zmstinstitutetypeFrmGroup = this.formBuilder.group({
      instituteTypeId: ["", [Validators.required, Validators.required]],
      instituteType: ["", [Validators.required, Validators.required]],
      priority: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  get zmstinstitutetypeFrmControl() {
    return this.zmstinstitutetypeFrmGroup.controls;
  }

  clear() {
    this.zmstinstitutetypeFrmGroup.reset();
    this.zmstinstitutetypeFrmGroup.controls['instituteTypeId'].enable();
    this.submitted=false;
    this.updatehdn=false;
  }

  save() {
    this.submitted = true;

    if (this.zmstinstitutetypeFrmGroup.valid) {
      const zmstinstitutetypeModel = {
        instituteTypeId: this.zmstinstitutetypeFrmGroup.get("instituteTypeId").value,
        instituteType: this.zmstinstitutetypeFrmGroup.get("instituteType").value,
        priority: this.zmstinstitutetypeFrmGroup.get("priority").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstinstitutetypeServices.insert(zmstinstitutetypeModel).subscribe((data: any) => {

                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.clear();
                this.toastrService.success("Data Saved Successfully");
              })
            }
          }
        })
    }
  }

  edit(data: any) {
    this.updatehdn = true;
    this.zmstinstitutetypeFrmGroup.controls['instituteTypeId'].disable();
    this.zmstinstitutetypeFrmGroup.patchValue({
      instituteTypeId: data.instituteTypeId,
      instituteType: data.instituteType,
      priority: data.priority,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstinstitutetypeFrmGroup.valid) {
      const zmstinstitutetypeModel = {
        instituteTypeId: this.zmstinstitutetypeFrmGroup.get("instituteTypeId").value,
        instituteType: this.zmstinstitutetypeFrmGroup.get("instituteType").value,
        priority: this.zmstinstitutetypeFrmGroup.get("priority").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstinstitutetypeServices.update(zmstinstitutetypeModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstinstitutetypeFrmGroup.controls['instituteTypeId'].enable();
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
            this.zmstinstitutetypeServices.delete(id).subscribe((data: any) => {
              this.loader.isLoading = false;
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
    this.loader.isLoading = true;
    this.zmstinstitutetypeServices.getAll().subscribe((data: any) => {
      this.zmstinstitutetypeList = data;
      this.commonFunctionServices.bindDataTable('zmstinstitutetypeGrid', 0)
      this.loaderTimeOut();
    })
  }
  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 1000);
  }
}
