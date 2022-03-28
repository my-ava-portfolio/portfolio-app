import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MapRoutingModule } from './map-routing.module';

import { MapViewComponent } from '@modules/map/map-view/map-view.component';
import { ThemeLegendComponent } from '@modules/map/theme-legend/theme-legend.component';
import { TimeLegendComponent } from '@modules/map/time-legend/time-legend.component';

@NgModule({
  declarations: [
    MapViewComponent,
    ThemeLegendComponent,
    TimeLegendComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    FontAwesomeModule
  ]
})
export class MapModule { }
