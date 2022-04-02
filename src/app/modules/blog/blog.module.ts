import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from '@modules/blog/blog-routing.module';

import { LayoutComponent } from './layout/layout.component';
import { PipesModule } from '@shared/pipes/pipes.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    PipesModule
  ]
})
export class BlogModule { }
