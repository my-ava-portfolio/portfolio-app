import { Component, Input, OnInit } from '@angular/core';

import { galleryFeature } from '@core/data-types';
import { experiencesPages } from '@core/inputs';


@Component({
  selector: 'app-gallery-container',
  templateUrl: './gallery-container.component.html',
  styleUrls: ['./gallery-container.component.scss']
})
export class GalleryContainerComponent implements OnInit {
  @Input() features!: galleryFeature[];

  experiencesRoute: string = experiencesPages.route;


  constructor() { }

  ngOnInit(): void {
  }

}
