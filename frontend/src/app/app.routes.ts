import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'bittie',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'bittie | log in',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'not found',
  },
];
