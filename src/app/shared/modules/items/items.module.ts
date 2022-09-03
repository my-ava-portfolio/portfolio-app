import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule} from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ArticleContainerComponent } from '@shared/modules/items/article-container/article-container.component';
import { SectionContainerComponent } from './section-container/section-container.component';
import { ButtonContentComponent } from './button-content/button-content.component';
import { ParagraphContentComponent } from './paragraph-content/paragraph-content.component';
import { LocationIconComponent } from './location-icon/location-icon.component';
import { CardContainerComponent } from './card-container/card-container.component';
import { ArticleHeaderComponent } from './article-header/article-header.component';


const components = [
  ArticleContainerComponent,
  SectionContainerComponent,
  ButtonContentComponent,
  ParagraphContentComponent,
  LocationIconComponent,
  CardContainerComponent,
  ArticleHeaderComponent
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
