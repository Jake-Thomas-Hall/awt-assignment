import { Component, OnInit } from '@angular/core';

import SwiperCore, { Pagination, Navigation } from 'swiper';

SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
