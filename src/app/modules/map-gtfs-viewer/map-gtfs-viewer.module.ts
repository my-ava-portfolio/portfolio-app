import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MapGtfsViewerRoutingModule } from './map-gtfs-viewer-routing.module';

import { MapViewComponent } from '@modules/map-gtfs-viewer/map-view/map-view.component';

import { DataService } from '@modules/map-gtfs-viewer/shared/services/data.service';

import { TimelineModule } from '@shared/modules/timeline/timeline.module';
import { ItemsModule } from '@shared/modules/items/items.module';

@NgModule({
  declarations: [
    MapViewComponent,
  ],
  imports: [
    CommonModule,
    MapGtfsViewerRoutingModule,
    FontAwesomeModule,
    TimelineModule,
    ItemsModule
  ],
  providers: [
    DataService
  ]
})
export class MapGtfsViewerModule { }
