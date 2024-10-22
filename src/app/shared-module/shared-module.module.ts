import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../shared/common/loader/loader';
import { AppOnBoardingRequestService } from '../shared/services/appOnBoardingRequest';
import { DocumentTypeService } from '../shared/services/documentTypeService';
import { AppDocumentUploadDetailService } from '../shared/services/appDocumentUploadedDetailService';
import { SideBarService } from '../shared/services/sidebar-services';



@NgModule({
  declarations: [LoadingComponent],
  exports: [
    LoadingComponent
  ],
  imports:[CommonModule]
})
export class SharedModuleModule {
  // static forRoot() {
  //   return {
  //     ngModule: SharedModuleModule,
  //     providers: [ //AppOnBoardingRequestService,
  //       SideBarService,
  //       AppDocumentUploadDetailService,
  //       DocumentTypeService, ]
  //   };
  // }
 }
