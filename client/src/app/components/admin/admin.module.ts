import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AdminRoutingModule } from './admin.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetComponent } from './reset/reset.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResetConfirmComponent } from './reset-confirm/reset-confirm.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { AddUserComponent } from './add-user/add-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  declarations: [
    LoginComponent,
    ResetComponent,
    ResetConfirmComponent,
    ManageUsersComponent,
    ManageAccountComponent,
    AddUserComponent,
    DeleteUserComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }
