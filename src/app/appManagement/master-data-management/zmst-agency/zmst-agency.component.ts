import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstAgencyModel } from "src/app/shared/model/zmst-agency.model";
import { ZmstAgencyService } from "src/app/shared/services/zmst-agency.service";
import { ToastrService } from "ngx-toastr";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { MdStateService } from "src/app/shared/services/md-state.service";
import { MdStateModel } from "src/app/shared/model/md-state.model";
import { ZmstServiceTypeModel } from "src/app/shared/model/zmst-service-type.model";
import { ZmstServiceTypeService } from "src/app/shared/services/zmst-service-type.service";
import { CommonFunctionServices } from "src/app/shared/common/commonFunction.services";

declare const $: any;

@Component({
  selector: 'app-zmst-agency',
  templateUrl: './zmst-agency.component.html',
  styleUrls: ['./zmst-agency.component.css']
})
export class ZmstAgencyComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  fileUploadValidation: boolean = false;
  zmstagencyFrmGroup: FormGroup;
  zmstagencyModel: ZmstAgencyModel;
  zmstagencyList: ZmstAgencyModel[];
  stateList: MdStateModel[];
  CHECK_LIST: ZmstServiceTypeModel[] = [];
  checkdata: string;
  flagService: number = 0;
  selection: ZmstServiceTypeModel[] = [];
  fileToUpload: File | null = null;
  filename: string = '';
  fileextension: string = '';
  fileExtensionsCount:boolean=false;
  modifieddate: number = 1;
  pdfSrc: string = '';
  private base64textString: String = '';
  datacontent: String = '';
  servicetypes: any = [];
  checkboxArray: any;
  checkboxArrayEdit: any = [];
  StateListTemp:any[];
  stateId:string;

  constructor(private commonFunctionServices: CommonFunctionServices, private formBuilder: FormBuilder, private formArrayBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstagencyServices: ZmstAgencyService, private stateServices: MdStateService, private servicetype: ZmstServiceTypeService, private toastrService: ToastrService) {
    this.zmstagencyFrmGroup = this.formBuilder.group({
      agencyId: ["", [Validators.required, Validators.required]],
      agencyName: ["", [Validators.required, Validators.pattern("^([A-Za-z. ]+.,[a-zA-z. ])+1|[A-Za-z. ]+$")]],
      agencyAbbr: ["", [Validators.required]],
      agencyType: ["", [Validators.required, Validators.required]],
      stateId: ["", [Validators.required, Validators.required]],
      // serviceTypeId: [false, Validators.requiredTrue],
      address: ["", [Validators.required]],
      isActive: ["", [Validators.required, Validators.required]],
      priority: ["", [Validators.required]],
      boardRequestLetter: ["", [Validators.required, Validators.required]],
      serviceTypes: this.formArrayBuilder.array([], [this.atLeastOneCheckboxChecked()])
    });


    this.bindZmstServiceType()
  }

  ngOnInit(): void {
    this.getAll();
    this.getStateList();
    this.loader.isLoading = false;
    this.zmstagencyFrmControl.agencyType.setValue(0);
    this.zmstagencyFrmControl.isActive.setValue(0);
  }

  ngAfterViewInit(): void {
    $("#zmstagencyGrid").DataTable({
      "order": []
    });
  }

  get zmstagencyFrmControl() {
    return this.zmstagencyFrmGroup.controls;
  }
  reset() {
    this.clear()
  }
  clear() {
    this.zmstagencyFrmGroup.reset();
    this.getStateList();
    this.zmstagencyFrmGroup.controls['agencyId'].enable();
    this.submitted = false;
    this.updatehdn = false;

    this.zmstagencyFrmControl.isActive.setValue(0);
  }

  save() {
    this.submitted = true;
    if (this.zmstagencyFrmGroup.valid && this.fileExtensionsCount==false) {
      if (this.flagService == 0) {
        this.checkdata = '';
        for (let i = 0; i < this.selection.length; i++) {
          if (i == this.selection.length - 1) {
            this.checkdata += this.selection[i].serviceTypeId;
          } else {
            this.checkdata += this.selection[i].serviceTypeId + ',';
          }
        }
      }
      this.flagService = 1;
      const zmstagencyModel = {
        agencyId: this.zmstagencyFrmGroup.get("agencyId").value,
        agencyName: this.zmstagencyFrmGroup.get("agencyName").value,
        agencyAbbr: this.zmstagencyFrmGroup.get("agencyAbbr").value,
        agencyType: this.zmstagencyFrmGroup.get("agencyType").value,
        stateId: this.zmstagencyFrmGroup.get("stateId").value,
        serviceTypeId: this.checkdata.toString(),
        address: this.zmstagencyFrmGroup.get("address").value,
        isActive: this.zmstagencyFrmGroup.get("isActive").value,
        priority: Number(this.zmstagencyFrmGroup.get("priority").value),
        boardRequestLetter: this.zmstagencyFrmGroup.get("boardRequestLetter").value,

      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstagencyServices.insert(zmstagencyModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.getAll();
                  this.clear();
                  this.toastrService.success("Data Saved Successfully");
                }, error: (err: any) => {
                  
                  const message = err;

                  this.loader.isLoading = false;
                  this.getAll();
                  this.clear();
                  this.toastrService.error("AgencyId Alreeady Exist!");
                }
              })
            }
          }
        })
    }
  }

  edit(data: any) {
    /* To be discussed */
    this.updatehdn = true;
    this.servicetypes = data.serviceTypeId.split(',')

    this.zmstagencyFrmGroup.controls['agencyId'].disable();
    this.zmstagencyFrmGroup.patchValue({
      agencyId: data.agencyId,
      agencyName: data.agencyName,
      agencyAbbr: data.agencyAbbr,
      agencyType: data.agencyType,
      stateId: data.stateId,

      address: data.address,
      isActive: data.isActive,
      priority: data.priority,
      boardRequestLetter: data.boardRequestLetter,
    },
    )


    this.checkboxArrayEdit = data.serviceTypeId.split(',');
    this.checkboxArrayEdit.forEach(item =>
      this.selection = [...this.selection, (this.CHECK_LIST.filter(x => x.serviceTypeId == item)[0])]);
    this.checkboxArray.controls.forEach(control => {
      control.setValue(false);
    });
    for (let i = 0; i < this.checkboxArrayEdit.length; i++) {
      this.checkboxArray.controls[Number(this.checkboxArrayEdit[i]) - 1].setValue(true);
    }


  }
  atLeastOneCheckboxChecked(): ValidatorFn {
    return (formArray: AbstractControl): { [key: string]: boolean } | null => {
      if (!formArray || !Array.isArray(formArray.value)) {
        return { required: true }; // Return required error if the formArray is invalid or empty
      }

      const isChecked = formArray.value.some((checked: boolean) => checked === true);

      return isChecked ? null : { required: true }; // Return null if at least one checkbox is checked
    };
  }
  update() {
    this.submitted = true;
    this.zmstagencyFrmGroup.controls['agencyId'].enable();

    this.checkdata = '';
    for (let i = 0; i < this.selection.length; i++) {
      if (i == this.selection.length - 1) {
        this.checkdata += this.selection[i].serviceTypeId;
      } else {
        this.checkdata += this.selection[i].serviceTypeId + ',';
      }
    }
    if (this.zmstagencyFrmGroup.valid && this.fileExtensionsCount==false) {
      const zmstagencyModel = {
        agencyId: this.zmstagencyFrmGroup.get("agencyId").value,
        agencyName: this.zmstagencyFrmGroup.get("agencyName").value,
        agencyAbbr: this.zmstagencyFrmGroup.get("agencyAbbr").value,
        agencyType: this.zmstagencyFrmGroup.get("agencyType").value,
        stateId: this.zmstagencyFrmGroup.get("stateId").value,
        serviceTypeId: this.checkdata,
        address: this.zmstagencyFrmGroup.get("address").value,
        isActive: this.zmstagencyFrmGroup.get("isActive").value,
        priority: this.zmstagencyFrmGroup.get("priority").value,
        boardRequestLetter: this.zmstagencyFrmGroup.get("boardRequestLetter").value
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstagencyServices.update(zmstagencyModel).subscribe((data: any) => {
                const message = data;
                this.getAll();
                this.zmstagencyFrmGroup.reset();
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
            this.zmstagencyServices.delete(id).subscribe((data: any) => {
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
  
  getSelection(item: any) {

    if (this.servicetypes.includes(item) == -1) {
      return false;
    }
    else
      return false;

  }
  changeHandler(item: any) {
    this.checkdata = '';
    this.flagService = 0;
    const serviceTypeId = item.serviceTypeId;
    const index = this.selection.findIndex(
      (u) => u.serviceTypeId === serviceTypeId
    );
    if (index === -1) {
      this.selection = [...this.selection, item];
    } else {
      this.selection = this.selection.filter(
        (user) => user.serviceTypeId !== item.serviceTypeId
      );
    }
  }

  getAll() {
    this.zmstagencyServices.getAll().subscribe((data: any) => {
      this.StateListTemp=data;
      this.zmstagencyList = data;
      this.commonFunctionServices.bindDataTable("zmstagencyGrid", 0);
      this.loaderTimeOut();
    })
  }

  getStateList() {
    this.stateServices.getAll().subscribe((data: any) => {
      this.stateList = data;
    });
  }

  bindZmstServiceType() {
    this.servicetype.getAll().subscribe((res) => {

      this.CHECK_LIST = res;
      this.checkboxArray = this.zmstagencyFrmGroup.get('serviceTypes') as FormArray;
      this.CHECK_LIST.forEach(item => {
        // Create a FormControl for each item and set the initial value based on the ID
        // const checked = this.isItemChecked(item.id); // Implement this function to determine the initial state based on ID
        const control = this.formArrayBuilder.control(false);
        this.checkboxArray.push(control);
      });
    });
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
    this.filename = event.target.files[0].name;
    this.fileextension = event.target.files[0].type;
    this.modifieddate = event.target.files[0].lastModified;
    if(this.filename.split('.').length>1){
      this.fileExtensionsCount=true;
      return
    }
    if (this.fileextension != 'application/pdf') {
      this.fileUploadValidation = true;
      this.toastrService.error('Please Upload Pdf File only');
    } else {
      this.fileUploadValidation = false;
      let $img: any = document.querySelector('#Uploadfile');
      var reader = new FileReader();
      var readerbuffer = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      readerbuffer.onload = this._handleReaderLoaded2.bind(this);

      reader.readAsBinaryString(event.target.files[0]);
      readerbuffer.readAsArrayBuffer($img.files[0]);
    }
  }
  _handleReaderLoaded2(readerEvt: any) {
    let $img: any = document.querySelector('#Uploadfile');
    this.pdfSrc = readerEvt.target.result;
  }
  _handleReaderLoaded(readerEvt: any) {

    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.datacontent = this.base64textString;
    return false;
  }
  byStateCode(event: any) {
    this.zmstagencyList = this.StateListTemp.filter(x => x.stateId == (this.zmstagencyFrmGroup.get("stateId").value == "" ? x.stateId : this.zmstagencyFrmGroup.get("stateId").value))
    this.commonFunctionServices.bindDataTable("zmstagencyGrid", 0);
    this.stateId = event;
  }
  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 2000);
  }
}