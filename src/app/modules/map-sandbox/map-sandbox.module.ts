import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorPickerModule } from 'ngx-color-picker';

import { MapSandboxRoutingModule } from '@modules/map-sandbox/map-sandbox-routing.module';

import { MapViewComponent } from '@modules/map-sandbox/map-view/map-view.component';



@NgModule({
  declarations: [
    MapViewComponent
  ],
  imports: [
    CommonModule,
    MapSandboxRoutingModule,
    FontAwesomeModule,
    ColorPickerModule
  ]
})
export class MapSandboxModule { }
