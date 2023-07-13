import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeRoutingModule } from '@modules/home/home-routing.module';

import { LayoutComponent } from '@modules/home/layout/layout.component';
import { SummaryComponent } from './summary/summary.component';
import { GeneralInfoComponent } from './general-info/general-info.component';

import { ItemsModule } from '@shared/modules/items/items.module';
import { ArticleContainerComponent } from '@shared/modules/article-container/article-container.component';
import { ArticleHeaderComponent } from '@shared/modules/article-header/article-header.component';
import { ParagraphContentComponent } from '@shared/modules/paragraph-content/paragraph-content.component';
import { SectionContainerComponent } from '@shared/modules/section-container/section-container.component';

@NgModule({
  declarations: [
    LayoutComponent,
    GeneralInfoComponent,
    SummaryComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    ItemsModule,
    ArticleContainerComponent,
    ArticleHeaderComponent,
    ParagraphContentComponent,
    SectionContainerComponent,
  ],
  providers: []
})
export class HomeModule { }
