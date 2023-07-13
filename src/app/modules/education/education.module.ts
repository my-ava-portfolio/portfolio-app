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
import { PublicationBarComponent } from './publication-bar/publication-bar.component';
import { ArticleContainerComponent } from '@shared/modules/article-container/article-container.component';
import { ArticleHeaderComponent } from '@shared/modules/article-header/article-header.component';
import { CardContainerComponent } from '@shared/modules/card-container/card-container.component';
import { ParagraphContentComponent } from '@shared/modules/paragraph-content/paragraph-content.component';
import { SectionContainerComponent } from '@shared/modules/section-container/section-container.component';


@NgModule({
  declarations: [
    DegreesBarComponent,
    TrainingsBarComponent,
    LayoutComponent,
    GeneralInfoComponent,
    PublicationBarComponent,
  ],
  imports: [
    CommonModule,
    EducationRoutingModule,
    FontAwesomeModule,
    NgbModule,
    ItemsModule,
    ArticleContainerComponent,
    ArticleHeaderComponent,
    CardContainerComponent,
    ParagraphContentComponent,
    SectionContainerComponent,
  ]
})
export class EducationModule { }
