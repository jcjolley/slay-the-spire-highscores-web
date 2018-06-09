import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddScoreComponent } from './add-scores/add-scores.component';
import { DisplayScoresComponent } from './display-scores/display-scores.component';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { StartRunComponent } from './start-run/start-run.component';

const routes: Routes = [
  {
    path: 'display-scores', component: DisplayScoresComponent,
    canActivate: [AuthService]
  },
  {
    path: 'start-run', component: StartRunComponent,
    canActivate: [AuthService]
  },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: 'display-scores',
    pathMatch: 'full',
    canActivate: [AuthService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
