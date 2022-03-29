import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PipesModule } from '@shared/pipes/pipes.module';

import { ExperiencesRoutingModule } from '@modules/experiences/experiences-routing.module';

import { RightbarSkillsComponent } from '@modules/experiences/rightbar-skills/rightbar-skills.component';
import { GraphBarComponent } from '@modules/experiences/graph-bar/graph-bar.component';
import { ProfilBarComponent } from '@modules/experiences/profil-bar/profil-bar.component';
import { ActivityBarComponent } from '@modules/experiences/activity-bar/activity-bar.component';
import { ExperiencesViewComponent } from '@modules/experiences/experiences-view/experiences-view.component';


@NgModule({
  declarations: [
    RightbarSkillsComponent,
    GraphBarComponent,
    ProfilBarComponent,
    ActivityBarComponent,
    ExperiencesViewComponent
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
