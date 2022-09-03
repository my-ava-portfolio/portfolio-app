import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { GridContainerComponent } from './grid-container/grid-container.component';

import { PipesModule } from '@shared/pipes/pipes.module';
import {RouterModule} from '@angular/router';
import { ItemsModule } from '../items/items.module';


@NgModule({
  declarations: [
    GridContainerComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule,
    FontAwesomeModule,
    ItemsModule
  ],
  exports: [
    GridContainerComponent
  ],
  providers: [
 ]
})
export class GridContainerModule { }
