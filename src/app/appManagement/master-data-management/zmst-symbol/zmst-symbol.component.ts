
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstSymbolModel } from "src/app/shared/model/md-symbol.model";
import { ZmstSymbolService } from "src/app/shared/services/zmst-symbol.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;

@Component({
  selector: "app-zmst-symbol",
  templateUrl: "./zmst-symbol.component.html",
  styleUrls: ["./zmst-symbol.component.css"]
})
export class ZmstSymbolComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstsymbolFrmGroup: FormGroup;
  zmstsymbolModel: ZmstSymbolModel;
  zmstsymbolList: ZmstSymbolModel[];


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstsymbolServices: ZmstSymbolService, private toastrService: ToastrService) {
    this.zmstsymbolFrmGroup = this.formBuilder.group({
      symbolId: ["", [Validators.required]],
      description: ["", [Validators.required]],
      alternateNames: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstsymbolGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstsymbolFrmControl() {
    return this.zmstsymbolFrmGroup.controls;
  }

  clear() {
    this.zmstsymbolFrmGroup.reset();
    this.zmstsymbolFrmGroup.controls['symbolId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    
    this.submitted = true;
    if (this.zmstsymbolFrmGroup.valid) {
      const zmstsymbolModel = {
        symbolId: this.zmstsymbolFrmGroup.get("symbolId").value,
        description: this.zmstsymbolFrmGroup.get("description").value,
        alternateNames: this.zmstsymbolFrmGroup.get("alternateNames").value,
      }

      this.confirmationDialogService.confirmPopUp("Do you really want to Save?")
        .then(confirmed => {
          if (confirmed == true) {
            {
              this.loader.isLoading = true;
              this.zmstsymbolServices.insert(zmstsymbolModel).subscribe({
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
    this.zmstsymbolFrmGroup.controls['symbolId'].disable();
    this.zmstsymbolFrmGroup.patchValue({
      symbolId: data.symbolId,
      description: data.description,
      alternateNames: data.alternateNames,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstsymbolFrmGroup.valid) {
      const zmstsymbolModel = {
        symbolId: this.zmstsymbolFrmGroup.get("symbolId").value,
        description: this.zmstsymbolFrmGroup.get("description").value,
        alternateNames: this.zmstsymbolFrmGroup.get("alternateNames").value,

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
              this.zmstsymbolServices.update(zmstsymbolModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstsymbolFrmGroup.controls['symbolId'].enable();
                if (message != "Try Again") {
                  if (message > 0) {
                    this.toastrService.success("Udate Successfully");
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
            this.zmstsymbolServices.delete(id).subscribe((data: any) => {
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
    this.zmstsymbolServices.getAll().subscribe((data: any) => {
      this.zmstsymbolList = data;
      this.loader.isLoading = false;
    })
  }
}