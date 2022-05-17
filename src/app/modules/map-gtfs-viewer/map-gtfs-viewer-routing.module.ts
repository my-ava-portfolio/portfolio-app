import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapViewComponent } from '@modules/map-gtfs-viewer/map-view/map-view.component';


const routes: Routes = [
  {
    path: '', component: MapViewComponent,
    data: { title: 'GTFS viewer', page: 'map-gtfs-viewer' },
    outlet: 'map-gtfs-viewer'
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapGtfsViewerRoutingModule { }
