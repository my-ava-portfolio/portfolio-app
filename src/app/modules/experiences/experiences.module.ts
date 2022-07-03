import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PipesModule } from '@shared/pipes/pipes.module';

import { ExperiencesRoutingModule } from '@modules/experiences/experiences-routing.module';

import { ActivityActionsService } from '@modules/experiences/services/activity-actions.service';

import { LayoutComponent } from '@modules/experiences/layout/layout.component';
import { NavigateComponent } from '@modules/experiences/navigate/navigate.component';
import { ProfilBarComponent } from '@modules/experiences/profil-bar/profil-bar.component';
import { ActivitiesComponent } from '@modules/experiences/activities/activities.component';
import { SkillsComponent } from '@modules/experiences/skills/skills.component';

import { ClickClassDirective } from '@shared/directives/click-class.directive';
import { GeneralInfoComponent } from './general-info/general-info.component';


@NgModule({
  declarations: [
    LayoutComponent,
    NavigateComponent,
    ProfilBarComponent,
    ActivitiesComponent,
    SkillsComponent,
    ActivitiesComponent,
    ClickClassDirective,
    GeneralInfoComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    PipesModule,
    ExperiencesRoutingModule
  ],
  providers: [
    ActivityActionsService
  ]
})
export class ExperiencesModule { }
