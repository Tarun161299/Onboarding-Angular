
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstSeatGroupModel } from "src/app/shared/model/zmst-seat-group.model";
import { ZmstSeatGroupService } from "src/app/shared/services/zmst-seat-group.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;

@Component({
  selector: "app-zmst-seat-group",
  templateUrl: "./zmst-seat-group.component.html",
  styleUrls: ["./zmst-seat-group.component.css"]
})
export class ZmstSeatGroupComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstseatgroupFrmGroup: FormGroup;
  zmstseatgroupModel: ZmstSeatGroupModel;
  zmstseatgroupList: ZmstSeatGroupModel[];
  commonFunctionServices: any;

  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstseatgroupServices: ZmstSeatGroupService, private toastrService: ToastrService) {
    this.zmstseatgroupFrmGroup = this.formBuilder.group({
      id: ["", [Validators.required, Validators.required]],
      description: ["", [Validators.required, Validators.required]],
      alternateNames: ["", [Validators.required, Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstseatgroupGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstseatgroupFrmControl() {
    return this.zmstseatgroupFrmGroup.controls;
  }

  clear() {
    this.zmstseatgroupFrmGroup.reset();
    this.zmstseatgroupFrmGroup.controls['id'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {

    this.submitted = true;

    if (this.zmstseatgroupFrmGroup.valid) {
      const zmstseatgroupModel = {
        id: this.zmstseatgroupFrmGroup.get("id").value,
        description: this.zmstseatgroupFrmGroup.get("description").value,
        alternateNames: this.zmstseatgroupFrmGroup.get("alternateNames").value,

        /* AuditColumns If any */
        //created_by: "",
        //created_date: "2023-02-27T09:53:56.110Z",
        //modified_by: "",
        //modified_date: "2023-02-27T09:53:56.110Z"
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstseatgroupServices.insert(zmstseatgroupModel).subscribe({next:(data: any) => {
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
    this.zmstseatgroupFrmGroup.controls['id'].disable();
    this.zmstseatgroupFrmGroup.patchValue({
      id: data.id,
      description: data.description,
      alternateNames: data.alternateNames,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstseatgroupFrmGroup.valid) {
      const zmstseatgroupModel = {
        id: this.zmstseatgroupFrmGroup.get("id").value,
        description: this.zmstseatgroupFrmGroup.get("description").value,
        alternateNames: this.zmstseatgroupFrmGroup.get("alternateNames").value,

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
              this.zmstseatgroupServices.update(zmstseatgroupModel).subscribe((data: any) => {
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
            this.zmstseatgroupServices.delete(id).subscribe((data: any) => {
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
    this.zmstseatgroupServices.getAll().subscribe((data: any) => {
      this.zmstseatgroupList = data;
      this.loader.isLoading = false;
    })
  }
}