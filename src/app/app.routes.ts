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
import { FindAllPetsComponent } from './pages/find-all-pets/find-all-pets.component';
import { FindPetByIdComponent } from './pages/find-pet-by-id/find-pet-by-id.component';
import { FindPetByCodeComponent } from './pages/find-pet-by-code/find-pet-by-code.component';
import { FindOwnerByIdComponent } from './pages/find-owner-by-id/find-owner-by-id.component';
import { FindOwnerByEmailComponent } from './pages/find-owner-by-email/find-owner-by-email.component';

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
    },
    {
      path: "findAllPets",
      component: FindAllPetsComponent
    },
    {
      path: "findPetById",
      component: FindPetByIdComponent
    },
    {
      path: "findPetByCode",
      component: FindPetByCodeComponent
    },
    {
      path: "findOwnerById",
      component: FindOwnerByIdComponent
    },
    {
      path: "findOwnerByEmail",
      component: FindOwnerByEmailComponent
    }


];
