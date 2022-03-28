import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { BackButtonDirective } from './directives/back-button.directive';
import { ToastContainerComponent } from './components/toast/toast-container/toast-container.component';
import { ToastItemComponent } from './components/toast/toast-item/toast-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdvancedTextEditorComponent } from './components/advanced-text-editor/advanced-text-editor.component';
import { SimpleTextEditorComponent } from './components/simple-text-editor/simple-text-editor.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    BackButtonDirective,
    ToastContainerComponent,
    ToastItemComponent,
    AdvancedTextEditorComponent,
    SimpleTextEditorComponent,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    BackButtonDirective,
    ToastContainerComponent,
    AdvancedTextEditorComponent
  ]
})
export class SharedModule { }
