import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstInstituteStreamModel } from "src/app/shared/model/zmst-institutestream.model";
import { ZmstInstituteStreamService } from "src/app/shared/services/zmst-institutestream.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { ZmstInstituteService } from "../shared/services/zmst-institute.service";
import { ZmstStreamService } from "../shared/services/zmst-stream.service";
import { CommonFunctionServices } from "../shared/common/commonFunction.services";
import { AgencyServices } from "../shared/services/agencyServices";
import { MdStateService } from "../shared/services/md-state.service";
import { ZmstInstituteTypeService } from "../shared/services/zmst-instituteType.service";
import { FilterInstitutes } from "../shared/model/filterInstitutes.model";

declare const $: any;

@Component({
  selector: 'app-manage-institute-stream',
  templateUrl: './manage-institute-stream.component.html',
  styleUrls: ['./manage-institute-stream.component.css']
})
export class ZmstInstituteStreamComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstinstitutestreamFrmGroup: FormGroup;
  zmstinstitutestreamModel: ZmstInstituteStreamModel;
  zmstinstitutestreamList: ZmstInstituteStreamModel[] = [];
  zmstinstituteList: any;
  zmstStreamListByInst: any = [];
  isChecked: boolean = false;
  selectedData: ZmstInstituteStreamModel;
  alreadySelectedData: ZmstInstituteStreamModel;
  alreadeySelection: any = []
  selection: any = []
  dataConversion: any = []
  agencyList: any;
  stateList: any;
  instituteType: any;
  filterInstitutes: FilterInstitutes;
  constructor(private zmstInstituteTypeService: ZmstInstituteTypeService, private mdStateService: MdStateService, private agencyServices: AgencyServices, private zmstStreamService: ZmstStreamService, private commonFunctionServices: CommonFunctionServices, private zmstinstituteServices: ZmstInstituteService, private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstinstitutestreamServices: ZmstInstituteStreamService, private toastrService: ToastrService) {
    this.zmstinstitutestreamFrmGroup = this.formBuilder.group({
      instCd: ["", [Validators.required]],
      streamId: [""],
      agency: [""],
      State: [""],
      instituteTyp: [""]
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllInstitute()
    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstinstitutestreamGrid").DataTable({
      "order": []
    });
  }

  get zmstinstitutestreamFrmControl() {
    return this.zmstinstitutestreamFrmGroup.controls;
  }

  clear() {
    this.submitted = false;
  }

  save() {
    this.submitted = true;
    if ((this.zmstinstitutestreamFrmGroup.get("instCd").value != "" && this.zmstinstitutestreamFrmGroup.get("instCd").value != null)) {
      if (this.zmstinstitutestreamFrmGroup.valid) {
        const zmstinstitutestreamModel = {
          instCd: this.zmstinstitutestreamFrmGroup.get("instCd").value,
          streamId: this.zmstinstitutestreamFrmGroup.get("streamId").value,
        }
        this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
          .then(confirmed => {
            if (confirmed == true) {
              {
                this.loader.isLoading = true;
                this.zmstinstitutestreamServices.insert(this.selection, this.zmstinstitutestreamFrmGroup.get("instCd").value).subscribe({
                  next: (data: any) => {
                    const message = data;
                    this.loader.isLoading = false;
                    this.getAll();
                    this.clear();
                    this.toastrService.success("Data Saved Successfully");
                  }, error: (err: any) => {
                    this.loader.isLoading = false;
                    this.toastrService.error(err);
                  }
                })
              }
            }

          })
      }
    }
    else {
      this.toastrService.error('Please Select Institute')
    }

  }

  edit(data: any) {
    this.updatehdn = true;
    this.zmstinstitutestreamFrmGroup.patchValue({
      instCd: data.instCd,
      streamId: data.streamId,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstinstitutestreamFrmGroup.valid) {
      const zmstinstitutestreamModel = {
        instCd: this.zmstinstitutestreamFrmGroup.get("instCd").value,
        streamId: this.zmstinstitutestreamFrmGroup.get("streamId").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstinstitutestreamServices.update(zmstinstitutestreamModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
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
            this.zmstinstitutestreamServices.delete(id).subscribe((data: any) => {
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

  SelectInstitute(event: any) {
    this.selection = [];
    this.zmstStreamService.getListInstcd(event).subscribe((data: any) => {
      this.zmstStreamListByInst = data;
      this.loader.isLoading = true
      this.commonFunctionServices.bindDataTable('zmstinstitutestreamGrid', 0);
      this.loaderTimeOut()
      this.dataConversion = data.filter(x => x.instCd != "")
      for (let i = 0; i < this.dataConversion.length; i++) {
        this.alreadySelectedData = {
          instCd: this.dataConversion[i].instCd,
          streamId: this.dataConversion[i].streamId
        }
        this.selection = [...this.selection, this.alreadySelectedData];
      }
    })
  }
  getAll() {
    this.zmstinstitutestreamServices.getAll().subscribe((data: any) => {
      this.zmstinstitutestreamList = data;
    })
  }
  getAllInstitute() {
    this.zmstinstituteServices.getAll().subscribe((data: any) => {
      this.zmstinstituteList = data;
      this.getAgencyList();
    })
  }
  getSelection(data: any) {
    data.instCd = this.zmstinstitutestreamFrmGroup.get("instCd").value.toString()
    this.selectedData = {
      instCd: data.instCd,
      streamId: data.streamId
    }
    const streamId = this.selectedData.streamId;
    const index = this.selection.findIndex(
      (u) => u.streamId === streamId
    );
    if (index === -1) {
      this.selection = [...this.selection, this.selectedData];
    } else {
      this.selection = this.selection.filter(
        (user) => user.streamId !== this.selectedData.streamId
      );
    }
  }
  getAgencyList() {
    this.agencyServices.getAll().subscribe((data: any) => {
      this.agencyList = data;
      this.getAllState()
    })
  }
  
  getAllState() {
    this.mdStateService.getAll().subscribe((data: any) => {
      this.stateList = data;
      this.getAllInstituteType();
    })
  }

  getAllInstituteType() {
    this.zmstInstituteTypeService.getAll().subscribe((data: any) => {
      this.instituteType = data;
    })
  }

  onFilterSelect() {
    this.filterInstitutes = {
      agencyId: this.zmstinstitutestreamFrmGroup.get("agency").value.toString(),
      stateId: this.zmstinstitutestreamFrmGroup.get("State").value.toString(),
      instituteTypeId: this.zmstinstitutestreamFrmGroup.get("instituteTyp").value.toString()
    }
    this.zmstinstituteServices.getAllByIds(this.filterInstitutes).subscribe((data: any) => {
      this.zmstinstituteList = data;
    })
  }
  
  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 1000);
  }

}