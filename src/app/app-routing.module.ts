import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SearchRegisterComponent } from './search-register/search-register.component';
import { ImportDataComponent } from './import-data/import-data.component';
import { ExportDataComponent } from './export-data/export-data.component';

const routes: Routes = [
  {
    path: '',
    component: SearchRegisterComponent,
  },
  {
    path: 'new-register',
    component: RegisterPageComponent,
  },
  {
    path: 'import',
    component: ImportDataComponent,
  },
  {
    path: 'export',
    component: ExportDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
