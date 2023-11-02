import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './core/layouts/header/header.module';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    BrowserAnimationsModule,
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
