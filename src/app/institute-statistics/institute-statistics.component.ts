import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { AfterLoginComponent } from '../shared/after-login/after-login.component';
import { ZmstInstituteService } from '../shared/services/zmst-institute.service';
import { Router } from '@angular/router';
import { CommonFunctionServices } from '../shared/common/commonFunction.services';

@Component({
  selector: 'app-institute-statistics',
  templateUrl: './institute-statistics.component.html',
  styleUrls: ['./institute-statistics.component.css']
})
export class InstituteStatisticsComponent implements OnInit {
  type: any = [];
  mode: any;
  instituteList: any = [];
  institutetypeFrmGroup: FormGroup;
  private router: Router;

  constructor(private commonFunctionServices: CommonFunctionServices, private loader: AfterLoginComponent, private formBuilder: FormBuilder, private formArrayBuilder: FormBuilder, private zmstInstituteService: ZmstInstituteService) {
    this.institutetypeFrmGroup = this.formBuilder.group({
      institutetype: ["", [Validators.required, Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loader.isLoading = false;
    this.institutetypeFrmControl.institutetype.setValue(0);
    $('#instituteStatisticsGrid,#zmstinstituteGrid').DataTable({
    });

  }

  get institutetypeFrmControl() {
    return this.institutetypeFrmGroup.controls;
  }
  onSelectType(event: any) {
    this.loader.isLoading = true;
    this.zmstInstituteService.getByType(event.target.value).subscribe((data: any) => {
      this.type = data;
      this.commonFunctionServices.bindDataTable("instituteStatisticsGrid", 0);
      this.mode = event.target.value;
      this.loader.isLoading = false;
    })
  }
  viewDetails(data: any) {
    const datavalue =
    {
      mode: this.mode,
      id: data.id,
    }
    this.loader.isLoading = true;
    this.zmstInstituteService.GetAllCountData(datavalue).subscribe((data: any) => {
      this.instituteList = data;
      this.commonFunctionServices.bindDataTable("zmstinstituteGrid", 0);
      window.scroll({ top: 1000, left: 0, behavior: 'smooth' });
      this.loader.isLoading = false;
    })
  }
}
