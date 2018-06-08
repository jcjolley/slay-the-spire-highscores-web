import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddScoresComponent } from './add-scores/add-scores.component';
import { DisplayScoresComponent } from './display-scores/display-scores.component';

@NgModule({
  declarations: [
    AppComponent,
    AddScoresComponent,
    DisplayScoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
