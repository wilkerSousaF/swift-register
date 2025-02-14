import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterPageComponent } from './register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterServiceService } from './service/register-service.service';
import { SearchRegisterComponent } from './search-register/search-register.component';
import { BlockUIModule } from 'ng-block-ui';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';

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
    BlockUIModule.forRoot(),
    AutocompleteLibModule,
    ToastrModule.forRoot({
      timeOut: 900
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    HttpClientModule,
    NgxMaskDirective, NgxMaskPipe
   
  ],
  exports:[ RegisterPageComponent, SearchRegisterComponent],
  providers: [RegisterServiceService, provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
