import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { FindAllUsersComponent } from './pages/find-all-users/find-all-users.component';
import { authGuard } from './custom/auth.guard';
import { HomeAppComponent } from './pages/home-app/home-app.component';
import { AdministratorManagementComponent } from './pages/administrator-management/administrator-management.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { RoleManagementComponent } from './pages/role-management/role-management.component';
import { FindUserByIDComponent } from './pages/find-user-by-id/find-user-by-id.component';
import { FindUserByDniComponent } from './pages/find-user-by-dni/find-user-by-dni.component';

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
      path: "adminManagement",
      component: AdministratorManagementComponent
    },
    {
      path: "userManagement",
      component: UserManagementComponent
    },
    {
      path: "roleManagement",
      component: RoleManagementComponent
    },
    {
      path: "findUserById",
      component: FindUserByIDComponent
    }, {
      path: "findUserByDni",
      component: FindUserByDniComponent
    }
];
