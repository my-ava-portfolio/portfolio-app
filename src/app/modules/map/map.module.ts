import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MapRoutingModule } from './map-routing.module';

import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    FontAwesomeModule
  ]
})
export class MapModule { }
