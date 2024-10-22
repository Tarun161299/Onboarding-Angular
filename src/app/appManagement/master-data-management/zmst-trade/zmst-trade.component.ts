
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstTradeModel } from "src/app/shared/model/zmst-trade.model";
import { ZmstTradeService } from "src/app/shared/services/zmst-trade.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;

@Component({
  selector: "app-zmst-trade",
  templateUrl: "./zmst-trade.component.html",
  styleUrls: ["./zmst-trade.component.css"]
})

export class ZmstTradeComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmsttradeFrmGroup: FormGroup;
  zmsttradeModel: ZmstTradeModel;
  zmsttradeList: ZmstTradeModel[];


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmsttradeServices: ZmstTradeService, private toastrService: ToastrService) {
    this.zmsttradeFrmGroup = this.formBuilder.group({
      id: ["", [Validators.required]],
      description: ["", [Validators.required]],
      alternateNames: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmsttradeGrid").DataTable({
      "order": []
    });
  }

  get zmsttradeFrmControl() {
    return this.zmsttradeFrmGroup.controls;
  }
  reset() {
    this.clear();

  }
  clear() {
    this.zmsttradeFrmGroup.reset();
    this.submitted = false;
    this.updatehdn = false;
    this.zmsttradeFrmGroup.controls["id"].enable();
  }

  save() {
    this.submitted = true;
    if (this.zmsttradeFrmGroup.valid) {
      const zmsttradeModel = {
        id: this.zmsttradeFrmGroup.get("id").value,
        description: this.zmsttradeFrmGroup.get("description").value,
        alternateNames: this.zmsttradeFrmGroup.get("alternateNames").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmsttradeServices.insert(zmsttradeModel).subscribe({
                next: (data: any) => {
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
    this.zmsttradeFrmGroup.controls['id'].disable();
    this.zmsttradeFrmGroup.patchValue({
      id: data.id,
      description: data.description,
      alternateNames: data.alternateNames,
    },

    )
  }


  update() {
    this.submitted = true;
    if (this.zmsttradeFrmGroup.valid) {
      const zmsttradeModel = {
        id: this.zmsttradeFrmGroup.get("id").value,
        description: this.zmsttradeFrmGroup.get("description").value,
        alternateNames: this.zmsttradeFrmGroup.get("alternateNames").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmsttradeServices.update(zmsttradeModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmsttradeFrmGroup.controls['id'].enable();             
                if (message != "Try Again") {
                  
                    this.toastrService.success("Update Successfully");
                  
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
            this.zmsttradeServices.delete(id).subscribe((data: any) => {
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
    this.zmsttradeServices.getAll().subscribe((data: any) => {
      this.zmsttradeList = data;
      this.loader.isLoading = false;
    })
  }
}