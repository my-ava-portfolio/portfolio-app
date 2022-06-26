import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MapGtfsViewerRoutingModule } from './map-gtfs-viewer-routing.module';

import { MapViewComponent } from '@modules/map-gtfs-viewer/map-view/map-view.component';

import { TimelineService } from '@shared/services/timeline.service';
import { DataService } from '@modules/map-gtfs-viewer/shared/services/data.service';

import { SharedModule } from '@shared/modules/shared/shared.module';

@NgModule({
  declarations: [
    MapViewComponent,
  ],
  imports: [
    CommonModule,
    MapGtfsViewerRoutingModule,
    FontAwesomeModule,
    SharedModule
  ],
  providers: [
    TimelineService,
    DataService
  ]
})
export class MapGtfsViewerModule { }
