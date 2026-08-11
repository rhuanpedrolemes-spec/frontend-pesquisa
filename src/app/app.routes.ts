import { Routes } from '@angular/router';
import { authGuard } from './admin/auth.guard';
import { LoginComponent } from './admin/login/login';
import { PainelComponent } from './admin/painel/painel';
import { SurveyPageComponent } from './survey-page/survey-page';

export const routes: Routes = [
  { path: '', component: SurveyPageComponent },
  { path: 'admin', component: LoginComponent },
  { path: 'admin/painel', component: PainelComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
