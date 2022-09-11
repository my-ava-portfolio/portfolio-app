import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

import { galleryFeature } from '@core/data-types';


@Component({
  selector: 'app-grid-container',
  templateUrl: './grid-container.component.html',
  styleUrls: ['./grid-container.component.scss']
})
export class GridContainerComponent implements OnInit {
  @ContentChild('descriptionTemplate') descriptionTmplt!: TemplateRef<any>;
  
  @Input() columnNb!: string;
  @Input() features!: galleryFeature[];
  @Input() featuresHeaderClass!: string;

  constructor() { }

  ngOnInit(): void {
  }

  trackByFn(index: number, item: any) {
    return index;
  }

}
