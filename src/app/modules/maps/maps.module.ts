import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MapRoutingModule } from './maps-routing.module';

import { MapAppLayoutComponent } from './map-app-layout/map-app-layout.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { PipesModule } from '@shared/pipes/pipes.module';

import { ItemsModule } from '@shared/modules/items/items.module';
import { ParagraphContentComponent } from '@shared/modules/paragraph-content/paragraph-content.component';
import { SectionContainerComponent } from '@shared/modules/section-container/section-container.component';
import { GridContainerComponent } from '@shared/modules/grid-container/grid-container.component';

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
    GridContainerComponent,
    ItemsModule,
    ParagraphContentComponent,
    SectionContainerComponent,
  ]
})
export class MapsModule { }
