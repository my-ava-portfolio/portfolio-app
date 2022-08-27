import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeLineComponent } from './time-line/time-line.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TimelineService } from '@shared/services/timeline.service';

import { PipesModule } from '@shared/pipes/pipes.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    TimeLineComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PipesModule,
    RouterModule
  ],
  exports: [
    TimeLineComponent,
  ],
  providers: [
    TimelineService
  ]
})
export class TimelineModule { }
