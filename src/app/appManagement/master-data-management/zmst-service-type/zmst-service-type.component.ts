
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { ZmstServiceTypeModel } from "src/app/shared/model/zmst-service-type.model";
import { ZmstServiceTypeService } from "src/app/shared/services/zmst-service-type.service";
import { ErrorMessageService } from "src/app/shared/common/errorMessageService";

declare const $: any;

@Component({
  selector: "app-zmst-servicetype",
  templateUrl: "./zmst-service-type.component.html",
  styleUrls: ["./zmst-service-type.component.css"]
})
export class ZmstServiceTypeComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstservicetypeFrmGroup: FormGroup;
  zmstservicetypeModel: ZmstServiceTypeModel;
  zmstservicetypeList: ZmstServiceTypeModel[];
  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent,private errorMessage: ErrorMessageService, private confirmationDialogService: ConfirmationDialogService, private zmstservicetypeServices: ZmstServiceTypeService, private toastrService: ToastrService) {
    this.zmstservicetypeFrmGroup = this.formBuilder.group({
      serviceTypeId: ["", [Validators.required]],
      serviceTypeName: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstservicetypeGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstservicetypeFrmControl() {
    return this.zmstservicetypeFrmGroup.controls;
  }
  clear() {
    this.zmstservicetypeFrmGroup.reset();
    this.submitted = false;
    this.updatehdn = false;
    this.zmstservicetypeFrmGroup.controls['serviceTypeId'].enable();
  }
  save() {
    this.submitted = true;
    if (this.zmstservicetypeFrmGroup.valid) {
      const zmstservicetypeModel = {
        serviceTypeId: this.zmstservicetypeFrmGroup.get("serviceTypeId").value,
        serviceTypeName: this.zmstservicetypeFrmGroup.get("serviceTypeName").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstservicetypeServices.insert(zmstservicetypeModel).subscribe({
                next:(data: any) =>{
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.clear();
                this.toastrService.success("Data Saved Successfully");
                },
                error: (err: any) => {
                  let errorno = err.status;
                  this.loader.isLoading = false;
                  this.errorMessage.showError(errorno);
                  //this.toastrService.error("This Record already exists");
                }
              })
            }
          }
        })
    }
  }
  edit(data: any) {
    this.updatehdn = true;
    this.zmstservicetypeFrmGroup.controls['serviceTypeId'].disable();
    this.zmstservicetypeFrmGroup.patchValue({
      serviceTypeId: data.serviceTypeId,
      serviceTypeName: data.serviceTypeName,
    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstservicetypeFrmGroup.valid) {
      const zmstservicetypeModel = {
        serviceTypeId: this.zmstservicetypeFrmGroup.get("serviceTypeId").value,
        serviceTypeName: this.zmstservicetypeFrmGroup.get("serviceTypeName").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstservicetypeServices.update(zmstservicetypeModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstservicetypeFrmGroup.controls['serviceTypeId'].enable();
                if (message != "Try Again") {
                  if (message > 0) {
                    this.toastrService.success("Update Successfully");
                  }
                }
                if (message == "Try Again") {
                  this.toastrService.error("Error Occured");
                }
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
            this.zmstservicetypeServices.delete(id).subscribe((data: any) => {
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
    this.zmstservicetypeServices.getAll().subscribe((data: any) => {
      this.zmstservicetypeList = data;
      this.loader.isLoading = false;
    })
  }
}