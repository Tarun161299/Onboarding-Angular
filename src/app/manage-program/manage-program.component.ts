import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZmstProgramService } from '../shared/services/Zmst-Program';
import { ExcelBase64 } from '../shared/model/excelBase64Model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-program',
  templateUrl: './manage-program.component.html',
  styleUrls: ['./manage-program.component.css']
})
export class ManageProgramComponent implements OnInit {
  qualificationdetailsFrmGroup: FormGroup;
  fileToUpload: any;
  filename: any;
  fileextension: any;
  modifiedDate: any;
  fileUploadValidation: any;
  rowData: any;
  projectId: string;
  pdfSrc: any;
  docData: any;
  base64textString: any;
  datacontent: any = "";
  data: any = "";
  submitted: boolean = false;
  excelBase64: ExcelBase64;
  hdnSave: boolean = true;
  excelHide: boolean = true;
  programCodeList: any = []
  fileExtensionsCount:boolean=false;
  constructor(private router: Router, private toastrService: ToastrService, private formBuilder: FormBuilder, private zmstProgramService: ZmstProgramService) {
    this.qualificationdetailsFrmGroup = this.formBuilder.group({
      uploadCertificate: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  convert() {
    this.submitted = true
    if (this.qualificationdetailsFrmGroup.invalid) {
      return;
    }
    this.excelBase64 = {
      excelString: this.base64textString,
      mode: 'V'
    };
    this.zmstProgramService.save(this.excelBase64).subscribe((data: any) => {
      this.programCodeList = data;
      if (data[0].message != "Has Error") {
        this.hdnSave = false;
        this.excelHide = false;
        this.toastrService.success(data[0].message)
      }
      else {
        this.toastrService.error("Invalid Data")
        this.hdnSave = true;
      }
    })
  }

  handleFileInput(event: any) {

    this.fileToUpload = event.target.files[0];
    this.filename = event.target.files[0].name;
    this.fileextension = event.target.files[0].type;
    var size = event.target.files[0].size;
    this.modifiedDate = event.target.files[0].lastModified;
    this.hdnSave = true;
    if(event.target.files[0].name.split('.').length>1){
      this.fileExtensionsCount=true;
      return
    }
 this.fileExtensionsCount=false;
    this.excelHide = true;
    this.fileUploadValidation = false;
    let $img: any = document.querySelector('#Uploadfile');
    var reader = new FileReader();
    var readerbuffer = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    readerbuffer.onload = this._handleReaderLoaded2.bind(this);

    reader.readAsBinaryString(event.target.files[0]);
    readerbuffer.readAsArrayBuffer($img.files[0]);

  }
  _handleReaderLoaded2(readerEvt: any) {
    let $img: any = document.querySelector('#Uploadfile');
    this.pdfSrc = readerEvt.target.result;
  }
  _handleReaderLoaded(readerEvt: any) {

    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.datacontent = this.base64textString;
    this.data = this.datacontent;
    return false;
  }
  get qualificationdetailsFrmControl() {
    return this.qualificationdetailsFrmGroup.controls;
  }
  save() {
    this.submitted = true
    if (this.qualificationdetailsFrmGroup.invalid ||  this.fileExtensionsCount==true) {
      return;
    }
    this.excelBase64 = {
      excelString: this.base64textString,
      mode: 'S'
    };
    this.zmstProgramService.save(this.excelBase64).subscribe((data: any) => {
      if (data[0].message == "Has Error") {
        this.toastrService.error(data[0].message)
      }
      else {
        this.toastrService.success(data[0].message)
        this.router.navigate(['auth/zmstProgramList']);
      }
    }
    )
  }

  download_Excel() {
    this.zmstProgramService.Download().subscribe((data: any) => {
      const linkSource = 'data:application/pdf;base64,' + data;
      const downloadLink = document.createElement('a');
      const fileName = 'demoExcelForProgramGeneration.xls';
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    })
  }

}
