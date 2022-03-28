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
import { ReactiveFormsModule } from '@angular/forms';
import { ContentEditableDirective } from './directives/content-editable.directive';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    BackButtonDirective,
    ToastContainerComponent,
    ToastItemComponent,
    AdvancedTextEditorComponent,
    SimpleTextEditorComponent,
    ClickOutsideDirective,
    ContentEditableDirective
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    BackButtonDirective,
    ToastContainerComponent,
    ContentEditableDirective,
    AdvancedTextEditorComponent,
    SimpleTextEditorComponent
  ]
})
export class SharedModule { }
