import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

import { galleryFeature } from '@core/data-types';
import { experiencesPages } from '@core/inputs';


@Component({
  selector: 'app-grid-container',
  templateUrl: './grid-container.component.html',
  styleUrls: ['./grid-container.component.scss']
})
export class GridContainerComponent implements OnInit {
  @ContentChild('galleryTemplate') galleryTmplt!: TemplateRef<any>;
  @ContentChild('blogTemplate') blogTmplt!: TemplateRef<any>;

  @Input() features!: galleryFeature[];

  constructor() { }

  ngOnInit(): void {
  }

}
