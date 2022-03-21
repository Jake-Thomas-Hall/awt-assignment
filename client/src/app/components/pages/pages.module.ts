import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { SwiperModule } from 'swiper/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    AppRoutingModule
  ]
})
export class PagesModule { }
