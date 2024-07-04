import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { FindAllUsersComponent } from './pages/find-all-users/find-all-users.component';
import { authGuard } from './custom/auth.guard';
import { HomeAppComponent } from './pages/home-app/home-app.component';
import { FindUserByIDComponent } from './pages/find-user-by-id/find-user-by-id.component';
import { FindUserByDniComponent } from './pages/find-user-by-dni/find-user-by-dni.component';
import { FindRoleByIdComponent } from './pages/find-role-by-id/find-role-by-id.component';
import { FindAllRolesComponent } from './pages/find-all-roles/find-all-roles.component';

export const routes: Routes = [
    {
      path:"",
      component: LoginComponent
    },
    {
      path:"signup",
      component: SignUpComponent
    },
    {
      path:"home",
      component: HomeComponent,
      canActivate:[authGuard]
    },
    {
      path: "findAllUsers",
      component: FindAllUsersComponent
    },
    {
      path: "homeApp",
      component: HomeAppComponent,
      canActivate:[authGuard]
    },
    {
      path: "findUserById",
      component: FindUserByIDComponent
    }, {
      path: "findUserByDni",
      component: FindUserByDniComponent
    },
    {
      path: "findRoleById",
      component: FindRoleByIdComponent
    },
    {
      path : "findAllRoles", 
      component: FindAllRolesComponent
    }
];
