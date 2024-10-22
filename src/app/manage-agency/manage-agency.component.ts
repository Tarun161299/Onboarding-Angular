import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstAgencyModel } from "src/app/shared/model/zmst-agency.model";
import { ZmstAgencyService } from "src/app/shared/services/zmst-agency.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { MdStateService } from "../shared/services/md-state.service";
import { ServicesModel } from "../shared/model/serviceModel";
import { ZmstServiceTypeService } from "../shared/services/zmst-service-type.service";

declare const $: any;

@Component({
  selector: "app-zmst-agency",
  templateUrl: "./manage-agency.component.html",
  styleUrls: ["./manage-agency.component.css"]
})
export class ManageAgencyComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstagencyFrmGroup: FormGroup;
  zmstagencyModel: ZmstAgencyModel;
  zmstagencyList: ZmstAgencyModel[];
  states: any;
  CHECK_LIST: ServicesModel[] = [];
  selection: ServicesModel[] = [];
  checkdata: string = '';
  flagService: Number = 0;
  fileUploadValidation: boolean = false;
  fileToUpload: File | null = null;
  filename: string = '';
  fileextension: string = '';
  format: string = '';
  modifieddate: number = 1;
  private base64textString: String = '';
  datacontent: String = '';
  pdfSrc: string = '';
  selecteFile:any;
  fileExtension:any;
  fileName:any;
  fileExtensionsCount:boolean=false;


  constructor(private zmstServiceTypeService: ZmstServiceTypeService, private formBuilder: FormBuilder, private stateuser: MdStateService, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstagencyServices: ZmstAgencyService, private toastrService: ToastrService) {
    this.zmstagencyFrmGroup = this.formBuilder.group({
      agencyId: ["", [Validators.required]],
      agencyName: ["", [Validators.required, Validators.pattern("^([A-Za-z. ]+.,[a-zA-z. ])+1|[A-Za-z. ]+$")]],
      agencyAbbr: ["", [Validators.required]],
      agencyType: ["", [Validators.required, Validators.required]],
      stateId: ["", [Validators.required, Validators.required]],
      serviceTypeId: [false, Validators.requiredTrue],
      address: ["", [Validators.required]],
      isActive: ["", [Validators.required, Validators.required]],
      priority: ["", [Validators.required]],
      boardRequestLetter: [""],
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.bindZmstServiceType();
    this.stateuser.getAll().subscribe((data: any) => {
      this.states = data;
    })
    this.loader.isLoading = false;
  }

  bindZmstServiceType() {
    this.zmstServiceTypeService.bindZmstServiceTypeList().subscribe((res) => {
      this.CHECK_LIST = res;
    });
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
  ngAfterViewInit(): void {
    $("#zmstagencyGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstagencyFrmControl() {
    return this.zmstagencyFrmGroup.controls;
  }

  clear() {
    this.zmstagencyFrmGroup.reset();
    for (let control in this.zmstagencyFrmGroup.controls) {
      this.zmstagencyFrmGroup.controls[control].setErrors(null);
    }
  }
  handleFileInput(event: any) {

    this.selecteFile = event.target.files[0] ;
    const fileNameWithExtension: string = this.selecteFile.name;
    const [fileName, fileExtension] = fileNameWithExtension.split('.');
    this.fileName=fileNameWithExtension;
    this.fileExtension=fileExtension;
   // this.filename = event.target.files[0].name;
    if(event.target.files[0].name.split('.').length>1){
        this.fileExtensionsCount=true;
        return
      }
      this.fileExtensionsCount=false;
    this.fileToUpload = event.target.files[0];
    this.filename = event.target.files[0].name;
    this.fileextension = event.target.files[0].type;
    var size = event.target.files[0].size;
    this.modifieddate = event.target.files[0].lastModified;
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

  getSelection(item: any) {
    return (
      this.selection.findIndex(
        (s) => s.serviceTypeId === item.serviceTypeId
      ) !== -1
    );
  }
  save() {
    this.submitted = true;

    if (this.zmstagencyFrmGroup.valid && this.fileExtensionsCount==false) {
      const zmstagencyModel = {
        agencyId: this.zmstagencyFrmGroup.get("agencyId").value,
        agencyName: this.zmstagencyFrmGroup.get("agencyName").value,
        agencyAbbr: this.zmstagencyFrmGroup.get("agencyAbbr").value,
        agencyType: this.zmstagencyFrmGroup.get("agencyType").value,
        stateId: this.zmstagencyFrmGroup.get("stateId").value,
        serviceTypeId: this.zmstagencyFrmGroup.get("serviceTypeId").value,
        address: this.zmstagencyFrmGroup.get("address").value,
        isActive: this.zmstagencyFrmGroup.get("isActive").value,
        priority: this.zmstagencyFrmGroup.get("priority").value,
        boardRequestLetter: this.zmstagencyFrmGroup.get("boardRequestLetter").value,
        docFileName: this.fileName,
        docContentType: this.fileExtension,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstagencyServices.insert(zmstagencyModel).subscribe((data: any) => {
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
    this.zmstagencyFrmGroup.patchValue({
      agencyId: data.agencyId,
      agencyName: data.agencyName,
      agencyAbbr: data.agencyAbbr,
      agencyType: data.agencyType,
      stateId: data.stateId,
      serviceTypeId: data.serviceTypeId,
      address: data.address,
      isActive: data.isActive,
      priority: data.priority,
      boardRequestLetter: data.boardRequestLetter,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstagencyFrmGroup.valid  && this.fileExtensionsCount==false) {
      const zmstagencyModel = {
        agencyId: this.zmstagencyFrmGroup.get("agencyId").value,
        agencyName: this.zmstagencyFrmGroup.get("agencyName").value,
        agencyAbbr: this.zmstagencyFrmGroup.get("agencyAbbr").value,
        agencyType: this.zmstagencyFrmGroup.get("agencyType").value,
        stateId: this.zmstagencyFrmGroup.get("stateId").value,
        serviceTypeId: this.zmstagencyFrmGroup.get("serviceTypeId").value,
        address: this.zmstagencyFrmGroup.get("address").value,
        isActive: this.zmstagencyFrmGroup.get("isActive").value,
        priority: this.zmstagencyFrmGroup.get("priority").value,
        boardRequestLetter: this.zmstagencyFrmGroup.get("boardRequestLetter").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstagencyServices.update(zmstagencyModel).subscribe((data: any) => {
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

  getAll() {
    this.zmstagencyServices.getAll().subscribe((data: any) => {
      this.zmstagencyList = data;
      this.loader.isLoading = false;
    })
  }
}
