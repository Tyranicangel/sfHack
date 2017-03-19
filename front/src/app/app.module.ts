import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy,HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { ApiService } from './api.service';

import { HomeModule } from './home/home.module';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting,
    HomeModule
  ],
  providers: [{provide:LocationStrategy,useClass:HashLocationStrategy},ApiService,LoaderService],
  bootstrap: [AppComponent,LoaderComponent]
})
export class AppModule { }
