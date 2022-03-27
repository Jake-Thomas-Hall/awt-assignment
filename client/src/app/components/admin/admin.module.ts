import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AdminRoutingModule } from './admin.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetComponent } from './reset/reset.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResetConfirmComponent } from './reset-confirm/reset-confirm.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecaptchaV3Module } from 'ng-recaptcha';

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
    SharedModule,
    RecaptchaV3Module
  ]
})
export class AdminModule { }
