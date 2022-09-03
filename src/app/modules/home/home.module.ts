import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from '@modules/home/home-routing.module';

import { LayoutComponent } from '@modules/home/layout/layout.component';

import { SummaryComponent } from './summary/summary.component';

import { GalleryService } from '@services/gallery.service';

import { PipesModule } from '@shared/pipes/pipes.module';
import { ArticleContainerComponent } from '@shared/components/article-container/article-container.component';
import { SectionContainerComponent } from '@shared/components/section-container/section-container.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { ParagraphContentComponent } from '@shared/components/paragraph-content/paragraph-content.component';
import { ButtonContentComponent } from '@shared/components/button-content/button-content.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ArticleContainerComponent,
    SectionContainerComponent,
    GeneralInfoComponent,
    SummaryComponent,
    ParagraphContentComponent,
    ButtonContentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    FontAwesomeModule,
    PipesModule,
    NgbModule
  ],
  providers: [
    GalleryService
  ]
})
export class HomeModule { }
