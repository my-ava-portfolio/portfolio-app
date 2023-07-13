import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { GridContainerComponent } from './grid-container/grid-container.component';

import { PipesModule } from '@shared/pipes/pipes.module';
import {RouterModule} from '@angular/router';
import { ArticleHeaderComponent } from '../article-header/article-header.component';
import { CardContainerComponent } from '../card-container/card-container.component';


@NgModule({
  declarations: [
    GridContainerComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule,
    FontAwesomeModule,
    ArticleHeaderComponent,
    CardContainerComponent
  ],
  exports: [
    GridContainerComponent
  ],
  providers: [
 ]
})
export class GridContainerModule { }
