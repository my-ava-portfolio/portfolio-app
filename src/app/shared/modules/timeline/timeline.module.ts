import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeLineComponent } from './time-line/time-line.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PipesModule } from '@shared/pipes/pipes.module';
import {RouterModule} from '@angular/router';
import { ItemsModule } from '../items/items.module';
import { SectionContainerComponent } from '../section-container/section-container.component';


@NgModule({
  declarations: [
    TimeLineComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PipesModule,
    RouterModule,
    ItemsModule,
    SectionContainerComponent,
  ],
  exports: [
    TimeLineComponent,
  ],
  providers: []
})
export class TimelineModule { }
