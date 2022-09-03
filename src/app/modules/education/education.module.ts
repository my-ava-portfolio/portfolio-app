import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { EducationRoutingModule } from '@modules/education/education-routing.module';

import { LayoutComponent } from '@modules/education/layout/layout.component';
import { DegreesBarComponent } from '@modules/education/degrees-bar/degrees-bar.component';
import { TrainingsBarComponent } from '@modules/education/trainings-bar/trainings-bar.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ItemsModule } from '@shared/modules/items/items.module';


@NgModule({
  declarations: [
    // ArticleContainerComponent,
    // SectionContainerComponent,
    DegreesBarComponent,
    TrainingsBarComponent,
    LayoutComponent,
    GeneralInfoComponent,
  ],
  imports: [
    CommonModule,
    EducationRoutingModule,
    FontAwesomeModule,
    NgbModule,
    ItemsModule
  ]
})
export class EducationModule { }
