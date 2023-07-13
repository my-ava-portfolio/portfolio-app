import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MapGtfsViewerRoutingModule } from './map-gtfs-viewer-routing.module';

import { MapViewComponent } from '@modules/map-gtfs-viewer/map-view/map-view.component';

import { DataService } from '@modules/map-gtfs-viewer/shared/services/data.service';

import { TimelineModule } from '@shared/modules/timeline/timeline.module';
import { ItemsModule } from '@shared/modules/items/items.module';
import { TimeLegendComponent } from './time-legend/time-legend.component';
import { LegendContainerComponent } from '@shared/modules/legend-container/legend-container.component';
import { SectionContainerComponent } from '@shared/modules/section-container/section-container.component';

@NgModule({
  declarations: [
    MapViewComponent,
    TimeLegendComponent,
  ],
  imports: [
    CommonModule,
    MapGtfsViewerRoutingModule,
    FontAwesomeModule,
    TimelineModule,
    ItemsModule,
    LegendContainerComponent,
    SectionContainerComponent,
  ],
  providers: [
    DataService
  ]
})
export class MapGtfsViewerModule { }
