import { AfterLoginComponent } from './shared/after-login/after-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeforeLoginComponent } from './shared/before-login/before-login.component';

const routes: Routes = [
  {
    path: '', component: BeforeLoginComponent,
    loadChildren: () => import('./shared/before-login/before-login.module').then(module => module.BeforeLoginModule)
  },
  {
    path: 'auth', component: AfterLoginComponent,
    loadChildren: () => import('./shared/after-login/after-login.module').then(m => m.AfterLoginModule),
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }