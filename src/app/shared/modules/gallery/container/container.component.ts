import { Component, Input, OnInit } from '@angular/core';
import { stringToColor } from '@core/inputs';

import { galleryFeature } from '@core/data-types';


@Component({
  selector: 'app-main',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  @Input() features!: galleryFeature[];

  constructor() { }

  ngOnInit(): void {
  }

}
