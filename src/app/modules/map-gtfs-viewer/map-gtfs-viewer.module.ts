import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MapGtfsViewerRoutingModule } from './map-gtfs-viewer-routing.module';

import { MapViewComponent } from '@modules/map-gtfs-viewer/map-view/map-view.component';
import { TimeLegendComponent } from '@modules/map-gtfs-viewer/time-legend/time-legend.component';


@NgModule({
  declarations: [
    MapViewComponent,
    TimeLegendComponent,
  ],
  imports: [
    CommonModule,
    MapGtfsViewerRoutingModule,
    FontAwesomeModule
  ]
})
export class MapGtfsViewerModule { }
