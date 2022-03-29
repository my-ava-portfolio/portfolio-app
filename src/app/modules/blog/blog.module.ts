import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from '@modules/blog/blog-routing.module';

import { NotesViewComponent } from '@modules/blog/notes-view/notes-view.component';
import { PipesModule } from '@shared/pipes/pipes.module';


@NgModule({
  declarations: [
    NotesViewComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    PipesModule
  ]
})
export class BlogModule { }
