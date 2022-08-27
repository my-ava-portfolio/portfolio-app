import { Component, Input, OnInit } from '@angular/core';

import { galleryFeature } from '@core/data-types';


@Component({
  selector: 'app-gallery-container',
  templateUrl: './gallery-container.component.html',
  styleUrls: ['./gallery-container.component.scss']
})
export class GalleryContainerComponent implements OnInit {
  @Input() features!: galleryFeature[];

  constructor() { }

  ngOnInit(): void {
  }

}
