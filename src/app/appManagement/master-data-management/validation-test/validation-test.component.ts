import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AfterLoginComponent } from 'src/app/shared/after-login/after-login.component';
import { ValidationTestModel } from 'src/app/shared/model/validation-test.model';
import { ValidationTestService } from 'src/app/shared/services/validation-test.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

declare const $: any;

@Component({
  selector: 'app-validation-test',
  templateUrl: './validation-test.component.html',
  styleUrls: ['./validation-test.component.css'],
})
export class ValidationTestComponent implements OnInit {
  submitted: boolean = false;
  updatehdn: boolean = false;
  validationtestFrmGroup: FormGroup;
  validationtestModel: ValidationTestModel;
  validationtestList: ValidationTestModel[];

  constructor(
    private formBuilder: FormBuilder,
    private loader: AfterLoginComponent,
    private validationtestServices: ValidationTestService,
    private toastrService: ToastrService
  ) {
    this.validationtestFrmGroup = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,5}$'
          ),
          Validators.maxLength(50),
          Validators.minLength(50),
        ],
      ],
      mobile: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      status: ['', [Validators.required]],
      uRL: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^((https?|ftp|smtp)://)?(www.)?[a-z0-9]+.[a-z]+(/[a-zA-Z0-9#]+/?)*$'
          ),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.loader.isLoading = false;
  }

  ngAfterViewInit(): void {
    $('#validationtestGrid').DataTable({
      order: [],
    });
  }

  get validationtestFrmControl() {
    return this.validationtestFrmGroup.controls;
  }

  save() {
    this.submitted = true;

    if (this.validationtestFrmGroup.valid) {
      this.loader.isLoading = true;
      this.validationtestModel = {
        id: this.validationtestFrmGroup.get('id').value,
        name: this.validationtestFrmGroup.get('name').value,
        email: this.validationtestFrmGroup.get('email').value,
        mobile: this.validationtestFrmGroup.get('mobile').value,
        status: this.validationtestFrmGroup.get('status').value,
        uRL: this.validationtestFrmGroup.get('uRL').value,
      };
      this.validationtestServices
        .insert(this.validationtestModel)
        .subscribe((data: any) => {
          const message = data;
          this.loader.isLoading = false;
          this.getAll();
          this.validationtestFrmGroup.reset();
          this.toastrService.success('Data Saved Successfully');
        });
    }
  }

  edit(data: any) {
    this.updatehdn = true;
    this.validationtestFrmGroup.patchValue({
      id: data.id,
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      status: data.status,
      uRL: data.uRL,
    });
  }

  update() {
    this.submitted = true;
    if (this.validationtestFrmGroup.valid) {
      this.loader.isLoading = true;
      this.validationtestModel = {
        id: this.validationtestFrmGroup.get('id').value,
        name: this.validationtestFrmGroup.get('name').value,
        email: this.validationtestFrmGroup.get('email').value,
        mobile: this.validationtestFrmGroup.get('mobile').value,
        status: this.validationtestFrmGroup.get('status').value,
        uRL: this.validationtestFrmGroup.get('uRL').value,

        /* AuditColumns If any */
        //created_by: "",
        //created_date: "2023-02-27T09:53:56.110Z",
        //modified_by: "",
        //modified_date: "2023-02-27T09:53:56.110Z"
      };
      this.validationtestServices
        .update(this.validationtestModel)
        .subscribe((data: any) => {
          const message = data;
          this.loader.isLoading = false;
          this.getAll();
          this.updatehdn = false;
          this.validationtestFrmGroup.reset();
          this.toastrService.success(message);
        });
    }
  }

  delete(id: any) {
    this.validationtestServices.delete(id).subscribe((data: any) => {
      const message = data;
      this.loader.isLoading=false;
      this.toastrService.error(message);
      this.getAll();
    });
  }

  getAll() {
    this.validationtestServices.getAll().subscribe((data: any) => {
      this.validationtestList = data;
      this.loader.isLoading = false;
    });
  }
}
