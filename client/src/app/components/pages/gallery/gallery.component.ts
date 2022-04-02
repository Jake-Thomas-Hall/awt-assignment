import { Component, OnInit } from '@angular/core';
import { GalleryItem } from 'src/app/models/gallery-item.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  galleryItems: GalleryItem[] = [
      { 
        src: '6194015412_8487a871d4_b.jpg',
        alt: 'Lake between mountains',
        title: 'Mountain lake'
      },
      {
        src: '11108472154_d13d86de77_h.jpg',
        alt: 'Snowy lake',
        title: 'Snowy lake'
      },
      {
        src: '8299041659_630f139dea_h.jpg',
        alt: 'Rocky shore',
        title: 'Rocky shore'
      },
      {
        src: '21951351998_13d63249f7_k.jpg',
        alt: 'Snowy lake and forest',
        title: 'Snowy lake and forest'
      },
      {
        src: '15483913000_0c60a3680e_b.jpg',
        alt: 'Misty lake',
        title: 'Misty morning'
      },
      {
        src: '4684298231_807cace804_b.jpg',
        alt: 'Road and mountains',
        title: 'Road to nowhere'
      },
      {
        src: '15924682637_9688232269_k.jpg',
        alt: 'Snowy tundra forest',
        title: 'Tundra'
      },
      {
        src: '22550225558_e3ccc50263_k.jpg',
        alt: 'Snowy marsh',
        title: 'Marshlands'
      },
      {
        src: '21469375458_34b8fbba5f_k.jpg',
        alt: 'Misty forest',
        title: 'Mist over the forest'
      },
      {
        src: '5910140263_dfb37f7213_b.jpg',
        alt: 'Tree in savana',
        title: 'Lonely tree'
      },
      {
        src: '1677517977_c0657cc31f_b.jpg',
        alt: 'Boats in lake',
        title: 'Boats'
      },
      {
        src: '11742406995_35f2799c89_k.jpg',
        alt: 'Tropical pier',
        title: 'Tropical Pier'
      },
      {
        src: '21445725364_ae6bf445c4_k.jpg',
        alt: 'Long pier',
        title: 'Long pier'
      },
      {
        src: '3927516198_0e2e033c1e_o.jpg',
        alt: 'Old pier',
        title: 'Old pier'
      },
      {
        src: '4684298231_807cace804_b.jpg',
        alt: 'Road',
        title: 'Road'
      }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  
}
