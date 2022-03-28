import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { EducationRoutingModule } from '@modules/education/education-routing.module';


import { EducationViewComponent } from '@modules/education/education-view/education-view.component';
import { DegreesBarComponent } from '@modules/education/degrees-bar/degrees-bar.component';
import { TrainingsBarComponent } from '@modules/education/trainings-bar/trainings-bar.component';


@NgModule({
  declarations: [
    EducationViewComponent,
    DegreesBarComponent,
    TrainingsBarComponent,
  ],
  imports: [
    CommonModule,
    EducationRoutingModule,
    FontAwesomeModule
  ]
})
export class EducationModule { }
