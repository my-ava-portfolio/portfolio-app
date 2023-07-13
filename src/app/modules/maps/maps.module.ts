import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MapRoutingModule } from './maps-routing.module';

import { MapAppLayoutComponent } from './map-app-layout/map-app-layout.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { PipesModule } from '@shared/pipes/pipes.module';

import { GridContainerModule } from '@shared/modules/grid/gallery.module';
import { ItemsModule } from '@shared/modules/items/items.module';
import { ParagraphContentComponent } from '@shared/modules/paragraph-content/paragraph-content.component';
import { SectionContainerComponent } from '@shared/modules/section-container/section-container.component';

@NgModule({
  declarations: [
    MapAppLayoutComponent,
    HomeLayoutComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    FontAwesomeModule,
    PipesModule,
    GridContainerModule,
    ItemsModule,
    ParagraphContentComponent,
    SectionContainerComponent,
  ]
})
export class MapsModule { }
