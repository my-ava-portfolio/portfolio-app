import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';

import { PipesModule } from '@shared/pipes/pipes.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    ContainerComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule
  ],
  exports: [
    ContainerComponent
  ],
  providers: [
 ]
})
export class GalleryModule { }
