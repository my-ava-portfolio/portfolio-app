import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { GalleryContainerComponent } from './gallery-container/gallery-container.component';

import { PipesModule } from '@shared/pipes/pipes.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    GalleryContainerComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    GalleryContainerComponent
  ],
  providers: [
 ]
})
export class GalleryContainerModule { }
