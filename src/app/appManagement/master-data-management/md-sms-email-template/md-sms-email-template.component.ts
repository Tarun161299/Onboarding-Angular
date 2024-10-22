import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { AfterLoginComponent } from "src/app/shared/after-login/after-login.component";
import { MdSmsEmailTemplateModel } from "src/app/shared/model/md-sms-email-template.model";
import { MdSmsEmailTemplateService } from "src/app/shared/services/md-sms-email-template.service";
import { ToastrService } from "ngx-toastr";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
import { TokenLocalStorageService } from "src/app/shared/tokenLocalStorage/tokenLocalStorageService";
import { CommonFunctionServices } from "src/app/shared/common/commonFunction.services";
declare const $: any;

@Component({
  selector: "app-md-sms-email-template",
  templateUrl: "./md-sms-email-template.component.html",
  styleUrls: ["./md-sms-email-template.component.css"]
})
export class MdSmsEmailTemplateComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  mdsmsemailtemplateFrmGroup: FormGroup;
  mdsmsemailtemplateModel: MdSmsEmailTemplateModel;
  mdsmsemailtemplateList: MdSmsEmailTemplateModel[];
  public Editor = ClassicEditor;
  token: any;

  config = {
    uiColor: '#ffffff',
    toolbarGroups: [{ name: 'clipboard', groups: ['clipboard', 'undo'] },
    { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
    { name: 'links' }, { name: 'insert' },
    { name: 'document', groups: ['mode', 'document', 'doctools'] },
    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align'] },
    { name: 'styles' },
    { name: 'colors' }],
    skin: 'kama',
    resize_enabled: false,
    removePlugins: 'elementspath,save,magicline',
    extraPlugins: 'divarea,smiley,justify,indentblock,colordialog',
    colorButton_foreStyle: {
      element: 'font',
      attributes: { 'color': '#(color)' }
    },
    height: 188,
    removeDialogTabs: 'image:advanced;link:advanced',
    removeButtons: 'Subscript,Superscript,Anchor,Source,Table',
    format_tags: 'p;h1;h2;h3;pre;div'
  }

  constructor(private commonFunctionServices: CommonFunctionServices, private storage: TokenLocalStorageService, private formBuilder: FormBuilder, private loader: AfterLoginComponent, private mdsmsemailtemplateServices: MdSmsEmailTemplateService, private toastrService: ToastrService, private confirmationDialogService: ConfirmationDialogService) {
    this.mdsmsemailtemplateFrmGroup = this.formBuilder.group({
      templateId: ['', Validators.compose([Validators.required, this.scriptValidator])],
      description: ['', Validators.compose([Validators.required, this.scriptValidator])],
      messageTypeId: ['', Validators.compose([Validators.required, this.scriptValidator])],
      messageSubject: ['', Validators.compose([Validators.required, this.scriptValidator])],
      messageTemplate: ['', Validators.compose([Validators.required, this.scriptValidator])],
      registeredTemplateId: ['', Validators.compose([Validators.required, this.scriptValidator])],
    });
  }

  ngOnInit(): void {
    this.token = this.storage.get('token');
    this.getAll();
    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $("#mdsmsemailtemplateGrid").DataTable({
      //dom: "Bfrtip",
      //buttons: ["copy", "excel", "csv", "pdf", "print"],
      "order": []
    });
  }

  get mdsmsemailtemplateFrmControl() {
    return this.mdsmsemailtemplateFrmGroup.controls;
  }

  save() {
    this.submitted = true;
    if (this.mdsmsemailtemplateFrmGroup.valid) {
      this.loader.isLoading = true;
      this.mdsmsemailtemplateModel = {
        templateId: this.mdsmsemailtemplateFrmGroup.get("templateId").value,
        description: this.mdsmsemailtemplateFrmGroup.get("description").value,
        messageTypeId: this.mdsmsemailtemplateFrmGroup.get("messageTypeId").value,
        messageSubject: this.mdsmsemailtemplateFrmGroup.get("messageSubject").value,
        messageTemplate: this.mdsmsemailtemplateFrmGroup.get("messageTemplate").value,
        registeredTemplateId: this.mdsmsemailtemplateFrmGroup.get("registeredTemplateId").value
      }
      this.mdsmsemailtemplateServices.insert(this.mdsmsemailtemplateModel).subscribe((data: any) => {
        const message = data;
        this.getAll();
        this.mdsmsemailtemplateFrmGroup.reset();
        this.toastrService.success("Data Saved Successfully");
      })
    }
  }

  clear() {
    this.mdsmsemailtemplateFrmGroup.reset();
    this.mdsmsemailtemplateFrmGroup.controls['templateId'].enable();
    this.submitted = false;
    this.updatehdn = false;
  }
  edit(data: any) {

    this.updatehdn = true;
    this.mdsmsemailtemplateFrmGroup.controls['templateId'].disable();
    this.mdsmsemailtemplateFrmGroup.patchValue({
      templateId: data.templateId,
      description: data.description,
      messageTypeId: data.messageTypeId,
      messageSubject: data.messageSubject,
      messageTemplate: data.messageTemplate,
      registeredTemplateId: data.registeredTemplateId,
    },
    )
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  scriptValidator = function (control: AbstractControl): ValidationErrors | null {
    let value: string = control.value || '';
    if (value) {
      const matches = (value.includes('<script>')) || (value.includes('</script>')) || (value.includes('<style>')) || (value.includes('</style>'));
      return !matches ? null : { invalid: true };
    } else {
      return null;
    }
  }

  update() {
    this.submitted = true;
    if (this.mdsmsemailtemplateFrmGroup.valid) {
      this.mdsmsemailtemplateModel = {
        templateId: this.mdsmsemailtemplateFrmGroup.get("templateId").value,
        description: this.mdsmsemailtemplateFrmGroup.get("description").value,
        messageTypeId: this.mdsmsemailtemplateFrmGroup.get("messageTypeId").value,
        messageSubject: this.mdsmsemailtemplateFrmGroup.get("messageSubject").value,
        messageTemplate: this.mdsmsemailtemplateFrmGroup.get("messageTemplate").value,
        registeredTemplateId: this.mdsmsemailtemplateFrmGroup.get("registeredTemplateId").value,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
        .then(confirmed => {
          if (confirmed == true) {
            this.loader.isLoading = true;
            this.mdsmsemailtemplateServices.update(this.mdsmsemailtemplateModel).subscribe((data: any) => {
              const message = data;
              this.getAll();
              this.clear();
              this.updatehdn = false;
              this.mdsmsemailtemplateFrmGroup.reset();
              if (message != "Try Again") {
                if (message > 0) {
                  this.toastrService.success("Udate Successfully");
                }
              }
              if (message == "Try Again") {
                this.loader.isLoading = false;
                this.toastrService.error("Error Occured");
              }
            })
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
            /*Start Delete SmsEmailTemplets*/
            this.mdsmsemailtemplateServices.delete(id).subscribe((data: any) => {
              const message = data;
              this.getAll();
              this.toastrService.success(message);
            });
            /*End*/
          }
        }
      })
  }
  getAll() {
    this.mdsmsemailtemplateServices.getAll().subscribe((data: any) => {
      this.mdsmsemailtemplateList = data;
      this.commonFunctionServices.bindDataTable("mdsmsemailtemplateGrid", 0);
      this.loaderTimeOut();
    })
  }

  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 1000);
  }
}
