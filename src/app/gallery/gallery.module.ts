import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



import { GalleryRoutingModule } from '@modules/gallery/gallery-routing.module';

import { GalleryViewComponent } from '@modules/gallery/gallery-view/gallery-view.component';
import { PipesModule } from '@shared/pipes/pipes.module';


@NgModule({
  declarations: [
    GalleryViewComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    FontAwesomeModule,
    PipesModule
  ]
})
export class GalleryModule { }
