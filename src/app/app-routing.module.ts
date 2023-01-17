import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SearchRegisterComponent } from './search-register/search-register.component';

const routes: Routes = [
  {
    path: '',
    component: SearchRegisterComponent,
  },
  {
    path: 'new-register',
    component: RegisterPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
