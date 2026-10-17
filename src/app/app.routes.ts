import { Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login';
import { PainelComponent } from './admin/painel/painel';
import { SurveyPageComponent } from './survey-page/survey-page';

export const routes: Routes = [
  { path: '', component: SurveyPageComponent },
  // O painel abre sem senha (só leitura); o login só é preciso para excluir respostas.
  { path: 'admin', redirectTo: 'admin/painel', pathMatch: 'full' },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/painel', component: PainelComponent },
  { path: '**', redirectTo: '' },
];
