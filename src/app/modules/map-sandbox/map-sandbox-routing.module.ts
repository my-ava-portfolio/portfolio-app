import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapViewComponent } from '@modules/map-sandbox/map-view/map-view.component';

const routes: Routes = [
  {
    path: '',
    component: MapViewComponent,
    data: {
      title: 'Bac à sable', page: 'map-sandbox'
    },
    outlet: 'map-sandbox'
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapSandboxRoutingModule { }
