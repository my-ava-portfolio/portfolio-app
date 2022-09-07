import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MapRoutingModule } from './maps-routing.module';

import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { PipesModule } from '@shared/pipes/pipes.module';

import { GridContainerModule } from '@shared/modules/grid/gallery.module';
import { ItemsModule } from '@shared/modules/items/items.module';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    FontAwesomeModule,
    PipesModule,
    GridContainerModule,
    ItemsModule
  ]
})
export class MapsModule { }
