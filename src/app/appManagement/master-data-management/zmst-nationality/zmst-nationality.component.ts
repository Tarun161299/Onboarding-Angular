import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstNationalityModel } from "src/app/shared/model/zmst-nationality.model";
import { ZmstNationalityService } from "src/app/shared/services/zmst-nationality.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;

@Component({
  selector: 'app-zmst-nationality',
  templateUrl: './zmst-nationality.component.html',
  styleUrls: ['./zmst-nationality.component.css']
})
export class ZmstNationalityComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstnationalityFrmGroup: FormGroup;
  zmstnationalityModel: ZmstNationalityModel;
  zmstnationalityList: ZmstNationalityModel[];
  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstnationalityServices: ZmstNationalityService, private toastrService: ToastrService) {
    this.zmstnationalityFrmGroup = this.formBuilder.group({
      nationalityId: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getAll();
    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstnationalityGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstnationalityFrmControl() {
    return this.zmstnationalityFrmGroup.controls;
  }
  reset() {
    this.clear()
  }
  clear() {
    this.zmstnationalityFrmGroup.reset();
    this.zmstnationalityFrmGroup.controls['nationalityId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;

    if (this.zmstnationalityFrmGroup.valid) {
      const zmstnationalityModel = {
        nationalityId: this.zmstnationalityFrmGroup.get("nationalityId").value,
        description: this.zmstnationalityFrmGroup.get("description").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstnationalityServices.insert(zmstnationalityModel).subscribe( {
               next:(data: any) =>{
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.clear();
                this.toastrService.success("Data Saved Successfully");
              },
              error: (err: any) => {
                const message = err.message;
                this.loader.isLoading = false;
                this.getAll();
                this.clear();
                this.toastrService.error("Already exists");
              }
              })
            }
          }
        })
    }
  }

  edit(data: any) {
    this.updatehdn = true;
    this.zmstnationalityFrmGroup.controls['nationalityId'].disable();
    this.zmstnationalityFrmGroup.patchValue({
      nationalityId: data.nationalityId,
      description: data.description,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstnationalityFrmGroup.valid) {
      const zmstnationalityModel = {
        nationalityId: this.zmstnationalityFrmGroup.get("nationalityId").value,
        description: this.zmstnationalityFrmGroup.get("description").value,

        /* AuditColumns If any */
        //created_by: "",
        //created_date: "2023-02-27T09:53:56.110Z",
        //modified_by: "",
        //modified_date: "2023-02-27T09:53:56.110Z"
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstnationalityServices.update(zmstnationalityModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                if(message>0){
                  this.toastrService.success("Update Successfully");
                }
                else{
                  this.loader.isLoading=false;
                  this.toastrService.error("Try Again");
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
            this.zmstnationalityServices.delete(id).subscribe((data: any) => {
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
    this.zmstnationalityServices.getAll().subscribe((data: any) => {
      this.zmstnationalityList = data;
      this.loader.isLoading = false;
    })
  }
}
