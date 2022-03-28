import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AdminRoutingModule } from './admin.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetComponent } from './reset/reset.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResetConfirmComponent } from './reset-confirm/reset-confirm.component';

@NgModule({
  declarations: [
    LoginComponent,
    ResetComponent,
    ResetConfirmComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }
