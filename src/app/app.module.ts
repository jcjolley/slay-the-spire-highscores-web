import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddScoreComponent } from './add-scores/add-scores.component';
import { DisplayScoresComponent } from './display-scores/display-scores.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';

import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule, MatIconRegistry } from '@angular/material';

import { JwtModule } from '@auth0/angular-jwt';
import { MessageService } from './message.service';
import { ChatComponent } from './chat/chat.component';
import { StartRunComponent } from './start-run/start-run.component';

import { ClipboardModule } from 'ngx-clipboard';
import { ScoreTableComponent } from './start-run/score-table/score-table.component';
import { NotesComponent } from './start-run/notes/notes.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    AddScoreComponent,
    DisplayScoresComponent,
    LoginComponent,
    ChatComponent,
    StartRunComponent,
    ScoreTableComponent,
    NotesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:3002'],
        blacklistedRoutes: ['localhost:3002/login']
      }
    }),
    BrowserAnimationsModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    ClipboardModule,
  ],
  providers: [
    AuthService,
    MessageService,
    MatIconRegistry,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public matIconRegistry: MatIconRegistry) {
    this.matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    this.matIconRegistry.setDefaultFontSetClass('fa');
  }
}
