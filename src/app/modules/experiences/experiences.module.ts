import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PipesModule } from '@shared/pipes/pipes.module';

import { ExperiencesRoutingModule } from '@modules/experiences/experiences-routing.module';

import { LayoutComponent } from '@modules/experiences/layout/layout.component';
import { NavigateComponent } from '@modules/experiences/navigate/navigate.component';
import { ProfilBarComponent } from '@modules/experiences/profil-bar/profil-bar.component';
import { ActivitiesComponent } from '@modules/experiences/activities/activities.component';
import { SkillsComponent } from '@modules/experiences/skills/skills.component';


@NgModule({
  declarations: [
    LayoutComponent,
    NavigateComponent,
    ProfilBarComponent,
    ActivitiesComponent,
    SkillsComponent,
    ActivitiesComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    PipesModule,
    ExperiencesRoutingModule
  ]
})
export class ExperiencesModule { }
