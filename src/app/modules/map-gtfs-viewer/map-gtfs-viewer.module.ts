import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MapGtfsViewerRoutingModule } from './map-gtfs-viewer-routing.module';

import { MapViewComponent } from '@modules/map-gtfs-viewer/map-view/map-view.component';
import { TimelineComponent } from '@shared/components/timeline/timeline.component';

import { TimelineService } from '@shared/services/timeline.service';


@NgModule({
  declarations: [
    MapViewComponent,
    TimelineComponent
  ],
  imports: [
    CommonModule,
    MapGtfsViewerRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    TimelineService,
  ]
})
export class MapGtfsViewerModule { }
