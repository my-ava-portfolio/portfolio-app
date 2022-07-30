import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ToolboxComponent } from './toolbox/toolbox.component';

const routes: Routes = [
  {
    path: '',
    component: ToolboxComponent,
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
