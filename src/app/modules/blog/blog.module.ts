import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from '@modules/blog/blog-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BlogService } from '@modules/blog/shared/services/blog.service';

import { LayoutComponent } from './layout/layout.component';
import { PipesModule } from '@shared/pipes/pipes.module';
import { GridContainerModule } from '@shared/modules/grid/gallery.module';
import { ItemsModule } from '@shared/modules/items/items.module';
import { LegendContainerComponent } from '@shared/modules/legend-container/legend-container.component';
import { ParagraphContentComponent } from '@shared/modules/paragraph-content/paragraph-content.component';
import { SectionContainerComponent } from '@shared/modules/section-container/section-container.component';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    PipesModule,
    FontAwesomeModule,
    GridContainerModule,
    ItemsModule,
    LegendContainerComponent,
    ParagraphContentComponent,
    SectionContainerComponent
  ],
  providers: [
    BlogService
  ]
})
export class BlogModule { }
