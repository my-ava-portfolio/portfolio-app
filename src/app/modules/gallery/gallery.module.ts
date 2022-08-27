import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { GalleryRoutingModule } from '@modules/gallery/gallery-routing.module';

import { LayoutComponent } from './layout/layout.component';

import { GalleryService } from '@services/gallery.service';

import { PipesModule } from '@shared/pipes/pipes.module';
import { GalleryContainerModule } from '@shared/modules/gallery/gallery.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    FontAwesomeModule,
    PipesModule,
    GalleryContainerModule
  ],
  providers: [
    GalleryService
  ]
})
export class GalleryModule { }
