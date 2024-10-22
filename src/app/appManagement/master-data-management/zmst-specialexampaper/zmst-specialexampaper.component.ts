
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { ZmstSpecialExamPaperModel } from "src/app/shared/model/md-specialExampaper.model";
import { ZmstSpecialExamPaperService } from "src/app/shared/services/zmst-specialexampaper.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ConfirmationDialogService } from "src/app/shared/services/confirmation-dialog.service";
import { ZmstExamTypeService } from "src/app/shared/services/zmst-exam-type.service";
import { ZmstExamTypeModel } from "src/app/shared/model/zmst-exam-type.model";
import { CommonFunctionServices } from "src/app/shared/common/commonFunction.services";


declare const $: any;

@Component({
  selector: "app-zmst-specialexampaper",
  templateUrl: "./zmst-specialexampaper.component.html",
  styleUrls: ["./zmst-specialexampaper.component.css"]
})
export class ZmstSpecialExamPaperComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  zmstspecialexampaperFrmGroup: FormGroup;
  zmstspecialexampaperModel: ZmstSpecialExamPaperModel;
  zmstspecialexampaperList: ZmstSpecialExamPaperModel[];
  examtypeList: ZmstExamTypeModel[];
  examListtemp:any[];
  specialExamId:string;


  constructor(private formBuilder: FormBuilder, private commonFunctionServices: CommonFunctionServices,private loader: AfterLoginComponent, private confirmationDialogService: ConfirmationDialogService, private zmstspecialexampaperServices: ZmstSpecialExamPaperService, private toastrService: ToastrService, private examtypeServices: ZmstExamTypeService) {
    this.zmstspecialexampaperFrmGroup = this.formBuilder.group({
      id: ["", [Validators.required]],
      description: ["", [Validators.required]],
      alternateNames: ["", [Validators.required]],
      specialExamId: ["", [Validators.required]],
      SpecialExamName: ["", ""],
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.getExamTypeList();
    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#zmstspecialexampaperGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get zmstspecialexampaperFrmControl() {
    return this.zmstspecialexampaperFrmGroup.controls;
  }
  reset() {
    this.clear();
    this.getExamTypeList();
  }
  clear() {
    this.zmstspecialexampaperFrmGroup.reset();
    this.zmstspecialexampaperFrmGroup.controls['id'].enable();
    this.zmstspecialexampaperFrmGroup.controls['specialExamId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }

  save() {
    this.submitted = true;
    if (this.zmstspecialexampaperFrmGroup.valid) {
      this.zmstspecialexampaperModel = {
        id: this.zmstspecialexampaperFrmGroup.get("id").value,
        description: this.zmstspecialexampaperFrmGroup.get("description").value,
        alternateNames: this.zmstspecialexampaperFrmGroup.get("alternateNames").value,
        specialExamId: this.zmstspecialexampaperFrmGroup.get("specialExamId").value,
        specialExamName: ""
       
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
              
              this.zmstspecialexampaperServices.insert(this.zmstspecialexampaperModel).subscribe({
                next: (data: any) => {
                  const message = data;
                  this.loader.isLoading = false;
                  this.getAll();
                  this.clear();
                  this.getExamTypeList();
                  this.toastrService.success("Data Saved Successfully");
                },
                error: (err: any) => {
                  const message = err.message;
                  this.loader.isLoading = false;
                  this.getAll();
                  this.clear();
                  this.getExamTypeList();
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
    this.zmstspecialexampaperFrmGroup.controls['id'].disable();
    this.zmstspecialexampaperFrmGroup.controls['specialExamId'].disable();
    this.zmstspecialexampaperFrmGroup.patchValue({
      id: data.id,
      description: data.description,
      alternateNames: data.alternateNames,
      specialExamId: data.specialExamId,
    },
    )
  }

  update() {
    this.submitted = true;
    if (this.zmstspecialexampaperFrmGroup.valid) {
      const zmstspecialexampaperModel = {
        id: this.zmstspecialexampaperFrmGroup.get("id").value,
        description: this.zmstspecialexampaperFrmGroup.get("description").value,
        alternateNames: this.zmstspecialexampaperFrmGroup.get("alternateNames").value,
        specialExamId: this.zmstspecialexampaperFrmGroup.get("specialExamId").value,
        specialExamName: ""
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
		    this.loader.isLoading=true;
            this.zmstspecialexampaperServices.update(zmstspecialexampaperModel).subscribe((data:any)=>{
				const message = data;
				this.loader.isLoading=false;
				this.getAll();
				this.updatehdn=false;
				this.clear();
        if(message !="Try Again"){
          
            this.toastrService.success("Update Successfully");
          
        }
        if(message =="Try Again"){
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
            this.zmstspecialexampaperServices.delete(id).subscribe((data: any) => {
              this.loader.isLoading = false;
              const message = data;
              this.toastrService.error(message);
              this.clear();
              this.getAll();
              this.getExamTypeList();
            })
          }
        }
      })
  }
  byspecialExam(event:any)
  {
    this.zmstspecialexampaperList=this.examListtemp.filter(x=>x.specialExamId==(this.zmstspecialexampaperFrmGroup.get("specialExamId").value=="" ? x.qualificationId :this.zmstspecialexampaperFrmGroup.get("specialExamId").value))
    this.commonFunctionServices.bindDataTable("zmstspecialexampaperList",0);
    this.specialExamId=event;
  }
  getAll() {
    this.zmstspecialexampaperServices.getAll().subscribe((data: any) => {
      this.examListtemp=data;
      this.zmstspecialexampaperList = data;
      this.loader.isLoading = false;
    })
  }
  getExamTypeList() {
    this.examtypeServices.getAll().subscribe((data: any) => {
      this.examtypeList = data;
      this.loader.isLoading = false;
    });
  }
}