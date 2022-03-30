import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ToolboxComponent } from '@modules/map-sandbox/toolbox/toolbox.component';

const routes: Routes = [
  {
    path: '',
    component: ToolboxComponent,
    data: {
      title: 'Bac à sable', page: 'map'
    },
    outlet: 'map-sandbox'
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapSandboxRoutingModule { }
