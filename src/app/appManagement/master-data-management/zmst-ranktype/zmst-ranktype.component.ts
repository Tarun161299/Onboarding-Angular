
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstRankTypeModel } from "src/app/shared/model/md-rankType.model";
import { MDZmstRankTypeService } from "src/app/shared/services/md-zmstRankType.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { CommonFunctionServices } from "src/app/shared/common/commonFunction.services";

declare const $: any;

@Component({
  selector: "app-zmst-ranktype",
  templateUrl: "./zmst-ranktype.component.html",
  styleUrls: ["./zmst-ranktype.component.css"]
})
export class ZmstRankTypeComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstranktypeFrmGroup: FormGroup;
  zmstranktypeModel: ZmstRankTypeModel;
  zmstranktypeList: ZmstRankTypeModel[] = [];


  constructor(private commonFunctionServices: CommonFunctionServices,private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstranktypeServices: MDZmstRankTypeService, private toastrService: ToastrService) {
    this.zmstranktypeFrmGroup = this.formBuilder.group({
      id: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstranktypeGrid").DataTable({
      "order": []
    });
  }

  get zmstranktypeFrmControl() {
    return this.zmstranktypeFrmGroup.controls;
  }
  reset() {
    this.clear()
  }
  clear() {
    this.zmstranktypeFrmGroup.reset();
    this.zmstranktypeFrmGroup.controls['id'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;
    if (this.zmstranktypeFrmGroup.valid) {
      const zmstranktypeModel = {
        id: this.zmstranktypeFrmGroup.get("id").value,
        description: this.zmstranktypeFrmGroup.get("description").value
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstranktypeServices.insert(zmstranktypeModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.getAll();
                  this.clear();
                  this.toastrService.success("Data Saved Successfully");
                },
                error: (err: any) => {
                  const message = err.message;
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
    this.zmstranktypeFrmGroup.controls['id'].disable();
    this.zmstranktypeFrmGroup.patchValue({
      id: data.id,
      description: data.description
    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstranktypeFrmGroup.valid) {
      const zmstranktypeModel = {
        id: this.zmstranktypeFrmGroup.get("id").value,
        description: this.zmstranktypeFrmGroup.get("description").value
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstranktypeServices.update(zmstranktypeModel).subscribe((data: any) => {
                const message = data;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstranktypeFrmGroup.controls['id'].enable();
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
            this.zmstranktypeServices.delete(id).subscribe((data: any) => {
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
    this.zmstranktypeServices.getAll().subscribe((data: any) => {
      this.zmstranktypeList = data;
      this.commonFunctionServices.bindDataTable("zmstranktypeGrid", 0);
      this.loaderTimeOut();
    })
  }

  loaderTimeOut(){
		setTimeout(() => {
			this.loader.isLoading=false;
		  }, 1000);
	}
}