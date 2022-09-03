import { Component, Input, OnInit } from '@angular/core';

import { galleryFeature } from '@core/data-types';
import { experiencesPages } from '@core/inputs';


@Component({
  selector: 'app-grid-container',
  templateUrl: './grid-container.component.html',
  styleUrls: ['./grid-container.component.scss']
})
export class GridContainerComponent implements OnInit {
  @Input() itemTpl!: any;
  @Input() features!: galleryFeature[];

  experiencesRoute: string = experiencesPages.route;


  constructor() { }

  ngOnInit(): void {
  }

}
