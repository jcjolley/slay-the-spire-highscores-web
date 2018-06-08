import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddScoreComponent } from './add-scores/add-scores.component';
import { DisplayScoresComponent } from './display-scores/display-scores.component';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'add-score', component: AddScoreComponent,
    canActivate: [AuthService]
  },
  { path: 'display-scores', component: DisplayScoresComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: 'display-scores',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
