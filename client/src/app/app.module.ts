import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './components/admin/admin.module';
import { PagesModule } from './components/pages/pages.module';
import { AuthInterceptor } from './http-interceptors/auth.interceptor';
import { ErrorInterceptor } from './http-interceptors/error.interceptor';
import { AppConfigService } from './services/app-config.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    PagesModule,
    AdminModule,
    HttpClientModule
  ],
  providers: [
    AppConfigService, 
    { provide: APP_INITIALIZER, useFactory: AppConfigService.initialiseAppConfigService, deps: [AppConfigService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
