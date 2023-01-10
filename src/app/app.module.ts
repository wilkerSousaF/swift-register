import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterPageComponent } from './register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterServiceService } from './service/register-service.service';
import { SearchRegisterComponent } from './search-register/search-register.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
    SearchRegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
   
  ],
  exports:[ RegisterPageComponent],
  providers: [RegisterServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
