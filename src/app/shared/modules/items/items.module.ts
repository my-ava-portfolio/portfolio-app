import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule} from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ArticleContainerComponent } from '@shared/modules/items/article-container/article-container.component';
import { SectionContainerComponent } from './section-container/section-container.component';
import { ButtonContentComponent } from './button-content/button-content.component';
import { ParagraphContentComponent } from './paragraph-content/paragraph-content.component';
import { IconTextComponent } from './icon-text/icon-text.component';
import { CardContainerComponent } from './card-container/card-container.component';
import { ArticleHeaderComponent } from './article-header/article-header.component';
import { BadgeContentComponent } from './badge-content/badge-content.component';
import { LegendContainerComponent } from './legend-container/legend-container.component';


const components = [
  ArticleContainerComponent,
  SectionContainerComponent,
  ButtonContentComponent,
  ParagraphContentComponent,
  IconTextComponent,
  CardContainerComponent,
  ArticleHeaderComponent,
  BadgeContentComponent,
  LegendContainerComponent
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: components
})
export class ItemsModule { }
