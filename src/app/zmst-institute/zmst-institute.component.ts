import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstInstituteService } from "src/app/shared/services/zmst-institute.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { ZmstInstituteModel } from "../shared/model/zmstInstituteModel";
import { ZmstInstituteTypeService } from "../shared/services/zmst-instituteType.service";
import { MdStateService } from "../shared/services/md-state.service";
import { MdDistrictService } from "../shared/services/md-district.service";
import { ActivatedRoute, Router } from "@angular/router";
import { EncyptionDecryption } from "../shared/common/EncyptionDecryption";
import { ConfigurationApiSecureKey } from "../shared/services/ConfigurationApiSecureKey.Services";
import { environment } from "src/environments/environment";

declare const $: any;

@Component({
  selector: "app-zmst-institute",
  templateUrl: "./zmst-institute.component.html",
  styleUrls: ["./zmst-institute.component.css"]
})
export class ZmstInstituteComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstinstituteFrmGroup: FormGroup;
  zmstinstituteModel: ZmstInstituteModel;
  zmstinstituteList: ZmstInstituteModel[];
  allZmstInstitute: any;
  states: any;
  districts: any;
  instituteCode: any
  instDataById: any;
  hdninstituteCodeType: boolean = false;
  decSecretKey: string;
  decsalt: string;


  RADIO_LIST = [
    { id: false, name: 'Custom', value: 'No' },
    { id: true, name: 'System Generated', value: 'Yes', checked: false },
  ];

  constructor(private route: Router, private mdDistrictService: MdDistrictService, private configurationApiSecureKey: ConfigurationApiSecureKey, private mdStateService: MdStateService, private zmstInstituteTypeService: ZmstInstituteTypeService, private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstinstituteServices: ZmstInstituteService, private toastrService: ToastrService, private router: ActivatedRoute) {
    this.zmstinstituteFrmGroup = this.formBuilder.group({
      instCd: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      instNm: ["", [Validators.required, Validators.pattern("^[A-Za-z. ()\,\-]+$")]],
      abbrNm: ["", [Validators.required, Validators.pattern("^[A-Za-z. ()\-]+$")]],
      instTypeId: ["", [Validators.required, Validators.required]],
      instAdd: ["", [Validators.required]],
      state: ["", [Validators.required, Validators.required]],
      district: ["", [Validators.required]],
      pincode: ["", [Validators.pattern('^[0-9]{6}$')]],
      instPhone: ["", [Validators.pattern("^[0-9]*$")]],
      instFax: ["", [Validators.pattern("^[0-9]*$")]],
      instWebSite: ["", [Validators.pattern("^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$")]],
      emailId: ["", [Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,5}$")]],
      altEmailId: ["", [Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,5}$")]],
      contactPerson: ["", [Validators.pattern("^[A-Za-z. ]+$")]],
      designation: ["", [Validators.pattern("^[A-Za-z. ]+$")]],
      mobileNo: ["", [Validators.pattern('^[6-9][0-9]{9}$')]],
      aISHE: [""],
      instituteCodeType: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    // this.getDecryptionKey();
    this.getAll();
    this.getAllInstituteType()
    //this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {
      this.decSecretKey = environment.secretKey
      this.decsalt =environment.salt
      this.loader.isLoading = true;
      this.instituteCode = EncyptionDecryption.Decrypt(this.router.snapshot.params['Id'].toString(), this.decSecretKey, this.decsalt);
      this.instituteCode = this.instituteCode.substring(0, this.instituteCode.length - 15);
      if (this.instituteCode == "0") {
        this.loader.isLoading = false;
      }
      if (this.instituteCode != "0") {
        this.getById(this.instituteCode);
        this.zmstinstituteFrmGroup.controls['instituteCodeType'].clearValidators();
        this.zmstinstituteFrmGroup.controls['instituteCodeType'].updateValueAndValidity();
        this.zmstinstituteFrmGroup.controls['instCd'].disable();
        this.hdninstituteCodeType = true;
      }
      // this.loader.isLoading = false;
   // })
  }

  ngAfterViewInit(): void {
    $("#zmstinstituteGrid").DataTable({
      "order": []
    });
  }

  get zmstinstituteFrmControl() {
    return this.zmstinstituteFrmGroup.controls;
  }
  getDecryptionKey() {
    //this.configurationApiSecureKey.getAllKey().subscribe((data: any) => {

      this.decSecretKey = environment.secretKey
      this.decsalt = environment.salt
  //  })
  }
  clear() {
    this.zmstinstituteFrmGroup.reset();
    for (let control in this.zmstinstituteFrmGroup.controls) {
      this.zmstinstituteFrmGroup.controls[control].setErrors(null);
    }
  }
  onchange(item: any) {

    if (item.id == true) {
      this.getMaxInstitueCode();
    }
    else {
      this.zmstinstituteFrmGroup.patchValue({
        instCd: ""

      })
      this.zmstinstituteFrmGroup.controls['instCd'].enable();
    }

  }
  save() {
    
    this.submitted = true;
  
    if (this.zmstinstituteFrmGroup.valid) {
      const zmstinstituteModel = {
        instCd: this.zmstinstituteFrmGroup.get("instCd").value,
        instNm: this.zmstinstituteFrmGroup.get("instNm").value,
        abbrNm: this.zmstinstituteFrmGroup.get("abbrNm").value,
        instTypeId: this.zmstinstituteFrmGroup.get("instTypeId").value,
        instAdd: this.zmstinstituteFrmGroup.get("instAdd").value,
        state: this.zmstinstituteFrmGroup.get("state").value,
        district: this.zmstinstituteFrmGroup.get("district").value,
        pincode: this.zmstinstituteFrmGroup.get("pincode").value,
        instPhone: this.zmstinstituteFrmGroup.get("instPhone").value,
        instFax: this.zmstinstituteFrmGroup.get("instFax").value,
        instWebSite: this.zmstinstituteFrmGroup.get("instWebSite").value,
        emailId: this.zmstinstituteFrmGroup.get("emailId").value,
        altEmailId: this.zmstinstituteFrmGroup.get("altEmailId").value,
        contactPerson: this.zmstinstituteFrmGroup.get("contactPerson").value,
        designation: this.zmstinstituteFrmGroup.get("designation").value,
        mobileNo: this.zmstinstituteFrmGroup.get("mobileNo").value,
        aishe: this.zmstinstituteFrmGroup.get("aISHE").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstinstituteServices.insert(zmstinstituteModel).subscribe((data: any) => {
                
                
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.clear();
                this.route.navigate(['/auth/addInstituteList']);
                this.toastrService.success("Data Saved Successfully");
              })
            }
          }
        })
    }
  }

  edit(data: any) {

    this.updatehdn = true;
    this.getAllDistrict(data.state);
    this.zmstinstituteFrmGroup.patchValue({
      instCd: data.instCd,
      instNm: data.instNm,
      abbrNm: data.abbrNm,
      instTypeId: data.instTypeId,
      seatType: data.seatType,
      instAdd: data.instAdd,
      state: data.state,
      district: data.district,
      pincode: data.pincode.trim(),
      instPhone: data.instPhone,
      instFax: data.instFax,
      instWebSite: data.instWebSite,
      emailId: data.emailId,
      altEmailId: data.altEmailId,
      contactPerson: data.contactPerson,
      designation: data.designation,
      mobileNo: data.mobileNo,
      aISHE: data.aishe,
      oldInstituteCode: data.oldInstituteCode,

    },
    )
  }

  update() {

    this.submitted = true;
    if (this.zmstinstituteFrmGroup.valid) {
      const zmstinstituteModel = {
        instCd: this.zmstinstituteFrmGroup.get("instCd").value,
        instNm: this.zmstinstituteFrmGroup.get("instNm").value,
        abbrNm: this.zmstinstituteFrmGroup.get("abbrNm").value,
        instTypeId: this.zmstinstituteFrmGroup.get("instTypeId").value,
        instAdd: this.zmstinstituteFrmGroup.get("instAdd").value,
        state: this.zmstinstituteFrmGroup.get("state").value,
        district: this.zmstinstituteFrmGroup.get("district").value,
        pincode: this.zmstinstituteFrmGroup.get("pincode").value,
        instPhone: this.zmstinstituteFrmGroup.get("instPhone").value,
        instFax: this.zmstinstituteFrmGroup.get("instFax").value,
        instWebSite: this.zmstinstituteFrmGroup.get("instWebSite").value,
        emailId: this.zmstinstituteFrmGroup.get("emailId").value,
        altEmailId: this.zmstinstituteFrmGroup.get("altEmailId").value,
        contactPerson: this.zmstinstituteFrmGroup.get("contactPerson").value,
        designation: this.zmstinstituteFrmGroup.get("designation").value,
        mobileNo: this.zmstinstituteFrmGroup.get("mobileNo").value,
        aishe: this.zmstinstituteFrmGroup.get("aISHE").value,

      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstinstituteServices.update(zmstinstituteModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.route.navigate(['/auth/addInstituteList']);
                this.toastrService.success("Update Successfully");
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
            this.zmstinstituteServices.delete(id).subscribe((data: any) => {
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
  getMaxInstitueCode() {
    this.zmstinstituteServices.getMaxInstCode().subscribe((data: any) => {
      this.zmstinstituteFrmGroup.patchValue({
        instCd: data

      })
      this.zmstinstituteFrmGroup.controls['instCd'].disable();
    })
  }

  getAll() {
    this.zmstinstituteServices.getAll().subscribe((data: any) => {
      this.zmstinstituteList = data;

    })
  }
  getAllInstituteType() {
    this.zmstInstituteTypeService.getAll().subscribe((data: any) => {
      this.allZmstInstitute = data;
      this.getAllStates();
    })
  }
  getAllStates() {
    this.mdStateService.getAll().subscribe((data: any) => {
      this.states = data;
    })
  }
  onSelectInstType(data: any) {

  }
  onSelectState(data: any) {

    this.getAllDistrict(data)
  }
  getAllDistrict(id: any) {
    this.mdDistrictService.getAll().subscribe((data: any) => {
      this.districts = data.filter(x => x.stateId == id);
      this.loader.isLoading = false;
    })
  }
  getById(id: any) {
    this.zmstinstituteServices.getById(id).subscribe((data: any) => {
      this.instDataById = data;
      this.edit(this.instDataById);
    })

  }

  btnCancel() {
    this.zmstinstituteFrmGroup.reset();
    this.submitted = false;
  }
}