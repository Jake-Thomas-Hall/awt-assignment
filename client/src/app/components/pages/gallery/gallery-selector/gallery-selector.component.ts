import { Component, Input, OnInit } from '@angular/core';
import { GalleryItem } from 'src/app/models/gallery-item.model';

@Component({
  selector: 'app-gallery-selector',
  templateUrl: './gallery-selector.component.html',
  styleUrls: ['./gallery-selector.component.scss']
})
export class GallerySelectorComponent implements OnInit {
  @Input() mainImage!: GalleryItem;
  @Input() galleryItems: GalleryItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  swapToMain(image: GalleryItem, index: number) {
    this.galleryItems.splice(index, 1);
    let previousMain = Object.assign({}, this.mainImage);
    this.galleryItems.push(previousMain);
    this.mainImage = image;
  }
}
