import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapViewComponent } from '@modules/map-activities/map-view/map-view.component';

const routes: Routes = [
  {
    path: '', component: MapViewComponent,
    data: { title: 'Carte des activités', page: 'map-activities' },
    outlet: 'map-activities' // remove to be able to use <router-outlet #outlet="outlet" ></router-outlet>
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapActivitiesRoutingModule { }
