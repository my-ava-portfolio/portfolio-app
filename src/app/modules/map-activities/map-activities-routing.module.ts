import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapViewComponent } from '@modules/map-activities/map-view/map-view.component';

const routes: Routes = [
  {
    path: '', component: MapViewComponent,
    data: { title: 'Carte des activités', page: 'map-activities' },
    outlet: 'map-activities'
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapActivitiesRoutingModule { }
