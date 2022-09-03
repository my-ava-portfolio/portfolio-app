import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule} from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ArticleContainerComponent } from '@shared/modules/items/article-container/article-container.component';
import { SectionContainerComponent } from './section-container/section-container.component';
import { ButtonContentComponent } from './button-content/button-content.component';
import { ParagraphContentComponent } from './paragraph-content/paragraph-content.component';


@NgModule({
  declarations: [
    ArticleContainerComponent,
    SectionContainerComponent,
    ButtonContentComponent,
    ParagraphContentComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    ArticleContainerComponent,
    SectionContainerComponent,
    ButtonContentComponent,
    ParagraphContentComponent
  ]
})
export class ItemsModule { }
