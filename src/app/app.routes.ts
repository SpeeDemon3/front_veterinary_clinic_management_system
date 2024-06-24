import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { FindAllUsersComponent } from './pages/find-all-users/find-all-users.component';

export const routes: Routes = [
    {
        path:"",
        component:LoginComponent
    },
    {
        path:"signup",
        component:SignUpComponent
    },
    {
        path:"home",
        component:HomeComponent
    },
    {
        path: "findAllUsers",
        component: FindAllUsersComponent
    }
];
