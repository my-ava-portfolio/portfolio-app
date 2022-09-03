import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from '@modules/blog/blog-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LayoutComponent } from './layout/layout.component';
import { PipesModule } from '@shared/pipes/pipes.module';
import { GridContainerModule } from '@shared/modules/grid/gallery.module';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    PipesModule,
    FontAwesomeModule,
    GridContainerModule
  ]
})
export class BlogModule { }
