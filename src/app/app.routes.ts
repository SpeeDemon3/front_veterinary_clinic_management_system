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
import { FindOwnerByDniComponent } from './pages/find-owner-by-dni/find-owner-by-dni.component';
import { FindAllOwnerComponent } from './pages/find-all-owner/find-all-owner.component';
import { FindInvoiceByIdComponent } from './pages/find-invoice-by-id/find-invoice-by-id.component';
import { FindInvoiceByDniComponent } from './pages/find-invoice-by-dni/find-invoice-by-dni.component';
import { FindAllInvoiceComponent } from './pages/find-all-invoice/find-all-invoice.component';
import { FindInvoiceByStateComponent } from './pages/find-invoice-by-state/find-invoice-by-state.component';
import { FindAllAppointmentComponent } from './pages/find-all-appointment/find-all-appointment.component';
import { FindAppointmentByIdComponent } from './pages/find-appointment-by-id/find-appointment-by-id.component';
import { FindAppointmentsByPetIdComponent } from './pages/find-appointments-by-pet-id/find-appointments-by-pet-id.component';
import { FindAppointmentsByVeterinarianIdComponent } from './pages/find-appointments-by-veterinarian-id/find-appointments-by-veterinarian-id.component';
import { FindAppointmentsByDateComponent } from './pages/find-appointments-by-date/find-appointments-by-date.component';
import { CreatePetComponent } from './pages/create-pet/create-pet.component';
import { CreateOwnerComponent } from './pages/create-owner/create-owner.component';
import { CreateInvoiceComponent } from './pages/create-invoice/create-invoice.component';
import { CreateAppointmentComponent } from './pages/create-appointment/create-appointment.component';
import { DeleteUserByIdComponent } from './pages/delete-user-by-id/delete-user-by-id.component';
import { DeletePetByIdComponent } from './pages/delete-pet-by-id/delete-pet-by-id.component';
import { DeleteInvoiceByIdComponent } from './pages/delete-invoice-by-id/delete-invoice-by-id.component';
import { DeleteRoleByIdComponent } from './pages/delete-role-by-id/delete-role-by-id.component';
import { DeleteAppointmentByIdComponent } from './pages/delete-appointment-by-id/delete-appointment-by-id.component';
import { DeleteOwnerByIdComponent } from './pages/delete-owner-by-id/delete-owner-by-id.component';
import { CreateRoleComponent } from './pages/create-role/create-role.component';
import { UpdateUserByIdComponent } from './pages/update-user-by-id/update-user-by-id.component';
import { UpdateRoleByIdComponent } from './pages/update-role-by-id/update-role-by-id.component';
import { UpdateOwnerByIdComponent } from './pages/update-owner-by-id/update-owner-by-id.component';
import { UpdatePetByIdComponent } from './pages/update-pet-by-id/update-pet-by-id.component';
import { UpdateInvoiceByIdComponent } from './pages/update-invoice-by-id/update-invoice-by-id.component';
import { UpdateAppointmentByIdComponent } from './pages/update-appointment-by-id/update-appointment-by-id.component';
import { DownloadCsvUserComponent } from './pages/download-csv-user/download-csv-user.component';
import { DownloadCsvOwnerComponent } from './pages/download-csv-owner/download-csv-owner.component';
import { DownloadCsvPetComponent } from './pages/download-csv-pet/download-csv-pet.component';
import { DownloadCsvInvoiceComponent } from './pages/download-csv-invoice/download-csv-invoice.component';
import { DownloadCsvAppointmentComponent } from './pages/download-csv-appointment/download-csv-appointment.component';
import { DownloadJsonUserComponent } from './pages/download-json-user/download-json-user.component';
import { DownloadJsonOwnerComponent } from './pages/download-json-owner/download-json-owner.component';
import { DownloadJsonPetComponent } from './pages/download-json-pet/download-json-pet.component';
import { DownloadJsonInvoiceComponent } from './pages/download-json-invoice/download-json-invoice.component';
import { DownloadJsonAppointmentComponent } from './pages/download-json-appointment/download-json-appointment.component';

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
    },
    {
      path: "findOwnerByDni",
      component: FindOwnerByDniComponent
    },
    {
      path: "findAllOwners",
      component: FindAllOwnerComponent
    },
    {
      path: "findInvoiceById",
      component: FindInvoiceByIdComponent
    },
    {
      path: "findByClientDNI",
      component: FindInvoiceByDniComponent
    },
    {
      path: "findAllInvoice",
      component: FindAllInvoiceComponent
    },
    {
      path: "findInvoicesByState",
      component: FindInvoiceByStateComponent
    },
    {
      path: "findAllAppointment",
      component: FindAllAppointmentComponent
    },
    {
      path: "findAppointmentById",
      component: FindAppointmentByIdComponent
    },
    {
      path: "findAppointmentsByPetId",
      component: FindAppointmentsByPetIdComponent
    },
    {
      path: "findAppointmentsByVeterinarianId",
      component: FindAppointmentsByVeterinarianIdComponent
    },
    {
      path: "findAppointmentsByDate",
      component: FindAppointmentsByDateComponent
    },
    {
      path: "createPet",
      component: CreatePetComponent
    },
    {
      path: "createOwner",
      component: CreateOwnerComponent
    },
    {
      path: "createInvoice",
      component: CreateInvoiceComponent
    },
    {
      path: "createAppointment",
      component: CreateAppointmentComponent
    },
    {
      path: "createRole",
      component: CreateRoleComponent
    },
    {
      path: "deleteUserById",
      component: DeleteUserByIdComponent
    },
    {
      path: "deletePetById",
      component: DeletePetByIdComponent
    },
    {
      path: "deleteInvoiceById",
      component: DeleteInvoiceByIdComponent
    },
    {
      path: "deleteRoleById",
      component: DeleteRoleByIdComponent
    },
    {
      path: "deleteAppointmentById",
      component: DeleteAppointmentByIdComponent
    },
    {
      path: "deleteOwnerById",
      component: DeleteOwnerByIdComponent
    },
    {
      path: "updateUserById",
      component: UpdateUserByIdComponent
    },
    {
      path: "updateRoleById",
      component: UpdateRoleByIdComponent
    },
    {
      path: "updateOwnerById",
      component: UpdateOwnerByIdComponent
    },
    {
      path: "updatePetById",
      component: UpdatePetByIdComponent
    },
    {
      path: "updateInvoiceById",
      component: UpdateInvoiceByIdComponent
    },
    {
      path: "updateAppointmentById",
      component: UpdateAppointmentByIdComponent
    },
    {
      path: "downloadCsvUser",
      component: DownloadCsvUserComponent
    },
    {
      path: "downloadCsvOwner",
      component: DownloadCsvOwnerComponent
    },
    {
      path: "downloadCsvPet",
      component: DownloadCsvPetComponent
    },
    {
      path: "downloadCsvInvoice",
      component: DownloadCsvInvoiceComponent
    },
    {
      path: "downloadCsvAppointment",
      component: DownloadCsvAppointmentComponent
    },
    {
      path: "downloadJsonUser",
      component: DownloadJsonUserComponent
    },
    {
      path: "downloadJsonOwner",
      component: DownloadJsonOwnerComponent
    },
    {
      path: "downloadJsonPet",
      component: DownloadJsonPetComponent
    },
    {
      path: "downloadJsonInvoice",
      component: DownloadJsonInvoiceComponent
    },
    {
      path: "downloadJsonAppointment",
      component: DownloadJsonAppointmentComponent
    }


];
