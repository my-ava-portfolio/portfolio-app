import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipesModule } from '@shared/pipes/pipes.module';

import { ResumeLegacyRoutingModule } from '@modules/resume-legacy/resume-legacy-routing.module';

import { LayoutComponent } from '@modules/resume-legacy/layout/layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ResumeLegacyRoutingModule,
    PipesModule
  ]
})
export class ResumeLegacyModule { }
