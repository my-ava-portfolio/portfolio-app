import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeLineComponent } from './time-line/time-line.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    TimeLineComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    TimeLineComponent
  ]
})
export class SharedModule { }
