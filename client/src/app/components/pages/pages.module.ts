import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { SwiperModule } from 'swiper/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactComponent } from './contact/contact.component';
import { PagesRoutingModule } from './pages.routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    AppRoutingModule,
    SharedModule,
    PagesRoutingModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
