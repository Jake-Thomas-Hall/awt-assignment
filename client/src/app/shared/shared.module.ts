import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { BackButtonDirective } from './directives/back-button.directive';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    BackButtonDirective
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    BackButtonDirective
  ]
})
export class SharedModule { }
