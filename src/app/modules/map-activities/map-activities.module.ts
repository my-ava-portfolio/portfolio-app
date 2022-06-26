import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MapActivitiesRoutingModule } from './map-activities-routing.module';

import { MapViewComponent } from '@modules/map-activities/map-view/map-view.component';
import { ThemeLegendComponent } from '@modules/map-activities/theme-legend/theme-legend.component';
import { TimeLegendComponent } from '@modules/map-activities/time-legend/time-legend.component';

import { DataService } from '@modules/map-activities/shared/services/data.service';


@NgModule({
  declarations: [
    MapViewComponent,
    ThemeLegendComponent,
    TimeLegendComponent
  ],
  imports: [
    CommonModule,
    MapActivitiesRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    DataService
  ],
})
export class MapActivitiesModule { }
