import { ItemsModule } from '@shared/modules/items/items.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipesModule } from '@shared/pipes/pipes.module';

import { ResumeLegacyRoutingModule } from '@modules/resume-legacy/resume-legacy-routing.module';

import { LayoutComponent } from '@modules/resume-legacy/layout/layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ParagraphContentComponent } from '@shared/modules/paragraph-content/paragraph-content.component';
import { SectionContainerComponent } from '@shared/modules/section-container/section-container.component';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ResumeLegacyRoutingModule,
    PipesModule,
    ItemsModule,
    ParagraphContentComponent,
    SectionContainerComponent,
  ]
})
export class ResumeLegacyModule { }
