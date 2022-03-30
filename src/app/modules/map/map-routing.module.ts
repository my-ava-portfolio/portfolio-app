import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '@modules/map/layout/layout.component';


const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'activities',
        loadChildren: () => import('@modules/map-activities/map-activities.module').then(m => m.MapActivitiesModule),
      },
      {
        path: 'sandbox',
        loadChildren: () => import('@modules/map-sandbox/map-sandbox.module').then(m => m.MapSandboxModule),
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
