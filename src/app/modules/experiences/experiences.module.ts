import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PipesModule } from '@shared/pipes/pipes.module';

import { ExperiencesRoutingModule } from '@modules/experiences/experiences-routing.module';

import { LayoutComponent } from '@modules/experiences/layout/layout.component';
import { GraphBarComponent } from '@modules/experiences/graph-bar/graph-bar.component';
import { ProfilBarComponent } from '@modules/experiences/profil-bar/profil-bar.component';
import { ActivityBarComponent } from '@modules/experiences/activity-bar/activity-bar.component';
import { SkillsComponent } from '@modules/experiences/skills/skills.component';


@NgModule({
  declarations: [
    LayoutComponent,
    GraphBarComponent,
    ProfilBarComponent,
    ActivityBarComponent,
    SkillsComponent
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
