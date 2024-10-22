
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstDocumentTypeModel } from "src/app/shared/model/zmst-documenttype.model";
import { ZmstDocumentTypeService } from "src/app/shared/services/zmst-documenttype.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";

declare const $: any;

@Component({
  selector: "app-zmst-documenttype",
  templateUrl: "./zmst-document-type.component.html",
  styleUrls: ["./zmst-document-type.component.css"]
})
export class ZmstDocumentTypeComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstdocumenttypeFrmGroup: FormGroup;
  zmstdocumenttypeModel: ZmstDocumentTypeModel;
  zmstdocumenttypeList: ZmstDocumentTypeModel[];


  constructor(private formBuilder: FormBuilder, private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstdocumenttypeServices: ZmstDocumentTypeService, private toastrService: ToastrService) {
    this.zmstdocumenttypeFrmGroup = this.formBuilder.group({
      documentTypeId: ["", [Validators.required]],
      title: ["", [Validators.required]],
      alternateNames: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstdocumenttypeGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstdocumenttypeFrmControl() {
    return this.zmstdocumenttypeFrmGroup.controls;
  }
  reset() {
    this.clear()
  }
  clear() {
    this.zmstdocumenttypeFrmGroup.reset();
    this.zmstdocumenttypeFrmGroup.controls['documentTypeId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;

    if (this.zmstdocumenttypeFrmGroup.valid) {
      const zmstdocumenttypeModel = {
        documentTypeId: this.zmstdocumenttypeFrmGroup.get("documentTypeId").value,
        title: this.zmstdocumenttypeFrmGroup.get("title").value,
        alternateNames: this.zmstdocumenttypeFrmGroup.get("alternateNames").value,

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
              this.zmstdocumenttypeServices.insert(zmstdocumenttypeModel).subscribe({
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
    this.zmstdocumenttypeFrmGroup.controls['documentTypeId'].disable();
    this.zmstdocumenttypeFrmGroup.patchValue({
      documentTypeId: data.documentTypeId,
      title: data.title,
      alternateNames: data.alternateNames,

    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstdocumenttypeFrmGroup.valid) {
      const zmstdocumenttypeModel = {
        documentTypeId: this.zmstdocumenttypeFrmGroup.get("documentTypeId").value,
        title: this.zmstdocumenttypeFrmGroup.get("title").value,
        alternateNames: this.zmstdocumenttypeFrmGroup.get("alternateNames").value,

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
              this.zmstdocumenttypeServices.update(zmstdocumenttypeModel).subscribe((data: any) => {
                const message = data;
                this.loader.isLoading = false;
                this.getAll();
                this.updatehdn = false;
                this.clear();
                this.zmstdocumenttypeFrmGroup.controls['documentTypeId'].enable();
                if (message != "Try Again") {
                  if (message > 0) {
                    this.toastrService.success("Udate Successfully");
                  }
                }
                if (message == "Try Again") {
                  this.loader.isLoading=false;
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
            this.zmstdocumenttypeServices.delete(id).subscribe((data: any) => {
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
    this.zmstdocumenttypeServices.getAll().subscribe((data: any) => {
      this.zmstdocumenttypeList = data;
      this.loader.isLoading = false;
    })
  }
}