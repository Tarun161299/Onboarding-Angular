import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EditorComponent } from './shared/common/loader/editor';
import { HeaderInterceptor } from './shared/common/HeaderInterceptor';
import { ErrorHandlerService } from './shared/common/errorHandlerService';
import { CommonModule } from '@angular/common';
import { AppOnBoardingRequestService } from './shared/services/appOnBoardingRequest';
import { SideBarService } from './shared/services/sidebar-services';
import { TokenExpireService } from './shared/common/tokenExpireService';
import { ProjectDetailsServices } from './shared/services/ProjectDetailsServices';
import { AppDocumentUploadDetailService } from './shared/services/appDocumentUploadedDetailService';
import { DocumentTypeService } from './shared/services/documentTypeService';
import { TokenLocalStorageService } from './shared/tokenLocalStorage/tokenLocalStorageService';
import { BrowserModule } from '@angular/platform-browser';
import { EncyptionDecryption } from './shared/common/EncyptionDecryption';
import { EncryptionComponent } from './public/encryption/encryption/encryption.component';
import { ExamGraphViewComponent } from './exam-graph-view/exam-graph-view.component';
import { ProjectListGraphicalComponent } from './project-list-graphical/project-list-graphical.component';
import { EssoLoginComponent } from './esso-login/esso-login.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    EncryptionComponent,
    EssoLoginComponent,
    
    
    
    
  ],
  imports: [    
    AngularEditorModule,
    BrowserModule,
    CommonModule,    
    HttpClientModule,   
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000, 
      closeButton: true,
      progressBar: true,
    }),    
    AppRoutingModule,
    
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    },
    ToastrService,
    TokenLocalStorageService,
    AppOnBoardingRequestService,
    AppDocumentUploadDetailService,
    SideBarService,
    TokenExpireService,
    DocumentTypeService,
    ProjectDetailsServices,
    DatePipe,
    EncyptionDecryption
    
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}