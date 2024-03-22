import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'bittie'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'bittie | log in'
    },
    {
        path: 'signup',
        component: SignupComponent,
        title: 'bittie | sign up'
    }
];
