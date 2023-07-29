import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { RouterModule } from '@angular/router';

import { galleryFeature } from '@core/data-types';
import { ArticleHeaderComponent } from '@shared/modules/article-header/article-header.component';
import { CardContainerComponent } from '@shared/modules/card-container/card-container.component';
import { PipesModule } from '@shared/pipes/pipes.module';


@Component({
  standalone: true,
  selector: 'app-grid-container',
  templateUrl: './grid-container.component.html',
  imports: [
    CommonModule,
    RouterModule,
    CardContainerComponent,
    ArticleHeaderComponent,
    PipesModule
  ],
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
